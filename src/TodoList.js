import React, { useState, useEffect } from "react";

const TodoList = ({ language, texts, selectedDate, showProgress = false }) => {
  const [todos, setTodos] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      const dateTodos = todos[selectedDate] || [];
      const newTodos = {
        ...todos,
        [selectedDate]: [
          ...dateTodos,
          { id: Date.now(), text: input, completed: false },
        ],
      };
      setTodos(newTodos);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    const dateTodos = todos[selectedDate].filter((todo) => todo.id !== id);
    setTodos({
      ...todos,
      [selectedDate]: dateTodos,
    });
  };

  const toggleTodo = (id) => {
    const dateTodos = todos[selectedDate].map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos({
      ...todos,
      [selectedDate]: dateTodos,
    });
  };

  const currentTodos = todos[selectedDate] || [];
  const completedCount = currentTodos.filter((todo) => todo.completed).length;
  const totalCount = currentTodos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (showProgress) {
    return (
      <div className="progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Math.round(progress)}%
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
        />
        <button className="btn btn-soft-success" onClick={addTodo}>
          {texts[language].add}
        </button>
      </div>

      <ul className="list-group">
        {currentTodos.map((todo) => (
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
                onClick={() => toggleTodo(todo.id)}
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
