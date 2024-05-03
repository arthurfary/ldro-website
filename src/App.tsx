import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import BackendPage from "./pages/backEndPages/backend";
import Login from "./pages/login";
import supabase from "./config/supabaseClient"; // Import supabase
import { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    fetchSession(); // Fetch session on initial render
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route
            path="/login"
            element={<Login session={session} setSession={setSession} />} // Pass setSession to Login
          />
          <Route
            path="/backend"
            element={session ? <BackendPage /> : null} // Render BackendPage only if session exists
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
