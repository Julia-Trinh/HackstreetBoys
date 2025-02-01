import React from 'react'
import '@mantine/core/styles.css';
import { createTheme } from '@mantine/core'
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

const theme = createTheme({
  colors: {
    'hsb-orange': [
      '#ccd5ae',
      '#b8c09d',
      '#a3aa8b',
      '#8f957a',
      '#7a8068',
      '#666b57',
      '#525546',
      '#3d4034',
      '#292b23',
      '#141511',
    ],
  },
  primaryColor: 'hsb-orange',
  primaryShade: 1,
});

  );
}