import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
//AI Stuff
//import { TextGenerationProvider } from 'frontend\src\components\TextGenerationContext.jsx'; //Import into any file we need to generate text
//import TextField from 'frontend\src\components\TextField.jsx'; //Will have to replace into wtv component we will be using

import Header from './components/Header'; 
import NavBar from './components/NavBar';
import Home from "./pages/MainPage.jsx";
import TestGame from "./pages/games/TestGame";
import Username from "./pages/UserName.jsx";
import { TextGenerationProvider } from "./components/TextGenerationContext.jsx";
import SuddenDeath from "./pages/games/SuddenDeath.jsx";
import StandOff from "./pages/games/StandOff.jsx";
import MinigameRush from "./pages/MinigameRush.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";


const Layout = () => {
  return (
    <div>
    <TextGenerationProvider>

      <Header />
      <NavBar />
      <Outlet />
    </TextGenerationProvider>
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
        path : "testGame", 
        element : <TestGame />
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
      },
      {
        path: "minigameRush",
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