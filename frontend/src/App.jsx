import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import React Router
import Home from "./pages/MainPage";
import Game from "./pages/Game";

const router = createBrowserRouter([

  {path : "/Home", element : <Home />},
  {path : "/Game", element : <Game />},
  //Add all webpage paths
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
