/* @flow */
import React from "react";
import { hydrate } from "react-dom";
import { creepClicks, creepKeydown } from "creepx";

import Root from "./scenes/Root";

// The tracking function
function track(payload) {
  console.log("Creepx ::", payload);
}

const app = document.getElementById("react");

if (app) {
  hydrate(<Root />, app);

  // Track whenever the user submits something via the 'Enter' key
  creepKeydown(app, payload => {
    if (payload.meta.key === "Enter") {
      track(payload);
    }
  });

  // Track all page clicks
  creepClicks(app, track);
}

// Hot reload
// ---

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept();
}
