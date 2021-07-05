import { bindable, children, CustomElement, customElement, inject } from 'aurelia';
import { booleanAttr, number } from '../../interceptors';
import * as gs from 'gridstack';
// eslint-disable-next-line import/no-unassigned-import
import 'gridstack/dist/h5/gridstack-dd-native';
import { GridStackItem } from '../grid-stack-item/grid-stack-item';

@inject(Element)
@customElement('grid-stack')
export class GridStack {
  constructor(public root: HTMLElement) { }

  grid: gs.GridStack;

  @bindable({ set: number })
  minRow: number;
  minRowChanged() {
    this.root.setAttribute('gs-min-row', this.minRow.toString());
  }

  @bindable({ set: booleanAttr })
  float: boolean;
  floatChanged() {
    this.grid?.float(this.float);
  }

  @children({ filter: (el: HTMLElement) => { return el.tagName === 'GRID-STACK-ITEM'; } })
  private items: GridStackItem[];
  itemsChanged() {
    if (!this.grid || !this.items) {
      return;
    }
    const newItems = this.items.map(x => x.root).filter(x => !x.gridstackNode);
    newItems.forEach(x => {
      this.grid.addWidget(x);
      if (x.gridstackNode) {
        this.updateNodeVmAttributes(x.gridstackNode);
      }
    });
    const removed = this.grid.engine.nodes.filter(x => !x.el?.classList.contains('grid-stack-placeholder') && !this.items.find(y => y.root === x.el));
    removed.forEach(x => this.grid.engine.removeNode(x, false, false));
  }

  attached() {
    this.grid = gs.GridStack.init({ float: this.float, minRow: this.minRow }, this.root);
    // this.itemsChanged();
  }

  detached() {
    this.grid.destroy();
  }

  handleChange(nodes: gs.GridStackNode[]) {
    nodes.forEach(x => this.updateNodeVmAttributes(x));
  }

  updateNodeVmAttributes(node: gs.GridStackNode) {
    if (node.el) {
      const itemVm = CustomElement.for<GridStackItem>(node.el).viewModel;
      itemVm.x = node.x;
      itemVm.y = node.y;
      itemVm.w = node.w;
      itemVm.h = node.h;
    }
  }
}
