import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./order.css";

const PaymentMethod = ({ id, name, icon, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`payment-method ${selected ? 'selected' : ''}`}
  >
    <div className="method-info">
      <img src={icon} alt={name} className="method-icon" />
      <span>{name}</span>
    </div>
    <div className={`radio-indicator ${selected ? 'selected' : ''}`} />
  </div>
);

function ReceiptModal({ totalPrice, remainingTime, onClose, selectedPCs }) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [bookingIds, setBookingIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bookingIds");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookingIds(parsed);
        } else {
          console.error("Data bookingIds bukan array.");
        }
      } catch (error) {
        console.error("Gagal parsing bookingIds dari localStorage", error);
      }
    }
  }, []);

  const paymentMethods = [
    { id: 'dana', name: 'Dana', icon: '/img/imgPayment/dana.png' },
    { id: 'gopay', name: 'Gopay', icon: '/img/imgPayment/gopay.png' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '/img/imgPayment/mandiri.png' },
    { id: 'bca', name: 'BCA Virtual Account', icon: '/img/imgPayment/bca.png' },
  ];

  const handleConfirmPurchase = async () => {
    if (!selectedMethod) {
      alert("Pilih metode pembayaran sebelum melanjutkan.");
      return;
    }

    if (!bookingIds || bookingIds.length === 0) {
      alert("Booking ID tidak ditemukan.");
      return;
    }

    setIsLoading(true);

    try {
      const requests = bookingIds.map((id) =>
        axios.put(
          `https://backend-rpic-production.up.railway.app/api/booking/bookings/${id}/payment`,
          { paymentStatus: "Confirmed", paymentMethod: selectedMethod },
          { headers: { 'Content-Type': 'application/json' } }
        )
      );

      await Promise.all(requests);

      localStorage.removeItem("bookingIds");
      localStorage.removeItem("selectedPCs");

      navigate('/homereservasi');
    } catch (error) {
      console.error("Error saat konfirmasi pembayaran:", error);
      alert("Terjadi kesalahan saat mengonfirmasi pembayaran.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds = 0) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const pcSummary = selectedPCs.reduce((acc, pc) => {
    acc[pc.type] = (acc[pc.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="modal open">
      <div className="modal-content" style={{backgroundColor:"#2C2D59"}}>
        <div className="modal-header">
          <h2 className="modal-title">Pembayaran</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="payment-methods">
          {paymentMethods.map(method => (
            <PaymentMethod
              key={method.id}
              {...method}
              selected={selectedMethod === method.id}
              onClick={() => setSelectedMethod(method.id)}
            />
          ))}
        </div>

        <div className="payment-summary">
          <h3 className="summary-title">Ringkasan pembayaran</h3>
          
          {Object.entries(pcSummary).map(([type, count]) => (
            <div className="summary-item" key={type}>
              <span>PC {type} {count}x</span>
            </div>
          ))}

          <div className="total-amount">
            <span>Total Tagihan</span>
            <span>Rp. {totalPrice.toLocaleString()}</span>
          </div>

          <div className="timer">
            <span style={{color:"red"}}>Waktu tersisa: {formatTime(remainingTime)}</span>
          </div>

          <button
            onClick={handleConfirmPurchase}
            className="pay-button"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Bayar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
