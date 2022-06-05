import { randomColor } from "./utils";
export class Snake {
    element: HTMLElement;
    //表示蛇头的元素
    head: HTMLElement;
    //蛇的身体(包括蛇头)
    body: HTMLCollectionOf<HTMLElement>;
    constructor() {
        this.element = document.querySelector('.snake')!;
        this.head = document.querySelector('.snake>div')!;
        this.body = this.element.getElementsByTagName('div');
        this.init();
    }
    init() {
        this.head.style.backgroundColor = randomColor();
    }

    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    set X(value: number) {
        if (this.X === value) {
            return;
        }
        if (value < 0 || value > 490) {
            throw new Error('蛇撞墙了!');
        }
        //禁止水平方向掉头
        if (this.body[1] && this.body[1].offsetLeft == value) {
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        this.moveBody();
        this.head.style.left = `${value}px`;
        //检查有没有撞到自己
        this.checkHandBody();
    }
    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 490) {
            throw new Error('蛇撞墙了!');
        }
        //禁止垂直方向掉头
        if (this.body[1] && this.body[1].offsetTop == value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        this.moveBody();
        this.head.style.top = `${value}px`;
        //检查有没有撞到自己
        this.checkHandBody();
    }
    //蛇吃到食物
    addBody() {
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = randomColor();
        this.element.appendChild(newDiv);
    }
    //蛇身体移动的方法
    moveBody() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].style.top = this.body[i - 1].offsetTop + 'px';
            this.body[i].style.left = this.body[i - 1].offsetLeft + 'px';
        }
    }
    //检查头和身体有没有相撞
    checkHandBody() {
        for (let i = 3; i < this.body.length; i++) {
            if (this.X == this.body[i].offsetLeft && this.Y == this.body[i].offsetTop) {
                throw new Error('撞到自己了!')
            }
        }
    }
}