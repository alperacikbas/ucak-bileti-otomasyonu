import { Typography, Card } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5',
      padding: 24,
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 500,
          textAlign: 'center',
          padding: 32,
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}
      >
        <SmileOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
        <Title level={2} style={{ marginBottom: 0 }}>Hoşgeldiniz!</Title>
        <Text type="secondary" style={{ fontSize: 18 }}>
          <UserOutlined style={{ marginRight: 8 }} />
          {user?.email}
        </Text>
      </Card>
    </div>
  );
}

export default Profile;
