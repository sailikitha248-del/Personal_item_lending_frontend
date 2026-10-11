
import { useState } from "react";

function Returns({ records, returns, setReturns }) {
  const [recordId, setRecordId] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const activeRecords = records.filter(
    (record) =>
      !returns.some(
        (item) => String(item.recordId) === String(record.id)
      )
  );

  function handleSubmit(e) {
    e.preventDefault();

    const selectedRecord = activeRecords.find(
      (record) => String(record.id) === String(recordId)
    );

    if (!selectedRecord) {
      alert("Please select an active transaction.");
      return;
    }

    const newReturn = {
      id: Date.now(),
      recordId: selectedRecord.id,
      itemName: selectedRecord.itemName,
      returnedBy: selectedRecord.personName,
      returnDate,
    };

    setReturns((previousReturns) => [
      ...previousReturns,
      newReturn,
    ]);

    setRecordId("");
    setReturnDate("");

    alert("Return recorded successfully!");
  }

  return (
    <div>
      <h1>🔄 Returns</h1>
      <p className="welcome">
        Track items that have been returned.
      </p>

      <div className="section">
        <h2>Record a Return</h2>

        <form onSubmit={handleSubmit}>
          <label>Select Transaction</label>
          <select
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            required
          >
            <option value="">Select an active transaction</option>
            {activeRecords.map((record) => (
              <option key={record.id} value={String(record.id)}>
                {record.type} - {record.itemName} - {record.personName}
              </option>
            ))}
          </select>

          {activeRecords.length === 0 && (
            <p>There are no active transactions to return.</p>
          )}

          <label>Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={activeRecords.length === 0}
          >
            ✅ Record Return
          </button>
        </form>
      </div>

      <div className="section">
        <h2>Return History ({returns.length})</h2>

        {returns.length === 0 ? (
          <p>No returns recorded yet.</p>
        ) : (
          returns.map((item) => (
            <div className="card" key={item.id}>
              <h3>✅ {item.itemName}</h3>
              <p>
                <strong>Returned By:</strong> {item.returnedBy}
              </p>
              <p>
                <strong>Return Date:</strong> {item.returnDate}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Returns;
