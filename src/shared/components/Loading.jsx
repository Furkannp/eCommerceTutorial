import { LinearProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="m-3 text-center">
      <div style={{ width: '100px', margin: 'auto' }}>
      <div className="py-1">
        <LinearProgress color="primary" />
      </div>
      <div className="py-1">
        <LinearProgress color="secondary" />
      </div>
      <div className="py-1">
        <LinearProgress color="success" />
      </div>
      <div className="py-1">
        <LinearProgress color="error" />
      </div>
      <div className="py-1">
        <LinearProgress color="warning" />
      </div>
      </div>
      
    </div>
  );
};

export default Loading;
