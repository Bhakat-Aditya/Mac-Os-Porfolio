import useWindowStore from "#store/window";
import React from "react";

function WindowControls({ target }) {
  const { closeWindow, toggleMaximize } = useWindowStore();
  
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" onClick={() => toggleMaximize(target)} />
    </div>
  );
}

export default WindowControls;