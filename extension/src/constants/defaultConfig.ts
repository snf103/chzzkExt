const defaultConfig = {
  adblock: true,
  voteTool: false,
  hideDonation: false,
  reversedChat: false,
};

type BoolKV = {
  [key: string]: boolean;
};

export type { BoolKV };

export default defaultConfig;
