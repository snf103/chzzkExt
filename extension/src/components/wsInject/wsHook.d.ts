export const wsHook: {
  before: (data: any, url: string, wsObject: WebSocket) => void;
  after: (messageEvent: any, url: string, wsObject: WebSocket) => void;
  setInited: (data: boolean) => void;
  inited: boolean;
};
