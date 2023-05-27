import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom'

function ProtectedRoute({admin}) {
    const loggedIn = true;
    const user = {role:"Admin"}
    if(admin && user == null) return <Navigate to="/login"/>
    if(admin && !(user.role == "Admin")) return <Navigate to="/"/>
    return loggedIn ? <Outlet/> : <Navigate to="/login"/>;
}

export default ProtectedRoute