import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";
import Navbar from '../components/navbar';
import Todo from '../components/todo';


interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{ id?: number; name: string; email: string }>({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.id) {
      await updateUser(form.id, { name: form.name, email: form.email });
    } else {
      await addUser({ name: form.name, email: form.email });
    }
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setForm(user);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <Navbar />
      {/* <div className="container">
        <h1>CRUD App</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <button type="submit">{form.id ? "Update" : "Add"} User</button>
        </form>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div> */}
        <Todo />
    </div>
  );
}
