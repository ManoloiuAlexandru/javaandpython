import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/dashboardStyles"; // adjust path if needed

function Dashboard() {
  const API_URL = "http://localhost:5002";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bankAccounts, setBankAccounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cardsByIban, setCardsByIban] = useState({});
  const [openIbans, setOpenIbans] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [message, setMessage] = useState("");
  const [myCards, setMyCards] = useState([]);
  const [selectedCardPerOrder, setSelectedCardPerOrder] = useState({});

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedIban, setSelectedIban] = useState(null);

  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountLimit, setAccountLimit] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");

  const loadMyCards = async () => {
    const res = await fetch(`${API_URL}/get_cards_of_user`, {
      method: "POST", // 👈 IMPORTANT
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("MY CARDS:", data);
    setMyCards(data);
  };
  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  /* ---------------- LOAD BANK ACCOUNTS ---------------- */
  const loadAccounts = async () => {
    const res = await fetch(`${API_URL}/get_bank_accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setBankAccounts(await res.json());
  };

  const loadOrders = async () => {
    const res = await fetch(`${API_URL}/get_client_order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("ORDERS:", data);
    setOrders(data);
  };
  /* ---------------- LOAD / TOGGLE CARDS ---------------- */
  const loadCardsOfBank = async (iban) => {
    if (openIbans.has(iban)) {
      const next = new Set(openIbans);
      next.delete(iban);
      setOpenIbans(next);
      return;
    }

    if (!cardsByIban[iban]) {
      const res = await fetch(`${API_URL}/get_cards_of_bank_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ iban }),
      });

      const cards = await res.json();

      setCardsByIban((prev) => ({
        ...prev,
        [iban]: cards,
      }));
    }

    setOpenIbans((prev) => new Set(prev).add(iban));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadAccounts();
    loadOrders();
    loadMyCards();
  }, []);

  const handlePay = async (orderId) => {
    const cardId = selectedCardPerOrder[orderId];

    if (!cardId) {
      setMessage("❌ Select a card first");
      return;
    }

    const res = await fetch(`${API_URL}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId: orderId,
        cardId: cardId,
      }),
    });

    const text = await res.text();
    console.log("PAY RESPONSE:", text);

    setMessage(text);

    loadOrders(); // refresh orders after pay
  };
  /* ---------------- ADD BANK ACCOUNT ---------------- */
  const handleAddAccount = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/add_bank_account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bankAccount: {
          iban,
          amount: Number(amount),
          bankName,
          accountLimit: Number(accountLimit),
        },
      }),
    });

    setShowAccountModal(false);
    setMessage("✅ Bank account added");
    setIban("");
    setAmount("");
    setBankName("");
    setAccountLimit("");
    loadAccounts();
  };

  /* ---------------- ADD CARD ---------------- */
  const handleAddCard = async (e) => {
    e.preventDefault();

    const newCard = {
      cardNumber,
      type: cardType,
      name: cardName,
      cvv: Number(cvv),
    };

    await fetch(`${API_URL}/add_card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        card: newCard,
        token: selectedIban,
      }),
    });

    setCardsByIban((prev) => ({
      ...prev,
      [selectedIban]: [...(prev[selectedIban] || []), newCard],
    }));

    setShowCardModal(false);
    setSelectedIban(null);
    setMessage("✅ Card added");

    setCardNumber("");
    setCardType("");
    setCardName("");
    setCvv("");
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div style={styles.container}>
    {/* TOP BAR */}
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
      }}
    >
      <button
        style={{ ...styles.button, background: "#1976D2" }}
        onClick={handleGoHome}
      >
        ⬅ Home
      </button>
    </div>

    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
    >
      <button
        style={{ ...styles.button, background: "#e53935" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
      <h1 style={styles.title}>🏦 Dashboard</h1>

      <button
        style={styles.addAccountButton}
        onClick={() => setShowAccountModal(true)}
      >
        + Add Bank Account
      </button>

      <div style={styles.grid}>
        {bankAccounts.map((acc) => (
          <div key={acc.iban} style={styles.card}>
            <h3>{acc.bankName}</h3>
            <p><b>IBAN:</b> {acc.iban}</p>
            <p><b>Balance:</b> {acc.amount}</p>
            <p><b>Limit:</b> {acc.accountLimit}</p>

            <button
              style={{ ...styles.button, ...styles.buttonBlue }}
              onClick={() => loadCardsOfBank(acc.iban)}
            >
              {openIbans.has(acc.iban) ? "Hide Cards" : "View Cards"}
            </button>

            {openIbans.has(acc.iban) &&
              (cardsByIban[acc.iban] || []).map((card) => (
                <div
                  key={card.cardNumber}
                  style={styles.cardItem}
                  onMouseEnter={() => setHoveredCard(card.cardNumber)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  💳 {card.type} • {card.name}

                  {hoveredCard === card.cardNumber && (
                    <div style={styles.cardTooltip}>
                      <div><b>Number:</b> {card.cardNumber}</div>
                      <div><b>CVV:</b> {card.cvv}</div>
                    </div>
                  )}
                </div>
              ))}

            <button
              style={{ ...styles.button, ...styles.buttonPurple }}
              onClick={() => {
                setSelectedIban(acc.iban);
                setShowCardModal(true);
              }}
            >
              + Add Card
            </button>
          </div>
        ))}
      </div>
        <div style={{ marginTop: "40px" }}>
          <h2>🧾 My Orders</h2>

          <div style={styles.grid}>
            {orders.map((order) => (
              <div key={order.id} style={styles.card}>
                <h3>Order #{order.id}</h3>

                <p><b>Status:</b> {order.status}</p>
                <p><b>Total:</b> {order.total}</p>

                <p><b>Items:</b></p>
                <ul>
                  {(order.books || []).map((b, idx) => (
                    <li key={idx}>
                      {b.title || "Book"} - {b.price || ""}
                    </li>
                  ))}
                </ul>

                {/* 👇 CARD SELECT */}
                <select
                  style={{ ...styles.input, marginTop: "10px" }}
                  onChange={(e) =>
                    setSelectedCardPerOrder((prev) => ({
                      ...prev,
                      [order.id]: e.target.value,
                    }))
                  }
                >
                  <option value="">Select card</option>
                  {myCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name} ({card.type})
                    </option>
                  ))}
                </select>

                {/* 👇 PAY BUTTON */}
                <button
                  style={{ ...styles.button, marginTop: "10px", background: "#FF9800" }}
                  onClick={() => handlePay(order.id)}
                >
                  Pay
                </button>
              </div>
            ))}
          </div>
        </div>
      {message && <p style={styles.message}>{message}</p>}

      {showAccountModal && (
        <div style={styles.overlay} onClick={() => setShowAccountModal(false)}>
          <form
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddAccount}
          >
            <h3>Add Bank Account</h3>
            <input style={styles.input} placeholder="IBAN" value={iban} onChange={(e) => setIban(e.target.value)} required />
            <input style={styles.input} type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <input style={styles.input} placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
            <input style={styles.input} type="number" placeholder="Account Limit" value={accountLimit} onChange={(e) => setAccountLimit(e.target.value)} required />
            <button style={styles.button}>Save</button>
          </form>
        </div>
      )}

      {showCardModal && (
        <div style={styles.overlay} onClick={() => setShowCardModal(false)}>
          <form
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddCard}
          >
            <h3>Add Card</h3>
            <small>IBAN: {selectedIban}</small>
            <input style={styles.input} placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            <input style={styles.input} placeholder="Credit / Debit" value={cardType} onChange={(e) => setCardType(e.target.value)} required />
            <input style={styles.input} placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
            <input style={styles.input} type="number" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            <button style={styles.button}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;