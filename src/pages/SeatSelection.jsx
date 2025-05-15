import { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';

function SeatSelection() {
  const [seats, setSeats] = useState([]);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
  const flightData = JSON.parse(localStorage.getItem('selectedFlight'));
  setFlight(flightData);

  try {
    const parsedSeats = JSON.parse(flightData.koltuklar);
const seatList = parsedSeats.map((s, i) => ({
  id: i,
  koltuk_no: s.no,
  durum: s.durum,
}));

    setSeats(seatList);
  } catch (err) {
    console.error('Koltuk verisi çözümlenemedi:', err);
  }
}, []);


  const handleSelect = (seat) => {
    localStorage.setItem('selectedSeat', JSON.stringify(seat));
    message.success(`Koltuk seçildi: ${seat.koltuk_no}`);
    setTimeout(() => {
      window.location.href = '/payment';
    }, 1000);
  };

const columns = [
  { title: 'Koltuk No', dataIndex: 'koltuk_no' },
  {
    title: 'Durum',
    dataIndex: 'durum',
    render: (text) =>
      text === 'dolu' ? <span style={{ color: 'red' }}>Dolu</span> : <span style={{ color: 'green' }}>Boş</span>,
  },
  {
    title: 'İşlem',
    render: (text, record) =>
      record.durum === 'boş' ? (
        <Button onClick={() => handleSelect(record)}>Seç</Button>
      ) : (
        <Button disabled>Dolu</Button>
      ),
  },
];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{color : "#000000"}}>{flight?.kalkis} → {flight?.varis} için Koltuk Seçimi</h2>
      <Table columns={columns} dataSource={seats} rowKey="id" />
    </div>
  );
}

export default SeatSelection;
