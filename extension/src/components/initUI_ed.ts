import configInstance, { defaultConfig } from "../constants/config";
import styler from "../styler";

export default function initUI_ED() {
  styler(
    "chzzkUI",
    `[chzzkUI="off"] { display: none! important; margin: 0px! important; padding: 0px! important; }`
  );

  const onoff = (element: HTMLElement | null, hide: boolean) => {
    if (!element) return;
    if (hide) {
      element.setAttribute("chzzkUI", "off");
    } else {
      element.setAttribute("chzzkUI", "on");
    }
  };

  // 상단바
  onoff(
    document.querySelector(`[href="https://game.naver.com/profile#cash"]`),
    configInstance.get("ed_chz", defaultConfig.ed_chz)
  );
  onoff(
    document.querySelector(`[href="https://game.naver.com/ticket"]`),
    configInstance.get("ed_tic", defaultConfig.ed_tic)
  );
  onoff(
    document.querySelector(`[href="https://game.naver.com/notify"]`),
    configInstance.get("ed_noti", defaultConfig.ed_noti)
  );

  // 메인메뉴
  onoff(
    document.querySelector(`[class*="top_banner_container"]`),
    configInstance.get("ed_mi_ban", defaultConfig.ed_mi_ban)
  );
  onoff(
    document.querySelector(`[class*="recommend_live_container"]`),
    configInstance.get("ed_rec_live", defaultConfig.ed_rec_live)
  );

  // 사이드바 하단
  onoff(
    document.querySelector(`[href="https://game.naver.com"]`),
    configInstance.get("ed_si_game", defaultConfig.ed_si_game)
  );
  onoff(
    document.querySelector(`[href="https://game.naver.com/esports"]`),
    configInstance.get("ed_si_esp", defaultConfig.ed_si_esp)
  );
  onoff(
    document.querySelector(`[href="https://game.naver.com/original_series"]`),
    configInstance.get("ed_si_ori", defaultConfig.ed_si_ori)
  );
  onoff(
    document.querySelector(`[href="https://game.naver.com/pcgame"]`),
    configInstance.get("ed_si_pcg", defaultConfig.ed_si_pcg)
  );
  onoff(
    document.querySelector(`[href="https://game.naver.com/lounge/chzzk/home"]`),
    configInstance.get("ed_si_chr", defaultConfig.ed_si_chr)
  );

  // 사이드바 상단
  onoff(
    document.querySelector(`[href="/lives"]`),
    configInstance.get("ed_su_al", defaultConfig.ed_su_al)
  );
  onoff(
    document.querySelector(`[href="/videos"]`),
    configInstance.get("ed_si_rw", defaultConfig.ed_si_rw)
  );
  onoff(
    document.querySelector(`[href="/category"]`),
    configInstance.get("ed_si_ct", defaultConfig.ed_si_ct)
  );
  onoff(
    document.querySelector(`[href="/following"]`),
    configInstance.get("ed_si_fl", defaultConfig.ed_si_fl)
  );
  onoff(
    document.querySelector(`[class*="toolbar_studio"]`),
    configInstance.get("ed_si_sd", defaultConfig.ed_si_sd)
  );

  // 사이드바 navi
  const navicont = document.querySelector(`nav[id="navigation"]`);
  if (navicont) {
    const contents: { [key: string]: HTMLDivElement } = {};
    for (let i = 0; i < navicont.children.length; i++) {
      const child = navicont.children[i];
      if (child instanceof HTMLDivElement) {
        const tt = child.querySelector("h2");
        if (!tt) continue;
        contents[tt.textContent || tt.innerText] = child;
      }
    }

    onoff(
      contents["팔로우"],
      configInstance.get("ed_sc_fl", defaultConfig.ed_sc_fl)
    );
    onoff(
      contents["추천"],
      configInstance.get("ed_sc_rc", defaultConfig.ed_sc_rc)
    );
    onoff(
      contents["파트너"],
      configInstance.get("ed_sc_pt", defaultConfig.ed_sc_pt)
    );
  }

  // home menu
  const homecont = document.querySelector(`section[class*="home_section"]`);
  const matchHKey: { [key: string]: string } = {
    "좋아하실 것 같아요": "ed_hm_lk",
    "신입 스트리머 인사드립니다!": "ed_hm_nw",
    "이 라이브 어때요?": "ed_hm_how",
    "팔로잉 채널 라이브": "ed_hm_fl",
  };
  const minc = Object.keys(matchHKey);
  if (homecont) {
    const sections = homecont.querySelectorAll(
      `section[class*="component_container"]`
    );
    for (let i = 0; i < sections.length; i++) {
      const sectionTitleElement = sections[i].querySelector(
        `strong[class*="component_title"]`
      );
      if (!sectionTitleElement) continue;
      const sectionTitle =
        sectionTitleElement.textContent || sectionTitleElement.innerHTML;

      const hide =
        minc.includes(sectionTitle) &&
        configInstance.get(matchHKey[sectionTitle], false);

      onoff(sections[i] as HTMLDivElement, hide);
    }
  }
}
