import onoffer from "#u/onoffer";

export default function initRemoveOfflineChannel(enable: boolean) {
  if (!enable) {
    if (window.chzzkExt.removeOfflineChannelInterval) {
      clearInterval(window.chzzkExt.removeOfflineChannelInterval);

      // revert all offlined channels
      const offlinedChannels = document.querySelectorAll(
        `[class*=navigator_item] > [class*=navigator_profile]:not([class*=navigator_is_live])[chzzkUI="off"]`
      );
      for (const channel of offlinedChannels) {
        onoffer(channel as HTMLElement, false);
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
      onoffer(channel as HTMLElement, true);
    }
  }, 100);
}
