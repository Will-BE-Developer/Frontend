const device = {
  desktop: "@media screen and (min-width: 1024px)",
  tablet: "@media screen and (max-width: 1023px)",
  mobile: "@media screen and (max-width: 500px)",
};

const colors = {
  white: "#FFFFFF",
  black: "#222222",
  headerBgColor: "#F9F9F9",

  // 4 main colors
  green: "#92A094",
  blue: "#798996",
  warmGrey: "#A8A9AB",
  pink: "#dc7487",
  yellow: "#F0F354",
  errorMsg: "red",

  //btn
  lightGrey: "#666666",
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
