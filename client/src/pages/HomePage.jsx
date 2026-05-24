import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage({ addToCart }) {
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <div className="hero-section">
        <h1>
          Welcome to ElectroHub
        </h1>

        <p>
          Latest electronics, gadgets & accessories
        </p>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="products">
        {filteredProducts.map(
          (product) => (
            <div
              className="card"
              key={product._id}
            >
              <img
                src={
                  product.name ===
                  "iPhone 15"
                    ? "https://images.unsplash.com/photo-1695048133142-1a20484d2569"
                    : product.name ===
                      "Samsung Galaxy S24"
                    ? "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
                    : product.name ===
                      "MacBook Air M3"
                    ? "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                    : product.name ===
                      "Sony Headphones"
                    ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    : product.name ===
                      "Apple Watch"
                    ? "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6"
                    : product.name === "iPad Pro"
                    ? "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"

                    : product.name === "Dell XPS 15"
                    ? "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"

                    : product.name === "AirPods Pro"
                    ? "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434"

                    : "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
                }
                alt={product.name}
                className="product-image"
              />

              <Link
                to={`/product/${product._id}`}
                className="product-link"
              >
                <h3>{product.name}</h3>
              </Link>

              <p>
                {product.description}
              </p>

              <p className="price">
                ₹ {product.price}
              </p>

              <p>
                Stock:
                {product.countInStock}
              </p>

              <button
                className="btn"
                onClick={() =>
                  addToCart(product)
                }
              >
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default HomePage;