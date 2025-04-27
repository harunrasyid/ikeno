import { Routes, Route } from "react-router";
import { DrawPage, PondPage } from "@/modules";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PondPage />}>
        <Route path="pond" element={<PondPage />} />
      </Route>
      <Route path="/draw" element={<DrawPage />} />
    </Routes>
  );
}

export default App;
