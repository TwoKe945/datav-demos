

type TypeOrGetter<T, Getter extends Function = () => T> = T | Getter


interface CreateTextureOption {
  width: TypeOrGetter<number>
  height: TypeOrGetter<number>
  src: string
  x: TypeOrGetter<number, (img: HTMLImageElement) => number>
  y: TypeOrGetter<number, (img: HTMLImageElement) => number>
  w: TypeOrGetter<number, (img: HTMLImageElement) => number>
  h: TypeOrGetter<number, (img: HTMLImageElement) => number>
}

export function createTexture({ width, height, src, x, y, w, h  }:CreateTextureOption) {
  const _width = (typeof width === 'number') ? () => width : width;
  const _height = (typeof height === 'number') ? () => height : height;
  const _x = (typeof x === 'number') ? () => x : x;
  const _y = (typeof y === 'number') ? () => y : y;
  const _w = (typeof w === 'number') ? () => w : w;
  const _h = (typeof h === 'number') ? () => h : h;
  const canvas = document.createElement('canvas');
  canvas.width = _width();
  canvas.height = _height();
  const ctx = canvas?.getContext('2d')
  const el = new Image();
  el.src = src;
  el.onload = () => {
    ctx?.drawImage(el,
    0, 0, el.width, el.height,
    _x(el), _y(el), _w(el), _h(el));
  }
  return canvas;
}
