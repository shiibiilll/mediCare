import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import Hero from "./pages/Hero.jsx";
import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Appointments from "./pages/Appointments.jsx";

const App = () => {
  function RequireAuth({ children }) {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) return null;
    if (!isSignedIn)
      return (
        <div
          className="min-h-screen font-mono flex items-center justify-center
         bg-linear-to-b from-emarald-50 via-green-50 to-emerald-100 px-4"
        >
          <div className="text-center">
            <p className="text-emerald-800 font-semibold text-lg sm:text-2xl mb-4 animate-fade-in">
              Please sign in to view this page
            </p>

            <div className="flex justify-center">
              <Link
                to="/"
                className="px-4 py-2 text-sm rounded-full bg-emerald-600 text-white
                shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all durartion-300
                ease-in-out animate-bounce-subtle"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      );
    return children;
  }

  return (
    <Routes>
      <Route path="/" element={<Hero />} />

      <Route
        path="/h"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />

      <Route
        path="/add"
        element={
          <RequireAuth>
            <Add />
          </RequireAuth>
        }
      />

      <Route
        path="/list"
        element={
          <RequireAuth>
            <List />
          </RequireAuth>
        }
      />

      <Route
      path="/appointments"
      element={
        <RequireAuth>
          <Appointments />
        </RequireAuth>
      } />
    </Routes>
  );
};

export default App;
