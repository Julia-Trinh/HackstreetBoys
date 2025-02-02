import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Header from './components/Header'; 
import NavBar from './components/NavBar';
import Home from "./pages/MainPage.jsx";
import Game from "./pages/TestGame";
import Username from "./pages/UserName.jsx";
import SuddenDeath from "./pages/SuddenDeath.jsx";
import StandOff from "./pages/StandOff.jsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />, 
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path : "game", 
        element : <Game />
      },
      {
        path: "username",
        element: <Username />,
      },
      {
        path: "Suddendeath",
        element: <SuddenDeath />,
      },
      {
        path: "standoff",
        element: <StandOff />,
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}