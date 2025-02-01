import React from 'react'
import Home from "./pages/MainPage";

const router = createBrowserRouter([
  {path : "/Home", element : <Home />},
  //Add all webpage paths
]);

export default function App() {

  return (
      <GlobalStateProvider>
          <RouterProvider router={router}></RouterProvider>
      </GlobalStateProvider>


  );
}
