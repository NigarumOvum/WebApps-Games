// HELPERS
// -------
function mod(n, max) {
    return ((n % max) + max) % max;
};

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function lerp(x, y, a) {
    return x * (1 - a) + y * a;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


// SNAKE GAME
// ----------

class Snake {
    constructor(canvas, settings) {
        // DEFAULT
        let defaultSettings = {
            amountOfPowerUps: 6,
            width: 30,
            height: 30,
            speed: 5,
            fps: 60,
            startPosition: [0, 0],
            startLength: 10,
            powerUpLength: 5,
            startDirection: "right",
            multiplierAmount: 2,
            multiplierCooldown: 15,
            pointAmount: 1,
            loop: true,
            autoStart: false,
            colors: {
                background: "#131416",
                snake: "#e31b47",
                powerUp: "#f3c12d"
            },
            callbacks: {
                onScoreUpdate: () => { },
                onDie: () => { },
            }
        };
        settings = Object.assign(defaultSettings, settings);
        let directions = {};
        let maxPowerUps = settings.height * settings.width - settings.startLength;

        // VARS
        this.width = settings.width;
        this.height = settings.height;
        this.speedTimeout = 1000 / settings.speed;
        this.fpsTimeout = 1000 / settings.fps;
        this.colors = settings.colors;
        this.autoStart = settings.autoStart;
        this.startPosition = settings.startPosition;
        this.position = this.startPosition;
        this.startLength = settings.startLength;
        this.powerUpLength = settings.powerUpLength;
        this.startDirection = this.getDirectionVector(settings.startDirection);
        this.multiplierAmount = settings.multiplierAmount;
        this.pointAmount = settings.pointAmount;
        this.multiplierCooldown = settings.multiplierCooldown;
        this.amountOfPowerUps = settings.amountOfPowerUps < maxPowerUps ? settings.amountOfPowerUps : maxPowerUps;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.speedTimer = null;
        this.fpsTimer = null;
        this.loop = settings.loop;
        this.animateInt = 0;
        this.directionQueue = [];

        this.onScoreUpdate = settings.callbacks.onScoreUpdate;
        this.onDie = settings.callbacks.onDie;

        // START
        this.setupCanvas();
        // this.startLoop();
        this.setupKeys();
        this.setupTouch();

        // console.log(this);
    }

    // setup
    getDirectionVector(direction) {
        const directions = {
            top: [0, -1],
            right: [1, 0],
            bottom: [0, 1],
            left: [-1, 0]
        };
        if (direction in directions) {
            return directions[direction];
        } else {
            throw new Error('Unrecognized startDirection: "' + direction + '"');
        }
    }

    setupKeys() {
        let directions = {
            ArrowUp: [0, -1],
            ArrowRight: [1, 0],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0]
        }
        this.canvas.addEventListener("keydown", e => {
            let key = e.key;
            if (key in directions) {
                e.preventDefault();
                let direction = directions[key];
                if (this.directionNotOpposite(direction) && this.directionNotCurrent(direction) && this.directionQueue.length < 2) {
                    this.directionQueue.push(direction);
                    // console.log(...this.directionQueue);
                }
            }
        })
    }


    setupTouch() {
        let avgDirection = [];
        let touchAmount = 10;
        let touchDirections = [];
        let prev = [];
        let direction = [];

        this.canvas.addEventListener("touchstart", e => {
            e.preventDefault();

            let touch = e.touches[0];
            touchDirections = [];
            prev = [touch.clientX, touch.clientY];
        });


        this.canvas.addEventListener("touchmove", e => {
            e.preventDefault();
            let touch = e.touches[0];
            let current = [touch.clientX, touch.clientY];
            direction = [current[0] - prev[0], current[1] - prev[1]];

            touchDirections.push(direction);

            if (touchDirections.length > touchAmount) {
                touchDirections.shift();
            }

            let sum = touchDirections.reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
            let d = [sum[0] / touchDirections.length, sum[1] / touchDirections.length];

            // right [1,3]  [0] < [1] && [0] > 0
            // left  [1,-3] [0] > [1] && 
            // down  [3,1]  [0] > [1] && 
            // uppp  [-3,1] [0] < [1] && 
            let ver = (Math.abs(d[0]) <= Math.abs(d[1]) && d[1] < 0);
            let hor = (Math.abs(d[1]) <= Math.abs(d[0]) && d[0] < 0)

            // console.log((d[0] < 0 && Math.abs(d[0]) > d[1]) ? "left" : (d[0] > 0 && Math.abs(d[0]) > d[1]) ? "right" : (d[1] > 0 && Math.abs(d[1]) > d[0]) ? "top" : "bottom");

            if ((d[0] < 0 && Math.abs(d[0]) > Math.abs(d[1]))) this.directionQueue = [[-1, 0]];
            else if ((d[0] > 0 && Math.abs(d[0]) > Math.abs(d[1]))) this.directionQueue = [[1, 0]];
            else if ((d[1] < 0 && Math.abs(d[1]) > Math.abs(d[0]))) this.directionQueue = [[0, -1]];
            else if ((d[1] > 0 && Math.abs(d[1]) > Math.abs(d[0]))) this.directionQueue = [[0, 1]];

            // console.log(this.directionQueue[0]);

            prev = current;
        }, { passive: false });
    }

    directionNotOpposite(direction) {
        return (this.direction[0] + direction[0] !== 0 && this.direction[0] + direction[0] !== 0);
    }

    directionNotCurrent(direction) {
        return (this.direction[0] !== direction[0] && this.direction[0] !== direction[0]);
    }

    getInitialSnake() {
        let snake = Array.apply(null, Array(this.startLength)).map((e) => {
            return this.startPosition;
        });
        // console.log(...snake);
        return snake;
    }

    getEmptyLocation(list = []) {
        let collides = true;
        let [x, y] = [null, null];

        if (this.powerUps.length < (this.width * this.height) - this.snake.length) {


            while (collides) {
                [x, y] = [
                    this.getRandomBetween(0, this.width - 1),
                    this.getRandomBetween(0, this.height - 1)
                ];

                collides = this.positionIn(x, y, this.snake) || this.positionIn(x, y, this.powerUps) || this.positionIn(x, y, list);
                if (collides) {
                    // console.log(collides);
                }
            }
        } else {
            // console.log("filled in");
        }
        return [x, y];
    }

    setupCanvas() {
        // this.canvas.style.imageRendering = "pixelated";
        this.canvas.setAttribute("tabindex", 1);
        this.updateCanvasSize();
        window.addEventListener("resize", () => this.updateCanvasSize());
    }

    updateCanvasSize() {
        let box = this.canvas.getBoundingClientRect();
        let ratio = window.devicePixelRatio;
        this.canvasWidth = box.width * ratio;
        this.canvasHeight = box.height * ratio;
        this.canvas.width = box.width * ratio;
        this.canvas.height = box.height * ratio;
    }

    getInitialPowerUps() {
        this.powerUps = [];
        let powerUps = [];
        if (this.amountOfPowerUps < ((this.width * this.height) - this.startLength) / 2) {
            for (let i = 0; i < this.amountOfPowerUps; i++) {
                powerUps.push(this.getEmptyLocation(powerUps));
            }
        } else {
            for (let x of Array(this.width).keys()) {
                for (let y of Array(this.height).keys()) {
                    powerUps.push([x, y])
                }
            }
            for (let i = 0; i < (this.width * this.height) - this.amountOfPowerUps; i++) {
                powerUps.splice(Math.floor(Math.random() * powerUps.length), 1);
            }
        }
        return powerUps;
    }

    startLoop() {
        this.direction = this.startDirection;
        this.snake = this.getInitialSnake(this.startPosition);
        this.prevSnake = this.snake;
        this.powerUps = this.getInitialPowerUps();
        this.score = 0;
        this.multiplier = 1;
        this.canvas.focus();
        clearTimeout(this.timeout);

        this.step();
        this.animate();
    }


    stop() {
        clearTimeout(this.speedTimer);
        clearTimeout(this.fpsTimer);
    }

    async die() {
        this.onDie(this);
        this.death = true;
        CallAd(AdTypes.next, "gameover");
    }



    // helpers
    positionIn(x, y, positions) {
        for (let index in positions) {
            let position = positions[index];
            let [posX, posY] = position;
            if (x === parseInt(posX) && y === parseInt(posY)) return index;
        }
        return false;
    }

    addDirection(p, d) {
        return [p[0] + d[0], p[1] + d[1]];
    }

    getRandomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getHead() {
        return this.snake[0];
    }

    // loop
    step() {
        this.animateInt = 0;
        if (!this.death) {

            if (this.directionQueue.length > 0) {
                let newDirection = this.directionQueue.shift();
                if (this.directionNotOpposite(newDirection)) {
                    this.direction = newDirection;
                }
            }


            // update
            this.moveSnake();
            this.collectPowerUps();
            this.decreaseMultiplier();
            this.updateScore();

            // draw
            // this.drawBackground();
            // this.drawPowerUps();
            // this.drawSnake();


            clearTimeout(this.speedTimer);

            this.considerDeath();
        }
        this.speedTimer = setTimeout(() => this.step(), this.speedTimeout);

        // console.log(this.snake.join(" "));
    }

    animate() {
        this.animateInt += 1 / this.speedTimeout * this.fpsTimeout;

        this.drawBackground();
        this.drawPowerUps();
        this.drawSnake();

        if (this.death) {
            this.animateInt = 0;
            if (this.snake.length > 2) {
                this.snake.shift();
                this.snake.pop();
            } else {
                this.death = false;
                this.stop();
                if (this.autoStart) this.startLoop();
            }
            // this.snake.push([-1,-1]);
            let head = this.getHead();
            this.drawRect(this.colors.snake, head[0], head[1], 1, 1);
        }

        clearTimeout(this.fpsTimer);
        this.fpsTimer = setTimeout(() => this.animate(), this.fpsTimeout);

    }

    // update
    moveSnake() {
        this.prevSnake = [...this.snake];

        this.snake.pop();

        let head = this.addDirection(this.snake[0], this.direction);
        let [x, y] = head;
        if (this.loop) head = [mod(x, this.width), mod(y, this.height)];
        this.snake.unshift(head);

        // console.log("-------------------------------------");
        // console.log(...this.prevSnake);
        // console.log(...this.snake);
    }

    addLength(amount) {
        for (let i = 0; i < amount; i++) {
            this.snake.push(this.snake[this.snake.length - 1]);
        }
    }

    collectPowerUps() {
        let [x, y] = this.prevSnake[0];
        let popupIndex = this.positionIn(x, y, this.powerUps);
        if (popupIndex) {
            this.pickupPowerUp(popupIndex);
        }
    }

    considerDeath() {
        let [x, y] = this.getHead();
        let headlessSnake = [...this.snake];
        headlessSnake.shift();
        // console.log(headlessSnake);
        if (this.positionIn(x, y, headlessSnake)) {
            this.die();
        }

        if (!this.loop) {
            if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) this.die();
        }
    }

    pickupPowerUp(index) {
        if (index < this.powerUps.length) {
            this.powerUps.splice(index, 1);
            this.spawnPowerUp();
            this.addLength(this.powerUpLength);
            this.addMultiplier();
        }
    }

    spawnPowerUp() {
        this.powerUps.push(this.getEmptyLocation());
    }

    addMultiplier() {
        this.multiplier += this.multiplierAmount;
    }

    decreaseMultiplier() {
        this.multiplier -= this.multiplierAmount / this.multiplierCooldown;
        this.multiplier = this.multiplier >= 1 ? this.multiplier : 1;
    }

    updateScore() {
        this.score += this.pointAmount * this.multiplier;
        // console.log("SCORE:", this.score, "MULTIPLIER:", this.multiplier);
        this.onScoreUpdate({
            score: this.score,
            multiplier: this.multiplier
        })
    }

    // draw
    drawList(list, color, type = "rect") {
        for (let index in list) {
            let item = list[index];
            let [x, y] = item;
            if (type === "rect") this.drawRect(color, x, y, 1, 1);
            if (type === "circle") this.drawCircle(color, x, y, 1, 1);
        }
    }

    // draw
    drawSnake() {
        for (let index in this.snake) {
            let item = this.snake[index];
            let [x, y] = item;
            if (index == 0 || index == this.prevSnake.length - 1) {
                let [prevX, prevY] = this.prevSnake[index];

                if (index == this.prevSnake.length - 1) {
                    this.drawRect(this.colors.snake, x, y, 1, 1);

                } else if (index === 0) {
                    this.drawCap(this.colors.snake, x, y, 1, 1,)
                }

                [x, y] = [
                    (x !== prevX && Math.abs(x - prevX) <= 1) ? lerp(prevX, x, this.animateInt) : x,
                    (y !== prevY && Math.abs(y - prevY) <= 1) ? lerp(prevY, y, this.animateInt) : y
                ];
            }
            this.drawRect(this.colors.snake, x, y, 1, 1);
        }
    }

    drawRect(color, x, y, width, height) {
        let m = this.canvasWidth / this.width;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.floor(x * m), Math.floor(y * m), Math.ceil(width * m), Math.ceil(height * m));
    }

    drawCircle(color, x, y, width, height) {
        let m = this.canvasWidth / this.width;
        this.ctx.fillStyle = color;
        let centerX = (x + x + width) / 2;
        let centerY = (y + y + height) / 2;
        let radius = width / 2;

        this.ctx.beginPath();
        this.ctx.arc(centerX * m, centerY * m, radius * m, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawBackground() {
        this.drawRect(this.colors.background, 0, 0, this.width, this.width);
    }

    drawPowerUps() {
        this.drawList(this.powerUps, this.colors.powerUp, "circle");
    }
}


// You can change the settings if you like
// ---------------------------------------
let settings = {
    // width:50,
    // height:50,
    // amountOfPowerUps: 1000,
    // powerUpLength: 1,
    // loop: true,
    // fps: 60,
    // speed: 20,
    // startLength: 10,
    // autoStart: false
};


// START BUTTON, SCOREBOARD ETC.
// -----------------------------
let canvas = document.querySelector("canvas");
let canvasContainer = document.querySelector(".canvas-container");
let snake = new Snake(canvas, settings);
let highscore = localStorage.getItem("highscore") !== null ? parseInt(localStorage.getItem("highscore")) : 0;
let previousScore = localStorage.getItem("previousScore") !== null ? parseInt(localStorage.getItem("previousScore")) : 0;

let startButton = document.querySelector(".start");
startButton.innerHTML = SelectTranslteText("Start", "スタート");
startButton.addEventListener("click", e => {
    e.preventDefault();

    snake.startLoop();
    canvasContainer.classList.add("is-active");
})

const scoreText = SelectTranslteText("Score", "スコア");
const multiplierText = SelectTranslteText("Multiplier", "乗数");
const highScoreText = SelectTranslteText("High Score", "高得点");

let score = document.querySelector(".score");
snake.onScoreUpdate = (data) => {
    score.innerHTML = `${scoreText}: ${data.score.toFixed(0)} ${multiplierText}: ${data.multiplier.toFixed(2)} ${highScoreText}: ${highscore}`;
}

snake.onDie = (data) => {

    canvasContainer.classList.remove("is-active");


    let prevScore = localStorage.getItem("highscore") !== null ? parseInt(localStorage.getItem("highscore")) : 0;
    if (data.score > prevScore) {
        localStorage.setItem("highscore", Math.floor(data.score));
        highscore = Math.floor(data.score);
    }

    localStorage.setItem("previousScore", Math.floor(data.score));
    previousScore = Math.floor(data.score);
}