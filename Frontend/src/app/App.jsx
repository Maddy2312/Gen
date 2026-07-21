import React from 'react'
import "./App.css"
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import useAuth from '../features/auth/hooks/useAuth.js'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const App = () => {
  const { handleGetUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    handleGetUser();
  }, []);
  console.log(user);
  return (
    <RouterProvider router={routes} />
  )
}

export default App