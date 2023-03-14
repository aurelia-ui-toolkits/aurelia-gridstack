import { bindable, children, CustomElement, customElement, inject } from 'aurelia';
import { booleanAttr, number } from '../../interceptors';
import * as gs from 'gridstack';
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

  @bindable({ set: booleanAttr })
  static: boolean;
  staticChanged() {
    this.grid?.setStatic(this.static);
  }

  @bindable
  options: gs.GridStackOptions;

  @children({ filter: (el: HTMLElement) => { return el.tagName === 'GRID-STACK-ITEM'; } })
  private items: GridStackItem[];
  itemsChanged() {
    if (!this.grid || !this.items) {
      return;
    }
    const removed = this.grid.engine.nodes.filter(x => !x.el?.classList.contains('grid-stack-placeholder') && !this.items.find(y => y.root === x.el));
    removed.forEach(x => this.grid.engine.removeNode(x, false, false));
    const newItems = this.items.map(x => x.root).filter(x => !x.gridstackNode);
    newItems.forEach(x => {
      this.grid.addWidget(x);
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
    if(this.static !== undefined){
      options.staticGrid = this.static;
    }
    this.grid = gs.GridStack.init(options, this.root);
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
