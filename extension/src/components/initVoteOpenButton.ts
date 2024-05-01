const initVoteOpenButton = async (enable: boolean) => {
  if (!enable) {
    document.getElementById("chzzk-vote-open-button")?.remove();
    return;
  }
  if (document.getElementById("chzzk-vote-open-button") != null) return;
  const selector = () => {
    return document.querySelector(
      "#layout-body > section > aside > div > div:nth-child(3)"
    );
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

  myBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 26px;" height="40" viewBox="0 -960 960 960" width="40"><path fill="currentColor" d="M186.666-80q-27 0-46.833-19.833T120-146.666V-314q0-11.711 4.333-23.421 4.334-11.711 13-20.912l86.001-96.001q9.667-11 23.833-11.167 14.167-.166 24.08 9.747 9.087 9.087 9.753 22.753.667 13.667-8.333 23.667l-83.668 92.667h582.002l-79.001-90q-9-10-8.187-23.285.813-13.285 9.76-22.418 9.76-9.964 24.26-9.797 14.5.167 24.166 11.166l81.334 92.668q8.667 9 12.667 20.778 4 11.777 4 23.555v167.334q0 27-19.833 46.833T773.334-80H186.666Zm0-66.666h586.668V-250H186.666v103.334ZM436.334-385 283.333-538Q263-558.334 264.5-585.167 266-612 285.667-631.666l206.667-206.667q18.956-18.707 46.977-19.52Q567.333-858.667 587-839l153 153q19 19 19.667 45.667.666 26.666-20.334 47.666l-208 208q-19 19-46.833 19.5T436.334-385Zm251-256L540.333-788 335.667-583.333l147 147L687.334-641ZM186.666-146.666V-250v103.334Z"></path></svg>`;
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
