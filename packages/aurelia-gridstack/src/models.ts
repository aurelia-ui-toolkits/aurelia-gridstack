export enum ResizeHandles {
	n = 'n',
  ne = 'ne',
  e = 'e',
  se = 'se',
  s = 's',
  sw = 'sw',
  w = 'w',
  nw = 'nw'
}

export type ResizeHandleType = ResizeHandles.n | ResizeHandles.ne | ResizeHandles.e | ResizeHandles.se |
                                ResizeHandles.s | ResizeHandles.sw | ResizeHandles.w | ResizeHandles.nw;
