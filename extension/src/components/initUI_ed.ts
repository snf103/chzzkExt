import configInstance, { defaultConfig } from "../config";
import onoffer from "../utils/onoffer";

export default function initUI_ED() {
  // 상단바
  onoffer(
    document.querySelector(`[href="https://game.naver.com/profile#cash"]`),
    configInstance.get("ed_chz", defaultConfig.ed_chz)
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/ticket"]`),
    configInstance.get("ed_tic", defaultConfig.ed_tic)
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/notify"]`),
    configInstance.get("ed_noti", defaultConfig.ed_noti)
  );

  // 메인메뉴
  onoffer(
    document.querySelector(`[class*="top_banner_container"]`),
    configInstance.get("ed_mi_ban", defaultConfig.ed_mi_ban)
  );
  onoffer(
    document.querySelector(`[class*="recommend_live_container"]`),
    configInstance.get("ed_rec_live", defaultConfig.ed_rec_live)
  );

  // 사이드바 하단
  onoffer(
    document.querySelector(`[href="https://game.naver.com"]`),
    configInstance.get("ed_si_game", defaultConfig.ed_si_game)
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/esports"]`),
    configInstance.get("ed_si_esp", defaultConfig.ed_si_esp)
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/original_series"]`),
    configInstance.get("ed_si_ori", defaultConfig.ed_si_ori)
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/pcgame"]`),
    configInstance.get("ed_si_pcg", defaultConfig.ed_si_pcg)
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/lounge/chzzk/home"]`),
    configInstance.get("ed_si_chr", defaultConfig.ed_si_chr)
  );

  // 사이드바 상단
  onoffer(
    document.querySelector(`[href="/lives"]`),
    configInstance.get("ed_su_al", defaultConfig.ed_su_al)
  );
  onoffer(
    document.querySelector(`[href="/videos"]`),
    configInstance.get("ed_si_rw", defaultConfig.ed_si_rw)
  );
  onoffer(
    document.querySelector(`[href="/category"]`),
    configInstance.get("ed_si_ct", defaultConfig.ed_si_ct)
  );
  onoffer(
    document.querySelector(`[href="/following"]`),
    configInstance.get("ed_si_fl", defaultConfig.ed_si_fl)
  );
  onoffer(
    document.querySelector(`[class*="toolbar_studio"]`),
    configInstance.get("ed_si_sd", defaultConfig.ed_si_sd)
  );
  onoffer(
    document.querySelector(`[class*="live_chatting_ranking_container"]`),
    configInstance.get("disable_donate_rank", defaultConfig.disable_donate_rank)
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

    onoffer(
      contents["팔로우"],
      configInstance.get("ed_sc_fl", defaultConfig.ed_sc_fl)
    );
    onoffer(
      contents["추천"],
      configInstance.get("ed_sc_rc", defaultConfig.ed_sc_rc)
    );
    onoffer(
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

      onoffer(sections[i] as HTMLDivElement, hide);
    }
  }
}
