import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Header from './components/Header'; 
import NavBar from './components/NavBar';
import Home from "./pages/MainPage.jsx";
import RattleOff from "./pages/games/RattleOff";
import Username from "./pages/UserName.jsx";
import SuddenDeath from "./pages/games/SuddenDeath.jsx";
import StandOff from "./pages/games/StandOff.jsx";
import MinigameRush from "./pages/MinigameRush.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";


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
        path : "RattleOff", 
        element : <RattleOff />
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
        path: "Standoff",
        element: <StandOff />,
      },
      {
        path: "MinigameRush",
        element: <MinigameRush />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}