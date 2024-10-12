import configInstance, { defaultConfig } from "@config";
import onoffer from "#u/onoffer";

export default function initUI_ED() {
  const cfg = (key: keyof typeof defaultConfig) => {
    return configInstance.get(key, defaultConfig[key]);
  };
  // 상단바
  onoffer(
    document.querySelector(`[href="https://game.naver.com/profile#cash"]`),
    cfg("ed_chz")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/ticket"]`),
    cfg("ed_tic")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/notify"]`),
    cfg("ed_noti")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/profile#cheat_key"]`),
    cfg("ed_chkey")
  );

  // 메인메뉴
  onoffer(
    document.querySelector(`[class*="top_banner_container"]`),
    cfg("ed_mi_ban")
  );
  onoffer(
    document.querySelector(`[class*="recommend_live_container"]`),
    cfg("ed_rec_live")
  );

  // 사이드바 하단
  onoffer(
    document.querySelector(`[href="https://game.naver.com"]`),
    cfg("ed_si_game")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/esports"]`),
    cfg("ed_si_esp")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/original_series"]`),
    cfg("ed_si_ori")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/pcgame"]`),
    cfg("ed_si_pcg")
  );
  onoffer(
    document.querySelector(`[href="https://game.naver.com/lounge/chzzk/home"]`),
    cfg("ed_si_chr")
  );

  // 사이드바 상단
  onoffer(document.querySelector(`[href="/lives"]`), cfg("ed_su_al"));
  onoffer(document.querySelector(`[href="/clips"]`), cfg("ed_si_rw"));
  onoffer(document.querySelector(`[href="/category"]`), cfg("ed_si_ct"));
  onoffer(document.querySelector(`[href="/following"]`), cfg("ed_si_fl"));
  onoffer(document.querySelector(`[class*="toolbar_studio"]`), cfg("ed_si_sd"));

  onoffer(
    document.querySelector(`[class*="live_chatting_ranking_container"]`),
    cfg("disable_donate_rank")
  );

  // onoffer(
  //   document.querySelector(`[class*="live_chatting_ranking_container"]`),
  //   cfg("hideck"),
  // );

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

    onoffer(contents["팔로우"], cfg("ed_sc_fl"));
    onoffer(contents["추천"], cfg("ed_sc_rc"));
    onoffer(contents["파트너"], cfg("ed_sc_pt"));
  }

  // home menu
  const homecont = document.querySelector(`section[class*="home_section"]`);
  const hideCat = (configInstance.get("hidecat", "") as string).split("\n");
  console.log("HIDECAT", hideCat);
  if (homecont) {
    const sections = homecont.querySelectorAll(
      `section[class*="home_component_container"]`
    );
    console.log("SECTIONS", sections);
    for (let i = 0; i < sections.length; i++) {
      const sectionTitleElement = sections[i].querySelector(
        `strong[class*="home_component_title"]`
      );
      if (!sectionTitleElement) continue;
      const sectionTitle = (
        sectionTitleElement.textContent || sectionTitleElement.innerHTML
      ).trim();
      console.log("SECTIONTITLE", sectionTitle);

      const hide = hideCat.includes(sectionTitle);

      onoffer(sections[i] as HTMLDivElement, hide);
    }
  }
}
