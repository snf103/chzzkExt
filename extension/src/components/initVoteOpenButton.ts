import svg from "#s/voteButton.static.data";

const initVoteOpenButton = async (enable: boolean) => {
  if (!enable) {
    document.getElementById("chzzk-vote-open-button")?.remove();
    return;
  }
  if (document.getElementById("chzzk-vote-open-button") != null) return;
  const selector = () => {
    return document.querySelector("[class*=live_chatting_header_menu]");
  };
  const waitForSel = async () => {
    return new Promise<HTMLDivElement>((resolve) => {
      const interval = setInterval(() => {
        const sel = selector();
        if (sel) {
          clearInterval(interval);
          resolve(sel as HTMLDivElement);
        }
      }, 100);
    });
  };
  const box = await waitForSel();
  const myBtn = document.createElement("button");
  myBtn.id = "chzzk-vote-open-button";
  myBtn.style.color = "var(--color-content-04)";
  myBtn.style.padding = "8px";
  myBtn.style.cursor = "pointer";

  myBtn.innerHTML = svg;
  myBtn.style.width = "36px";
  myBtn.style.height = "44px";
  myBtn.style.boxSizing = "border-box";

  box.appendChild(myBtn);
  myBtn.addEventListener("click", () => {
    window.open(window.location.href + "/chat?ext", "_blank");
  });
  myBtn.addEventListener("mouseenter", () => {
    myBtn.style.color = "var(--color-content-02)";
    const mbc = myBtn.children[0] as HTMLDivElement;
    mbc.style.backgroundColor = "var(--color-bg-overlay-03)";
    mbc.style.borderRadius = "6px";
    mbc.style.padding = "2px";
    mbc.style.margin = "-2px";
  });
  myBtn.addEventListener("mouseleave", () => {
    myBtn.style.color = "var(--color-content-04)";
    const mbc = myBtn.children[0] as HTMLDivElement;
    mbc.style.backgroundColor = "transparent";
    mbc.style.borderRadius = "0px";
    mbc.style.padding = "0px";
    mbc.style.margin = "0px";
  });
};

export default initVoteOpenButton;
