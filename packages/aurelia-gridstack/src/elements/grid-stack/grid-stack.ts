import { bindable, children, CustomElement, resolve } from 'aurelia';
import { booleanAttr, number } from '../../interceptors';
import * as gs from 'gridstack';
import { GridStackItem } from '../grid-stack-item/grid-stack-item';

export class GridStack {
  public readonly root = resolve(Element);

  grid: gs.GridStack | undefined;

  @bindable({ set: number })
  minRow?: number;
  minRowChanged() {
    if (this.minRow === undefined) {
      this.root.removeAttribute('gs-min-row');
    } else {
      this.root.setAttribute('gs-min-row', this.minRow.toString());
    }
  }

  @bindable({ set: booleanAttr })
  float?: boolean;
  floatChanged() {
    if (this.float !== undefined) {
      this.grid?.float(this.float);
    }
  }

  @bindable({ set: booleanAttr })
  static?: boolean;
  staticChanged() {
    if (this.static !== undefined) {
      this.grid?.setStatic(this.static);
    }
  }

  @bindable
  options?: gs.GridStackOptions;

  @children({ filter: (el: HTMLElement) => { return el.tagName === 'GRID-STACK-ITEM'; } })
  private items?: GridStackItem[];
  itemsChanged() {
    const grid = this.grid;
    const items = this.items;
    if (!grid || !items) {
      return;
    }
    const removed = grid.engine.nodes.filter(x => !x.el?.classList.contains('grid-stack-placeholder') && !items.find(y => y.root === x.el));
    removed.forEach(x => grid.engine.removeNode(x, false, false));
    const newItems = items.map(x => x.root).filter(x => !x.gridstackNode);
    newItems.forEach(x => {
      grid.makeWidget(x);
      if (x.gridstackNode) {
        this.updateNodeVmAttributes(x.gridstackNode);
      }
    });
  }

  attached() {
    const options = this.options ?? {};
    if (this.float !== undefined) {
      options.float = this.float;
    }
    if (this.static !== undefined) {
      options.staticGrid = this.static;
    }
    this.grid = gs.GridStack.init(options, this.root as HTMLElement) ?? undefined;
  }

  detaching() {
    this.grid?.destroy();
    this.grid = undefined;
  }

  handleChange(nodes: gs.GridStackNode[]) {
    if (!(nodes instanceof Array)) {
      return;
    }
    nodes.forEach(x => this.updateNodeVmAttributes(x));
  }

  updateNodeVmAttributes(node: gs.GridStackNode) {
    if (node.el) {
      const itemVm = CustomElement.for<GridStackItem>(node.el).viewModel;
      itemVm.beginSuppressUpdate();
      itemVm.x = node.x;
      itemVm.y = node.y;
      itemVm.w = node.w;
      itemVm.h = node.h;
      itemVm.endSuppressUpdate();
    }
  }
}
