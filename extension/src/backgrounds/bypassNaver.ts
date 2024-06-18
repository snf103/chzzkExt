import configInstance, { defaultConfig } from "@config";

export default function applyBypassNaver(
  enableRule: (s: string) => void,
  disableRule: (s: string) => void
) {
  const apply = (enable: boolean) => {
    if (!enable) {
      disableRule("bypassnaver");
      return;
    }

    enableRule("bypassnaver");
  };
  apply(configInstance.get("bypassNaver", defaultConfig.bypassNaver));
}
