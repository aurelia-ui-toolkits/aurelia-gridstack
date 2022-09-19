import { bindable, BindingMode, customElement, inject } from 'aurelia';
import { booleanAttr, number } from '../../interceptors';
import { GridItemHTMLElement } from 'gridstack';

@inject(Element)
@customElement('grid-stack-item')
export class GridStackItem {
  constructor(public root: IGridStackItemElement) { }

  @bindable({ set: number, mode: BindingMode.twoWay })
  x?: number;
  xChanged() {
    if (this.x !== undefined) {
      this.root.setAttribute('gs-x', this.x.toString());
    } else {
      this.root.removeAttribute('gs-x');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  y?: number;
  yChanged() {
    if (this.y !== undefined) {
      this.root.setAttribute('gs-y', this.y.toString());
    } else {
      this.root.removeAttribute('gs-y');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  w?: number;
  wChanged() {
    if (this.w !== undefined) {
      this.root.setAttribute('gs-w', this.w.toString());
    } else {
      this.root.removeAttribute('gs-w');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
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

  @bindable({ set: booleanAttr })
  noMove: boolean;
  noMoveChanged() {
    if (this.noMove) {
      this.root.setAttribute('gs-no-move', 'true');
    } else {
      this.root.removeAttribute('gs-no-move');
    }
  }

  @bindable({ set: booleanAttr })
  noResize: boolean;
  noResizeChanged() {
    if (this.noResize) {
      this.root.setAttribute('gs-no-resize', 'true');
    } else {
      this.root.removeAttribute('gs-no-resize');
    }
  }

  @bindable({ set: booleanAttr })
  locked: boolean;
  lockedChanged() {
    if (this.locked) {
      this.root.setAttribute('gs-locked', 'true');
    } else {
      this.root.removeAttribute('gs-locked');
    }
  }

  attached() {
    if (this.x !== undefined) {
      this.xChanged();
    }
    if (this.y !== undefined) {
      this.yChanged();
    }
    if (this.w !== undefined) {
      this.wChanged();
    }
    if (this.h !== undefined) {
      this.hChanged();
    }
    if (this.noMove !== undefined) {
      this.noMoveChanged();
    }
    if (this.noResize !== undefined) {
      this.noResizeChanged();
    }
    if (this.locked !== undefined) {
      this.lockedChanged();
    }
  }
}

export interface IGridStackItemElement extends GridItemHTMLElement {
  $au: {
    'au:resource:custom-element': {
      viewModel: GridStackItem;
    };
  };
}
