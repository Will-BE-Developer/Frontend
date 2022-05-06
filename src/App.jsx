import { Outlet } from "react-router-dom";
import BaseLayOut from "./components/layout/BaseLayOut";

function App() {
  return (
    <BaseLayOut>
      <Outlet />
    </BaseLayOut>
  );
}

export default App;
