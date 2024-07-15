import { defaultConfig } from "@config";
import initVoteTool from "./vote";

export const applyChatTools = (
  cfg: (key: keyof typeof defaultConfig) => boolean,
  comparePath: (p: string) => boolean,
  sp: URLSearchParams,
) => {
  initVoteTool(
    cfg("voteTool") && comparePath("/live/*/chat") && sp.get("ext") != null,
  );
};
