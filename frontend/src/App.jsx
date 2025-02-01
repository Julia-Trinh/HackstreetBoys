import React from 'react'
import Home from "./pages/MainPage";
import NavBar from './components/NavBar'

const router = createBrowserRouter([
  //any page that has the layout with the header will be a child of the root
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "home",
        element: <Home />,
      }
    ]
  },
]);
