import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import dclogo from "#s/discordLogo.static.data";

import "#s/calertfix.css";
import "#s/bugreport.css";
import "#s/options.css";
import configInstance, { defaultConfig } from "@config";
import log from "@log";

const Options = () => {
  const ConfigItem = ({
    ikey: key,
    iname,
    askBefore,
  }: {
    ikey: string;
    iname?: string;
    askBefore?: (newV: boolean) => Promise<boolean>;
  }) => {
    const [state, setState] = useState(
      Object.keys(configInstance.config).includes(key)
        ? configInstance.config[key]
        : (defaultConfig as any)[key]
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
            onClick={async () => {
              if (askBefore) {
                if (!(await askBefore(!state))) return;
              }
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
    <div
      style={{
        margin: "0px",
        fontSize: 20,
        display: "flex",
        alignItems: "center",
        width: "100%",
        fontWeight: "bold",
        gap: "8px",
      }}
    >
      <span>{children}</span>
      <div
        style={{
          height: "0px",
          flexGrow: 1,
          borderBottom: "2px dotted #ccc",
        }}
      />
    </div>
  );

  const Spacer = () => <div style={{ height: 20 }} />;

  const [show, setShow] = useState(false);
  useEffect(() => {
    configInstance.loadFromStorage().then(() => {
      setShow(true);
      log("UseEffect", "Loaded config", configInstance.config);
    });
  }, []);

  const extractInstallInfo = () => {
    fetch("/manifest.json")
      .then((r) => r.json())
      .then(async (d) => {
        const data = [
          navigator.userAgent,
          configInstance.config,
          d.version,
          process.env.BUILD_ENV + "(DLONLY)",
        ];
        console.log(data);
        const jj = btoa(JSON.stringify(data));
        confirmAlert({
          title: "설치 정보",
          message: (() => {
            const len = jj.length;
            if (len < 30) return jj;
            return jj.slice(0, 30) + " ...";
          })(),
          buttons: [
            {
              label: "복사하기",
              onClick: () => {
                navigator.clipboard.writeText(jj);
              },
            },
            {
              label: "취소",
              onClick: () => {},
            },
          ],
        });
      });
  };

  const DiscordLogoSVG = () => {
    return (
      <img
        src={"data:image/svg+xml;base64," + btoa(dclogo)}
        alt="Discord"
        width={28}
      />
    );
  };

  const [showModal, setShowModal] = useState(false);

  const openModalX = () => {
    setShowModal(true);
  };

  if (!show) return <></>;
  return (
    <>
      <div className="container">
        <div className="header">
          <div>
            <a
              href="https://github.com/poikr/chzzkExt"
              target="_blank"
              className="headerImageLink"
            >
              <img src="assets/smallpro.png" className="headerImage" />
            </a>
          </div>
          <div className="rside">
            <a
              href="https://l.oein.kr/cczk-discord"
              target="_blank"
              className="headerImageLink"
            >
              <DiscordLogoSVG />
            </a>
          </div>
        </div>

        <div className="content">
          <Title>공통</Title>
          <button className="bugreportud" onClick={openModalX}>
            개발자 까까 사주기
          </button>

          <Spacer />
          <Title>시청자용</Title>
          <ConfigItem ikey="vodDownload" iname="VOD 다운로드" />
          <ConfigItem ikey="clipDownload" iname="클립 다운로드" />

          <button className="bugreportud" onClick={extractInstallInfo}>
            설치 정보 추출
          </button>
        </div>
      </div>
      {showModal && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 100,
            }}
            onClick={() => setShowModal(false)}
          ></div>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxSizing: "border-box",
              width: "280px",
              zIndex: 101,
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "8px",
                fontWeight: "bold",
                marginTop: "0px",
              }}
            >
              개발자 까까 사주기
            </h2>
            <div>여기에 들어오신 것만 해도 정말 감사할 따름입니다!</div>
            <div>
              <div>계좌 : 토스뱅크 1000 8000 6970</div>
              <div>
                Buy Me A Coffee :{" "}
                <a target="_blank" href="https://buymeacoffee.com/oein0219">
                  Link
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
