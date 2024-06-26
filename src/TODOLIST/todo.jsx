import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.text);
  };

  const handleUpdateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id ? { ...task, text: newTask } : task
      )
    );
    setIsEditing(false);
    setNewTask("");
    setCurrentTask({});
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">To-Do List</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a Task"
          />
          <button
            onClick={isEditing ? handleUpdateTask : handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
              <span>{task.text}</span>
              <div>
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
