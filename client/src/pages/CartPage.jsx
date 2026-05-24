function CartPage({ cart, setCart }) {
  const removeFromCart = (
    productId
  ) => {
    const updatedCart =
      cart.filter(
        (item) =>
          item._id !== productId
      );

    setCart(updatedCart);
  };

  const increaseQty = (
    productId
  ) => {
    setCart(
      cart.map((item) =>
        item._id === productId
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (
    productId
  ) => {
    setCart(
      cart.map((item) =>
        item._id === productId
          ? {
              ...item,
              qty:
                item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      )
    );
  };

  const subtotal =
    cart.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  const tax = subtotal * 0.05;

  const shipping =
    subtotal > 50000 ? 0 : 499;

  const total =
    subtotal + tax + shipping;

  const checkoutHandler = () => {
    alert(
      "Order placed successfully!"
    );

    setCart([]);
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="card"
              key={item._id}
            >
              <h3>{item.name}</h3>

              <p>
                ₹ {item.price}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                }}
              >
                <button
                  className="btn"
                  onClick={() =>
                    decreaseQty(
                      item._id
                    )
                  }
                >
                  -
                </button>

                <span>
                  Qty:
                  {item.qty}
                </span>

                <button
                  className="btn"
                  onClick={() =>
                    increaseQty(
                      item._id
                    )
                  }
                >
                  +
                </button>
              </div>

              <h3>
                ₹
                {item.price *
                  item.qty}
              </h3>

              <button
                className="btn"
                onClick={() =>
                  removeFromCart(
                    item._id
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="summary">
            <h2>
              Order Summary
            </h2>

            <p>
              Subtotal: ₹
              {subtotal.toFixed(
                2
              )}
            </p>

            <p>
              Tax (5%): ₹
              {tax.toFixed(2)}
            </p>

            <p>
              Shipping: ₹
              {shipping}
            </p>

            <h2>
              Total: ₹
              {total.toFixed(2)}
            </h2>

            <button
              className="btn"
              onClick={
                checkoutHandler
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;