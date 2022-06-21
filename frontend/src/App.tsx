import "./App.css";
import { StartGame } from "./pages/StartGame";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
