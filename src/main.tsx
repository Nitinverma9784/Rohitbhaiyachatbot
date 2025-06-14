import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from './Layout';
import About from './pages/About';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Contact from './pages/Contact';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, // No <Outlet />, so child routes won’t show!
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "chat", element: <Chat /> },
      { path: "contact", element: <Contact /> },
      
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
   
  </StrictMode>,
)
