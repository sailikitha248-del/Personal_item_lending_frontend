
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/items";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "AVAILABLE",
  });

  async function fetchItems() {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch items.");
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(
        "Cannot connect to Spring Boot. Make sure the backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to add item.");
      }

      setForm({
        name: "",
        description: "",
        status: "AVAILABLE",
      });

      setMessage("Item added successfully!");
      await fetchItems();
    } catch (err) {
      setError(err.message || "Unable to add item.");
    }
  }

  return (
    <main style={styles.container}>
      <h1>Manage Items</h1>
      <p>Add and manage the items you lend or borrow.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Add New Item</h2>

        <label htmlFor="name">Item Name *</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="AVAILABLE">Available</option>
          <option value="LENT">Lent</option>
          <option value="BORROWED">Borrowed</option>
        </select>

        <button type="submit">Add Item</button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <section>
        <h2>Item List</h2>

        {loading ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items found. Add your first item above.</p>
        ) : (
          <div style={styles.list}>
            {items.map((item) => (
              <article key={item.id} style={styles.card}>
                <h3>{item.name}</h3>
                <p>{item.description || "No description"}</p>
                <p>
                  <strong>Status:</strong> {item.status || "Available"}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  success: {
    color: "green",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
};
