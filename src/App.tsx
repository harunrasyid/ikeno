import { Routes, Route } from "react-router";
import { DrawPage, PondPage } from "@/modules";
import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/firebase";

function App() {
  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.error("Anonymous sign-in failed", error);
    });
  }, []);

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
