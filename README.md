# aurelia-gridstack
Aurelia wrapper for [gridstack](https://github.com/gridstack/gridstack.js)
[Demo app](https://aurelia-ui-toolkits.github.io/aurelia-gridstack/)

## Installation

```
npm i gridstack aurelia-gridstack aurelia-typed-observable-plugin tslib --save
```

## Configuration

```typescript
// main.ts
export function configure(aurelia: Aurelia) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-gridstack"));
    // the rest of your configuration...
}
```

## Usage

```html
<require from="gridstack/dist/gridstack.min.css"></require>
<grid-stack min-row="5" float>
  <grid-stack-item x="0" y="0" w="2" h="1">
    <div class="item">Item1</div>
  </grid-stack-item>
  <grid-stack-item x="1" y="1" w="2" h="2">
    <div class="item">Item2</div>
  </grid-stack-item>
  <grid-stack-item x="3" y="2" w="1" h="2">
    <div class="item">Item3</div>
  </grid-stack-item>
</grid-stack>

Or with bindings
<grid-stack min-row="5" float>
  <grid-stack-item repeat.for="i of items" x.bind="i.x" y.bind="i.y" w.bind="i.w" h.bind="i.h">
    <div class="item">
      <div>Item ${$index + 1}</div>
      <div>x: ${i.x}</div>
      <div>y: ${i.y}</div>
      <div>w: ${i.w}</div>
      <div>h: ${i.h}</div>
    </div>
  </grid-stack-item>
</grid-stack>
```

```ts
items = [
  { x: 0, y: 0, w: 2, h: 1 },
  { x: 1, y: 1, w: 2, h: 2 },
  { x: 3, y: 2, w: 1, h: 2 }
];
```

## Contribution

If you feel that something is missing please submit an issue or better yet a PR.
