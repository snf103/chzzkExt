import log from "@log";

export default async function getChatWrapper() {
  const getList = (): Element[] => {
    return [
      ...document.querySelectorAll(`[class*=live_chatting_list_wrapper]`),
    ];
  };

  const waitForBox = async (): Promise<HTMLDivElement> => {
    let list = getList();
    while (list.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      log("ChatWrapper", "waiting for chat box");
      list = getList();
    }
    return list[0] as HTMLDivElement;
  };

  const boxContainer = await waitForBox();
  log("ChatWrapper", "chat box found");
  return boxContainer;
}
