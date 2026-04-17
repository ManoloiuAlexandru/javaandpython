import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const API_URL = "http://localhost:5002";
  const navigate = useNavigate();

  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountLimit, setAccountLimit] = useState("");
  const [message, setMessage] = useState("");

  // ✅ protect the page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      bankAccount: {
        iban: iban,
        amount: parseFloat(amount),
        bankName: bankName,
        accountLimit: parseFloat(accountLimit)
      }
    };

    try {
      const res = await fetch(`${API_URL}/add_bank_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}
        },
        body: JSON.stringify(requestBody)
      });

      const text = await res.text();
      setMessage(text);

      setIban("");
      setAmount("");
      setBankName("");
      setAccountLimit("");
    } catch (err) {
      console.error("ERROR:", err);
      setMessage("Failed to add bank account");
    }
  };

  /* ===== Styles (same pattern as AddBook) ===== */

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

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>🏦 Dashboard</h2>

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

        {message && (
          <p style={{ textAlign: "center" }}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Dashboard;
