
import { useState } from "react";

function Items({ items, setItems }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      category: category.trim(),
      description: description.trim(),
    };

    setItems((previousItems) => [...previousItems, newItem]);

    setItemName("");
    setCategory("");
    setDescription("");

    alert("Item added successfully!");
  }

  function deleteItem(id) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  }

  return (
    <div>
      <h1>📦 My Items</h1>
      <p className="welcome">
        Add and manage the personal items you own.
      </p>

      <div className="section">
        <h2>Add New Item</h2>

        <form onSubmit={handleSubmit}>
          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />

          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Electronics, Stationery"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter item details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">➕ Add Item</button>
        </form>
      </div>

      <div className="section">
        <h2>All Items ({items.length})</h2>

        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div className="card" key={item.id}>
                <h3>📦 {item.name}</h3>
                <p><strong>Category:</strong> {item.category}</p>
                <p>
                  <strong>Description:</strong>{" "}
                  {item.description || "No description provided"}
                </p>
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                >
                  🗑️ Delete Item
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Items;
