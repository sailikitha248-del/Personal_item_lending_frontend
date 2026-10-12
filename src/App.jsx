
import { useState, useEffect } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import LendBorrow from "./pages/LendBorrow";
import Returns from "./pages/Returns";
import Reminders from "./pages/Reminders";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Shared data for all pages
  const [items, setItems] = useState(() => {
  const saved = localStorage.getItem("lendingItems");
  return saved ? JSON.parse(saved) : [];
});

const [records, setRecords] = useState(() => {
  const saved = localStorage.getItem("lendingRecords");
  return saved ? JSON.parse(saved) : [];
});

const [returns, setReturns] = useState(() => {
  const saved = localStorage.getItem("lendingReturns");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
    localStorage.setItem("lendingItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("lendingRecords", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem("lendingReturns", JSON.stringify(returns));
  }, [returns]);


  const menu = [
    { name: "Dashboard", icon: "📊" },
    { name: "Items", icon: "📦" },
    { name: "Lend / Borrow", icon: "🤝" },
    { name: "Returns", icon: "🔄" },
    { name: "Reminders", icon: "🔔" },
  ];

  const pages = {
    Dashboard: (
      <Dashboard
        items={items}
        records={records}
        returns={returns}
      />
    ),

    Items: (
      <Items
        items={items}
        setItems={setItems}
      />
    ),

   "Lend / Borrow": (
  <LendBorrow
    items={items}
    records={records}
    setRecords={setRecords}
    setReturns={setReturns}
  />
),

    Returns: (
      <Returns
        records={records}
        setRecords={setRecords}
        returns={returns}
        setReturns={setReturns}
      />
    ),

    Reminders: (
      <Reminders
        records={records}
        returns={returns}
      />
    ),
  };

  return (
    <div className="app">
      <header className="header">
        <h2>Personal Item Lending</h2>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h3>🧭 Menu</h3>

          {menu.map((item) => (
            <button
              key={item.name}
              type="button"
              className={
                activePage === item.name ? "active" : ""
              }
              onClick={() => setActivePage(item.name)}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </aside>

       
<main className="main-content">
  {activePage === "Dashboard" && (
    <Dashboard
      key={activePage}
      items={items}
      records={records}
      returns={returns}
    />
  )}

  {activePage === "Items" && (
    <Items
      items={items}
      setItems={setItems}
    />
  )}

  {activePage === "Lend / Borrow" && (
    <LendBorrow
      items={items}
      records={records}
      setRecords={setRecords}
      setReturns={setReturns}
    />
  )}

  {activePage === "Returns" && (
    <Returns
      records={records}
      setRecords={setRecords}
      returns={returns}
      setReturns={setReturns}
    />
  )}

  {activePage === "Reminders" && (
    <Reminders
      records={records}
      returns={returns}
    />
  )}
</main>

      </div>
    </div>
  );
}

export default App;
