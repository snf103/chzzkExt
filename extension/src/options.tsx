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
import { isElectron } from "./utils/browserInfo";

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
        : (defaultConfig as any)[key],
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
  const SubTitle = ({ children }: { children: string }) => (
    <div
      style={{
        margin: "4px 0px 0px 0px",
        fontSize: 16,
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
          borderBottom: "2px dotted #cccccc50",
        }}
      />
    </div>
  );

  const Desc = ({ children }: { children: any }) => (
    <div
      style={{
        fontSize: 12,
        color: "#666",
        margin: "0px 0px 0px 1em",
      }}
    >
      {children}
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

  const askBefore_adblock = (newV: boolean) => {
    const shuffle = (
      array: {
        label: string;
        onClick: () => void;
      }[],
    ) => {
      let currentIndex = array.length;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };
    return new Promise<boolean>((resolve) => {
      if (!newV) return resolve(true);
      const makeNot = (msg: string) => {
        return {
          label: msg,
          onClick: () => resolve(false),
        };
      };
      const step1 = [
        {
          label: "네",
          onClick: () => resolve(true),
        },
        makeNot("아니요"),
      ];
      confirmAlert({
        title: "진짜로 사용하실꺼에요?",
        message: "스트리머의 소중한 수익원인 광고를 차단합니다.",
        onClickOutside: () => resolve(false),
        onKeypressEscape: () => resolve(false),
        buttons: shuffle(step1),
      });
    });
  };
  const askBefore_bypassNaver = (newV: boolean) =>
    newV == false
      ? Promise.resolve(true)
      : new Promise<boolean>((r) =>
          confirmAlert({
            title: "힌반만 더 생각해주세요",
            message:
              "그리드가 불편한거 알지만, 그래도 치지직이 망사용료로 트위치처럼 되는건 싫잖아요. 한번만 생각해 주세요.",
            buttons: [
              {
                label: "사용",
                onClick: () => r(true),
              },
              {
                label: "취소",
                onClick: () => r(false),
              },
            ],
          }),
        );

  const extractInstallInfo = () => {
    fetch("/manifest.json")
      .then((r) => r.json())
      .then(async (d) => {
        const data = [
          navigator.userAgent,
          configInstance.config,
          d.version,
          process.env.BUILD_ENV,
          ...(isElectron
            ? [await (await fetch("chzzkext://version")).text()]
            : ["null"]),
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

  const reloadPage = () => fetch("chzzkext://reload");

  const DiscordLogoSVG = () => {
    return (
      <img
        src={"data:image/svg+xml;base64," + btoa(dclogo)}
        alt="Discord"
        width={28}
      />
    );
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
        {isElectron && (
          <>
            <Spacer />
            <button className="bugreportud" onClick={reloadPage}>
              새로고침
            </button>
          </>
        )}
        <div className="content">
          <Title>공통</Title>
          <ConfigItem ikey="blocktracker" iname="트래커 차단" />
          <Desc>새로고침이 필요합니다</Desc>

          <Spacer />
          <Title>시청자용</Title>
          <ConfigItem
            ikey="adblock"
            iname="광고 차단"
            askBefore={askBefore_adblock}
          />
          <Desc>
            광고도 스트리머에게 중요한 수입원이에요. 사용하지 않는걸 적극
            권장드려요
          </Desc>
          <Desc>새로고침이 필요합니다</Desc>
          <ConfigItem ikey="adskip" iname="광고 스킵" />
          <ConfigItem ikey="vodDownload" iname="VOD 다운로드" />
          {isElectron ? (
            <Desc>
              Electron버전에서는 그리드 없이 고화질 재생이 항상 활성화
              되어있습니다.
            </Desc>
          ) : (
            <>
              <ConfigItem
                ikey="bypassNaver"
                iname="플러그인 없이 고화질 재생"
                askBefore={askBefore_bypassNaver}
              />

              <Desc>
                현재 Electron 버전 에서만 작동합니다.{" "}
                <a
                  href="https://github.com/poikr/chzzkExt/blob/main/electron/README.md"
                  target="_blank"
                >
                  문서
                </a>
                를 참조해 주세요.
              </Desc>
            </>
          )}
          <ConfigItem ikey="saveVodLoc" iname="VOD 이어보기" />

          <Spacer />
          <Title>채팅</Title>
          <ConfigItem ikey="chat_nfo" iname="작은 너비에서 아래에 두기" />
          <ConfigItem ikey="hideDonation" iname="후원 채팅 숨기기" />
          {/* handled in initUI_ed.ts */}
          <ConfigItem ikey="disable_donate_rank" iname="후원 순위 숨기기" />
          <ConfigItem ikey="reversedChat" iname="채팅 왼쪽에 두기" />
          <Desc>
            "작은 너비에서 아래에 두기"와 같이 실행되있을경우 "작은 너비에서
            아래에 두기"가 먼저 적용됩니다.
          </Desc>
          <ConfigItem
            ikey="autoShowChat"
            iname="채팅 숨김 처리 자동으로 끄기"
          />
          <ConfigItem ikey="latencyView" iname="레이턴시 표시" />
          <ConfigItem ikey="showBuffer" iname="버퍼량 표시" />

          <Spacer />
          <Title>스트리머용</Title>
          <ConfigItem ikey="voteTool" iname="채팅 투표" />
          <ConfigItem ikey="viewerview" iname="특정 시청자의 채팅만 보기" />
          <Desc>채팅창에서 시청자 아이디를 누르면 나와요!</Desc>

          <Spacer />
          <Title>UI 수정</Title>
          <SubTitle>상단바</SubTitle>
          <ConfigItem ikey="ed_chz" iname="치즈 숨기기" />
          <ConfigItem ikey="ed_tic" iname="라운지 티켓 숨기기" />
          <ConfigItem ikey="ed_noti" iname="알림 숨기기" />
          <ConfigItem ikey="ed_chkey" iname="치트키 숨기기" />
          <ConfigItem ikey="staticlogo" iname="움직이지 않는 로고" />
          <Desc>새로고침이 필요합니다</Desc>

          <SubTitle>사이드바 상단</SubTitle>
          <ConfigItem ikey="ed_si_sd" iname="스튜디오 숨기기" />
          <ConfigItem ikey="ed_su_al" iname="전체 라이브 숨기기" />
          <ConfigItem ikey="ed_si_rw" iname="다시보기 숨기기" />
          <ConfigItem ikey="ed_si_ct" iname="카테고리 숨기기" />
          <ConfigItem ikey="ed_si_fl" iname="팔로잉 숨기기" />

          <SubTitle>사이드바 채널추천</SubTitle>
          <ConfigItem ikey="refreshSidebar" iname="30초마다 채널 새로고침" />
          <ConfigItem ikey="ed_sc_fl" iname="팔로우 숨기기" />
          <ConfigItem ikey="ed_sc_rc" iname="추천 숨기기" />
          <ConfigItem ikey="ed_sc_pt" iname="파트너 숨기기" />
          <ConfigItem
            ikey="remove_offline_channel"
            iname="오프라인 채널 숨기기"
          />

          <SubTitle>사이드바 하단</SubTitle>
          <ConfigItem ikey="ed_si_game" iname="게임 숨기기" />
          <ConfigItem ikey="ed_si_esp" iname="e스포츠 숨기기" />
          <ConfigItem ikey="ed_si_ori" iname="original 숨기기" />
          <ConfigItem ikey="ed_si_pcg" iname="PC게임 숨기기" />
          <ConfigItem ikey="ed_si_chr" iname="치지직 라운지 숨기기" />

          <SubTitle>메인메뉴</SubTitle>
          <ConfigItem ikey="ed_mi_ban" iname="상단 배너 숨기기" />
          <Desc>새로고침이 필요합니다</Desc>
          <ConfigItem ikey="ed_rec_live" iname="추천 라이브 숨기기" />
          <Desc>
            새로고침이 필요합니다, 사라지는것 뿐이지 재생은 되고있는거에요!
          </Desc>
          <ConfigItem ikey="ed_hm_fl" iname="'팔로잉 채널 라이브' 숨기기" />
          <ConfigItem ikey="ed_hm_how" iname="'이 라이브 어때요?' 숨기기" />
          <ConfigItem ikey="ed_hm_lk" iname="'좋아하실 것 같아요' 숨기기" />
          <ConfigItem
            ikey="ed_hm_nw"
            iname="'신입 스트리머 인사드립니다' 숨기기"
          />

          <button className="bugreportud" onClick={extractInstallInfo}>
            설치 정보 추출
          </button>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
