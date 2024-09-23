import React, { useState } from "react";

const withDropdown = (OriginalComponent) => {
  return (props) => {
    const [show, setShow] = useState(false);
    const toggleDropdown = () => {
      setShow(!show);
    };
    return <OriginalComponent show={show} toggle={toggleDropdown} {...props} />;
  };
};

export default withDropdown;
