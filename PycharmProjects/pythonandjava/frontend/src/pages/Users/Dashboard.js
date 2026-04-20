import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const API_URL = "http://localhost:5002";
  const navigate = useNavigate();

  const [bankAccounts, setBankAccounts] = useState([]);

  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountLimit, setAccountLimit] = useState("");

  const [message, setMessage] = useState("");

  // 🔹 Card states
  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");

  const token = localStorage.getItem("token");

  const loadAccounts = async () => {
    try {
      const res = await fetch(`${API_URL}/get_bank_accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      const data = await res.json();
      setBankAccounts(data);
    } catch (err) {
      console.error(err);
      setBankAccounts([]);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadAccounts();
  }, [navigate]);

  // 🔹 Add bank account
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      bankAccount: {
        iban,
        amount: parseFloat(amount),
        bankName,
        accountLimit: parseFloat(accountLimit)
      }
    };

    try {
      const res = await fetch(`${API_URL}/add_bank_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      setMessage("Bank account added");

      setIban("");
      setAmount("");
      setBankName("");
      setAccountLimit("");

      await loadAccounts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add bank account");
    }
  };

  // 🔹 Add card
  const handleAddCard = async (e) => {
    e.preventDefault();

    const requestBody = {
      card: {
        cardNumber,
        type: cardType,
        name: cardName,
        cvv: parseInt(cvv)
      },
      token: selectedAccount
    };

    try {
      const res = await fetch(`${API_URL}/add_card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      setMessage("Card added successfully");

      setCardNumber("");
      setCardType("");
      setCardName("");
      setCvv("");
      setShowCardForm(false);

    } catch (err) {
      console.error(err);
      setMessage("Failed to add card");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial"
  };

  const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer"
  };

  if (!token) return null;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>🏦 Dashboard</h2>

        {/* 🔹 Bank Accounts List */}
        {bankAccounts.map((acc, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fafafa"
            }}
          >
            <p><b>IBAN:</b> {acc.iban}</p>
            <p><b>Bank:</b> {acc.bankName}</p>
            <p><b>Amount:</b> {acc.amount}</p>
            <p><b>Limit:</b> {acc.accountLimit}</p>

            <button
              style={{ ...buttonStyle, background: "#2196F3", marginTop: "10px" }}
              onClick={() => {
                setSelectedAccount(acc.iban);
                setShowCardForm(true);
              }}
            >
              Add Card
            </button>
          </div>
        ))}

        {/* 🔹 Add Card Form */}
        {showCardForm && (
          <form
            onSubmit={handleAddCard}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <h3>Add Card to {selectedAccount}</h3>

            <input
              style={inputStyle}
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="text"
              placeholder="Type (VISA / MASTERCARD)"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="text"
              placeholder="Name on Card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="number"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />

            <button type="submit" style={buttonStyle}>
              Save Card
            </button>
          </form>
        )}

        {/* 🔹 Add Bank Account */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="IBAN"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="number"
            placeholder="Account Limit"
            value={accountLimit}
            onChange={(e) => setAccountLimit(e.target.value)}
            required
          />

          <button type="submit" style={buttonStyle}>
            Add Bank Account
          </button>
        </form>

        {message && <p style={{ textAlign: "center" }}>{message}</p>}
      </div>
    </div>
  );
}

export default Dashboard;