export const defaultConfig = {
  adblock: false,
  adskip: true,
  voteTool: false,
  hideDonation: false,
  reversedChat: false,
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
    return (this.config[key] || defaultValue) as T;
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
    chrome.storage.local.set({
      config: this.config,
    });
  }
  public async loadFromStorage(): Promise<void> {
    return new Promise((resolve) => {
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

  anyListeners: AnyListener[] = [];
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
    if (!chrome) return;
    if (!chrome.storage) return;
    if (!chrome.storage.local) return;
    this.loadFromStorage();
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
}

const configInstance = new ConfigInstance();

export default configInstance;
