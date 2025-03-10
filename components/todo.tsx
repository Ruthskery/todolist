import React, { useState, useEffect } from "react";
import { getTodo, addTodo, updateTodo, deleteTodo } from "../services/api";

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState<{ id?: number; description: string }>({
    description: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodo(); // Fetch all todos
    setTodos(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.id) {
      await updateTodo(form.id, { description: form.description });
    } else {
      await addTodo({ description: form.description, completed: false });
    }
    setForm({ description: "" });
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setForm(todo);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      fetchTodos(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, { completed: !completed }); // Toggle the completed status
      fetchTodos(); // Refresh the list after updating
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  // Separate todos into incomplete and completed
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-b border-gray-900/10 pb-12">
        <div className="grid grid-cols-1">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-lg font-bold text-gray-900">To Do</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                id="description"
                name="description"
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="block w-64 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-black placeholder:text-gray-400 sm:text-sm"
                placeholder="Enter a todo"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {form.id ? "Update" : "Add"}
              </button>
            </form>

            {/* Render incomplete todos */}
            <div className="mt-4 space-y-2">
              <h2 className="text-md font-semibold text-gray-900">Incomplete</h2>
              <ul className="space-y-2">
                {incompleteTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between w-64"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                          handleToggleComplete(todo.id, todo.completed)
                        }
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span>{todo.description}</span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="text-sm text-red-600 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Render completed todos */}
            <div className="mt-4 space-y-2">
              <h2 className="text-md font-semibold text-gray-900">Completed</h2>
              <ul className="space-y-2">
                {completedTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between w-64"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                          handleToggleComplete(todo.id, todo.completed)
                        }
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="line-through">{todo.description}</span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="text-sm text-red-600 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;