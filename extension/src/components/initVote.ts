import styler from "../utils/styler";
import itemHTML from "../static/voteItem.static.html";
import myCSS from "../static/voteui.static.css";
import myUI from "../static/voteui.static.html";

type IBadge = string;
type ICUser = {
  name: string;
  color: string;
  isFan: boolean;
  badges: IBadge[];
};
type ICallback = (user: ICUser, content: string, isFan: boolean) => void;

const initVote = async (enable: boolean) => {
  if (!enable) {
    try {
      const dtc = window.chzzkExt.voteTool.detatch;
      if (dtc) dtc();
    } catch (e) {}
    return;
  }
  if (window.chzzkExt.voteToolApplied) return;
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
    return list[0][0] as HTMLDivElement;
  };

  const boxContainer = await waitForBox();
  const createCustomAlertBox = (content: string) => {
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

    inner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 15px; height: 15px; color:var(--color-content-02);flex:none;margin:1px 10px 0 0" height="40" viewBox="0 -960 960 960" width="40"><path fill="currentColor" d="M354.667-120H186.666q-27 0-46.833-19.833T120-186.666v-168.001q45.333-3.333 78.333-33.166 33-29.834 33-74.167t-33-74.167Q165.333-566 120-569.333v-168.001q0-27 19.833-46.833T186.666-804H358q7.333-40.667 36-68.333Q422.667-900 463.333-900q40.667 0 69.334 27.667 28.666 27.666 36 68.333h168.667q27 0 46.833 19.833T804-737.334v168.667q40.667 7.334 67.333 37.334 26.667 30 26.667 70.666 0 40.667-26.667 68.334-26.666 27.666-67.333 35v170.667q0 27-19.833 46.833T737.334-120H569.333q-3.333-48.667-34.166-80-30.834-31.333-73.167-31.333T388.833-200Q358-168.667 354.667-120Zm-168.001-66.666h115.001q24.667-62.667 72.259-87 47.591-24.333 87.999-24.333 40.408 0 88.075 24.333 47.666 24.333 72.333 87h115.001v-236.667H794q16 0 26.667-10.667 10.667-10.666 10.667-26.667 0-16-10.667-26.667Q810-498.001 794-498.001h-56.666v-239.333H500.667V-796q0-16-10.667-26.667-10.666-10.667-26.667-10.667-16 0-26.667 10.667Q426-812 426-796v58.666H186.666v116.001q50.1 18.544 80.717 62.124 30.616 43.579 30.616 97.357 0 52.852-30.666 96.518-30.667 43.667-80.667 62.667v116.001Zm276.667-274.001Z"/></svg>`;
    const p = document.createElement("p");
    p.innerHTML = content;
    inner.appendChild(p);
    return outer;
  };
  /**
   * 바로 boxContainer에 append할 경우 스크롤 되지 않고 항상 아래에 고정되기 때문에 마지막 채팅에 append
   */
  const appendAlert = (content: string) => {
    boxContainer.children[boxContainer.childElementCount - 2].appendChild(
      createCustomAlertBox(content)
    );
  };

  const listeners: ICallback[] = [];
  const addChatListener = (listener: ICallback) => {
    listeners.push(listener);
  };
  const removeChatListener = (listener: ICallback) => {
    listeners.splice(listeners.indexOf(listener), 1);
  };
  const chatEmitter = (user: ICUser, content: string, isFan: boolean) => {
    listeners.forEach((listener) => listener(user, content, isFan));
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length === 0) return;
      const target = mutation.addedNodes[0] as HTMLDivElement;
      if (!target.className.includes("chatting_list_item")) return;
      const c = target.children[0].children[0];
      const uname = c.children[0].textContent;
      const ucolor = (
        c.children[0].children[
          c.children[0].childElementCount - 1
        ] as HTMLSpanElement
      ).style.color;
      const content = c.children[1].textContent;
      const isFan = c.children[0].childElementCount > 1;
      const badges: IBadge[] = [];
      if (isFan) {
        const base = c.children[0].children[0];

        for (let i = 0; i < base.childElementCount; i++) {
          const cont = (
            base.children[i].children[0].children[0] as HTMLImageElement
          ).src;
          badges.push(cont);
        }
      }
      chatEmitter(
        {
          name: uname || "",
          color: ucolor,
          isFan,
          badges,
        },
        content || "",
        isFan
      );
    });
  });
  observer.observe(boxContainer as HTMLDivElement, {
    childList: true,
  });

  appendAlert("치지직 채팅 툴이 로딩되었습니다. (v1.0.0)");

  // ============================================== Data ==============================================

  const state: {
    isVoting: boolean;
    voteState: ICUser[][];
    voters: string[];
  } = {
    isVoting: false,
    voteState: [],
    voters: [],
  };

  // ============================================== UI Render ==============================================
  const uiRoot = document.createElement("div");
  uiRoot.innerHTML = myUI;
  uiRoot.id = "chzzkExt-root";
  document.body.insertBefore(uiRoot, document.body.firstChild);
  styler("voteui", myCSS);

  const waitForUI = async () => {
    let ui = document.getElementById("chzzkExt-root");
    while (!ui) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      ui = document.getElementById("chzzkExt-root");
    }
    return ui;
  };
  await waitForUI();
  appendAlert("치지직 채팅 툴이 적용되었습니다.");

  // ============================================== UI Handlers ==============================================

  const rerenderIndex = () => {
    const list = document.getElementById("ext-list");
    if (!list) return;
    [...list.children].forEach((x, i) => {
      x.children[0].children[0].children[0].textContent = (i + 1).toString();
    });
  };

  document.getElementById("add-vote")?.addEventListener("click", () => {
    const list = document.getElementById("ext-list");
    const item = document.createElement("div");
    if (!list) return;
    item.innerHTML = itemHTML.replace(
      "#index",
      ((list ? list.childElementCount || 0 : 0) + 1).toString()
    );
    list.appendChild(item);
    item.querySelector(".ext-list-index")?.addEventListener("click", () => {
      if (state.isVoting) return;
      item.remove();
      rerenderIndex();
    });
  });
  document.getElementById("ext-modal-bg")?.addEventListener("click", () => {
    const exm = document.getElementById("ext-modal");
    if (exm) exm.style.display = "none";
    const emc = document.getElementById("ext-modal-contentinner");
    if (emc) {
      emc.innerHTML = "";
      emc.scrollTop = 0;
    }
  });

  const rerenderStatics = () => {
    const list = document.getElementById("ext-list");
    if (!list) return;
    const totalVoters = Math.max(state.voters.length, 1);
    [...list.children].forEach((x, i) => {
      const statics = x.children[0].children[2];
      const staticsChildren = statics.children;
      const voteCount = state.voteState[i].length;
      const votePercent =
        totalVoters === 0 ? 0 : (voteCount / totalVoters) * 100;
      staticsChildren[0].textContent = `${voteCount}명`;
      staticsChildren[1].textContent = `${votePercent.toFixed(2)}%`;

      const progress = x.children[0].children[1].children[1]
        .children[0] as HTMLDivElement;
      progress.style.width = `${votePercent}%`;
    });
  };

  // ============================================== Vote Handlers ==============================================

  // 처음에 textContent를 바꿔주는 이유는 뭔가 모를 space가 생겨서 그거 없애려고
  const vc = document.getElementById("ext-button-vote-content");
  if (vc) vc.textContent = "추첨 시작";
  const isNaN = (x: string) => {
    const reg = /^\d+$/;
    return !reg.test(x);
  };

  const voteListner = (user: ICUser, content: string) => {
    if (!content.startsWith("!투표 ")) return;
    const voteContent = content.slice(4);
    const isNumber = !isNaN(voteContent);
    if (!isNumber) return;

    if (state.voters.includes(user.name)) return;
    state.voters.push(user.name);
    state.voteState[parseInt(voteContent) - 1].push(user);
    rerenderStatics();
  };
  document.getElementById("toggle-vote")?.addEventListener("click", () => {
    if (
      !state.isVoting &&
      document.getElementById("ext-list")?.childElementCount === 0
    ) {
      appendAlert("투표 항목을 추가해주세요.");
      return;
    }
    state.isVoting = !state.isVoting;
    const vcon = document.getElementById("ext-button-vote-content");
    if (vcon) vcon.textContent = state.isVoting ? "추첨 종료" : "추첨 시작";

    if (state.isVoting) {
      state.voteState = [];
      const lst = document.getElementById("ext-list");
      const voteItemcnt = lst?.childElementCount || 0;
      for (let i = 0; i < voteItemcnt; i++) {
        state.voteState.push([]);
      }
      state.voters = [];
      rerenderStatics();

      for (let i = 0; i < voteItemcnt; i++) {
        if (!lst) continue;
        const ch = lst.children[i];
        ch.querySelector(".ext-showp")?.addEventListener("click", () => {
          const modal = document.getElementById("ext-modal");
          if (!modal) return;
          const modalContent = document.getElementById(
            "ext-modal-contentinner"
          );
          if (!modalContent) return;
          modalContent.innerHTML = "";

          state.voteState[i].forEach((user: ICUser) => {
            const div = document.createElement("div");
            div.textContent = user.name;
            div.style.color = user.color;
            div.classList.add("ext-person");
            user.badges.forEach((badge: IBadge) => {
              div.innerHTML = `<img src="${badge}" width="18" height="18" /> ${div.innerHTML}`;
            });
            modalContent.appendChild(div);
          });
          modal.style.display = "block";
        });
      }

      addChatListener(voteListner);
      appendAlert("투표가 시작되었습니다.");
      document.querySelectorAll(".ext-showp").forEach((x) => {
        (x as HTMLDivElement).style.display = "none";
      });
    } else {
      removeChatListener(voteListner);
      appendAlert("투표가 종료되었습니다.");
      document.querySelectorAll(".ext-showp").forEach((x) => {
        (x as HTMLDivElement).style.display = "block";
      });
    }
  });

  window.chzzkExt.voteToolApplied = true;
  window.chzzkExt.voteTool = {
    state,
    chatEmitter,
    addChatListener,
    removeChatListener,
    detatch: () => {
      observer.disconnect();
      document.getElementById("chzzkExt-root")?.remove();
      delete window.chzzkExt.voteTool;
      listeners.length = 0;
      window.chzzkExt.voteToolApplied = false;
    },
  };
};

export default initVote;
