import { Modal, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const FLIGHTS_URL = 'https://api.sheetbest.com/sheets/bb16ce8b-7539-4575-9d39-93c16837e221'; 

function SeatChangeModal({ open, onClose, flightId, currentSeat, onSuccess }) {
  const [seatOptions, setSeatOptions] = useState([]);
  const [newSeat, setNewSeat] = useState(null);

  useEffect(() => {
    if (!flightId) return;

    axios.get(FLIGHTS_URL).then((res) => {
      const flight = res.data.find((f) => String(f.id) === String(flightId));
      if (!flight) {
        console.error("Uygun uçuş bulunamadı, flightId:", flightId);
        return;
      }

      try {
        const allSeats = JSON.parse(flight.koltuklar);
        const available = allSeats.filter((s) => s.durum.toLowerCase() === 'boş');
        setSeatOptions(available.map((s) => s.no));
      } catch (e) {
        console.error("Koltuk listesi parse edilemedi:", e);
      }
    });
  }, [flightId]);

  const handleOk = async () => {
    if (!newSeat) {
      message.warning("Lütfen bir koltuk seçin.");
      return;
    }

    const res = await axios.get(FLIGHTS_URL);
    const flight = res.data.find((f) => String(f.id) === String(flightId));
    const seatList = JSON.parse(flight.koltuklar).map((s) => {
      if (s.no === currentSeat) return { ...s, durum: 'boş' };
      if (s.no === newSeat) return { ...s, durum: 'dolu' };
      return s;
    });

    await axios.patch(`${FLIGHTS_URL}/id/${flightId}`, {
      koltuklar: JSON.stringify(seatList),
    });

    message.success("Koltuk başarıyla değiştirildi.");
    onSuccess(newSeat);
    onClose();
  };

  return (
    <Modal open={open} onOk={handleOk} onCancel={onClose} title="Koltuk Değiştir">
      <p>Yeni koltuk seçin:</p>
      <Select style={{ width: '100%' }} onChange={(val) => setNewSeat(val)}>
        {seatOptions.map((seat) => (
          <Option key={seat} value={seat}>{seat}</Option>
        ))}
      </Select>
    </Modal>
  );
}

export default SeatChangeModal;