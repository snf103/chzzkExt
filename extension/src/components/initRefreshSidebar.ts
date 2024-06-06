import log from "@log";

const tryRefresh = () => {
  const sidebar = document.querySelector("#navigation");
  if (!sidebar) return;
  const fiber = Object.entries(sidebar).find(([k]) =>
    k.startsWith("__reactFiber$")
  )?.[1];
  if (!fiber) return;
  let parent = fiber.return;

  while (parent != null) {
    let state = parent.memoizedState;
    while (state != null) {
      if (
        state.memoizedState != null &&
        state.memoizedState.tag === 8 &&
        state.memoizedState.destroy == null &&
        state.memoizedState.deps?.length > 2
      ) {
        state.memoizedState?.create?.();
        return;
      }
      state = state.next;
    }
    parent = parent.return;
    break;
  }
};

export default function initRefreshSidebar(enable: boolean) {
  if (!enable) {
    if (window.chzzkExt.refreshSidebarInterval) {
      clearInterval(window.chzzkExt.refreshSidebarInterval);
      delete window.chzzkExt.refreshSidebarInterval;
    }
    return;
  }
  window.chzzkExt.refreshSidebarInterval = setInterval(() => {
    log("Sidebar Refresher", "Refreshing sidebar...");
    const state = tryRefresh();
  }, 30000);
}
