import getChatWrapper from "../getChatWrapper";
import css from "#s/viewerview.static.css";
import styler from "@/utils/styler";

export default async function applyViewerChatView(enable: boolean) {
  if (!enable) {
    if (window.chzzkExt.viewerviewap) {
      window.chzzkExt.observer.disconnect();
      delete window.chzzkExt.viewerviewap;
    }
    styler("vv", css, false);
    return;
  }
  styler("vv", css, true);
  window.chzzkExt.observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      // class starts With chatting_popup_profile_container
      if (mutation.addedNodes.length == 0) continue;
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (!node.className.startsWith("live_chatting_popup_profile_header"))
          continue;
        const header = node as HTMLElement;
        const parent = header.parentElement;
        if (!parent) continue;

        const username = header.querySelector(
          `[class*=live_chatting_popup_profile_name]`,
        )?.textContent;
        if (!username) continue;

        const buttons = parent.children[1];
        if (!buttons) continue;

        const viewerviewbutton = document.createElement("button");
        viewerviewbutton.type = "button";
        viewerviewbutton.className = "vvbutton";
        viewerviewbutton.innerHTML = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="vvsvg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 6.7C7 6.3134 7.3134 6 7.7 6C8.0866 6 8.4 6.3134 8.4 6.7V19.3C8.4 19.6866 8.0866 20 7.7 20C7.3134 20 7 19.6866 7 19.3V6.7Z" fill="currentColor"></path><mask id="path-2-inside-1_986_17741" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 6H7V10V11V15H20L17.3 10.5L20 6Z"></path></mask><path d="M7 6V4.6H5.6V6H7ZM20 6L21.2005 6.72029L22.4727 4.6H20V6ZM7 15H5.6V16.4H7V15ZM20 15V16.4H22.4727L21.2005 14.2797L20 15ZM17.3 10.5L16.0995 9.77971L15.6673 10.5L16.0995 11.2203L17.3 10.5ZM7 7.4H20V4.6H7V7.4ZM8.4 10V6H5.6V10H8.4ZM5.6 10V11H8.4V10H5.6ZM5.6 11V15H8.4V11H5.6ZM7 16.4H20V13.6H7V16.4ZM21.2005 14.2797L18.5005 9.77971L16.0995 11.2203L18.7995 15.7203L21.2005 14.2797ZM18.7995 5.27971L16.0995 9.77971L18.5005 11.2203L21.2005 6.72029L18.7995 5.27971Z" fill="currentColor" mask="url(#path-2-inside-1_986_17741)"></path></svg>이 시청자 채팅만 보기`;

        viewerviewbutton.addEventListener("click", () => {
          const url = `https://chzzk.naver.com/live/${new URL(location.href).pathname.split("/")[2]}/chat?name=${encodeURIComponent(username)}`;
          window.open(url, "voter", "width=400,height=600");
        });

        buttons.appendChild(viewerviewbutton);
      }
    }
  });
  window.chzzkExt.observer.observe(await getChatWrapper(), {
    childList: true,
    subtree: true,
  });
}
