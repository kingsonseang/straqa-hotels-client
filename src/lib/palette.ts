import camelCase from "lodash.camelcase";
import { Vibrant } from "node-vibrant/node";
import tinycolor from "tinycolor2";

export type PaletteColors = {
  vibrant?: string;
  muted?: string;
  darkVibrant?: string;
  darkMuted?: string;
  lightVibrant?: string;
  lightMuted?: string;
  heading?: string;
  body?: string;
  [name: string]: string | undefined;
};

export async function getOrgPalette(src: string): Promise<PaletteColors> {
  const palette = await Vibrant.from(src).getPalette();

  const result: PaletteColors = {};

  for (const [key, swatch] of Object.entries(palette)) {
    if (swatch) {
      result[camelCase(key)] = swatch.hex;
    }
  }

  const headingColor = generateReadableTextColor(
    result.darkVibrant || result.vibrant || "#222",
  );
  const bodyColor = generateReadableTextColor(
    result.muted || result.lightMuted || "#555",
    "body",
  );

  return {
    ...result,
    heading: headingColor,
    body: bodyColor,
  };
}

function generateReadableTextColor(
  baseHex: string,
  type: "heading" | "body" = "heading",
): string {
  const base = tinycolor(baseHex);

  if (!base.isValid()) return type === "heading" ? "#111" : "#666";

  if (type === "heading") {
    return base.darken(40).desaturate(10).toHexString(); // strong contrast
  }

  return base.darken(20).desaturate(20).toHexString();
}
