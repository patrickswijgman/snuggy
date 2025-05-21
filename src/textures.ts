const textures: Record<string, HTMLImageElement | HTMLCanvasElement> = Object.create(null);

export async function loadTexture(id: string, url: string) {
  textures[id] = await loadImage(url);
}

export function loadRenderTexture(id: string, w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = w;
  canvas.height = h;
  draw(ctx);
  textures[id] = canvas;
}

export function getTexture(id: string) {
  return textures[id];
}

async function loadImage(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
}
