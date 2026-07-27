import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({children, role=null}) => {
  const {isLoading, user} = useSelector((state) => state.auth)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  if (role && user.role !== role) {
    return <Navigate to="/" />
  }
  return children
}

export default Protected