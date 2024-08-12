import onoffer from "#u/onoffer";

export default function initRemoveOfflineChannel(enable: boolean) {
  const selCh = (a: HTMLElement) => {
    const s = a.parentElement;
    if (!s) return null;
    return s;
  };
  if (!enable) {
    if (window.chzzkExt.removeOfflineChannelInterval) {
      clearInterval(window.chzzkExt.removeOfflineChannelInterval);

      // revert all offlined channels
      const offlinedChannels = document.querySelectorAll(
        `[class*=navigator_item][chzzkUI="off"] > [class*=navigator_profile]:not([class*=navigator_is_live])`
      );
      for (const channel of offlinedChannels) {
        onoffer(selCh(channel as HTMLElement), false);
      }
      delete window.chzzkExt.removeOfflineChannelInterval;
    }
    return;
  }
  window.chzzkExt.removeOfflineChannelInterval = setInterval(() => {
    const offlineChannels = document.querySelectorAll(
      `[class*=navigator_item] > [class*=navigator_profile]:not([class*=navigator_is_live])`
    );
    if (offlineChannels.length === 0) return;
    for (const channel of offlineChannels) {
      onoffer(selCh(channel as HTMLElement), true);
    }
  }, 100);
}
