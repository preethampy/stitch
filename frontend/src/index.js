import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Home from './routes/Home';
import { Provider } from "react-redux";
import { Navigate } from "react-router-dom";
import store from "./app/store";
import Cart from './routes/Cart';
import Root from './components/Root';
import Orders from './routes/Orders';
import Success from './routes/Success';
import Favorites from './routes/Favorites';
import { createTheme, ThemeProvider } from '@mui/material';
import Project from './routes/Project';
import { redirect } from 'react-router-dom';

// 20.10.0
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
    {
      path: "login", 
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      )
    },
    {
      path: "signup", element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      )
    },
    {
      path: "shop", element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      )
    },
    {
      path: "cart",
      children: [
        {
          path: "", element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          )
        },
        {
          path: "success", element: (
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: "orders", element: (
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
      )
    },
    {
      path: "favorites", element: (
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>
      )
    },
    {
      path: "favorites", element: (
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>
      )
    },
    {
      path: "Project", element: (
        <PrivateRoute>
          <Project />
        </PrivateRoute>
      )
    },
])

function isAuthenticated() {
  const isAuthenticated = localStorage.getItem("jwt");
  if (isAuthenticated !== null) {
    return true;
  }
  else {
    return false;
  }
}

function Redirect(){
  return redirect("/login");
}

function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth == true ? <Root>{children}</Root> : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const auth = isAuthenticated();
  console.log(auth)
  return auth == true ? (
    <Navigate to="/shop" />
  ) : (
    children
  );
}

const theme = createTheme({
  palette: {
    mydark:{
      main:"#000000",
      sec:"#ffc107"
    }
  },
});
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
