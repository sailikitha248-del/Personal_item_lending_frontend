
import { useState } from "react";

function LendBorrow({
  items,
  records,
  setRecords,
  setReturns,
}) {
  const [type, setType] = useState("");
  const [itemName, setItemName] = useState("");
  const [personName, setPersonName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newRecord = {
      id: Date.now(),
      type: type === "lend" ? "Lend" : "Borrow",
      itemName: itemName.trim(),
      personName: personName.trim(),
      transactionDate,
      expectedReturnDate,
    };

    setRecords((previousRecords) => [
      ...previousRecords,
      newRecord,
    ]);

    setType("");
    setItemName("");
    setPersonName("");
    setTransactionDate("");
    setExpectedReturnDate("");

    alert("Lending / borrowing record saved successfully!");
  }

  function deleteRecord(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) return;

    setRecords((previousRecords) =>
      previousRecords.filter(
        (record) => String(record.id) !== String(id)
      )
    );

    // Remove return history associated with this record.
    if (setReturns) {
      setReturns((previousReturns) =>
        previousReturns.filter(
          (item) => String(item.recordId) !== String(id)
        )
      );
    }
  }

  return (
    <div>
      <h1>🤝 Lend / Borrow</h1>
      <p className="welcome">
        Record items that you lend to others or borrow from them.
      </p>

      <div className="section">
        <h2>New Lending or Borrowing Record</h2>

        <form onSubmit={handleSubmit}>
          <label>Transaction Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="lend">Lend an Item</option>
            <option value="borrow">Borrow an Item</option>
          </select>

          <label>Item Name</label>
          {items.length > 0 ? (
            <select
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an item
              </option>
              {items.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Add an item on the Items page first"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          )}

          <label>Person's Name</label>
          <input
            type="text"
            placeholder="Enter person's name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            required
          />

          <label>Transaction Date</label>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />

          <label>Expected Return Date</label>
          <input
            type="date"
            value={expectedReturnDate}
            min={transactionDate || undefined}
            onChange={(e) => setExpectedReturnDate(e.target.value)}
          />

          <button type="submit">Save Record</button>
        </form>
      </div>

      <div className="section">
        <h2>Transaction History ({records.length})</h2>

        {records.length === 0 ? (
          <p>No lending or borrowing records yet.</p>
        ) : (
          records.map((record) => (
            <div className="card" key={record.id}>
              <h3>
                {record.type === "Lend" ? "📤 Lent" : "📥 Borrowed"}:{" "}
                {record.itemName}
              </h3>

              <p>
                <strong>Person:</strong> {record.personName}
              </p>

              <p>
                <strong>Transaction Date:</strong>{" "}
                {record.transactionDate}
              </p>

              <p>
                <strong>Expected Return:</strong>{" "}
                {record.expectedReturnDate || "Not specified"}
              </p>

              <button
                type="button"
                onClick={() => deleteRecord(record.id)}
              >
                🗑️ Delete Record
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LendBorrow;
