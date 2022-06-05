import { Snake } from './Snake';
import { Food } from './Food';
import { ScoreBoard } from './ScoreBoard';

export class GameControl {
    //定义三个属性
    snake: Snake;
    food: Food;
    scoreBoard: ScoreBoard;
    //创建属性存储蛇的移动方向
    direction: string = '';
    //创建一个属性记录游戏是否结束
    isGameOver: boolean = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        //设置多少分升一级
        this.scoreBoard = new ScoreBoard(10, 1);
        //添加事件
        this.init();
    }
    //初始化游戏
    init() {
        document.addEventListener('keydown', this.keydown.bind(this));
        this.move();
    }
    //创建一个键盘按下响应的函数
    keydown(evt: KeyboardEvent) {
        this.direction = evt.key.toLowerCase().split('arrow')[1];
    }
    //创建一个蛇移动的方法
    move() {
        //获取蛇头的位置
        let headX = this.snake.X;
        let headY = this.snake.Y;
        //蛇头的移动方向
        switch (this.direction) {
            case 'right':
                headX += 10;
                break;
            case 'left':
                headX -= 10;
                break;
            case 'up':
                headY -= 10;
                break;
            case 'down':
                headY += 10;
                break;

        }
        //检测蛇是否吃到食物
        this.checkEat(headX, headY);
        //蛇头的新位置
        try {
            this.snake.X = headX;
            this.snake.Y = headY;
        } catch (error: any) {
            this.isGameOver = false;
            alert(error.message + '游戏结束');
        }
        this.isGameOver && setTimeout(this.move.bind(this), 300 - (this.scoreBoard.level - 1) * 30)
    }
    //检查蛇是否吃到食物
    checkEat(x: number, y: number) {
        if (x === this.food.X && y === this.food.Y) {
            //蛇吃到食物
            this.snake.addBody();
            //改变食物的位置
            this.food.change();
            //改变分数
            this.scoreBoard.addScore();
        }

    }
}