import { bindable, BindingMode, customElement, inject } from 'aurelia';
import { booleanAttr, handlesAttr, number } from '../../interceptors';
import { GridItemHTMLElement } from 'gridstack';
import { ResizeHandleType } from '../../models';
import { GridStack } from '../grid-stack/grid-stack';

@inject(Element, GridStack)
export class GridStackItem {
  constructor(public root: IGridStackItemElement, private gridstack: GridStack) { }

  private suppressGridUpdate = false;

  @bindable({ set: number, mode: BindingMode.twoWay })
  x?: number;
  xChanged() {
    if (this.x !== undefined) {
      this.root.setAttribute('gs-x', this.x.toString());
    } else {
      this.root.removeAttribute('gs-x');
    }
    if (!this.suppressGridUpdate) {
      this.gridstack.grid?.update(this.root as IGridStackItemElement, { x: this.x });
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
    if (!this.suppressGridUpdate) {
      this.gridstack.grid?.update(this.root as IGridStackItemElement, { y: this.y });
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
    if (!this.suppressGridUpdate) {
      this.gridstack.grid?.update(this.root as IGridStackItemElement, { w: this.w });
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
    if (!this.suppressGridUpdate) {
      this.gridstack.grid?.update(this.root as IGridStackItemElement, { h: this.h });
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  minW?: number;
  minWChanged() {
    if (this.minW !== undefined) {
      this.root.setAttribute('gs-min-w', this.minW.toString());
    } else {
      this.root.removeAttribute('gs-min-w');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  minH?: number;
  minHChanged() {
    if (this.minH !== undefined) {
      this.root.setAttribute('gs-min-h', this.minH.toString());
    } else {
      this.root.removeAttribute('gs-min-h');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  maxW?: number;
  maxWChanged() {
    if (this.maxW !== undefined) {
      this.root.setAttribute('gs-max-w', this.maxW.toString());
    } else {
      this.root.removeAttribute('gs-max-w');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  maxH?: number;
  maxHChanged() {
    if (this.maxH !== undefined) {
      this.root.setAttribute('gs-max-h', this.maxH.toString());
    } else {
      this.root.removeAttribute('gs-max-h');
    }
  }

  @bindable({ set: number, mode: BindingMode.twoWay })
  id?: number;
  idChanged() {
    if (this.id !== undefined) {
      this.root.setAttribute('gs-id', this.id.toString());
    } else {
      this.root.removeAttribute('gs-id');
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

  @bindable({ set: booleanAttr })
  autoPosition: boolean;
  autoPositionChanged() {
    if (this.autoPosition) {
      this.root.setAttribute('gs-auto-position', 'true');
    } else {
      this.root.removeAttribute('gs-auto-position');
    }
  }

  @bindable({ set: handlesAttr })
  resizeHandles?: ResizeHandleType[];
  resizeHandlesChanged() {
    if (this.resizeHandles !== undefined) {
      this.root.setAttribute('gs-resize-handles', this.resizeHandles.toString());
    } else {
      this.root.removeAttribute('gs-resize-handles');
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
    if (this.minW !== undefined) {
      this.minWChanged();
    }
    if (this.minH !== undefined) {
      this.minHChanged();
    }
    if (this.maxW !== undefined) {
      this.maxWChanged();
    }
    if (this.maxH !== undefined) {
      this.maxHChanged();
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
    if (this.id !== undefined) {
      this.idChanged();
    }
    if (this.autoPosition !== undefined) {
      this.autoPositionChanged();
    }
    if (this.resizeHandles !== undefined) {
      this.resizeHandlesChanged();
    }
  }

  beginSuppressUpdate() {
    this.suppressGridUpdate = true;
  }

  endSuppressUpdate() {
    this.suppressGridUpdate = false;
  }

}

export interface IGridStackItemElement extends GridItemHTMLElement {
  $au: {
    'au:resource:custom-element': {
      viewModel: GridStackItem;
    };
  };
}

