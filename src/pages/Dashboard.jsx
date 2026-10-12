import { useEffect, useState } from "react";

const DASHBOARD_API = "http://localhost:8080/api/dashboard";
const TRANSACTIONS_API = "http://localhost:8080/api/transactions";

function Dashboard({ items = [], records = [], returns = [] }) {
  const [stats, setStats] = useState({
    totalItems: 0,
    activeTransactions: 0,
    returnedTransactions: 0,
    overdueTransactions: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError("");

        const [dashboardResponse, transactionsResponse, itemsResponse] =
          await Promise.all([
            fetch(DASHBOARD_API),
            fetch(TRANSACTIONS_API),
            fetch("http://localhost:8080/api/items"),
          ]);

        if (
          !dashboardResponse.ok ||
          !transactionsResponse.ok ||
          !itemsResponse.ok
        ) {
          throw new Error("Failed to load dashboard data.");
        }

        const dashboardData = await dashboardResponse.json();
        const transactionData = await transactionsResponse.json();
        const itemsData = await itemsResponse.json();

        setStats(dashboardData);
        setTransactions(transactionData);
        setItemList(itemsData);
      } catch (err) {
        setError(
          err.message || "Unable to connect to the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [items, records, returns]);

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
              <p>{stats.totalItems ?? 0}</p>
            </div>

            <div className="card">
              <h3>🔄 Active Transactions</h3>
              <p>{stats.activeTransactions ?? 0}</p>
            </div>

            <div className="card">
              <h3>✅ Returned Items</h3>
              <p>{stats.returnedTransactions ?? 0}</p>
            </div>

            <div className="card">
              <h3>⚠️ Overdue Transactions</h3>
              <p>{stats.overdueTransactions ?? 0}</p>
            </div>
          </div>

          <div className="section">
            <h2>📅 Items Not Yet Returned</h2>

            {pendingReturns.length === 0 ? (
              <div className="empty">
                All items have been returned.
              </div>
            ) : (
              pendingReturns.map((transaction) => {
                const item = itemList.find(
                  (entry) => entry.id === transaction.itemId
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
                    <h3>📦 {item?.name ?? `Item #${transaction.itemId}`}</h3>

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