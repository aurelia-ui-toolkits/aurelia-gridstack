import { inject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';
import { children, customElement, useView } from 'aurelia-templating';
import { bindable } from 'aurelia-typed-observable-plugin';
import * as gs from 'gridstack';
import { GridStackItem, IGridStackItemElement } from '../grid-stack-item/grid-stack-item';

@inject(Element)
@customElement('grid-stack')
@useView(PLATFORM.moduleName('./grid-stack.html'))
export class GridStack {
  constructor(public root: HTMLElement) { }

  grid: gs.GridStack | undefined;

  @bindable.number
  minRow: number;
  minRowChanged() {
    this.root.setAttribute('gs-min-row', this.minRow.toString());
  }

  @bindable.none
  float: string | boolean | undefined;
  floatChanged() {
    this.grid?.float(this.getFloat());
  }

  getFloat() {
    return this.float || this.float === '' ? true : false;
  }

  @bindable.none
  static: string | boolean | undefined;
  staticChanged() {
    this.grid?.setStatic(this.getStatic());
  }

  getStatic() {
    return this.static || this.static === '' ? true : false;
  }

  @bindable.none
  options: gs.GridStackOptions;

  @children('.grid-stack-item')
  private items: GridStackItem[];
  itemsChanged() {
    if (!this.grid || !this.items) {
      return;
    }
    const removed = this.grid.engine.nodes.filter(x => !this.items.find(y => y.root === x.el));
    removed.forEach(x => this.grid!.engine.removeNode(x, false, false));
    const newItems = this.items.map(x => x.root).filter(x => !x.gridstackNode);
    newItems.forEach(x => {
      this.grid!.addWidget(x);
      if (x.gridstackNode) {
        this.updateNodeVmAttributes(x.gridstackNode);
      }
    });
  }

  attached() {
    const options = this.options ?? {};
    if (this.float !== undefined) {
      options.float = this.getFloat();
    }
    if (this.static !== undefined) {
      options.staticGrid = this.getStatic();
    }
    this.grid = gs.GridStack.init(options, this.root);
    this.itemsChanged();
  }

  detached() {
    this.grid!.destroy();
    this.grid = undefined;
  }

  handleChange(nodes: gs.GridStackNode[]) {
    if (!(nodes instanceof Array)) {
      return;
    }
    nodes.forEach(x => this.updateNodeVmAttributes(x));
  }

  updateNodeVmAttributes(node: gs.GridStackNode) {
    const itemVm = (node.el as IGridStackItemElement).au.controller.viewModel;
    itemVm.beginSuppressUpdate();
    itemVm.x = node.x;
    itemVm.y = node.y;
    itemVm.w = node.w;
    itemVm.h = node.h;
    itemVm.endSuppressUpdate();
  }
}
