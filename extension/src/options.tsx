import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import defaultConfig from "./constants/defaultConfig";

const Options = () => {
  const [config, setConfig] = useState<typeof defaultConfig>(defaultConfig);
  const clear = () => {
    chrome.storage.local.clear(() => {
      chrome.storage.local.set(
        {
          config: defaultConfig,
        },
        () => {
          console.log("cleared");
        }
      );
    });
  };

  useEffect(() => {
    chrome.storage.local.get(["config"], (result) => {
      setConfig(result.config || defaultConfig);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {config &&
          Object.keys(config).map((key) => {
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px",
                  fontSize: 14,
                  lineHeight: "1",
                }}
              >
                <label>{key}</label>
                <div>
                  <div
                    onClick={() => {
                      const newValue = !(config as any)[key];
                      setConfig({
                        ...config,
                        [key]: newValue,
                      });
                      chrome.storage.local.set({
                        config: {
                          ...config,
                          [key]: newValue,
                        },
                      });
                    }}
                    style={{
                      width: 30,
                      height: 16,
                      borderRadius: 15,
                      backgroundColor: (config as any)[key]
                        ? "#0957D0"
                        : "#E1E3E1",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.2s",
                      border: (config as any)[key]
                        ? "1px solid #0957D0"
                        : "1px solid #757775",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 2,
                        left: (config as any)[key] ? "100%" : 2,
                        transform: (config as any)[key]
                          ? "translateX(-100%) translateX(-2px)"
                          : "",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: (config as any)[key]
                          ? "white"
                          : "#757775",
                        transition: "all 0.2s",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
