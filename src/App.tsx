import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./App.css";
import Game from "./components/Game/Game";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Game />
      </div>
    </DndProvider>
  );
}

export default App;
