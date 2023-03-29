import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
      { path: "/product/add", element: <AddProduct /> },
      { path: "/product/detail/:productId", element: <ProductDetail /> },
    ],
  },
]);

function App() {
  <RouterProvider router={router} />;
}

export default App;
