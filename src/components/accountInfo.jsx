import React from "react";
import MainLayout from "./common/mainLayout";

const AccountInfo = () => {
  return (
    <React.Fragment>
      <MainLayout title="Hesap Bilgileri">
        <h3>Yönetim Hesap Bilgileri</h3>
        <hr />
        <div>
          <b>Hesap Sahibi:</b> Admira Göksu Sitesi Yöneticiliği{" "}
        </div>
        <div>
          <b>Adres:</b> Göksu Mah. 5344. Cad. No: 1-A B Blok Etimesgut / ANKARA
        </div>
        <div>
          <b>Müşteri No:</b> 154236440
        </div>
        <div>
          <b>IBAN:</b> TR49 0011 1000 0000 0079 1615 20
        </div>
      </MainLayout>
    </React.Fragment>
  );
};

export default AccountInfo;
