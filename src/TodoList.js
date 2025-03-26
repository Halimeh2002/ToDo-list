import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TodoList = ({
  language,
  texts,
  selectedDate,
  showProgress = false,
  todos,
  setTodos,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = () => {
    if (!input.trim()) return;
    setIsLoading(true);
    axios
      .post("http://localhost:5000/todos", {
        text: input,
        date: selectedDate,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setInput("");
        toast.success(
          language === "fa"
            ? "وظیفه با موفقیت اضافه شد"
            : "Task added successfully"
        );
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        toast.error(
          language === "fa" ? "خطا در اضافه کردن وظیفه" : "Error adding todo"
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodo = (id, completed) => {
    setIsLoading(true);
    axios
      .put(`http://localhost:5000/todos/${id}`, { completed: !completed })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
        toast.success(
          language === "fa" ? "وضعیت وظیفه تغییر کرد" : "Task status updated"
        );
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        toast.error(
          language === "fa" ? "خطا در تغییر وضعیت" : "Error updating todo"
        );
      })
      .finally(() => setIsLoading(false));
  };

  const deleteTodo = (id) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        toast.success(
          language === "fa"
            ? "وظیفه با موفقیت حذف شد"
            : "Task deleted successfully"
        );
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        toast.error(
          language === "fa" ? "خطا در حذف وظیفه" : "Error deleting todo"
        );
      })
      .finally(() => setIsLoading(false));
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (showProgress) {
    return (
      <div>
        <div className="progress position-relative">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress > 0 && (
              <span
                className="position-absolute"
                style={{
                  right: "5px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                ✅
              </span>
            )}
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
        <div className="text-center mt-2">
          <small>
            {language === "fa"
              ? `${completedCount} از ${totalCount} وظیفه تکمیل شده`
              : `${completedCount} of ${totalCount} tasks completed`}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-3 shadow-sm">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={texts[language].placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="btn btn-soft-success"
          onClick={addTodo}
          disabled={isLoading}
        >
          {isLoading
            ? language === "fa"
              ? "در حال بارگذاری..."
              : "Loading..."
            : texts[language].add}
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.completed ? "text-muted text-decoration-line-through" : ""
            }`}
          >
            <span>{todo.text}</span>
            <div>
              <button
                className={`btn btn-sm me-2 ${
                  todo.completed ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => toggleTodo(todo.id, todo.completed)}
                disabled={isLoading}
              >
                {language === "fa"
                  ? todo.completed
                    ? "✓"
                    : "☐"
                  : todo.completed
                  ? "✓"
                  : "☐"}
              </button>
              <button
                className="btn btn-soft-danger btn-sm"
                onClick={() => deleteTodo(todo.id)}
                disabled={isLoading}
              >
                {language === "fa" ? "حذف" : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
