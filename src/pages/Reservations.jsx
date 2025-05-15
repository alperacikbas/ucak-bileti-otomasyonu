import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import SeatChangeModal from './SeatChangeModal';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('reservations') || '[]');
    setReservations(all); // Tüm rezervasyonlar yüklensin
  }, []);

  const columns = [
    { title: 'Uçuş', dataIndex: 'flight' },
    { title: 'Tarih', dataIndex: 'date' },
    { title: 'Havayolu', dataIndex: 'airline' },
    { title: 'Koltuk', dataIndex: 'seat' },
    {
      title: 'İşlem',
      render: (_, record) => (
        <Button
          onClick={() => {
            console.log("Seçilen rezervasyon:", record);
            setSelectedReservation(record);
            setModalOpen(true);
          }}
        >
          Koltuk Değiştir
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{color : "#000000"}}>Rezervasyonlarım</h2>
      <Table dataSource={reservations} columns={columns} rowKey={(record, index) => index} />

      {selectedReservation && (
        <SeatChangeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          flightId={selectedReservation.flightId}
          currentSeat={selectedReservation.seat}
          onSuccess={(newSeat) => {
            const updated = reservations.map((r) =>
              r === selectedReservation ? { ...r, seat: newSeat } : r
            );
            setReservations(updated);
            localStorage.setItem('reservations', JSON.stringify(updated));
          }}
        />
      )}
    </div>
  );
}

export default Reservations;