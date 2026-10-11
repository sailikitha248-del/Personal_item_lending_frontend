
function Dashboard({ items, records, returns }) {
  const lentItems = records.filter(
    (record) =>
      record.type === "Lend" &&
      !returns.some((item) => item.recordId === record.id)
  );

  const borrowedItems = records.filter(
    (record) =>
      record.type === "Borrow" &&
      !returns.some((item) => item.recordId === record.id)
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pendingReturns = records.filter(
    (record) =>
      !returns.some((item) => item.recordId === record.id)
  );

  return (
    <div>
      <h1>📊 Dashboard</h1>
      <p className="welcome">
        Manage your personal items, lending and returns.
      </p>

      <div className="cards">
        <div className="card">
          <h3>📦 Total Items</h3>
          <p>{items.length}</p>
        </div>

        <div className="card">
          <h3>📤 Lent Items</h3>
          <p>{lentItems.length}</p>
        </div>

        <div className="card">
          <h3>📥 Borrowed Items</h3>
          <p>{borrowedItems.length}</p>
        </div>

        <div className="card">
          <h3>✅ Returned Items</h3>
          <p>{returns.length}</p>
        </div>
      </div>

      <div className="section">
        <h2>📅 Items Not Yet Returned</h2>

        {pendingReturns.length === 0 ? (
          <div className="empty">All items have been returned.</div>
        ) : (
          pendingReturns.map((record) => {
            const dueDate = record.expectedReturnDate
              ? new Date(record.expectedReturnDate + "T00:00:00")
              : null;

            const isOverdue = dueDate && dueDate < today;

            return (
              <div className="card" key={record.id}>
                <h3>📦 {record.itemName}</h3>
                <p>
                  <strong>Person:</strong> {record.personName}
                </p>
                <p>
                  <strong>Expected Return:</strong>{" "}
                  {record.expectedReturnDate || "Not specified"}
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
    </div>
  );
}

export default Dashboard;
