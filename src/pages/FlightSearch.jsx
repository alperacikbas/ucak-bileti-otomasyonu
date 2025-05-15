import { useEffect, useState } from 'react';
import { Table, Select, DatePicker, Button, Slider, Typography, InputNumber } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

const FLIGHTS_URL = 'https://api.sheetbest.com/sheets/bb16ce8b-7539-4575-9d39-93c16837e221';

const SEHIRLER = [
  "İstanbul", "Ankara", "İzmir", "Antalya", "Adana",
  "Trabzon", "Bursa", "Gaziantep", "Kayseri", "Diyarbakır"
];

function FlightSearch() {
  const [flights, setFlights] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    kalkis: '',
    varis: '',
    tarih: '',
    havayolu: '',
    aktarma: '',
    maxFiyat: null,
    maxSure: null,
  });

  useEffect(() => {
    axios.get(FLIGHTS_URL).then((res) => {
      setFlights(res.data);
      setFiltered(res.data);
    });
  }, []);

  const handleFilter = () => {
    let results = flights.filter((f) => {
      const fiyat = parseFloat(f.fiyat);
      const sure = parseFloat(f.sure);
      return (
        (!filters.kalkis || f.kalkis === filters.kalkis) &&
        (!filters.varis || f.varis === filters.varis) &&
        (!filters.havayolu || f.havayolu === filters.havayolu) &&
        (!filters.tarih || f.tarih === filters.tarih) &&
        (!filters.aktarma || f.aktarma?.toLowerCase() === filters.aktarma.toLowerCase()) &&
        (!filters.maxFiyat || fiyat <= filters.maxFiyat) &&
        (!filters.maxSure || sure <= filters.maxSure)
      );
    });
    setFiltered(results);
  };

  const columns = [
    { title: 'Kalkış', dataIndex: 'kalkis' },
    { title: 'Varış', dataIndex: 'varis' },
    { title: 'Tarih', dataIndex: 'tarih' },
    { title: 'Havayolu', dataIndex: 'havayolu' },
    { title: 'Aktarma', dataIndex: 'aktarma' },
    { title: 'Fiyat', dataIndex: 'fiyat' },
    { title: 'Süre (saat)', dataIndex: 'sure' },
    {
      title: 'İşlem',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            localStorage.setItem('selectedFlight', JSON.stringify(record));
            window.location.href = '/seats';
          }}
        >
          Seç
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Uçuş Ara</Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <Select
          placeholder="Kalkış Şehri"
          allowClear
          onChange={(value) => setFilters({ ...filters, kalkis: value })}
          style={{ width: 150 }}
        >
          {SEHIRLER.map((sehir) => (
            <Option key={sehir} value={sehir}>{sehir}</Option>
          ))}
        </Select>

        <Select
          placeholder="Varış Şehri"
          allowClear
          onChange={(value) => setFilters({ ...filters, varis: value })}
          style={{ width: 150 }}
        >
          {SEHIRLER.map((sehir) => (
            <Option key={sehir} value={sehir}>{sehir}</Option>
          ))}
        </Select>

        <DatePicker
          placeholder="Tarih"
          onChange={(date, dateString) =>
            setFilters({ ...filters, tarih: dateString })
          }
        />

        <Select
          placeholder="Havayolu"
          allowClear
          onChange={(value) => setFilters({ ...filters, havayolu: value })}
          style={{ width: 150 }}
        >
          <Option value="THY">THY</Option>
          <Option value="Lufthansa">Lufthansa</Option>
          <Option value="Pegasus">Pegasus</Option>
        </Select>

        <Select
          placeholder="Aktarma"
          allowClear
          onChange={(value) => setFilters({ ...filters, aktarma: value })}
          style={{ width: 150 }}
        >
          <Option value="Aktarmalı">Aktarmalı</Option>
          <Option value="Aktarmasız">Aktarmasız</Option>
        </Select>

        <InputNumber
          type="number"
          placeholder="Max Fiyat"
          style={{ width: 120 }}
          onChange={(value) => setFilters({ ...filters, maxFiyat: value })}
        />

        <InputNumber
          type="number"
          placeholder="Max Süre"
          style={{ width: 120 }}
          onChange={(value) => setFilters({ ...filters, maxSure: value })}
        />

        <Button type="primary" onClick={handleFilter}>Ara</Button>
      </div>

      <Table columns={columns} dataSource={filtered} rowKey="id" />
    </div>
  );
}

export default FlightSearch;
