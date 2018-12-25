import React from "react";

export default class Ad extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div className="ad">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5743581917741076"
          data-ad-slot="7806394673"
          data-ad-format="auto"
        />
      </div>
    );
  }
}
