// 상황에 따라 async function으로 구현할 수 있습니다.
export default function initLatencyView(
  enableLat: boolean,
  enableBuf: boolean
) {
  // 기능을 비활성화 할 때 실행할 코드
  if (window.chzzkExt.latencyView) {
    clearInterval(window.chzzkExt.latencyView);
    document.querySelectorAll(`[chzzkExt="latencyView"]`).forEach((x) => {
      x.removeAttribute("chzzkExt");
      x.setAttribute("placeholder", "채팅을 입력해주세요");
    });
    delete window.chzzkExt.latencyView;
  }
  if (enableLat || enableBuf)
    // 기능을 활성화 할 때 실행할 코드
    window.chzzkExt.latencyView = setInterval(() => {
      document
        .querySelectorAll(
          `textarea[class*=live_chatting_input_input]:not([chzzkExt="latencyView"])`
        )
        .forEach((x) => {
          x.setAttribute("chzzkExt", "latencyView");
          x.setAttribute("placeholder", "로딩중...");
        });

      document.querySelectorAll(`[chzzkExt="latencyView"]`).forEach((x) => {
        const showStr: string[] = [];
        if (enableLat) {
          if (window.__getLiveInfo) {
            const lat = window.__getLiveInfo().latency;
            if (isNaN(lat)) {
              showStr.push("레이턴시: 새로고침필요");
            } else showStr.push(`레이턴시: ${lat}ms`);
          } else {
            showStr.push("레이턴시: 새로고침필요");
          }
        }
        if (enableBuf) {
          const bufVid = document.querySelector(
            ".webplayer-internal-video"
          ) as HTMLVideoElement;
          if (bufVid) {
            const buf = bufVid.buffered.end(0) - bufVid.currentTime;
            showStr.push(`버퍼량: ${buf.toFixed(0)}ms`);
          } else {
            showStr.push("버퍼량: 0ms");
          }
        }
        x.setAttribute("placeholder", showStr.join(" / "));
      });
    }, 100);
}
