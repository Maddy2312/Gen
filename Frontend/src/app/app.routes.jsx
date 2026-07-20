import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";

export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
]);
