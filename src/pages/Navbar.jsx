import { Layout, Menu } from 'antd';
import { SearchOutlined, LogoutOutlined, OrderedListOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navigate = (path) => {
    window.location.href = path;
  };

  const items = [
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: 'Uçuş Ara',
      color :"#000000",
      onClick: () => navigate('/search'),
    },
    {
      key: 'reservations',
      icon: <OrderedListOutlined />,
      label: 'Rezervasyonlarım',
      onClick: () => navigate('/reservations'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Çıkış Yap',
      onClick: logout,
    },
  ];

  return (
    <Header style={{
      background: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 20, color: '#1890ff' }}>✈️ Uçak Bileti</div>
      <Menu mode="horizontal" items={items} selectable={false} style={{ flexGrow: 1, justifyContent: 'flex-end', background: 'transparent' }} />
    </Header>
  );
}

export default Navbar;
