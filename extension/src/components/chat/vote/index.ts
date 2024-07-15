import styler from "#u/styler";
import itemHTML from "#s/voteItem.static.html";
import myCSS from "#s/voteui.static.css";
import myUI from "#s/voteui.static.html";

import getChatWrapper from "./getChatWrapper";
import createCustomAlertBox from "./createCustomAlertBox";
import { ChatItem, ExpendedSender, Sender } from "@/components/wsInject/type";
import { chatEmitter } from "@/components/wsInject";

export default async function initVoteTool(enable: boolean) {
  if (!enable) {
    try {
      const dtc = window.chzzkExt.voteTool.detatch;
      if (dtc) dtc();
    } catch (e) {}
    return;
  }
  if (window.chzzkExt.voteToolApplied) return;

  const boxContainer = await getChatWrapper();
  const appendAlert = (content: string) => {
    boxContainer.children[boxContainer.childElementCount - 2].appendChild(
      createCustomAlertBox(content),
    );
  };

  appendAlert("치지직 채팅 툴이 로딩되었습니다. (v1.1.0)");

  // ====================================
  const state: {
    isVoting: boolean;
    voteState: ExpendedSender[][];
    voters: string[];
  } = {
    isVoting: false,
    voteState: [],
    voters: [],
  };
  // ====================================
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
  // ====================================
  //
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
      ((list ? list.childElementCount || 0 : 0) + 1).toString(),
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

  const voteListner = (user: ExpendedSender, content: string) => {
    if (!content.startsWith("!투표 ")) return;
    const voteContent = content.slice(4);
    const isNumber = !isNaN(voteContent);
    if (!isNumber) return;

    if (state.voters.includes(user.userIdHash)) return;
    state.voters.push(user.userIdHash);
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
            "ext-modal-contentinner",
          );
          if (!modalContent) return;
          modalContent.innerHTML = "";

          state.voteState[i].forEach((user: ExpendedSender) => {
            const a = document.createElement("a");
            a.textContent = user.nickname;
            a.style.color = user.color.dark;
            a.classList.add("ext-person");
            a.setAttribute("target", "_blank");
            a.addEventListener("click", () => {
              const url = `https://chzzk.naver.com/live/${new URL(location.href).pathname.split("/")[2]}/chat?user=${user.userIdHash}`;
              window.open(url, "voter", "width=400,height=600");
            });

            modalContent.appendChild(a);
          });
          modal.style.display = "block";
        });
      }

      appendAlert("투표가 시작되었습니다.");
      document.querySelectorAll(".ext-showp").forEach((x) => {
        (x as HTMLDivElement).style.display = "none";
      });
    } else {
      appendAlert("투표가 종료되었습니다.");
      document.querySelectorAll(".ext-showp").forEach((x) => {
        (x as HTMLDivElement).style.display = "block";
      });
    }
  });

  chatEmitter.addEventListener("message", (e) => {
    const body = (e as CustomEvent).detail as ChatItem;
    if (!state.isVoting) return;
    voteListner(body.sender, body.content);
  });

  window.chzzkExt.voteToolApplied = true;
  window.chzzkExt.voteTool = {
    state,
    detatch: () => {
      document.getElementById("chzzkExt-root")?.remove();
      delete window.chzzkExt.voteTool;
      window.chzzkExt.voteToolApplied = false;
    },
  };
}
