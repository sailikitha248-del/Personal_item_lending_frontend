import { useEffect, useState } from "react";

const API = "https://personal-item-lending-backend.onrender.com/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalTransactions: 0,
    activeTransactions: 0,
    returnedTransactions: 0,
    overdueTransactions: 0,
    totalReturns: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError("");

        const response = await fetch(`${API}/dashboard`);
        if (!response.ok) {
          throw new Error(`Dashboard API error: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);

        const [transactionResponse, itemResponse] = await Promise.all([
          fetch(`${API}/transactions`),
          fetch(`${API}/items`),
        ]);

        if (transactionResponse.ok) {
          setTransactions(await transactionResponse.json());
        }

        if (itemResponse.ok) {
          setItemList(await itemResponse.json());
        }
      } catch (err) {
        setError(err.message || "Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pendingReturns = transactions.filter(
    (transaction) => transaction.status === "ACTIVE"
  );

  return (
    <div>
      <h1>📊 Dashboard</h1>
      <p className="welcome">
        Manage your personal items, lending and returns.
      </p>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading dashboard statistics...</p>
      ) : (
        <>
          <div className="cards">
            <div className="card">
              <h3>📦 Total Items</h3>
              <p>{stats.totalItems}</p>
            </div>

            <div className="card">
              <h3>🔄 Total Transactions</h3>
              <p>{stats.totalTransactions}</p>
            </div>

            <div className="card">
              <h3>📤 Active Transactions</h3>
              <p>{stats.activeTransactions}</p>
            </div>

            <div className="card">
              <h3>✅ Returned Transactions</h3>
              <p>{stats.returnedTransactions}</p>
            </div>

            <div className="card">
              <h3>⚠️ Overdue Transactions</h3>
              <p>{stats.overdueTransactions}</p>
            </div>

            <div className="card">
              <h3>↩️ Total Returns</h3>
              <p>{stats.totalReturns}</p>
            </div>
          </div>

          <div className="section">
            <h2>📅 Items Not Yet Returned</h2>

            {pendingReturns.length === 0 ? (
              <div className="empty">
                No active transactions.
              </div>
            ) : (
              pendingReturns.map((transaction) => {
                const item = itemList.find(
                  (entry) =>
                    String(entry.id) === String(transaction.itemId)
                );

                const dueDate = transaction.dueDate
                  ? new Date(
                      String(transaction.dueDate).slice(0, 10) +
                        "T00:00:00"
                    )
                  : null;

                const isOverdue = dueDate && dueDate < today;

                return (
                  <div className="card" key={transaction.id}>
                    <h3>
                      📦 {item?.name ?? `Item #${transaction.itemId}`}
                    </h3>
                    <p>
                      <strong>Person:</strong>{" "}
                      {transaction.personName}
                    </p>
                    <p>
                      <strong>Transaction Type:</strong>{" "}
                      {transaction.transactionType}
                    </p>
                    <p>
                      <strong>Expected Return:</strong>{" "}
                      {transaction.dueDate
                        ? String(transaction.dueDate).slice(0, 10)
                        : "Not specified"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {isOverdue
                        ? "⚠️ OVERDUE — NOT RETURNED"
                        : "⏳ NOT RETURNED"}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;