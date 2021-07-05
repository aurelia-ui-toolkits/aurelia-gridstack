export function number(a: unknown): number {
  return Number(a);
}

export function booleanAttr(val: unknown): boolean {
  return val || val === '' ? true : false;
}
