import configInstance, { defaultConfig } from "@config";

import { applyWSInject, expose2chzzk } from "./wsInject";
import { applyChatTools } from "./chat";

import iAdSkip from "./initAdSkip";
import iVoteOpenButton from "./initVoteOpenButton";
import iAdBlock from "./initAdBlock";
import iHideDonation from "./initHideDonation";
import iReverseChat from "./chat/initReverseChat";
import iautoShowChat from "./initautoShowChat";
import iLatencyView from "./initLatencyView";
import iVod from "./initVod";
import iChatFix from "./initChatFix";
import iVodLoc from "./initVodLoc";
import iRefreshSidebar from "./initRefreshSidebar";
import iRemoveOfflineChannel from "./initRemoveOfflineChannel";
import iUI_ED from "./initUI_ed";
import initStaticLogo from "./initStaticLogo";
import initShortsDL from "./initShortsDL";

export default function apply() {
  const nowPath = window.location.pathname;
  const npsp = nowPath.split("/");
  const sp = new URLSearchParams(window.location.search);

  const comparePath = (p: string) => {
    const psp = p.split("/");
    if (psp.length != npsp.length) return false;
    for (let i = 0; i < psp.length; i++) {
      if (psp[i] == "*") continue;
      if (psp[i] != npsp[i]) return false;
    }
    return true;
  };

  const cfg = (key: keyof typeof defaultConfig) =>
    configInstance.get(key, defaultConfig[key]);

  // ======================== 여기에 적용할 기능을 추가하세요 ========================
  applyWSInject();
  expose2chzzk();

  applyChatTools(cfg, comparePath, sp);
  iVoteOpenButton(cfg("voteTool") && comparePath("/live/*"));

  iVod(cfg("vodDownload") && comparePath("/video/*"));
  iVodLoc(cfg("saveVodLoc") && comparePath("/video/*"));

  iAdBlock(cfg("adblock"));
  iAdSkip(cfg("adskip"));
  iHideDonation(cfg("hideDonation"));
  iReverseChat(cfg("reversedChat"));
  iautoShowChat(cfg("autoShowChat"));
  iLatencyView(cfg("latencyView"), cfg("showBuffer"));
  iChatFix(cfg("chat_nfo"), cfg("chat_nff"));
  iRefreshSidebar(cfg("refreshSidebar"));
  iRemoveOfflineChannel(cfg("remove_offline_channel"));
  initStaticLogo(cfg("staticlogo"));

  initShortsDL(cfg("clipDownload") && comparePath("/clips/*"));

  iUI_ED();
  // UI fetch후 다시 적용
  setTimeout(iUI_ED, 500);
  setTimeout(iUI_ED, 1000);
  setTimeout(iUI_ED, 1500);
  setTimeout(iUI_ED, 2000);
  // ======================= /여기에 적용할 기능을 추가하세요/ =======================
}
