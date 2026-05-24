import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductPage({ addToCart }) {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="card">
        <img
          src="https://via.placeholder.com/400"
          alt={product.name}
          className="product-image"
        />

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>
          ₹ {product.price}
        </h2>

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
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;