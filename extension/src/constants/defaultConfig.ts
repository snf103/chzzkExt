const defaultConfig = {
  adblock: false,
  adskip: true,
  voteTool: false,
  hideDonation: false,
  reversedChat: false,
};

type BoolKV = {
  [key: string]: boolean;
};

export type { BoolKV };

export default defaultConfig;
