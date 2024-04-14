// ==UserScript==
// @name         치지직 채팅 툴
// @namespace    https://chzzk.naver.com/
// @version      2024-04-14
// @description  치지직 채팅 툴
// @author       Oein
// @match        https://chzzk.naver.com/live/*/chat?ext
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(async function () {
  // ============================================== Chat Interact Functions ==============================================
  /**
   * 채팅 상자로 추정되는 요소들을 가져옴
   * @returns {HTMLDivElement[]} list
   */
  const getList = () => {
    return [
      ...document.querySelectorAll("#root > div > section > aside > div > div"),
    ]
      .map((x) => [x, x.className])
      .filter((x) => x[1].toString().includes("live_chatting_list_wrapper"));
  };
  /**
   * 채팅이 로드될 때까지 대기
   * @returns {HTMLDivElement} boxContainer
   */
  const waitForBox = async () => {
    let list = getList();
    while (list.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      list = getList();
    }
    return list[0][0];
  };
  let boxContainer = await waitForBox();

  /**
   *
   * @param {string} content
   * @returns {HTMLDivElement} alert box
   */
  const createCustomAlertBox = (content) => {
    const outer = document.createElement("div");
    outer.style.padding = "4px 8px";
    outer.style.marginBottom = "3px";

    const outerinner = document.createElement("div");
    outerinner.style.fontSize = "13px";
    outerinner.style.fontWeight = "500";
    outerinner.style.lineHeight = "18px";
    outerinner.style.textAlign = "left";
    outerinner.style.wordWrap = "break-word";
    outerinner.style.color = "var(--color-content-04)";
    outerinner.style.wordBreak = "break-all";
    outer.appendChild(outerinner);

    const inner = document.createElement("div");
    inner.style.display = "flex";
    inner.style.padding = "11px 18px 12px";
    inner.style.backgroundColor = "var(--color-bg-layer-01)";
    inner.style.borderRadius = "8px";
    outerinner.appendChild(inner);

    // inner.innerHTML = `<svg aria-hidden=true fill=none height=15 style="color:var(--color-content-02);flex:none;margin:1px 10px 0 0"width=14 xmlns=http://www.w3.org/2000/svg><g filter=url(#a)><path clip-rule=evenodd d="M10.25 2.802c-.664.445-1.46.815-2.368 1.113-1.08.354-2.249.584-3.42.712-.308.033-.6.058-.87.075l-.56.025-.115.002A.917.917 0 0 0 2 5.645v3.07c0 .544.47.968 1.01.913 2.612-.266 4.725.014 6.389.67.319.126.602.257.851.388V2.802Zm1.375 8.872c.578.34 1.375-.06 1.375-.796V2.417c0-.74-.8-1.134-1.375-.797v10.054Z"fill=currentColor fill-rule=evenodd></path><rect height=4.758 rx=1.9 stroke=currentColor stroke-width=1.2 width=3.8 x=4.1 y=7.6></rect></g><defs><filter color-interpolation-filters=sRGB filterUnits=userSpaceOnUse height=13.46 id=a width=13 x=1 y=1.498><feFlood flood-opacity=0 result=BackgroundImageFix></feFlood><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"in=SourceAlpha result=hardAlpha></feColorMatrix><feOffset dy=1></feOffset><feGaussianBlur stdDeviation=0.5></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"></feColorMatrix><feBlend in2=BackgroundImageFix result=effect1_dropShadow_1359_39595></feBlend><feBlend in2=effect1_dropShadow_1359_39595 result=shape in=SourceGraphic></feBlend></filter></defs></svg>`;
    inner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 15px; height: 15px; color:var(--color-content-02);flex:none;margin:1px 10px 0 0" height="40" viewBox="0 -960 960 960" width="40"><path fill="currentColor" d="M354.667-120H186.666q-27 0-46.833-19.833T120-186.666v-168.001q45.333-3.333 78.333-33.166 33-29.834 33-74.167t-33-74.167Q165.333-566 120-569.333v-168.001q0-27 19.833-46.833T186.666-804H358q7.333-40.667 36-68.333Q422.667-900 463.333-900q40.667 0 69.334 27.667 28.666 27.666 36 68.333h168.667q27 0 46.833 19.833T804-737.334v168.667q40.667 7.334 67.333 37.334 26.667 30 26.667 70.666 0 40.667-26.667 68.334-26.666 27.666-67.333 35v170.667q0 27-19.833 46.833T737.334-120H569.333q-3.333-48.667-34.166-80-30.834-31.333-73.167-31.333T388.833-200Q358-168.667 354.667-120Zm-168.001-66.666h115.001q24.667-62.667 72.259-87 47.591-24.333 87.999-24.333 40.408 0 88.075 24.333 47.666 24.333 72.333 87h115.001v-236.667H794q16 0 26.667-10.667 10.667-10.666 10.667-26.667 0-16-10.667-26.667Q810-498.001 794-498.001h-56.666v-239.333H500.667V-796q0-16-10.667-26.667-10.666-10.667-26.667-10.667-16 0-26.667 10.667Q426-812 426-796v58.666H186.666v116.001q50.1 18.544 80.717 62.124 30.616 43.579 30.616 97.357 0 52.852-30.666 96.518-30.667 43.667-80.667 62.667v116.001Zm276.667-274.001Z"/></svg>`;
    const p = document.createElement("p");
    p.innerHTML = content;
    inner.appendChild(p);
    return outer;
  };
  /**
   * 바로 boxContainer에 append할 경우 스크롤 되지 않고 항상 아래에 고정되기 때문에 마지막 채팅에 append
   * @param {string} content
   */
  const appendAlert = (content) => {
    boxContainer.children[boxContainer.childElementCount - 2].appendChild(
      createCustomAlertBox(content)
    );
  };

  const listeners = [];
  const addChatListener = (listener) => {
    listeners.push(listener);
  };
  const removeChatListener = (listener) => {
    listeners.splice(listeners.indexOf(listener), 1);
  };
  const chatEmitter = (uname, content, isFan) => {
    listeners.forEach((listener) => listener(uname, content, isFan));
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length === 0) return;
      const target = mutation.addedNodes[0];
      if (!target.className.includes("chatting_list_item")) return;
      const c = target.children[0].children[0];
      const uname = c.children[0].textContent;
      const content = c.children[1].textContent;
      chatEmitter(uname, content, false);
    });
  });
  observer.observe(boxContainer, {
    childList: true,
  });

  appendAlert("치지직 채팅 툴이 로딩되었습니다. (v1.0.0)");

  /**
   * 스크롤이 된 상태에서 나오는 채팅 버튼을 핸들링하는 함수
   * @deprecated 이후 다시 원래데로 돌아갈 경우 이전 채팅을 받는 경우가 있음. (TODO)
   */
  const liveButtonHandler = async () => {
    // live_chatting_scroll_button_chatting
    const getList = () => {
      return [
        ...document.querySelectorAll(
          "#root > div > section > aside > div > button"
        ),
      ]
        .map((x) => [x, x.className])
        .filter((x) =>
          x[1].toString().includes("live_chatting_scroll_button_chatting")
        );
    };
    const waitForButton = async () => {
      let list = getList();
      while (list.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        list = getList();
      }
      return list[0][0];
    };
    let button = await waitForButton();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // console.log(mutation);
        if (mutation.type !== "characterData") return;
        const target = button;
        const uname = target.children[0].textContent;
        const content = target.children[1].textContent;
        chatEmitter(uname, content, false);
      });
    });
    observer.observe(button, {
      characterData: true,
      childList: true,
      subtree: true,
    });
    // console.log(button);
  };
  //   liveButtonHandler();

  // ============================================== Data ==============================================
  const myUI = `
    <div id="ext-main">
        <header id="ext-header">
            <h2 id="ext-title">치지직 채팅 툴</h2>
        </header>
        <div id="ext-content">
            <div id="ext-tools">
                <button class="ext-button" id="add-vote">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path fill="currentColor" d="M446.667-446.667H233.333q-14.166 0-23.75-9.617Q200-465.901 200-480.117q0-14.216 9.583-23.716 9.584-9.5 23.75-9.5h213.334v-213.334q0-14.166 9.617-23.75Q465.901-760 480.117-760q14.216 0 23.716 9.583 9.5 9.584 9.5 23.75v213.334h213.334q14.166 0 23.75 9.617Q760-494.099 760-479.883q0 14.216-9.583 23.716-9.584 9.5-23.75 9.5H513.333v213.334q0 14.166-9.617 23.75Q494.099-200 479.883-200q-14.216 0-23.716-9.583-9.5-9.584-9.5-23.75v-213.334Z"/></svg>
                    <span>항목 추가</span>
                </button>
                <button class="ext-button" id="toggle-vote">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path fill="currentColor" d="M186.666-80q-27 0-46.833-19.833T120-146.666V-314q0-11.711 4.333-23.421 4.334-11.711 13-20.912l86.001-96.001q9.667-11 23.833-11.167 14.167-.166 24.08 9.747 9.087 9.087 9.753 22.753.667 13.667-8.333 23.667l-83.668 92.667h582.002l-79.001-90q-9-10-8.187-23.285.813-13.285 9.76-22.418 9.76-9.964 24.26-9.797 14.5.167 24.166 11.166l81.334 92.668q8.667 9 12.667 20.778 4 11.777 4 23.555v167.334q0 27-19.833 46.833T773.334-80H186.666Zm0-66.666h586.668V-250H186.666v103.334ZM436.334-385 283.333-538Q263-558.334 264.5-585.167 266-612 285.667-631.666l206.667-206.667q18.956-18.707 46.977-19.52Q567.333-858.667 587-839l153 153q19 19 19.667 45.667.666 26.666-20.334 47.666l-208 208q-19 19-46.833 19.5T436.334-385Zm251-256L540.333-788 335.667-583.333l147 147L687.334-641ZM186.666-146.666V-250v103.334Z"/></svg>
                    <span id="ext-button-vote-content"></span>
                </button>
            </div>
            <div class="ext-maindesc">"!투표 숫자"를 채팅에 입력해서 투표하세요.</div>
            <div id="ext-list">
            </div>
        </div>
    </div>
  `;
  const itemHTML = `
  <div class="ext-list-item">
      <div class="ext-list-index">
            <span>#index</span>
            <div class="ext-hover">
                삭제하려면 클릭하세요
            </div>
      </div>
      <div class="ext-list-cont">
          <input class="ext-list-name" value="" placeholder="내용을 입력하세요" />
          <div class="ext-progress">
              <div class="ext-progress-bar" style="width: 100%"></div>
          </div>
      </div>
      <div class="ext-list-statics">
          <div class="ext-list-static">?명</div>
          <div class="ext-list-static static-desc">?%</div>
      </div>
  </div>`;
  const myCSS = `
   body {
    display: flex;
    flex-direction: row;
   }
   #root { /* 네이버의 메인 ui */
    overflow: hidden;
    flex: 1;
    max-width: 400px;
   }
   #chzzkExt-root {
    flex: 1;
    flex-grow: 1;
   }
   #ext-main {
    min-width: fit-content;
    box-sizing: border-box;
    height: 100vh;
   }
   #ext-title {
    -ms-flex-align: center;
    -ms-flex-pack: center;
    align-items: center;
    background-color: var(--color-bg-01);
    border-width: 1px;
    border-bottom: 1px solid rgba(var(--color-border-01-rgb), .06);
    border-left: 0 solid rgba(var(--color-border-01-rgb), .06);
    border-right: 0 solid rgba(var(--color-border-01-rgb), .06);
    border-top: 1px solid rgba(var(--color-border-01-rgb), .06);
    color: var(--color-content-02);
    display: -ms-flexbox;
    display: flex;
    font-family: Sandoll Nemony2, Apple SD Gothic NEO, Helvetica Neue, Helvetica, 나눔고딕, NanumGothic, Malgun Gothic, 맑은 고딕, 굴림, gulim, 새굴림, noto sans, 돋움, Dotum, sans-serif;
    font-size: 15px;
    font-weight: 400;
    height: 100%;
    justify-content: center;
    padding: 0 44px;
    position: relative;
    z-index: 10;
   }
   #ext-header {
    height: 44px;
    position: relative;
   }
   #ext-content {
    padding: 10px;
   }
   #ext-tools {
    display: flex;
    flex-direction: row;
    gap: 5px;
   }
   #ext-tools > * {
    flex: 1;
    text-align: center;
    justify-content: center;
   }
   .ext-button {
    -ms-flex-align: center;
    align-items: center;
    color: var(--color-content-03);
    display: -ms-flexbox;
    display: flex;
    font-size: 15px;
    padding: 5px 8px;
   }
   .ext-button > svg {
     width: 26px;
     margin-right: 13px;
   }
   .ext-button:hover {
    background-color: var(--color-bg-overlay-03);
    border-radius: 6px;
   }

    #ext-list {
     margin-top: 10px;
    }
    .ext-list-item {
     display: flex;
     flex-direction: row;
     gap: 10px;
     align-items: center;
     margin-bottom: 16px;
    }
    .ext-list-index {
     background-color: var(--color-bg-01);
     border-radius: 6px;
     color: var(--color-content-03);
     padding: 5px 10px;
     font-size: 20px;
     position: relative;
    }
    .ext-hover {
        background-color: var(--color-bg-layer-01);
        border-radius: 6px;
        
        user-select: none;
        pointer-events: none;
        position: absolute;
        top: 50%;
        right: 0%;
        transform: translate(100%, -50%) translate(-10px, 0);
        padding: 5px;
        opacity: 0;
        transition: all 0.3s;

        font-size: 14px;
        width: fit-content;
        min-width: fit-content;
        text-wrap: nowrap;
    }
    .ext-list-index:hover .ext-hover {
        opacity: 1;
        transform: translate(100%, -50%) translate(10px, 0);
    }
    .ext-list-index:hover {
        cursor: pointer;
        background-color: var(--color-bg-overlay-03);
        border-radius: 6px;
    }
    .ext-list-cont {
     flex: 1;
    }
    .ext-list-name {
     font-size: 26px;
     width: 100%;
     box-sizing: border-box;
     font-weight: 500;
    }
    .ext-progress {
     border-radius: 6px;
     height: 10px;
     margin-top: 5px;
     overflow: hidden;
     width: 100%;
     background-color: var(--color-bg-layer-03);
    }
    .ext-progress-bar {
     background-color: var(--color-content-chzzk-01);
     height: 100%;
     transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .ext-list-statics {
     display: flex;
     flex-direction: column;
     text-align: center;
     gap: 5px;
    }
    .ext-list-static {
     color: var(--color-content-03);
    }
    .static-desc {
     color: var(--color-content-04);
     font-size: 0.9em;
    }
    .ext-maindesc {
        color: var(--color-content-04);
        font-size: 20px;
        margin: 13px 0;
        text-align: center;
    }
  `;
  let state = {
    isVoting: false,
    voteState: [],
    voters: [],
  };

  // ============================================== UI Render ==============================================
  const uiRoot = document.createElement("div");
  uiRoot.innerHTML = myUI;
  uiRoot.id = "chzzkExt-root";
  document.body.insertBefore(uiRoot, document.body.firstChild);
  const style = document.createElement("style");
  style.innerHTML = myCSS;
  document.head.appendChild(style);

  const waitForUI = async () => {
    let ui = document.getElementById("chzzkExt-root");
    while (!ui) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      ui = document.getElementById("chzzkExt-root");
    }
    return ui;
  };
  let ui = await waitForUI();
  appendAlert("치지직 채팅 툴이 적용되었습니다.");

  // ============================================== UI Handlers ==============================================

  const rerenderIndex = () => {
    const list = document.getElementById("ext-list");
    [...list.children].forEach((x, i) => {
      x.children[0].children[0].children[0].textContent = i + 1;
    });
  };

  document.getElementById("add-vote").addEventListener("click", () => {
    const list = document.getElementById("ext-list");
    const item = document.createElement("div");
    item.innerHTML = itemHTML.replace("#index", list.childElementCount + 1);
    list.appendChild(item);
    item.querySelector(".ext-list-index").addEventListener("click", () => {
      if (state.isVoting) return;
      item.remove();
      rerenderIndex();
    });
  });

  const rerenderStatics = () => {
    const list = document.getElementById("ext-list");
    const totalVoters = Math.max(state.voters.length, 1);
    [...list.children].forEach((x, i) => {
      const statics = x.children[0].children[2];
      const staticsChildren = statics.children;
      const voteCount = state.voteState[i].length;
      const votePercent =
        totalVoters === 0 ? 0 : (voteCount / totalVoters) * 100;
      staticsChildren[0].textContent = `${voteCount}명`;
      staticsChildren[1].textContent = `${votePercent.toFixed(2)}%`;

      const progress = x.children[0].children[1].children[1].children[0];
      progress.style.width = `${votePercent}%`;
    });
  };

  // ============================================== Vote Handlers ==============================================

  // 처음에 textContent를 바꿔주는 이유는 뭔가 모를 space가 생겨서 그거 없애려고
  document.getElementById("ext-button-vote-content").textContent = "추첨 시작";
  /**
   *
   * @param {string} x
   */
  const isNaN = (x) => {
    var reg = /^\d+$/;
    return !reg.test(x);
  };
  /**
   *
   * @param {string} uname sender
   * @param {string} content content
   * @param {boolean} isFan
   * @returns
   */
  const voteListner = (uname, content, isFan) => {
    if (!content.startsWith("!투표 ")) return;
    const voteContent = content.slice(4);
    const isNumber = !isNaN(voteContent);
    if (!isNumber) return;

    if (state.voters.includes(uname)) return;
    state.voters.push(uname);
    state.voteState[parseInt(voteContent) - 1].push(uname);
    rerenderStatics();
  };
  document.getElementById("toggle-vote").addEventListener("click", () => {
    state.isVoting = !state.isVoting;
    document.getElementById("ext-button-vote-content").textContent =
      state.isVoting ? "추첨 종료" : "추첨 시작";

    if (state.isVoting) {
      state.voteState = [];
      const voteItemcnt = document.getElementById("ext-list").childElementCount;
      for (let i = 0; i < voteItemcnt; i++) {
        state.voteState.push([]);
      }
      state.voters = [];
      rerenderStatics();

      addChatListener(voteListner);
      appendAlert("투표가 시작되었습니다.");
    } else {
      removeChatListener(voteListner);
      appendAlert("투표가 종료되었습니다.");
    }
  });

  window.chzzkExt = {
    state,
    chatEmitter,
    addChatListener,
    removeChatListener,
  };
})();
