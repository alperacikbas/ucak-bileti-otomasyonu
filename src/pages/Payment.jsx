import { Form, Input, Button, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';


const FLIGHTS_URL = 'https://api.sheetbest.com/sheets/bb16ce8b-7539-4575-9d39-93c16837e221';
const SERVICE_ID = 'service_w750hpn';
const TEMPLATE_ID = 'template_t7fyhc3';
const PUBLIC_KEY = 'bKEvBW9npeUYVT936';


function Payment() {
  const [flight, setFlight] = useState(null);
  const [seat, setSeat] = useState(null);

  useEffect(() => {
    const f = JSON.parse(localStorage.getItem('selectedFlight'));
    const s = JSON.parse(localStorage.getItem('selectedSeat'));
    setFlight(f);
    setSeat(s);
  }, []);

  const onFinish = async (values) => {
  try {
    message.loading('Ödeme işleniyor...');

    // Koltuk güncelle
    const updatedSeats = JSON.parse(flight.koltuklar).map((s) => {
      if (s.no === seat.koltuk_no) {
        return { ...s, durum: 'dolu' };
      }
      return s;
    });

    await axios.patch(`${FLIGHTS_URL}/id/${flight.id}`, {
      koltuklar: JSON.stringify(updatedSeats),
    });

    // E-Postayı kullanıcıdan aldık:
    const passengerEmail = values.yolcu_email;

    // EmailJS gönderimi
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        email: passengerEmail,
        user_name: 'Sayın Yolcu',
        flight_info: `${flight.kalkis} → ${flight.varis} | ${flight.tarih} | ${flight.havayolu}`,
        seat_info: seat.koltuk_no,
      },
      PUBLIC_KEY
    );

   const all = JSON.parse(localStorage.getItem('reservations') || '[]');
all.push({
  email: passengerEmail,
  flight: `${flight.kalkis} → ${flight.varis}`,
  date: flight.tarih,
  airline: flight.havayolu,
  seat: seat.koltuk_no,
  flightId: flight.id  // ✅ FLIGHT ID BURADA KAYDEDİLİYOR
});
console.log(flight.id)
localStorage.setItem('reservations', JSON.stringify(all));


    message.success('Ödeme tamamlandı ve e-posta gönderildi!');
    setTimeout(() => {
      localStorage.removeItem('selectedFlight');
      localStorage.removeItem('selectedSeat');
      window.location.href = '/payment-success';
    }, 1000);
  } catch (err) {
    console.error('Hata:', err);
    message.error('Bir hata oluştu. Lütfen tekrar deneyin.');
  }
};




  return (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    background: '#f0f2f5',
    minHeight: 'calc(100vh - 100px)',
  }}>
    <Card
      title="💳 Ödeme Sayfası"
      bordered={false}
      style={{
        width: '100%',
        maxWidth: 900,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        borderRadius: 12,
        background: '#fff',
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', gap: 40 }}>
        {/* Sol taraf - Uçuş bilgileri */}
        <div style={{ flex: 1 }}>
          <p><b>Uçuş:</b> {flight?.kalkis} → {flight?.varis}</p>
          <p><b>Tarih:</b> {flight?.tarih}</p>
          <p><b>Havayolu:</b> {flight?.havayolu}</p>
          <p><b>Seçilen Koltuk:</b> {seat?.koltuk_no}</p>
          <p><b>Fiyat:</b> {flight?.fiyat} TL</p>
        </div>

        {/* Sağ taraf - Form */}
        <div style={{ flex: 1 }}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="yolcu_email" label="Yolcu E-Postası" rules={[{ required: true }]}>
              <Input placeholder="yolcu@example.com" />
            </Form.Item>
            <Form.Item name="cardNumber" label="Kart Numarası" rules={[{ required: true }]}>
              <Input placeholder="1234 5678 9012 3456" />
            </Form.Item>
            <Form.Item name="cardName" label="Kart Üzerindeki İsim" rules={[{ required: true }]}>
              <Input placeholder="Ad Soyad" />
            </Form.Item>
            <Form.Item name="expiry" label="Son Kullanma Tarihi" rules={[{ required: true }]}>
              <Input placeholder="MM/YY" />
            </Form.Item>
            <Form.Item name="cvv" label="CVV" rules={[{ required: true }]}>
              <Input placeholder="123" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>Ödeme Yap</Button>
          </Form>
        </div>
      </div>
    </Card>
  </div>
);

}

export default Payment;
