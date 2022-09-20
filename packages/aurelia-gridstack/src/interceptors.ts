import { ResizeHandles, ResizeHandleType } from './resource';

export function number(a: unknown): number {
  return Number(a);
}

export function booleanAttr(val: unknown): boolean {
  return val || val === '' ? true : false;
}

function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export function handlesAttr(handles: unknown): ResizeHandleType[] {
	const isStringParam = typeof handles === 'string' || handles instanceof String;
  const isArrayParam = Array.isArray(handles);
  const isStringOrArray = isStringParam || isArrayParam;
  const handlesArray: ResizeHandleType[] = [];

  if (handles && isStringOrArray && handles.length > 0) {
    let allEntries: string[];

    if (isStringParam) {
      allEntries = handles.replace(/\s/g,'').split(',');
    } else {
      allEntries = handles;
    }

    // remove duplicates
    allEntries = allEntries.filter(onlyUnique);

    // add only ResizeHandleType items
    allEntries.forEach(child => {
      if (child in ResizeHandles) {
        handlesArray.push(child as ResizeHandleType);
      }
    });
  }

  return handlesArray;
}
