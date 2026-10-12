
import { useEffect, useState } from "react";

const ITEMS_API = "http://localhost:8080/api/items";
const TRANSACTIONS_API = "http://localhost:8080/api/transactions";

export default function LendBorrow() {
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    itemId: "",
    personName: "",
    transactionType: "LEND",
    transactionDate: new Date().toLocaleDateString("en-CA"),
    dueDate: "",
    notes: "",
  });

  async function loadData() {
    setLoading(true);

    try {
      setError("");

      const [itemsResponse, transactionsResponse] = await Promise.all([
        fetch(ITEMS_API),
        fetch(TRANSACTIONS_API),
      ]);

      if (!itemsResponse.ok || !transactionsResponse.ok) {
        throw new Error("Unable to load items or transactions.");
      }

      const [itemsData, transactionsData] = await Promise.all([
        itemsResponse.json(),
        transactionsResponse.json(),
      ]);

      setItems(itemsData);
      setTransactions(transactionsData);
    } catch (err) {
      setError(
        "Cannot connect to Spring Boot. Check that it is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(TRANSACTIONS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          itemId: Number(form.itemId),
          dueDate: form.dueDate || null,
          notes: form.notes || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save transaction.");
      }

      setMessage("Transaction saved successfully!");

      setForm({
        itemId: "",
        personName: "",
        transactionType: "LEND",
        transactionDate: new Date().toLocaleDateString("en-CA"),
        dueDate: "",
        notes: "",
      });

      await loadData();
    } catch (err) {
      setError(err.message || "Unable to save transaction.");
    }
  }

  return (
    <main style={styles.container}>
      <h1>Lend & Borrow</h1>
      <p>Record items you lend to others or borrow from others.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>New Transaction</h2>

        <label htmlFor="itemId">Item *</label>
        <select
          id="itemId"
          name="itemId"
          value={form.itemId}
          onChange={handleChange}
          required
        >
          <option value="">Select an item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label htmlFor="transactionType">Transaction Type *</label>
        <select
          id="transactionType"
          name="transactionType"
          value={form.transactionType}
          onChange={handleChange}
        >
          <option value="LEND">Lend to someone</option>
          <option value="BORROW">Borrow from someone</option>
        </select>

        <label htmlFor="personName">Person Name *</label>
        <input
          id="personName"
          name="personName"
          value={form.personName}
          onChange={handleChange}
          placeholder="Enter person's name"
          required
        />

        <label htmlFor="transactionDate">Transaction Date *</label>
        <input
          id="transactionDate"
          name="transactionDate"
          type="date"
          value={form.transactionDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="dueDate">Expected Return Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Optional notes"
        />

        <button type="submit">Save Transaction</button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <section>
        <h2>Transaction History</h2>

        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions recorded yet.</p>
        ) : (
          <div style={styles.list}>
            {transactions.map((transaction) => {
              const item = items.find(
                (entry) => entry.id === transaction.itemId
              );

              return (
                <article key={transaction.id} style={styles.card}>
                  <h3>{item?.name || `Item #${transaction.itemId}`}</h3>
                  <p>
                    <strong>Type:</strong> {transaction.transactionType}
                  </p>
                  <p>
                    <strong>Person:</strong> {transaction.personName}
                  </p>
                  <p>
                    <strong>Date:</strong> {transaction.transactionDate}
                  </p>
                  <p>
                    <strong>Due:</strong>{" "}
                    {transaction.dueDate || "Not specified"}
                  </p>
                  <p>
                    <strong>Status:</strong> {transaction.status}
                  </p>
                  {transaction.notes && (
                    <p>Notes: {transaction.notes}</p>
                  )}
                </article>
              );
            })}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "15px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  success: { color: "green" },
  error: { color: "red" },
};
