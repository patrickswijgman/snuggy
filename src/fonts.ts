const fonts: Array<string> = [];

export async function loadFont(id: number, url: string, family: string, size: number) {
  const ff = new FontFace(family, `url(${url})`);
  await ff.load();
  document.fonts.add(ff);
  fonts[id] = `${size}px ${family}`;
}

export function getFont(id: number) {
  return fonts[id];
}
