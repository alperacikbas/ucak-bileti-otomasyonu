import { Button, Form, Input, message, Card, Typography, Row, Col } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SHEET_URL = 'https://api.sheetbest.com/sheets/fe71ea82-51d1-43d6-80e9-4d37e572cd9d';

function Register() {
  const onFinish = async (values) => {
    try {
      await axios.post(SHEET_URL, {
        email: values.email,
        password: values.password,
      });

      message.success('Kayıt başarılı!');
      window.location.href = '/login';
    } catch (error) {
      message.error('Kayıt sırasında hata oluştu.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px'
    }}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{
              padding: 32,
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Title level={2} style={{ textAlign: 'center', marginBottom: 40, }}>
              Uçak Bileti | Kayıt Ol
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                label="E-Posta"
                rules={[{ required: true, message: 'E-posta adresinizi girin' }]}
              >
                <Input size="large" placeholder="ornek@mail.com" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Şifre"
                rules={[{ required: true, message: 'Şifre girin' }]}
              >
                <Input.Password size="large" placeholder="Şifreniz" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Kayıt Ol
                </Button>
              </Form.Item>

              <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                <a href="/login">Zaten bir hesabınız var mı? Giriş yap</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
