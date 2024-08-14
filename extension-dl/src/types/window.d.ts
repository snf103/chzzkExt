declare global {
  interface Window {
    chzzkExt: any;
    __getLiveInfo: () => {
      // ex : 1080p
      resolution: string;
      // ex : 8000
      bitrate: number;
      // ex : 60.0
      fps: string;
      // milisecond
      latency: number;
    };

    gladsdk: {
      displayAd: () => void;
      destroyAdSlots: () => void;
    };
  }
}

export {};
