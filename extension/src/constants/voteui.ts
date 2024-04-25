const myUI = `
<div id="ext-main">
  <div id="ext-modal">
    <div id="ext-modal-content">
      <h2 id="ext-modal-title">투표자 목록</h2>
      <div id="ext-modal-contentinner"></div>
    </div>
    <div id="ext-modal-bg"></div>
  </div>
  <header id="ext-header">
    <h2 id="ext-title">치지직 채팅 툴</h2>
  </header>
  <div id="ext-content">
    <div id="ext-tools">
      <button class="ext-button" id="add-vote">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 -960 960 960"
          width="40"
        >
          <path
            fill="currentColor"
            d="M446.667-446.667H233.333q-14.166 0-23.75-9.617Q200-465.901 200-480.117q0-14.216 9.583-23.716 9.584-9.5 23.75-9.5h213.334v-213.334q0-14.166 9.617-23.75Q465.901-760 480.117-760q14.216 0 23.716 9.583 9.5 9.584 9.5 23.75v213.334h213.334q14.166 0 23.75 9.617Q760-494.099 760-479.883q0 14.216-9.583 23.716-9.584 9.5-23.75 9.5H513.333v213.334q0 14.166-9.617 23.75Q494.099-200 479.883-200q-14.216 0-23.716-9.583-9.5-9.584-9.5-23.75v-213.334Z"
          />
        </svg>
        <span>항목 추가</span>
      </button>
      <button class="ext-button" id="toggle-vote">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 -960 960 960"
          width="40"
        >
          <path
            fill="currentColor"
            d="M186.666-80q-27 0-46.833-19.833T120-146.666V-314q0-11.711 4.333-23.421 4.334-11.711 13-20.912l86.001-96.001q9.667-11 23.833-11.167 14.167-.166 24.08 9.747 9.087 9.087 9.753 22.753.667 13.667-8.333 23.667l-83.668 92.667h582.002l-79.001-90q-9-10-8.187-23.285.813-13.285 9.76-22.418 9.76-9.964 24.26-9.797 14.5.167 24.166 11.166l81.334 92.668q8.667 9 12.667 20.778 4 11.777 4 23.555v167.334q0 27-19.833 46.833T773.334-80H186.666Zm0-66.666h586.668V-250H186.666v103.334ZM436.334-385 283.333-538Q263-558.334 264.5-585.167 266-612 285.667-631.666l206.667-206.667q18.956-18.707 46.977-19.52Q567.333-858.667 587-839l153 153q19 19 19.667 45.667.666 26.666-20.334 47.666l-208 208q-19 19-46.833 19.5T436.334-385Zm251-256L540.333-788 335.667-583.333l147 147L687.334-641ZM186.666-146.666V-250v103.334Z"
          />
        </svg>
        <span id="ext-button-vote-content"></span>
      </button>
    </div>
    <div class="ext-maindesc">"!투표 숫자"를 채팅에 입력해서 투표하세요.</div>
    <div id="ext-list"></div>
  </div>
</div>`;
const itemHTML = `
<div class="ext-list-item">
  <div class="ext-list-index">
    <span>#index</span>
    <div class="ext-hover">삭제하려면 클릭하세요</div>
  </div>
  <div class="ext-list-cont">
    <div class="ext-row">
      <input class="ext-list-name" value="" placeholder="내용을 입력하세요" />
      <div class="ext-showp">투표자 보기</div>
    </div>
    <div class="ext-progress">
      <div class="ext-progress-bar" style="width: 0%"></div>
    </div>
  </div>
  <div class="ext-list-statics">
    <div class="ext-list-static">0명</div>
    <div class="ext-list-static static-desc">0.00%</div>
  </div>
</div>`;
const myCSS = `
body {
  display: flex;
  flex-direction: row;
}
#root {
  /* 네이버의 메인 ui */
  overflow: hidden;
  flex: 1;
  max-width: 400px;
}
#chzzkExt-root {
  flex: 1;
  flex-grow: 1;
  position: relative;
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
  border-bottom: 1px solid rgba(var(--color-border-01-rgb), 0.06);
  border-left: 0 solid rgba(var(--color-border-01-rgb), 0.06);
  border-right: 0 solid rgba(var(--color-border-01-rgb), 0.06);
  border-top: 1px solid rgba(var(--color-border-01-rgb), 0.06);
  color: var(--color-content-02);
  display: -ms-flexbox;
  display: flex;
  font-family:
    Sandoll Nemony2,
    Apple SD Gothic NEO,
    Helvetica Neue,
    Helvetica,
    나눔고딕,
    NanumGothic,
    Malgun Gothic,
    맑은 고딕,
    굴림,
    gulim,
    새굴림,
    noto sans,
    돋움,
    Dotum,
    sans-serif;
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
.ext-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}
.ext-showp {
  color: var(--color-content-04);
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  min-width: fit-content;
  display: none;
}

#ext-modal {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
#ext-modal-bg {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 101;
}
#ext-modal-content {
  z-index: 102;
  background-color: var(--color-bg-layer-04);
  width: min(90%, 500px);
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  display: flex;
  overflow: hidden;
  flex-direction: column;
}

#ext-modal-title {
  font-size: 20px;
  padding: 13px;
  text-align: center;
}

#ext-modal-contentinner {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background: var(--color-bg-layer-02);
}

.ext-person {
  border-radius: 6px;
  padding: 4px 2px;
}
`;

export { itemHTML, myCSS, myUI };
