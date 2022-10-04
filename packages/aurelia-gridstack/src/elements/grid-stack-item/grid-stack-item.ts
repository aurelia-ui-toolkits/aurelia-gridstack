import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { getResizeHandleTypesOnly } from '../../utils';
import { PLATFORM } from 'aurelia-pal';
import { customElement, useView } from 'aurelia-templating';
import { bindable } from 'aurelia-typed-observable-plugin';
import { GridItemHTMLElement } from 'gridstack';

@inject(Element)
@customElement('grid-stack-item')
@useView(PLATFORM.moduleName('./grid-stack-item.html'))
export class GridStackItem {
  constructor(public root: IGridStackItemElement) { }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  x?: number;
  xChanged() {
    if (this.x !== undefined) {
      this.root.setAttribute('gs-x', this.x.toString());
    } else {
      this.root.removeAttribute('gs-x');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  y?: number;
  yChanged() {
    if (this.y !== undefined) {
      this.root.setAttribute('gs-y', this.y.toString());
    } else {
      this.root.removeAttribute('gs-y');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  w?: number;
  wChanged() {
    if (this.w !== undefined) {
      this.root.setAttribute('gs-w', this.w.toString());
    } else {
      this.root.removeAttribute('gs-w');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  h?: number;
  hChanged() {
    if (this.h !== undefined) {
      this.root.setAttribute('gs-h', this.h.toString());
    } else {
      this.root.removeAttribute('gs-h');
    }
  }
  
  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  minW?: number;
  minWChanged() {
    if (this.minW !== undefined) {
      this.root.setAttribute("gs-min-w", this.minW.toString());
    } else {
      this.root.removeAttribute("gs-min-w");
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  minH?: number;
  minHChanged() {
    if (this.minH !== undefined) {
      this.root.setAttribute("gs-min-h", this.minH.toString());
    } else {
      this.root.removeAttribute("gs-min-h");
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  maxW?: number;
  maxWChanged() {
    if (this.maxW !== undefined) {
      this.root.setAttribute("gs-max-w", this.maxW.toString());
    } else {
      this.root.removeAttribute("gs-max-w");
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  maxH?: number;
  maxHChanged() {
    if (this.maxH !== undefined) {
      this.root.setAttribute("gs-max-h", this.maxH.toString());
    } else {
      this.root.removeAttribute("gs-max-h");
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  id?: number;
  idChanged() {
    if (this.id !== undefined) {
      this.root.setAttribute("gs-id", this.id.toString());
    } else {
      this.root.removeAttribute("gs-id");
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  minW?: number;
  minWChanged() {
    if (this.minW !== undefined) {
      this.root.setAttribute('gs-min-w', this.minW.toString());
    } else {
      this.root.removeAttribute('gs-min-w');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  minH?: number;
  minHChanged() {
    if (this.minH !== undefined) {
      this.root.setAttribute('gs-min-h', this.minH.toString());
    } else {
      this.root.removeAttribute('gs-min-h');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  maxW?: number;
  maxWChanged() {
    if (this.maxW !== undefined) {
      this.root.setAttribute('gs-max-w', this.maxW.toString());
    } else {
      this.root.removeAttribute('gs-max-w');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  maxH?: number;
  maxHChanged() {
    if (this.maxH !== undefined) {
      this.root.setAttribute('gs-max-h', this.maxH.toString());
    } else {
      this.root.removeAttribute('gs-max-h');
    }
  }

  @bindable.number({ defaultBindingMode: bindingMode.twoWay })
  id?: number;
  idChanged() {
    if (this.id !== undefined) {
      this.root.setAttribute('gs-id', this.id.toString());
    } else {
      this.root.removeAttribute('gs-id');
    }
  }

  @bindable.booleanAttr
  noMove: boolean;
  noMoveChanged() {
    if (this.noMove) {
      this.root.setAttribute('gs-no-move', 'true');
    } else {
      this.root.removeAttribute('gs-no-move');
    }
  }

  @bindable.booleanAttr
  noResize: boolean;
  noResizeChanged() {
    if (this.noResize) {
      this.root.setAttribute('gs-no-resize', 'true');
    } else {
      this.root.removeAttribute('gs-no-resize');
    }
  }

  @bindable.booleanAttr
  locked: boolean;
  lockedChanged() {
    if (this.locked) {
      this.root.setAttribute('gs-locked', 'true');
    } else {
      this.root.removeAttribute('gs-locked');
    }
  }

  @bindable.booleanAttr
  autoPosition: boolean;
  autoPositionChanged() {
    if (this.autoPosition) {
      this.root.setAttribute('gs-auto-position', 'true');
    } else {
      this.root.removeAttribute('gs-auto-position');
    }
  }

  @bindable.string
  resizeHandles?: string;
  resizeHandlesChanged() {
    if (this.resizeHandles !== undefined) {
      const filteredHandles = getResizeHandleTypesOnly(this.resizeHandles);
      this.root.setAttribute('gs-resize-handles', filteredHandles.toString());
    } else {
      this.root.removeAttribute('gs-resize-handles');
    }
  }

}

export interface IGridStackItemElement extends GridItemHTMLElement {
  au: {
    controller: {
      viewModel: GridStackItem;
    };
  };
}
