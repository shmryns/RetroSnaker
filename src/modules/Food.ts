import { randomColor } from './utils';
//食物类
export class Food {
    element: HTMLElement;
    divs: HTMLCollectionOf<HTMLElement>;
    constructor() {
        this.element = document.querySelector('.food')!;
        this.divs = this.element.getElementsByTagName('div');
        this.change();
    }
    change() {
        let top = Math.floor(Math.random() * 50) * 10;
        let left = Math.floor(Math.random() * 50) * 10;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
        Array.from(this.divs).forEach(item => {
            item.style.backgroundColor = randomColor();
        })
    }
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
}
// new Food().change()
