import App from "@/App";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import FilmPage from "@/pages/film/FilmPage";
import RegisterPage from "@/pages/register/RegisterPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import PosterPage from "@/pages/film/PosterPage";
import Tickets from "@/pages/film/Tickets";
<<<<<<< HEAD
<<<<<<< HEAD
import AdminPage from "@/pages/admin/AdminPage";
import ChangePasswordPage from "@/pages/changepasswordpage/changepassword";
import ProfilePage from "@/pages/profile/ProfilePage";
=======
>>>>>>> 920c5f6ebefdcfb1274a234f5ea99bfa9746d5a3
=======
>>>>>>> e34e72f91523afd032276db66ccd3c28d4cb8d01

const guestRoutes: RouteObject[] = [
  {
    element: <RegisterPage />,
    path: "/register",
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
];

const protectedRoutes: RouteObject[] = [
  {
<<<<<<< HEAD
<<<<<<< HEAD
  element: <ProtectedRoute element={<ProfilePage />} />,
  path: "/profile",
},
  {
=======
>>>>>>> 920c5f6ebefdcfb1274a234f5ea99bfa9746d5a3
=======
>>>>>>> e34e72f91523afd032276db66ccd3c28d4cb8d01
    element: <ProtectedRoute element={<Home />} />,
    path: "/",
  },
  {
    element: <ProtectedRoute element={<FilmPage />} />,
    path: "/films/:id",
  },
  {
    element: <ProtectedRoute element={<PosterPage />} />,
    path: "/films",
  },
  {
    element: <ProtectedRoute element={<Tickets />} />,
    path: "/bookings",
  },
<<<<<<< HEAD
<<<<<<< HEAD
  {
    element: <ProtectedRoute element={<AdminPage />} />,
    path: "/admin",
  },
  {
    element: <ProtectedRoute element={<ChangePasswordPage />} />,
    path: "/change-password",
  },
=======
  
>>>>>>> 920c5f6ebefdcfb1274a234f5ea99bfa9746d5a3
=======
  
>>>>>>> e34e72f91523afd032276db66ccd3c28d4cb8d01
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...guestRoutes, ...protectedRoutes],
  },
];

export const router = createBrowserRouter(routes);