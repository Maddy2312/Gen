import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/groups/seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/groups/seller/SellerDashboard.jsx";
import CreateProductVariant from "../features/products/pages/groups/seller/CreateProductVariant.jsx";
import SellerProductById from "../features/products/pages/groups/seller/sellerProductById.jsx";
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller/create-product",
    element: <CreateProduct />,
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/dashboard/:id/create-variant",
    element: <CreateProductVariant />,
  },
  {
    path: "/seller/dashboard/:id",
    element: <SellerProductById />,
  }
]);
