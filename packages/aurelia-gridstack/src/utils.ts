import { ResizeHandles, ResizeHandleType } from './models';

function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export function getResizeHandleTypesOnly(handles: string | undefined): ResizeHandleType[] {
  const handlesArray: ResizeHandleType[] = [];

  if (handles) {
    let allEntries = handles.replace(/\s/g, '').split(',');

    // remove duplicates
    allEntries = allEntries.filter(onlyUnique);

    // add only ResizeHandleType items
    allEntries.forEach((child) => {
      if (child in ResizeHandles) {
        handlesArray.push(child as ResizeHandleType);
      }
    });
  }

  return handlesArray;
}
