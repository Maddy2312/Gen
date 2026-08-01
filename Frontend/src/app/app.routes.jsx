import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/groups/seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/groups/seller/SellerDashboard.jsx";
import CreateProductVariant from "../features/products/pages/groups/seller/CreateProductVariant.jsx";
import SellerProductById from "../features/products/pages/groups/seller/sellerProductById.jsx";
import Home from "../features/products/pages/groups/user/Home.jsx";
import ProductById from "../features/products/pages/groups/user/ProductById.jsx";
import AppLayout from "./AppLayout.jsx";
import Protected from "../features/products/pages/groups/Protected/Protected.jsx";
export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductById />,
      },
    ],
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: (
          <Protected role="seller">
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/seller/dashboard",
        element: (
          <Protected role="seller">
            <SellerDashboard />
          </Protected>
        ),
      },
      {
        path: "/seller/dashboard/:id/create-variant",
        element: (
          <Protected role="seller">
            <CreateProductVariant />
          </Protected>
        ),
      },
      {
        path: "/seller/dashboard/:id",
        element: (
          <Protected role="seller">
            <SellerProductById />
          </Protected>
        ),
      },
    ],
  },
]);
