import React, { useState, useEffect } from "react";
import axios from "axios";
import ReceiptModal from "./ReceiptModal"; 
import "./order.css";

function OrderPage() {
  const [selectedPCs, setSelectedPCs] = useState(
    JSON.parse(localStorage.getItem("selectedPCs")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes
  const [timerId, setTimerId] = useState(null);
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // format YYYY-MM-DD

const getMinTime = (selectedDate) => {
  if (selectedDate === todayStr) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return "00:00";
};

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = selectedPCs.reduce((acc, pc) => {
        const duration = pc.duration || 2;
        return acc + pc.price * duration;
      }, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [selectedPCs]);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handlePaymentTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerId(timer);
      return () => clearInterval(timer);
    }
  }, [isModalOpen]);

  const handleDateChange = (index, date) => {
    const updated = [...selectedPCs];
    updated[index].startDate = date;
    setSelectedPCs(updated);
  };

  const handleTimeChange = (index, time) => {
    const updated = [...selectedPCs];
    updated[index].startTime = time;
    setSelectedPCs(updated);
  };

  const handleDurationChange = (index, duration) => {
    const updated = [...selectedPCs];
    updated[index].duration = parseInt(duration, 10);
    setSelectedPCs(updated);
  };

  const handleOrderSubmit = async () => {
    const isValid = selectedPCs.every(
      (pc) => pc.startDate && pc.startTime && pc.duration >= 1
    );

    if (!isValid) {
      setErrorMessage("Isi tanggal, waktu, dan durasi minimal 1 jam.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrorMessage("Pengguna tidak ditemukan. Harap login.");
      return;
    }

  const bookings = selectedPCs.map((pc) => {
    const fullStartTime = new Date(`${pc.startDate}T${pc.startTime}:00`).toISOString();
    return {
      pc_id: pc.id,
      type: pc.type, 
      hours: pc.duration,
      price: pc.price * pc.duration,
      startTime: fullStartTime,
    };
  });


    try {
      const response = await axios.post("https://backend-rpic-production.up.railway.app/api/booking", {
        userId,
        selectedPCs: bookings,
        totalPrice,
      });

      // Ganti bagian ini setelah sukses booking:
if (response.status === 201) {
  setErrorMessage("");
  localStorage.setItem("bookingIds", JSON.stringify(response.data.bookingIds)); // simpan semua ID
  setIsModalOpen(true);
  setRemainingTime(300);
}
 else {
        setErrorMessage("Gagal memesan. Coba lagi.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handlePaymentTimeout = () => {
    alert("Waktu pembayaran habis. Pemesanan dibatalkan.");
    setIsModalOpen(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="order-container">
      <h1>Halaman Pemesanan</h1>
      <div className="order-content">
        <div className="order-list">
       {selectedPCs.map((pc, index) => {
  // Tentukan URL gambar background sesuai tipe
const bgUrl = `/img/imgOrderPage/${pc.type.toLowerCase()}.png`;

  return (
    <div
      key={index}
      className="order-item"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        color: "white" // supaya teks jelas, sesuaikan sesuai background
      }}
    >
      <div className="order-details">
        <h2>{`${pc.type} - ${pc.pc_number}`}</h2>
        <p>Harga per jam: Rp. {pc.price.toLocaleString()}</p>

        <label>Tanggal Mulai:</label>
        <input
        type="date"
        value={pc.startDate || ""}
        min={todayStr}
        onChange={(e) => handleDateChange(index, e.target.value)}
      />

      <input
        type="time"
        value={pc.startTime || ""}
        min={getMinTime(pc.startDate || todayStr)}
        onChange={(e) => handleTimeChange(index, e.target.value)}
      />


        <label>Durasi (jam):</label>
        <input
          type="number"
          min="1"
          value={pc.duration || 1}
          onChange={(e) => handleDurationChange(index, e.target.value)}
        />
      </div>
    </div>
  );
})}

        </div>

        <div className="order-summary">
          <h2>Ringkasan Pemesanan</h2>
          <p>Total Harga: Rp. {totalPrice.toLocaleString()}</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleOrderSubmit} className="submit-order-btn" style={{backgroundColor:'#640EF1'}}>
            Konfirmasi Pesanan
          </button>
        </div>
      </div>

     {isModalOpen && (
  <ReceiptModal
    totalPrice={totalPrice}
    remainingTime={remainingTime}
    onClose={() => setIsModalOpen(false)}
    selectedPCs={selectedPCs}
  />
)}

    </div>
  );
}

export default OrderPage;
