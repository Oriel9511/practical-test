import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { AppProvider } from './providers/AppContext.tsx';
import App from './App.tsx';
import {Tasks} from "./Tasks/pages/tasks.tsx";
import {TaskDetails} from "./Tasks/pages/taskDetails.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <h1>About</h1>,
      },
      {
        index: true,
        element: <Tasks/>,
      },
      {
        path: '/task/:id',
        element: <TaskDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
  </React.StrictMode>
);
