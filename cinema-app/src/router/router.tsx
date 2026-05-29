import App from "@/App";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import FilmPage from "@/pages/film/FilmPage";
import RegisterPage from "@/pages/register/RegisterPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import PosterPage from "@/pages/film/PosterPage";
import Tickets from "@/pages/film/Tickets";
import AdminPage from "@/pages/admin/AdminPage";
import ChangePasswordPage from "@/pages/changepasswordpage/changepassword";
import ProfilePage from "@/pages/profile/ProfilePage";

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
  element: <ProtectedRoute element={<ProfilePage />} />,
  path: "/profile",
},
  {
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
  {
    element: <ProtectedRoute element={<AdminPage />} />,
    path: "/admin",
  },
  {
    element: <ProtectedRoute element={<ChangePasswordPage />} />,
    path: "/change-password",
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...guestRoutes, ...protectedRoutes],
  },
];

export const router = createBrowserRouter(routes);