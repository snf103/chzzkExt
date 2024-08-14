import configInstance, { defaultConfig } from "@config";
import { PlayBackData, VideoSet } from "./vodTypes";

export default function vod() {
  chrome.webRequest.onCompleted.addListener(
    async (requestDetails) => {
      if (!configInstance.get("vodDownload", defaultConfig.vodDownload)) return;
      if (
        requestDetails.initiator != "https://chzzk.naver.com" ||
        !requestDetails.url.startsWith(
          "https://apis.naver.com/neonplayer/vodplay/v1/playback"
        )
      )
        return;

      const tab = await chrome.tabs.get(requestDetails.tabId);
      const tabId = requestDetails.tabId;
      const [{ result: exr }] = await chrome.scripting.executeScript({
        target: {
          tabId: tabId,
        },
        func: () => {
          return document.querySelector(`button[chzzkExt="voddl"]`) ||
            (document.body.getAttribute("chzzkExt_dl") != null &&
              document.body.getAttribute("chzzkExt_dl") != "")
            ? true
            : false;
        },
      });
      if (exr) return;

      const taburl = new URL(tab.url!);
      const vid = taburl.pathname.replace("/video/", "");

      // https://api.chzzk.naver.com/service/v2/videos/26F8F68C7EAB2AF82B67C2262953FCCA04AD
      // 여기에서 HLS Key를 Fetch함
      const [
        {
          result: { content: videoInfo },
        },
      ] = await chrome.scripting.executeScript({
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

      // https://apis.naver.com/neonplayer/vodplay/v1/playback/26F8F68C7EAB2AF82B67C2262953FCCA04AD?key=V128e4add35023e0040d004cc676647dae467d6cc2691a9b5b5a68486313024caed2e04cc676647dae467&sid=2099&env=real&st=5&lc=ko_KR&cpl=ko_KR
      // 여기에서 PLAYBACK 요청하는듯
      const [
        {
          result: { period: pldataArr },
        },
      ] = await chrome.scripting.executeScript({
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
      // 예시 데이터는 plab.ts 참고
      const playbackData = pldataArr[0] as PlayBackData;
      const representations = playbackData.adaptationSet.map(
        (el) => el.representation
      );
      const videoList: VideoSet[] = [];
      representations.forEach((qarr) => {
        qarr
          .map((el) => {
            const resolution = Object.fromEntries(
              el.any.map((l) => [l.kind, l.value])
            );
            return {
              quality: parseFloat(resolution.resolution),
              frameRate: parseFloat(resolution.fps),
              BaseURL: el.baseURL.find((el) => el.value.includes(".mp4"))
                ?.value!,
            };
          })
          .filter((el) => el.BaseURL)
          .forEach((el) => videoList.push(el));
      });

      const urls = videoList
        .sort((a, b) =>
          b.quality - a.quality
            ? b.quality - a.quality
            : b.frameRate - a.frameRate
        )
        .filter((el) => el.BaseURL.startsWith("https://"));
      const url_stringify = JSON.stringify(urls);

      await chrome.scripting.executeScript({
        target: {
          tabId: requestDetails.tabId,
        },
        func: (url_stringify) => {
          document.body.setAttribute("chzzkExt_dl", url_stringify);
        },
        args: [url_stringify],
      });
    },
    {
      urls: ["<all_urls>"],
    }
  );
}
