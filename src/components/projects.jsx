import React, { Component } from "react";
import MainLayout from "./common/mainLayout";

class Projects extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainLayout title="Toplantı Kararları">
          <div className="announcement">
            <ul>
              <li>
                <h3>Kat Malikleri Kurulu Toplantısı - 07/12/2018</h3>
                <p>
                  <text>
                    Kat malikleri kurulu, aşağıdaki gündem maddelerini görüşüp
                    karara bağlamak üzere <b>19/01/2019</b> tarihinde saat{" "}
                    <b>19:00</b>'da sitede bulunan A Blok No:2 de 2018 yılı
                    olağan toplantısını yapmak üzere toplanacaktır.
                  </text>
                </p>
                <p>
                  Bu toplantıda yeter sayı sağlanamadığı takdirde, ikinci
                  toplantı nisap (çoğunluk) aranmaksızın <b>26/01/2019</b>{" "}
                  tarihinde saat <b>19:00</b>'da aynı yerde yapılacaktır.
                </p>
                <p>
                  Bütün kat maliklerinin toplantıya katılmaları veya kendilerini
                  temsil ettirmeleri önemle rica olunur.
                </p>
                <p>
                  <b>Gündem</b>
                  <br />
                  <ol>
                    <li>
                      Açılış yoklama ve toplantı divan başkanının ve üyelerin
                      seçimi.
                    </li>
                    <li>Gündemin okunması ve ilaveler.</li>
                    <li>
                      Yönetim faaliyet raporu ve denetçi raporunun okunması,
                      hesapların görüşülmesi ve yönetimin ibrası.
                    </li>
                    <li>
                      Site de yapılması gereken işlerin görüşülmesi ve karara
                      bağlanması.
                    </li>
                    <li>
                      2019 yılı bütçesinin görüşülmesi ve aidatların
                      belirlenmesi.
                    </li>
                    <li>Yeni yönetim ve denetçi seçimi.</li>
                    <li>Dilekler, temenni ve kapanış.</li>
                  </ol>
                </p>
              </li>
              <p>
                Vekaletname örneğini indirmek için{" "}
                <a
                  download="vekaletname"
                  href="documents/admira_vekaletname.docx"
                >
                  tıklayınız.
                </a>
              </p>
              <hr />
            </ul>
          </div>
        </MainLayout>
      </React.Fragment>
    );
  }
}

export default Projects;
