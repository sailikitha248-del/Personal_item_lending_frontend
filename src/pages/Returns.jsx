import { useEffect, useState } from "react";

const API_URL = "https://personal-item-lending-backend.onrender.com/api";

function Returns() {
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const [returnHistory, setReturnHistory] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [condition, setCondition] = useState("GOOD");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [transactionsResponse, returnsResponse, itemsResponse] =
        await Promise.all([
          fetch(`${API_URL}/transactions`),
          fetch(`${API_URL}/returns`),
          fetch(`${API_URL}/items`),
        ]);

      if (
        !transactionsResponse.ok ||
        !returnsResponse.ok ||
        !itemsResponse.ok
      ) {
        throw new Error("Could not load transactions or return history.");
      }

      const transactionsData = await transactionsResponse.json();
      const returnsData = await returnsResponse.json();
      const itemsData = await itemsResponse.json();

      setTransactions(transactionsData);
      setReturnHistory(returnsData);
      setItems(itemsData);
    } catch (err) {
      setError(err.message || "Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setReturnDate(getToday());
    loadData();
  }, []);

  const activeTransactions = transactions.filter(
    (transaction) => transaction.status === "ACTIVE"
  );

  function getItemName(transactionIdValue) {
    const transaction = transactions.find(
      (entry) => entry.id === transactionIdValue
    );

    const item = items.find(
      (entry) => entry.id === transaction?.itemId
    );

    return item?.name ?? `Item #${transaction?.itemId ?? ""}`;
  }

  function getPersonName(transactionIdValue) {
    const transaction = transactions.find(
      (entry) => entry.id === transactionIdValue
    );

    return transaction?.personName ?? "Not specified";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!transactionId) {
      setError("Please select an active transaction.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/returns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: Number(transactionId),
          returnDate,
          conditionOnReturn: condition,
          notes,
        }),
      });

      const responseText = await response.text();
      let result = {};

      try {
        result = JSON.parse(responseText);
      } catch {
        result = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            `Request failed: ${response.status}`
        );
      }

      alert("Return recorded successfully!");

      setTransactionId("");
      setReturnDate(getToday());
      setCondition("GOOD");
      setNotes("");

      await loadData();
    } catch (err) {
      setError(err.message || "Could not record the return.");
    }
  }

  return (
    <div>
      <h1>🔄 Returns</h1>
      <p className="welcome">
        Track items that have been returned.
      </p>

      <div className="section">
        <h2>Record a Return</h2>

        {loading && <p>Loading transactions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && (
          <form onSubmit={handleSubmit}>
            <label>Select Active Transaction</label>
            <select
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            >
              <option value="">Select an active transaction</option>

              {activeTransactions.map((transaction) => (
                <option key={transaction.id} value={String(transaction.id)}>
                  {getItemName(transaction.id)} — {transaction.personName} (
                  {transaction.transactionType}, ID: {transaction.id})
                </option>
              ))}
            </select>

            {activeTransactions.length === 0 && (
              <p>There are no active transactions to return.</p>
            )}

            <label>Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />

            <label>Condition on Return</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="GOOD">Good</option>
              <option value="DAMAGED">Damaged</option>
              <option value="NEEDS_REPAIR">Needs Repair</option>
            </select>

            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional return notes"
            />

            <button
              type="submit"
              disabled={activeTransactions.length === 0}
            >
              ✅ Record Return
            </button>
          </form>
        )}
      </div>

      <div className="section">
        <h2>Return History ({returnHistory.length})</h2>

        {!loading && returnHistory.length === 0 ? (
          <p>No returns recorded yet.</p>
        ) : (
          returnHistory.map((item) => (
            <div className="card" key={item.id}>
              <h3>✅ {getItemName(
                transactions.find(
                  (transaction) => transaction.id === item.transactionId
                )?.id
              )}</h3>

              <p>
                <strong>Returned By:</strong>{" "}
                {getPersonName(item.transactionId)}
              </p>

              <p>
                <strong>Return Date:</strong>{" "}
                {item.returnDate
                  ? String(item.returnDate).slice(0, 10)
                  : "Not specified"}
              </p>

              {item.conditionOnReturn && (
                <p>
                  <strong>Condition:</strong> {item.conditionOnReturn}
                </p>
              )}

              {item.notes && (
                <p>
                  <strong>Notes:</strong> {item.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Returns;
