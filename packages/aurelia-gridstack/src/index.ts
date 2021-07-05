import { IContainer } from 'aurelia';
import { GridStackItem } from './elements/grid-stack-item/grid-stack-item';
import { GridStack } from './elements/grid-stack/grid-stack';

export const GridStackConfiguration = {
  register(container: IContainer): IContainer {
    return container.register(GridStack, GridStackItem);
  }
};
