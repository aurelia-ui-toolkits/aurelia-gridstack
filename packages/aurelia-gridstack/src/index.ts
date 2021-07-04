import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(aurelia: FrameworkConfiguration) {
  aurelia.globalResources([
    PLATFORM.moduleName('./elements/grid-stack/grid-stack'),
    PLATFORM.moduleName('./elements/grid-stack-item/grid-stack-item')
  ]);
}

export { GridStack } from './elements/grid-stack/grid-stack';
export { GridStackItem } from './elements/grid-stack-item/grid-stack-item';
