import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      alert("Session expired");
      navigate("/login");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await createTask({ title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Task Tracker</h1>
        <p style={styles.subtitle}>
          Manage daily tasks and track progress easily
        </p>

        <div style={styles.addBox}>
          <input
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              ...styles.task,
              backgroundColor: task.completed ? "#f0f4ff" : "#fff",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span
              style={{
                flex: 1,
                marginLeft: "10px",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#777" : "#333",
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task._id)}
              style={styles.deleteBtn}
            >
              ❌
            </button>
          </div>
        ))}

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #667eea, #764ba2, #6b8dd6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    background: "#fff",
    width: "100%",
    maxWidth: "420px",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "5px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  addBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#667eea",
    color: "#fff",
    cursor: "pointer",
  },
  task: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  logoutBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Dashboard;
