import { useRecoilState } from "recoil";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Root from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authAtom } from "./recoil/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { adminUser, auth } from "./firebase/auth";

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
  const [user, setUser] = useRecoilState(authAtom);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const updatedUser = user ? await adminUser(user) : null;

      setUser(updatedUser);
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
