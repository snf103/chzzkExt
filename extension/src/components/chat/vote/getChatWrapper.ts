export default async function getChatWrapper() {
  const getList = (): [Element, string][] => {
    return [
      ...document.querySelectorAll("#root > div > section > aside > div > div"),
    ]
      .map((x) => [x, x.className] as [Element, string])
      .filter((x) => x[1].toString().includes("live_chatting_list_wrapper"));
  };

  const waitForBox = async (): Promise<HTMLDivElement> => {
    let list = getList();
    while (list.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("waiting for chat box");
      list = getList();
    }
    return list[0][0] as HTMLDivElement;
  };

  const boxContainer = await waitForBox();
  return boxContainer;
}
