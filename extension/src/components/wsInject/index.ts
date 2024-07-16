import { colors, genColor } from "./chatColors";
import { wsHook } from "./wsHook";
import log from "@log";

enum MessageCommand {
  "HISTORY" = 15101,
  "CHAT" = 93101,
  "DONATION" = 93102,
}

class Emitter extends EventTarget {}

const emitter = new Emitter();
export const chatEmitter = new Emitter();

export const expose2chzzk = () => {
  window.chzzkExt.chatEmitter = chatEmitter;
};

export const applyWSInject = async () => {
  if (wsHook.inited) return;
  wsHook.setInited(true);
  wsHook.after = (message, url, ws) => {
    if (!url.endsWith(".chat.naver.com/chat")) return message;

    const data = JSON.parse(message.data);
    if (data.cmd == MessageCommand.HISTORY) {
      for (const msg of data.bdy.messageList)
        emitter.dispatchEvent(new CustomEvent("message", { detail: msg }));

      const u = new URL(location.href);
      const uq = u.searchParams.get("user");
      if (uq != null) {
        data.bdy.messageList = data.bdy.messageList.filter(
          (msg: any) => JSON.parse(msg.profile).userIdHash == uq,
        );
        message.data = JSON.stringify(data);
      }

      const un = u.searchParams.get("name");
      if (un != null) {
        data.bdy.messageList = data.bdy.messageList.filter(
          (msg: any) => JSON.parse(msg.profile).nickname == un,
        );
        message.data = JSON.stringify(data);
      }
    } else if (data.cmd == MessageCommand.CHAT) {
      data.bdy.forEach((msg: any) => {
        emitter.dispatchEvent(new CustomEvent("message", { detail: msg }));
      });

      const u = new URL(location.href);
      const uq = u.searchParams.get("user");
      if (uq != null) {
        data.bdy = data.bdy.filter(
          (msg: any) => JSON.parse(msg.profile).userIdHash == uq,
        );

        message.data = JSON.stringify(data);
      }

      const un = u.searchParams.get("name");
      if (un != null) {
        data.bdy = data.bdy.filter(
          (msg: any) => JSON.parse(msg.profile).nickname == un,
        );

        message.data = JSON.stringify(data);
      }
    } else if (data.cmd == MessageCommand.DONATION) {
      data.bdy.forEach((msg: any) => {
        emitter.dispatchEvent(new CustomEvent("donation", { detail: msg }));
        chatEmitter.dispatchEvent(new CustomEvent("donation", { detail: msg }));
      });

      const uq = new URL(location.href).searchParams.get("user");
      if (uq != null) {
        data.bdy = data.bdy.filter(
          (msg: any) =>
            msg.profile != null && JSON.parse(msg.profile).userIdHash == uq,
        );

        message.data = JSON.stringify(data);
      }
    } else log("WebSocket", "Unknown message type", data);

    return message;
  };

  emitter.addEventListener("message", ((e: CustomEvent) => {
    const data = e.detail;
    const profile = JSON.parse(data.profile);
    const message = {
      content: data.msg || data.content,
      sender: {
        ...profile,
        color:
          profile.streamingProperty.nicknameColor.colorCode == "CC000"
            ? genColor(profile.nickname)
            : colors[profile.streamingProperty.nicknameColor.colorCode],
      },
    };

    chatEmitter.dispatchEvent(new CustomEvent("message", { detail: message }));
  }) as any);
};
