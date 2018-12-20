import React from "react";

const MainLayout = ({ title, children }) => {
  return (
    <div className="container-fluid">
      <h2>{title}</h2>
      <hr className="mainLayout-hr" />
      <div className="ml-sm-2 ml-lg-5">{children}</div>
    </div>
  );
};

export default MainLayout;
