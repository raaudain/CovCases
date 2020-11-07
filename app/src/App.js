import HomePage from "./components/HomePage";
import './css/App.css';
import dotenv from "dotenv";

dotenv.config();

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
