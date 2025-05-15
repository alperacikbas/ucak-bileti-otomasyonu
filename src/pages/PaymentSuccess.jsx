import { Button } from 'antd';

function PaymentSuccess() {
  const handleGoHome = () => {
    window.location.href = '/profile'; // veya "/search" istiyorsan orası
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2 style={{color : "#000000"}}>🎉 Ödeme Başarılı!</h2>
      <p style={{color : "#000000"}}>Rezervasyonunuz alınmıştır. İyi yolculuklar!</p>

      <Button type="primary" onClick={handleGoHome} style={{ marginTop: 20 }}>
        Ana Sayfaya Dön
      </Button>
    </div>
  );
}

export default PaymentSuccess;
