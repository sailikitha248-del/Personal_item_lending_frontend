import { useEffect, useState } from "react";

const TRANSACTIONS_API = "http://localhost:8080/api/transactions";
const ITEMS_API = "http://localhost:8080/api/items";

function Reminders() {
  const [records, setRecords] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTransactions() {
      try {
        const [transactionsResponse, itemsResponse] = await Promise.all([
          fetch(TRANSACTIONS_API),
          fetch(ITEMS_API),
        ]);

        if (!transactionsResponse.ok || !itemsResponse.ok) {
          throw new Error("Failed to load reminders.");
        }

        const transactions = await transactionsResponse.json();
        const itemsData = await itemsResponse.json();

        setRecords(
          transactions.filter((record) => record.status === "ACTIVE")
        );
        setItems(itemsData);
      } catch (err) {
        setError(err.message || "Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const upcomingReturns = records.filter((record) => {
    if (!record.dueDate) return false;
    return String(record.dueDate).slice(0, 10) >= todayString;
  });

  const overdueItems = records.filter((record) => {
    if (!record.dueDate) return false;
    return String(record.dueDate).slice(0, 10) < todayString;
  });

  function getItemName(record) {
    const item = items.find((entry) => entry.id === record.itemId);
    return item ? item.name : `Item #${record.itemId}`;
  }

  if (loading) {
    return (
      <div>
        <h1>🔔 Reminders</h1>
        <p>Loading reminders...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>🔔 Reminders</h1>
      <p className="welcome">
        Keep track of upcoming and overdue return dates.
      </p>

      {error && <p className="error">{error}</p>}

      <div className="section">
        <h2>📅 Upcoming Returns ({upcomingReturns.length})</h2>

        {upcomingReturns.length === 0 ? (
          <p>No upcoming return reminders.</p>
        ) : (
          upcomingReturns.map((record) => (
            <div className="card" key={record.id}>
              <h3>📦 {getItemName(record)}</h3>
              <p><strong>Person:</strong> {record.personName}</p>
              <p>
                <strong>Expected Return:</strong>{" "}
                {String(record.dueDate).slice(0, 10)}
              </p>
              <p><strong>Type:</strong> {record.transactionType}</p>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <h2>⚠️ Overdue Items ({overdueItems.length})</h2>

        {overdueItems.length === 0 ? (
          <p>No overdue items.</p>
        ) : (
          overdueItems.map((record) => (
            <div className="card" key={record.id}>
              <h3>⚠️ {getItemName(record)}</h3>
              <p><strong>Person:</strong> {record.personName}</p>
              <p>
                <strong>Was Due:</strong>{" "}
                {String(record.dueDate).slice(0, 10)}
              </p>
              <p><strong>Type:</strong> {record.transactionType}</p>
              <p>Please follow up on this return.</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reminders;