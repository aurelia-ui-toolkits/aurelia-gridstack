export class App {
  items = [
    { x: 0, y: 0, w: 2, h: 1, id: 11 },
    { x: 1, y: 1, w: 2, h: 2, id: 22 },
    { x: 3, y: 2, w: 1, h: 2, id: 33 }
  ];

  remove() {
    this.items.splice(this.items.length - 1, 1);
  }
}
