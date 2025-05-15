import { Button, Form, Input, message, Card, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SHEET_URL = 'https://api.sheetbest.com/sheets/fe71ea82-51d1-43d6-80e9-4d37e572cd9d';

function Login() {
  const onFinish = async (values) => {
    try {
      const response = await axios.get(SHEET_URL);
      const users = response.data;

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify({ email: user.email }));
        message.success('Giriş başarılı!');
        window.location.href = '/profile';
      } else {
        message.error('Email ya da şifre hatalı!');
      }
    } catch (error) {
      message.error('Giriş sırasında bir hata oluştu.');
    }
  };

  return (
<div style={{
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f0f2f5',
  overflow: 'hidden'
}}>

      <Card
  style={{
    maxWidth: 400,
    width: '100%',
    padding: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }}
>

        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          Giriş Yap
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin' }]}
          >
            <Input placeholder="ornek@mail.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Şifre"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin' }]}
          >
            <Input.Password placeholder="Şifreniz" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Giriş Yap
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <a href="/register">Hesabınız yok mu? Kayıt olun</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
