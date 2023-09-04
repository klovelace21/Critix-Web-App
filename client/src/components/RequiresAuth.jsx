import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequiresAuth = () => {
  const { auth } = useAuth()
 

  return (
    auth?.username
      ? <Outlet />
      : <Navigate to="/"/>
  )
}

export default RequiresAuth