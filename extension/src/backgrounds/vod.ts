import configInstance, { defaultConfig } from "../constants/config";
import { XMLParser } from "fast-xml-parser";

class VideoSet {
  quality: number;
  frameRate: number;
  BaseURL: string = "";

  constructor(data: any) {
    Object.assign(this, data);
    [this.frameRate, this.quality] = data["nvod:Label"];
  }

  get data() {
    const { BaseURL, quality, frameRate } = this;
    return { BaseURL, quality, frameRate };
  }
}

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

      const [{ result: exr }] = await chrome.scripting.executeScript({
        target: {
          tabId: requestDetails.tabId,
        },
        func: () => {
          return document.querySelector(`button[chzzkExt="voddl"]`) ||
            document.body.getAttribute("chzzkExt_dl") != null
            ? true
            : false;
        },
      });
      if (exr) return;

      const parser = new XMLParser();
      const resp = await chrome.scripting.executeScript({
        target: {
          tabId: requestDetails.tabId,
        },
        func: (video_url) => {
          return fetch(video_url, {
            credentials: "include",
            mode: "cors",
            method: "GET",
            headers: {
              accept: "application/xml",
              "accept-language": "ko,en;q=0.9,en-US;q=0.8,ja;q=0.7",
            },
          }).then((resp) => resp.text());
        },
        args: [requestDetails.url],
      });
      const [{ result }] = resp;
      if (!result) return;
      let body = parser.parse(result);
      let items: VideoSet[] = body.MPD.Period.AdaptationSet.at(
        0
      ).Representation.map((el: VideoSet) => new VideoSet(el));
      const urls = items
        .sort((a, b) =>
          b.quality - a.quality
            ? b.quality - a.quality
            : b.frameRate - a.frameRate
        )
        .filter((el) => el.BaseURL.startsWith("https://"))
        .map((el) => el.data);
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
