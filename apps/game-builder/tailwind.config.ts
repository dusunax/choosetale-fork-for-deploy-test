import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [require("@tailwindcss/line-clamp"), require("tailwindcss-animate")],
};

export default config;
