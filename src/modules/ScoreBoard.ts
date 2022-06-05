//定义记分牌的类
export class ScoreBoard {
    score: number = 0;
    level: number = 1;
    scoreElement: HTMLElement;
    levelElement: HTMLElement;
    //设置一个变量限制等级
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreElement = document.querySelector('.score')!;
        this.levelElement = document.querySelector('.level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    addScore() {
        this.score++;
        this.scoreElement.innerHTML = this.score.toString();
        if (this.score % this.upScore == 0) this.levelUp();
    }
    levelUp() {
        //蛇的最大等级为10
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelElement.innerHTML = this.level.toString();
        }
    }
}

