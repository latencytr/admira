import React, { Component } from "react";
import MainLayout from "./common/mainLayout";

class Announcement extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainLayout title="Duyurular">
          <div className="announcement">
            <ul>
              <li>
                <h4>Pidosan Arızaları</h4>
                <p>
                  Lütfen Pidosan ile ilgili arızalarınız için{" "}
                  <a href="tel:4441949">444 19 49</a> nolu telefondan servis
                  talebinde bulununuz.
                </p>
              </li>
              <li>
                <h4>Kapı otomatikleri devreye alındı</h4>
                <p>
                  A ve B blok otomatik kapılar devreye alınmıştır. <br />
                  <b>A Blok Şifresi:</b> 6601
                  <br />
                  <b>B Blok Şifresi:</b> 6602
                </p>
              </li>
            </ul>
          </div>
        </MainLayout>
      </React.Fragment>
    );
  }
}

export default Announcement;
