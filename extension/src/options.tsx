import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Options = () => {
  const clear = () => {
    chrome.storage.local.clear(() => {
      chrome.storage.local.set(
        {
          config: {},
        },
        () => {
          console.log("cleared");
        }
      );
    });
  };

  return (
    <>
      <button onClick={clear}>Clear</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
