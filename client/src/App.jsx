import { useState, useEffect } from "react";

import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  const [userInfo, setUserInfo] =
    useState(() => {
      const savedUser =
        localStorage.getItem(
          "userInfo"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    });

  const addToCart = (product) => {
    const existItem = cart.find(
      (x) => x._id === product._id
    );

    if (existItem) {
      setCart(
        cart.map((x) =>
          x._id === product._id
            ? {
                ...x,
                qty: x.qty + 1,
              }
            : x
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem(
      "userInfo"
    );

    setUserInfo(null);
  };

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <h2 className="logo">
            ElectroHub
          </h2>

          <div className="nav-links">
            <Link to="/">Home</Link>

            <Link to="/cart">
              Cart ({cart.length})
            </Link>

            {!userInfo && (
              <>
                <Link to="/login">
                  Login
                </Link>

                <Link to="/register">
                  Register
                </Link>
              </>
            )}

            {userInfo && (
              <button
                className="btn"
                onClick={
                  logoutHandler
                }
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                setCart={setCart}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductPage
                addToCart={addToCart}
              />
            }
          />
        </Routes>


        <footer className="footer">
              <h3>ElectroHub</h3>

              <p>
                Your trusted destination for
                premium electronics &
                gadgets.
              </p>

              <p>
                © 2026 ElectroHub. All
                rights reserved.
              </p>
            </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;