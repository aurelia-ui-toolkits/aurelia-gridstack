import { inject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';
import { children, customElement, useView } from 'aurelia-templating';
import { bindable } from 'aurelia-typed-observable-plugin';
import * as gs from 'gridstack';
// eslint-disable-next-line import/no-unassigned-import
import 'gridstack/dist/h5/gridstack-dd-native';
import { GridStackItem, IGridStackItemElement } from '../grid-stack-item/grid-stack-item';

@inject(Element)
@customElement('grid-stack')
@useView(PLATFORM.moduleName('./grid-stack.html'))
export class GridStack {
  constructor(public root: HTMLElement) { }

  grid: gs.GridStack;

  @bindable.number
  minRow: number;
  minRowChanged() {
    this.root.setAttribute('gs-min-row', this.minRow.toString());
  }

  @bindable
  float: string | boolean | undefined;
  floatChanged() {
    this.grid?.float(this.getFloat());
  }

  getFloat() {
    return this.float || this.float === '' ? true : false;
  }

  @bindable
  static: string | boolean | undefined;
  staticChanged() {
    this.grid?.setStatic(this.getStatic());
  }

  getStatic() {
    return this.static || this.static === '' ? true : false;
  }

  @bindable
  options: gs.GridStackOptions;

  @children('.grid-stack-item')
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
    const removed = this.grid.engine.nodes.filter(x => !this.items.find(y => y.root === x.el));
    removed.forEach(x => this.grid.engine.removeNode(x, false, false));
  }

  attached() {
    const options = this.options ?? {};
    if (this.float !== undefined) {
      options.float = this.getFloat();
    }
    this.grid = gs.GridStack.init(options, this.root);
    this.itemsChanged();
  }

  detached() {
    this.grid.destroy();
  }

  handleChange(nodes: gs.GridStackNode[]) {
    nodes.forEach(x => this.updateNodeVmAttributes(x));
  }

  updateNodeVmAttributes(node: gs.GridStackNode) {
    const itemVm = (node.el as IGridStackItemElement).au.controller.viewModel;
    itemVm.x = node.x;
    itemVm.y = node.y;
    itemVm.w = node.w;
    itemVm.h = node.h;
  }
}
