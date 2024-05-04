import React from "react";

const TaskList = ({ jsData, onDelete, onToggleCompletion }) => {
  const { id, title, completed } = jsData;

  return (
    <div
      className={` bg-gray-200 shadow-lg p-4 mx-auto my-4 box-border w-6/12 py-2 cursor-move ${
        completed ? "bg-gray-50 shadow-xl p-2" : ""
      }`}
    >
      <div className="flex justify-between ">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompletion(id)}
        />
        <label className="cursor-move">{title}</label>

        <button
          className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskList;
