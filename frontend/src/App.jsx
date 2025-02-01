import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import React Router
import '@mantine/core/styles.css';
import { createTheme } from '@mantine/core'
import Home from "./pages/MainPage";

const router = createBrowserRouter([
  { path: "/Home", element: <Home /> },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
