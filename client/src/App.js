import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Contact from './components/Contact'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />
  }, 
  {
    path: "/auth/register",
    element: <Register />
  },
  {
    path: "/contact",
    element: <Contact />
  }
])

function App() {

  const [token, setToken] = useState("token123")

  return (
    <div className="App">
      <h3>This is nav bar</h3>

      <RouterProvider router={router}/>

    </div>
  );
}

export default App;
