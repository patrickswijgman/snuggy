const textures: Array<HTMLImageElement | HTMLCanvasElement> = [];

export async function loadTexture(id: number, url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  textures[id] = img;
}

export function loadRenderTexture(id: number, w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = w;
  canvas.height = h;
  draw(ctx);
  textures[id] = canvas;
}

export function getTexture(id: number) {
  return textures[id];
}
