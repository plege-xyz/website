import localFont from "@next/font/local";
import { Overpass_Mono, Space_Grotesk } from "@next/font/google";

const _circa = localFont({
  src: "../styles/fonts/circa/Cirka-Bold.otf",
  display: "swap",
  preload: true,
});
const _tt = localFont({
  src: "../styles/fonts/tt/tt.woff2",
  display: "swap",
  preload: true,
  weight: "400",
});
const _overpass = Overpass_Mono({
  weight: "700",
  preload: true,
  display: "swap",
});
const _space = Space_Grotesk({
  preload: true,
  weight: "400",
  display: "swap",
});
const _space_bold = Space_Grotesk({
  preload: true,
  weight: "700",
  display: "swap",
});

const tt = _tt.className;
const circa = _circa.className;
const overpass = _overpass.className;
const space = _space.className;
const space_bold = _space_bold.className;

export { circa, overpass, tt, space, space_bold };
