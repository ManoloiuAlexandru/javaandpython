import { useCart } from "./CartContext";

function Cart() {
  const { cart, total, removeFromCart, clearCart } = useCart();

  const createOrder = async () => {
    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    const order = {
      status: "NEW",
      total: Number(total.toFixed(2)),
      books: cart.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity,
        price: item.book.price
      }))
    };

    try {
      const res = await fetch("http://localhost:5002/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ✅ REQUIRED for Spring Security session
        body: JSON.stringify(order)
      });

      if (res.status === 401 || res.status === 403) {
        alert("You must be logged in to place an order");
        return;
      }

      if (!res.ok) {
        throw new Error("Order failed");
      }

      clearCart();
      alert("✅ Order created successfully");

    } catch (err) {
      console.error("Create order error:", err);
      alert("❌ Failed to create order");
    }
  };

  if (!cart.length) {
    return <h2>🛒 Cart is empty</h2>;
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🛒 Cart</h1>

      {cart.map(item => (
        <div key={item.book.id} style={{ marginBottom: "15px" }}>
          <h3>{item.book.title}</h3>
          <p>
            {item.quantity} × {item.book.price} € =
            {(item.quantity * item.book.price).toFixed(2)} €
          </p>
          <button onClick={() => removeFromCart(item.book.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: {total.toFixed(2)} €</h2>

      <button onClick={createOrder}>
        ✅ Create Order
      </button>
    </div>
  );
}

export default Cart;