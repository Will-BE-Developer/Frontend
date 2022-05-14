import React from "react";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
const ValueLabelComponent = (props) => {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
};

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};
export default ValueLabelComponent;
