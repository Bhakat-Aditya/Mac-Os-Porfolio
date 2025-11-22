import React from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";


import { Dock, Navbar, Welcome } from "#components";
import {Terminal} from "#windows";


gsap.registerPlugin(Draggable);

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </div>
  );
}

export default App;
