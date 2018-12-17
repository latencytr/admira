import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = ({ liked, onClick }) => {
  const classes = liked ? ["fas", "heart"] : ["far", "heart"];
  return (
    <FontAwesomeIcon className="clickable" icon={classes} onClick={onClick} />
  );
};

export default Like;
