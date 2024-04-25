import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import defaultConfig, { BoolKV } from "./constants/defaultConfig";

const Options = () => {
  const [config, setConfig] = useState<typeof defaultConfig>(defaultConfig);

  useEffect(() => {
    chrome.storage.local.get(["config"], (result) => {
      setConfig(result.config || defaultConfig);
    });
  }, []);

  const ConfigItem = ({
    ikey: key,
    iname,
  }: {
    ikey: string;
    iname?: string;
  }) => {
    const state = (config as BoolKV)[key];
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
        <label
          style={{
            lineHeight: "1",
            fontSize: 14,
          }}
        >
          {iname || key}
        </label>
        <div>
          <div
            onClick={() => {
              const newValue = !!!(config as BoolKV)[key];
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
              backgroundColor: state ? "#0957D0" : "#E1E3E1",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s",
              border: state ? "1px solid #0957D0" : "1px solid #757775",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 2,
                left: state ? "100%" : 2,
                transform: state ? "translateX(-100%) translateX(-2px)" : "",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: state ? "white" : "#757775",
                transition: "all 0.2s",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const Title = ({ children }: { children: string }) => (
    <h1
      style={{
        margin: "0px",
        fontSize: 20,
      }}
    >
      {children}
    </h1>
  );

  const Spacer = () => <div style={{ height: 20 }} />;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title>시청자용</Title>
        <ConfigItem ikey="adblock" iname="광고 차단" />
        <ConfigItem ikey="hideDonation" iname="후원 숨기기" />
        <ConfigItem ikey="reversedChat" iname="채팅 왼쪽에 두기" />
        <Spacer />
        <Title>스트리머용</Title>
        <ConfigItem ikey="voteTool" iname="채팅 투표" />
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
