import configInstance, { defaultConfig } from "@config";

export default function vod() {
  chrome.webRequest.onCompleted.addListener(
    async (requestDetails) => {
      if (!configInstance.get("vodDownload", defaultConfig.vodDownload)) return;
      if (requestDetails.initiator != "https://chzzk.naver.com") return;
      if (
        !requestDetails.url.startsWith(
          "https://apis.naver.com/neonplayer/vodplay/v2/playback/"
        )
      )
        return;

      console.log(requestDetails.url);

      const tab = await chrome.tabs.get(requestDetails.tabId);
      const tabId = requestDetails.tabId;
      const [{ result: exr }] = await chrome.scripting.executeScript({
        target: {
          tabId: tabId,
        },
        func: () => {
          return document.querySelector(`button[chzzkExt="voddl"]`) ||
            (document.body.getAttribute("chzzkExt_dl") != null &&
              document.body.getAttribute("chzzkExt_dl") != "") ||
            document.body.getAttribute("chzzkExt_dl_fetch") == "true" ||
            typeof (window as any).chzzkExt_dl_fetch != "undefined"
            ? true
            : false;
        },
      });
      if (exr) return;

      const taburl = new URL(tab.url!);
      console.log(taburl);
      const vid = taburl.pathname.replace("/video/", "");

      // https://api.chzzk.naver.com/service/v2/videos/26F8F68C7EAB2AF82B67C2262953FCCA04AD
      // 여기에서 HLS Key를 Fetch함
      const [{ result: vinfo }] = await chrome.scripting.executeScript({
        target: {
          tabId,
        },
        func: (vid) => {
          return fetch(`https://api.chzzk.naver.com/service/v2/videos/${vid}`, {
            method: "GET",
            credentials: "include",
            headers: {
              Cookie: document.cookie,
            },
          }).then((resp) => resp.json());
        },
        args: [vid],
      });

      console.log(vinfo);

      const videoInfo = vinfo.content;

      // https://apis.naver.com/neonplayer/vodplay/v1/playback/26F8F68C7EAB2AF82B67C2262953FCCA04AD?key=V128e4add35023e0040d004cc676647dae467d6cc2691a9b5b5a68486313024caed2e04cc676647dae467&sid=2099&env=real&st=5&lc=ko_KR&cpl=ko_KR
      // 여기에서 PLAYBACK 요청하는듯
      const [{ result: playback }] = await chrome.scripting.executeScript({
        target: {
          tabId,
        },
        func: (vid, query) => {
          return fetch(
            `https://apis.naver.com/neonplayer/vodplay/v1/playback/${vid}?${query}`
          ).then((res) => res.json());
        },
        args: [
          videoInfo.videoId,
          `key=${videoInfo.inKey}&env=real&lc=en_US&cpl=en_US`,
        ],
      });

      let res: {
        frameRate: number;
        quality: number;
        BaseURL: string;
      }[] = [];
      playback.period.forEach((p: any) => {
        p.adaptationSet.forEach((a: any) => {
          a.representation.forEach((r: any) => {
            const fps = r.any.filter((a: any) => a.kind == "fps")[0].value;
            const resolution = r.any.filter(
              (a: any) => a.kind == "resolution"
            )[0].value;
            console.log(r);
            if ("m3u" in r.otherAttributes) return;
            const url = r.baseURL[0].value;
            res.push({
              frameRate: parseInt(fps),
              quality: parseInt(resolution),
              BaseURL: url,
            });
          });
        });
      });

      res = res.sort((a, b) => {
        if (a.quality == b.quality) return a.frameRate - b.frameRate;
        return a.quality - b.quality;
      });

      await chrome.scripting.executeScript({
        target: {
          tabId: requestDetails.tabId,
        },
        func: (url_stringify) => {
          document.body.setAttribute("chzzkExt_dl", url_stringify);
        },
        args: [JSON.stringify(res)],
      });
    },
    {
      urls: ["<all_urls>"],
    }
  );
}
