import { ResizeHandles, ResizeHandleType } from './models';

export function number(a: unknown): number {
  return Number(a);
}

export function booleanAttr(val: unknown): boolean {
  return val || val === '' ? true : false;
}

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

export function handlesAttr(handles: string | string[]): ResizeHandleType[] {
  if (!handles) {
    return [];
  }

  let allEntries: string[];

  if (typeof handles === 'string') {
    allEntries = handles.replace(/\s/g, '').split(',');
  } else if (Array.isArray(handles)) {
    allEntries = handles;
  } else {
    return [];
  }

  // remove duplicates
  allEntries = allEntries.filter(onlyUnique);

  // add only ResizeHandleType items
  const handlesArray: ResizeHandleType[] = [];
  allEntries.forEach(child => {
    if (child in ResizeHandles) {
      handlesArray.push(child as ResizeHandleType);
    }
  });

  return handlesArray;
}
