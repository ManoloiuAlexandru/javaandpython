import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const API_URL = "http://localhost:5002";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bankAccounts, setBankAccounts] = useState([]);
  const [cardsByIban, setCardsByIban] = useState({});
  const [openIbans, setOpenIbans] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [message, setMessage] = useState("");

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
  }, []);

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

  /* ---------------- STYLES ---------------- */
  const containerStyle = {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg,#f5f7fa,#c3cfe2)",
  };

  const cardStyle = {
    background: "#fff",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#4CAF50",
    color: "#fff",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    width: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>🏦 Dashboard</h1>

      <button
        style={{ ...buttonStyle, margin: "20px auto", display: "block" }}
        onClick={() => setShowAccountModal(true)}
      >
        + Add Bank Account
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))",
          gap: "20px",
        }}
      >
        {bankAccounts.map((acc) => (
          <div key={acc.iban} style={cardStyle}>
            <h3>{acc.bankName}</h3>
            <p><b>IBAN:</b> {acc.iban}</p>
            <p><b>Balance:</b> {acc.amount}</p>
            <p><b>Limit:</b> {acc.accountLimit}</p>

            <button
              style={{ ...buttonStyle, background: "#2196F3", marginBottom: "10px" }}
              onClick={() => loadCardsOfBank(acc.iban)}
            >
              {openIbans.has(acc.iban) ? "Hide Cards" : "View Cards"}
            </button>

            {openIbans.has(acc.iban) &&
              (cardsByIban[acc.iban] || []).map((card) => (
                <div
                  key={card.cardNumber}
                  style={{
                    position: "relative",
                    marginTop: "6px",
                    padding: "8px",
                    background: "#f3f3f3",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredCard(card.cardNumber)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  💳 {card.type} • {card.name}

                  {hoveredCard === card.cardNumber && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        marginTop: "6px",
                        background: "#333",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        zIndex: 10,
                      }}
                    >
                      <div><b>Number:</b> {card.cardNumber}</div>
                      <div><b>CVV:</b> {card.cvv}</div>
                    </div>
                  )}
                </div>
              ))}

            <button
              style={{ ...buttonStyle, background: "#673AB7", marginTop: "12px" }}
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

      {message && <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>}

      {showAccountModal && (
        <div style={overlayStyle} onClick={() => setShowAccountModal(false)}>
          <form
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddAccount}
          >
            <h3>Add Bank Account</h3>
            <input style={inputStyle} placeholder="IBAN" value={iban} onChange={(e) => setIban(e.target.value)} required />
            <input style={inputStyle} type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <input style={inputStyle} placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
            <input style={inputStyle} type="number" placeholder="Account Limit" value={accountLimit} onChange={(e) => setAccountLimit(e.target.value)} required />
            <button style={buttonStyle}>Save</button>
          </form>
        </div>
      )}

      {showCardModal && (
        <div style={overlayStyle} onClick={() => setShowCardModal(false)}>
          <form
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddCard}
          >
            <h3>Add Card</h3>
            <small>IBAN: {selectedIban}</small>
            <input style={inputStyle} placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            <input style={inputStyle} placeholder="VISA / MASTERCARD" value={cardType} onChange={(e) => setCardType(e.target.value)} required />
            <input style={inputStyle} placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
            <input style={inputStyle} type="number" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            <button style={buttonStyle}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;