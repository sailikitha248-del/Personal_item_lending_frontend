
function Reminders({ records, returns }) {
  // Use today's local calendar date in YYYY-MM-DD format.
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const activeRecords = records.filter(
    (record) =>
      !returns.some(
        (item) => String(item.recordId) === String(record.id)
      )
  );

  const upcomingReturns = activeRecords.filter((record) => {
    if (!record.expectedReturnDate) return false;

    return record.expectedReturnDate >= todayString;
  });

  const overdueItems = activeRecords.filter((record) => {
    if (!record.expectedReturnDate) return false;

    return record.expectedReturnDate < todayString;
  });

  return (
    <div>
      <h1>🔔 Reminders</h1>
      <p className="welcome">
        Keep track of upcoming and overdue return dates.
      </p>

      <div className="section">
        <h2>📅 Upcoming Returns ({upcomingReturns.length})</h2>

        {upcomingReturns.length === 0 ? (
          <p>No upcoming return reminders.</p>
        ) : (
          upcomingReturns.map((record) => (
            <div className="card" key={record.id}>
              <h3>📦 {record.itemName}</h3>
              <p><strong>Person:</strong> {record.personName}</p>
              <p>
                <strong>Expected Return:</strong>{" "}
                {record.expectedReturnDate}
              </p>
              <p><strong>Type:</strong> {record.type}</p>
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
              <h3>⚠️ {record.itemName}</h3>
              <p><strong>Person:</strong> {record.personName}</p>
              <p>
                <strong>Was Due:</strong>{" "}
                {record.expectedReturnDate}
              </p>
              <p><strong>Type:</strong> {record.type}</p>
              <p>Please follow up on this return.</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reminders;
