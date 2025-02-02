import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Header from './components/Header'; 
import NavBar from './components/NavBar';
import Home from "./pages/MainPage.jsx";
import TestGame from "./pages/game/TestGame.jsx";
import Username from "./pages/UserName.jsx";
import SuddenDeath from "./pages/SuddenDeath.jsx";

const [recordData, setRecordData] = useState<record>({
  username: '',
  numberOfGamesPlayed: 0
});

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
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}