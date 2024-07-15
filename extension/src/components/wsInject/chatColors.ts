export const colors: {
  [key: string]: {
    dark: string;
    light: string;
  };
} = {
  CD001: {
    dark: "#EEA05D",
    light: "#EB8644",
  },
  CD002: {
    dark: "#EAA35F",
    light: "#EB8140",
  },
  CD003: {
    dark: "#E98158",
    light: "#E8673E",
  },
  CD004: {
    dark: "#E97F58",
    light: "#E9582F",
  },
  CD005: {
    dark: "#E76D53",
    light: "#E84E2D",
  },
  CD006: {
    dark: "#E66D5F",
    light: "#E75036",
  },
  CD007: {
    dark: "#E16490",
    light: "#E0334B",
  },
  CD008: {
    dark: "#E481AE",
    light: "#DE355C",
  },
  CD009: {
    dark: "#E481AE",
    light: "#D22D50",
  },
  CD010: {
    dark: "#D25FAC",
    light: "#D02C74",
  },
  CD011: {
    dark: "#D263AE",
    light: "#C22A88",
  },
  CD012: {
    dark: "#D66CB4",
    light: "#C1449D",
  },
  CD013: {
    dark: "#D071B6",
    light: "#B44BA2",
  },
  CD014: {
    dark: "#AF71B5",
    light: "#9836B8",
  },
  CD015: {
    dark: "#A96BB2",
    light: "#842EAA",
  },
  CD016: {
    dark: "#905FAA",
    light: "#6E21B9",
  },
  CD017: {
    dark: "#B38BC2",
    light: "#7A30B6",
  },
  CD018: {
    dark: "#9D78B8",
    light: "#7B40BE",
  },
  CD019: {
    dark: "#8D7AB8",
    light: "#6433C2",
  },
  CD020: {
    dark: "#7F68AE",
    light: "#5735B4",
  },
  CD021: {
    dark: "#9F99C8",
    light: "#4D40B6",
  },
  CD022: {
    dark: "#717DC6",
    light: "#4659CF",
  },
  CD023: {
    dark: "#7E8BC2",
    light: "#5166C8",
  },
  CD024: {
    dark: "#5A90C0",
    light: "#3188CB",
  },
  CD025: {
    dark: "#628DCC",
    light: "#2269D0",
  },
  CD026: {
    dark: "#81A1CA",
    light: "#4183D7",
  },
  CD027: {
    dark: "#ADD2DE",
    light: "#219FC7",
  },
  CD028: {
    dark: "#83C5D6",
    light: "#03A1CA",
  },
  CD029: {
    dark: "#8BC8CB",
    light: "#25A1A7",
  },
  CD030: {
    dark: "#91CBC6",
    light: "#15978B",
  },
  CD031: {
    dark: "#83C3BB",
    light: "#10A391",
  },
  CD032: {
    dark: "#7DBFB2",
    light: "#0B9F82",
  },
  CD033: {
    dark: "#AAD6C2",
    light: "#0BB165",
  },
  CD034: {
    dark: "#84C194",
    light: "#228E4B",
  },
  CD035: {
    dark: "#92C896",
    light: "#149530",
  },
  CD036: {
    dark: "#94C994",
    light: "#098B16",
  },
  CD037: {
    dark: "#9FCE8E",
    light: "#1C8B13",
  },
  CD038: {
    dark: "#A6D293",
    light: "#2A9B12",
  },
  CD039: {
    dark: "#ABD373",
    light: "#4C9F11",
  },
  CD040: {
    dark: "#BFDE73",
    light: "#5CA314",
  },
  CC001: {
    dark: "#E2BE61",
    light: "#ECB21B",
  },
  CC002: {
    dark: "#ECA843",
    light: "#EC983B",
  },
  CC003: {
    dark: "#EC8A43",
    light: "#F6822F",
  },
  CC004: {
    dark: "#EA723D",
    light: "#EA642F",
  },
  CC005: {
    dark: "#E56B79",
    light: "#E4473F",
  },
  CC006: {
    dark: "#E68199",
    light: "#DA2E39",
  },
  CC007: {
    dark: "#E16CB5",
    light: "#D73181",
  },
  CC008: {
    dark: "#BC7ACC",
    light: "#B729A0",
  },
  CC009: {
    dark: "#A983E7",
    light: "#8929B7",
  },
  CC010: {
    dark: "#8B89E1",
    light: "#5545DA",
  },
  CC011: {
    dark: "#7194EE",
    light: "#4150DB",
  },
  CC012: {
    dark: "#7994D0",
    light: "#2D63DD",
  },
  CC013: {
    dark: "#71AAED",
    light: "#1878E9",
  },
  CC014: {
    dark: "#5FB7E8",
    light: "#2A87DC",
  },
  CC015: {
    dark: "#80BDD3",
    light: "#00A1DA",
  },
  CC016: {
    dark: "#80D3CE",
    light: "#1D8C93",
  },
  CC017: {
    dark: "#99D3BA",
    light: "#068660",
  },
  CC018: {
    dark: "#94D59A",
    light: "#198337",
  },
  CC019: {
    dark: "#BBE69A",
    light: "#2BA343",
  },
  CC020: {
    dark: "#CCE57D",
    light: "#7AAF3E",
  },
};

export const genColor = (name: string) => {
  var n,
    r = 0;
  for (n in name.split("")) (r = (r << 5) - r + n.charCodeAt(0)), (r |= 0);
  return Object.values(colors)[Math.abs(r) % Object.keys(colors).length];
};
