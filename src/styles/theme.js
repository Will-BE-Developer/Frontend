const device = {
  desktop: "@media screen and (min-width: 1241px)",
  tablet: "@media screen and (max-width: 1240px)",
  mobile: "@media screen and (max-width: 500px)",
};

const colors = {
  white: "#FFFFFF",
  black: "#222222",
  headerBgColor: "#F9F9F9",
  subTitle: "#9297A0",
  lightGrey: "#F4F6F9",
  lightestGrey: "#F9F9F9",

  // 4 main colors
  main: "#567FE8",
  mainHover: "#7599F3",
  secondary: "#0A3190",
  secondary2: "#EAB90D",
  secondary3: "#DADEFE",
  errorMsg: "#EC5959",
  error: "#EC5959",

  info: "#0778E1",

  grey5: "#F4F6F9",
  grey10: "#E6E9F1",
  grey20: "#DCE0E9",
  grey30: "#D3D8E1",
  grey40: "#C2C7D0",
  grey50: "#B2B7C0",
  grey60: "#9297A0",
  grey70: "#6D727C",
  grey80: "#50555E",
  grey90: "#2D3037",

  like: "#EA617A",

  green: "#92A094",
  blue: "#567FE8",

  warmGrey: "#A8A9AB",
  pink: "#EA617A",
  yellow: "#EAB90D",
  lightPurple: "#DADEFE",

  //btn
  mediumGrey: "#888888",

  // add btn
  darkGrey: "#505050",
  placeHolder: "#666666",
};

const fontWeight = {
  extraBold: 800,
  semiExtraBold: 700,
  semiBold: 600,
  regular: 400,
};

const calRem = (size) => `${size / 16}rem`;

const fontSize = {
  12: calRem(12),
  14: calRem(14),
  18: calRem(18),
  20: calRem(20),
  24: calRem(24),
  30: calRem(30),
  40: calRem(40),

  //모바일 폰트
  11: calRem(11),
  16: calRem(16),
  22: calRem(22),
  28: calRem(28),
};

const theme = {
  device,
  colors,
  fontSize,
  fontWeight,
  calRem,
};

export default theme;
