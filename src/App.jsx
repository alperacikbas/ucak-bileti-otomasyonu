import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FlightSearch from './pages/FlightSearch';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Reservations from './pages/Reservations';

function AppWrapper() {
  const location = useLocation();
  const user = localStorage.getItem('user');
  const hideNavbar = location.pathname === '/login';
  const hideNavbar1 = location.pathname === '/register';

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {!hideNavbar && !hideNavbar1 && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <FlightSearch /> : <Navigate to="/login" />} />
        <Route path="/seats" element={user ? <SeatSelection /> : <Navigate to="/login" />} />
        <Route path="/payment" element={user ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/payment-success" element={user ? <PaymentSuccess /> : <Navigate to="/login" />} />
        <Route path="/reservations" element={user ? <Reservations /> : <Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
