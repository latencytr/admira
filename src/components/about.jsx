import React, { Component } from "react";
import pic from "../images/site_giris.jpg";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h2 className="row">Hakkında</h2>
          <hr />
          <div className="ml-5">
            <h4 className="row">Proje Bilgileri</h4>
            <hr />
            <span className="row">
              <ul className="col-auto">
                <li>7500 m2 proje alanı</li>
                <li>2 Blok,55 daire</li>
                <li>Katta 2 daire</li>
                <li>Daireler 4+1 185 m2</li>
                <li>Açık – kapalı otopark</li>
                <li>24 saat güvenlik</li>
                <li>Tenis kortu</li>
                <li>Basketbol sahası</li>
                <li>Çocuk oyun parkı</li>
                <li>Zengin peyzaj</li>
              </ul>
              <ul className="col-auto">
                <li>Göksu vadisinin yanıbaşında</li>
                <li>Metroya ulaşım araçlarına yakın</li>
                <li>Köşebaşı konumunda İstanbul yoluna yakın</li>
                <li>KC Göksu Avmye yakın</li>
                <li>Mutfakta ankastre</li>
                <li>Giyinme odası</li>
                <li>Çamaşır odası</li>
                <li>Ebebeyin banyosu</li>
                <li>Duvar Kağıdı</li>
                <li>Her dairede Teras balkonu</li>
              </ul>
            </span>
            <hr />
            <div className="row">
              <div className="col">
                <img
                  className="img-fluid max-width: 600px rounded"
                  src={pic}
                  alt="Site Girişi"
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
