import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import configInstance, { defaultConfig } from "./constants/config";

const Options = () => {
  const ConfigItem = ({
    ikey: key,
    iname,
  }: {
    ikey: string;
    iname?: string;
  }) => {
    const [state, setState] = useState(
      configInstance.get<boolean>(key, (defaultConfig as any)[key])
    );
    const ed = state ? "enable" : "disable";

    useEffect(() => {
      configInstance.addListener(key, (k, v) => {
        if (k == key) {
          setState(v as boolean);
        }
      });
    });

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
              configInstance.set(key, !state);
              configInstance.save();
              setState(!state);
            }}
            style={{
              width: 30,
              height: 16,
              borderRadius: 15,
              backgroundColor: `var(--switch-${ed}-bg)`,
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s",
              border: `1px solid var(--switch-${ed}-border)`,
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
                backgroundColor: `var(--switch-${ed}-knoob)`,
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

  let [show, setShow] = useState(false);
  useEffect(() => {
    configInstance.loadFromStorage().then(() => {
      setShow(true);
    });
  }, []);

  if (!show) return <></>;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title>공통</Title>
        <ConfigItem ikey="blocktracker" iname="트래커 차단" />

        <Spacer />
        <Title>시청자용</Title>
        <ConfigItem ikey="adblock" iname="광고 차단" />
        <ConfigItem ikey="adskip" iname="광고 스킵" />
        <ConfigItem ikey="vodDownload" iname="VOD 다운로드" />

        <Spacer />
        <Title>채팅</Title>
        <ConfigItem ikey="hideDonation" iname="후원 숨기기" />
        <ConfigItem ikey="reversedChat" iname="채팅 왼쪽에 두기" />
        <ConfigItem ikey="autoShowChat" iname="채팅 숨김 처리 자동으로 끄기" />
        <ConfigItem ikey="latencyView" iname="레이턴시 표시" />
        <ConfigItem ikey="showBuffer" iname="버퍼량 표시" />

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
