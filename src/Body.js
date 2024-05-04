import { useState, useEffect } from "react";
import TaskList from "./TaskList";

const Body = () => {
  const [listItems, setListItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();

      setListItems(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim() !== "") {
      const newTask = { id: Date.now(), title: inputValue, completed: false };
      setListItems([...listItems, newTask]);
      setInputValue("");
    }
  };
  const handleDeleteTask = (taskId) => {
    const updatedListItems = listItems.filter((task) => task.id !== taskId);
    setListItems(updatedListItems);
  };
  const handleToggleCompletion = (taskId) => {
    const updatedListItems = listItems.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setListItems(updatedListItems);
  };
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  const handleDragStart = (taskId) => (event) => {
    event.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    const taskId = parseInt(event.dataTransfer.getData("text/plain"));
    const taskIndex = listItems.findIndex((task) => task.id === taskId);
    const updatedListItems = [...listItems];
    const taskToMove = updatedListItems.splice(taskIndex, 1)[0];
    updatedListItems.splice(index, 0, taskToMove);
    setListItems(updatedListItems);
  };
  const filteredListItems = listItems.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div>
      <div className="flex items-center border-b border-black-500 py-2 ">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter task.."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white  mx-2 my-2 px-2 py-2 rounded"
          onClick={handleAddButtonClick}
        >
          Add
        </button>
      </div>
      <div className="flex justify-center my-4">
        <button
          className={`mx-2 px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("incomplete")}
        >
          Incomplete
        </button>
      </div>

      {filteredListItems.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={handleDragStart(task.id)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
        >
          <TaskList
            jsData={task}
            onDelete={handleDeleteTask}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>
      ))}
    </div>
  );
};
export default Body;
