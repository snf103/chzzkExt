import { isElectron } from "#u/browserInfo";
import log from "@log";

export const defaultConfig = {
  adblock: false,
  adskip: false,
  voteTool: false,
  hideDonation: false,
  reversedChat: false,
  autoShowChat: false,
  latencyView: false,
  showBuffer: false,
  vodDownload: false,
  blocktracker: true,
  bypassNaver: true,
  saveVodLoc: true,
  chat_nfo: true,

  disable_donate_rank: false, //handled in initUI_ed.ts
  refreshSidebar: true,

  remove_offline_channel: false,

  // ui settings
  ed_chz: false,
  ed_tic: false,
  ed_chkey: false,
  ed_noti: false,
  ed_mi_ban: false,
  ed_rec_live: false,
  ed_si_sd: false,

  ed_si_game: false,
  ed_si_esp: false,
  ed_si_ori: false,
  ed_si_pcg: false,
  ed_si_chr: false,

  ed_su_al: false,
  ed_si_rw: false,
  ed_si_ct: false,
  ed_si_fl: false,

  ed_sc_fl: false,
  ed_sc_rc: false,
  ed_sc_pt: false,
};

type ConfigData = string | boolean | number;
type ConfigObject = {
  [key: string]: ConfigData;
};
type AnyListener = () => void;
type Listener = (key: string, newData: ConfigData) => void;

class ConfigInstance {
  public config: ConfigObject = {};
  public get<T = ConfigData>(key: string): T | undefined;
  public get<T = ConfigData>(key: string, defaultValue: T): T;
  public get<T = ConfigData>(key: string, defaultValue?: T): T {
    try {
      return (
        typeof this.config[key] == "undefined" ? defaultValue : this.config[key]
      ) as T;
    } catch (e) {
      return defaultValue as T;
    }
  }
  public set(key: string, value: ConfigData): void {
    this.config[key] = value;
    this.emit(key, value);
    this.emitAny();
  }
  public load(cfg: ConfigObject): void {
    this.config = cfg;
    this.emitAny();
  }
  public save() {
    if (isElectron) {
      fetch("chzzkext://saveConfig", {
        body: JSON.stringify(this.config),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      }).then(() => {
        log("ConfigInstance", "Saved config");
      });
      return;
    }
    chrome.storage.local
      .set({
        config: this.config,
      })
      .then(() => {
        log("ConfigInstance", "Saved config");
      });
  }
  public async loadFromStorage(): Promise<void> {
    return new Promise((resolve) => {
      if (isElectron) {
        fetch("chzzkext://loadConfig", {
          method: "GET",
          mode: "no-cors",
        })
          .then((res) => res.json())
          .then((config) => {
            this.config = config || defaultConfig;
            resolve();
          });
      } else
        chrome.storage.local.get(["config"], (result) => {
          this.config = result.config || defaultConfig;
          resolve();
        });
    });
  }
  public loadAsT<T>() {
    return this.config as T;
  }

  listeners: { [key: string]: Listener[] } = {};
  public addListener(key: string, listener: Listener): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(listener);
  }
  public removeListener(key: string, listener: Listener): void {
    if (!this.listeners[key]) {
      return;
    }
    this.listeners[key] = this.listeners[key].filter((l) => l !== listener);
  }
  public emit(key: string, newData: ConfigData): void {
    if (!this.listeners[key]) {
      return;
    }
    this.listeners[key].forEach((l) => l(key, newData));
  }

  anyListeners: AnyListener[];
  public addAnyListener(listener: AnyListener): void {
    this.anyListeners.push(listener);
  }
  public removeAnyListener(listener: AnyListener): void {
    this.anyListeners = this.anyListeners.filter((l) => l !== listener);
  }
  public emitAny(): void {
    this.anyListeners.forEach((l) => l());
  }

  constructor() {
    this.anyListeners = [];
    if (!chrome) return;
    if (!chrome.storage) return;
    if (!chrome.storage.local) return;
    this.loadFromStorage();
    if (isElectron) {
      return;
    }
    chrome.storage.onChanged.addListener((changes) => {
      for (const key in changes) {
        if (key == "config") {
          // get diff from new value and my value
          const newConfig = changes.config.newValue;
          const oldConfig = this.config;
          const diff = new Set([
            ...Object.keys(newConfig),
            ...Object.keys(oldConfig),
          ]);
          const diffs = Array.from(diff).filter(
            (key) => newConfig[key] !== oldConfig[key]
          );
          for (const key of diffs) {
            this.emit(key, newConfig[key]);
          }
          this.config = newConfig;
          this.emitAny();
        }
      }
    });
  }

  public syncConfig() {
    const interval = setInterval(async () => {
      const config = await fetch("chzzkext://loadconfig").then((res) =>
        res.json()
      );
      const diff = new Set([
        ...Object.keys(config),
        ...Object.keys(this.config),
      ]);
      const diffs = Array.from(diff).filter(
        (key) => config[key] !== this.config[key]
      );
      if (diffs.length == 0) return;
      console.log("DIFF FOUND!", diffs);

      this.load(config);
      window.chzzkExt.config = config;
      window.dispatchEvent(new Event("chzzkExtConfig"));
    }, 1000);
  }


  public syncConfigBackground(main: () => void) {
    const interval = setInterval(async () => {
      const config = await fetch("chzzkext://loadconfig").then((res) =>
        res.json()
      );
      const diff = new Set([
        ...Object.keys(config),
        ...Object.keys(this.config),
      ]);
      const diffs = Array.from(diff).filter(
        (key) => config[key] !== this.config[key]
      );
      if (diffs.length == 0) return;
      console.log("DIFF FOUND!", diffs);

      this.load(config);
      main();
    }, 1000);
  }
}

const configInstance = new ConfigInstance();

export default configInstance;
