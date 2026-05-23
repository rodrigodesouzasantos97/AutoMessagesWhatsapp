import Contacts from "./routes/Contacts";
import Campaigns from "./routes/Campaigns";
import Flows from "./routes/Flows";
import Navbar from "./components/Navbar";

import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
