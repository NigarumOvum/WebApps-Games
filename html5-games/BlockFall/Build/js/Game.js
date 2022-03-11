var canvas;
var ctx;
var objects = [];
var screenWidth;
var screenHeight;
var time = performance.now();
var deltaTime = performance.now();
var grid = [];
var gridRows = 20;
var gridCols = 10;
var gameSpeed = 1000;
var spawnPoint = [0, 3];
var scoreText;
var playerScore = 0;

var straightBlock =
    [[0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    ];
var lBlock =
    [[0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 2, 0],
    ];
var revLBlock =
    [[0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    ];
var tBlock =
    [[0, 3, 0, 0],
    [0, 3, 3, 0],
    [0, 3, 0, 0],
    [0, 0, 0, 0],
    ];
var zBlock =
    [[0, 2, 2, 0],
    [0, 0, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ];
var revZBlock =
    [[0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ];
var squareBlock =
    [[0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    ];
var blocks = [straightBlock, lBlock, revLBlock, tBlock, zBlock, revZBlock, squareBlock];

LoadDependencies();

window.addEventListener('load', function () {
    Initialize();
    loaded = true;
});

function LoadDependencies() {
    document.writeln("<script type='text/javascript' src='js/Renderer.js'></script>");
    document.writeln("<script type='text/javascript' src='js/InputManager.js'></script>");
    document.writeln("<script type='text/javascript' src='js/LocaleHandler.js'></script>");
}

function Initialize() {
    canvas = document.getElementById('gameCanvas');
    screenWidth = canvas.width;
    screenHeight = canvas.height;

    canvas.addEventListener("touchstart", MouseDown, false);
    canvas.addEventListener("touchmove", MouseMove, false);
    canvas.addEventListener("touchend", MouseUp, false);
    canvas.addEventListener("touchcancel", MouseUp, false);

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        scoreText = document.getElementById('score');
        swipeThreshold = canvas.width / 10;
    }
    else
        alert("Unsupported Platform");
}

function StartGameLoop() {
    //Initialize Empty Grid
    for (i = 0; i < gridRows; i++) {
        grid[i] = [];
        for (j = 0; j < gridCols; j++)
            grid[i][j] = 0;
    }

    //Start Render Cycle
    Render();
}

function Update() {
    deltaTime = performance.now() - time;
    time = performance.now();

    dropped = DropBlock();

    //Check if the game is lost
    if (grid[0].includes(-1)) {
        LoseGame();
        return;
    }

    //Clear finished lines and calculate score
    scoreMultiplier = 0;
    for (i = 0; i < grid.length; i++)
        if (grid[i].every((val, i, arr) => val === -1)) {
            scoreMultiplier++;
            ClearLine(i);
        }
    AddScore(10 * scoreMultiplier * scoreMultiplier + 10 * scoreMultiplier);
    if (scoreMultiplier)
        IncreaseSpeed(50);

    //Spawn a new block if the previous one cannot fall anymore
    if (!dropped)
        SpawnBlock(blocks[Math.floor(Math.random() * blocks.length)]);
}

function DropBlock() {
    blocksToDrop = [];
    canDrop = true;
    for (i = 0; i < gridRows; i++)
        for (j = 0; j < gridCols; j++)
            if (grid[i][j] > 0) {
                if (i + 1 >= gridRows || grid[i + 1][j] == -1)
                    canDrop = false;
                blocksToDrop.push([i, j]);
            }
    blocksToDrop.sort(function (a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    });

    for (a = 0; a < blocksToDrop.length; a++) {
        i = blocksToDrop[a][0];
        j = blocksToDrop[a][1];
        if (canDrop) {
            grid[i + 1][j] = grid[i][j];
            grid[i][j] = 0;
            // grid[i][j] -= t;
        } else
            grid[i][j] = -1;
    }

    return canDrop && blocksToDrop.length != 0;
}

function SpawnBlock(block) {
    for (i = 0; i < block.length; i++)
        for (j = 0; j < block[i].length; j++)
            if (grid[i + spawnPoint[0]][j + spawnPoint[1]] == -1) {
                LoseGame();
                return;
            }
            else
                grid[i + spawnPoint[0]][j + spawnPoint[1]] = block[i][j];
}

function Move(dir) {
    blocksToMove = [];
    canMove = true;
    for (i = 0; i < gridRows; i++)
        for (j = 0; j < gridCols; j++)
            if (grid[i][j] > 0) {
                if (j + dir < 0 || j + dir >= gridCols || grid[i][j + dir] == -1)
                    canMove = false;
                blocksToMove.push([i, j]);
            }
    if (dir > 0)
        blocksToMove.sort(function (a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] > b[1]) ? -1 : 1;
            }
        });
    else
        blocksToMove.sort(function (a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
        });
    if (canMove)
        for (a = 0; a < blocksToMove.length; a++) {
            i = blocksToMove[a][0];
            j = blocksToMove[a][1];
            grid[i][j + dir] = grid[i][j];
            grid[i][j] = 0;
        }

    DrawToScreen();
}

function ClearLine(index) {
    for (i = index; i > 0; i--)
        grid[i] = [...grid[i - 1]];
    grid[0] = new Array(gridCols).fill(0);
}

function AddScore(amount) {
    playerScore += amount;
    TranslateText("score", scoreText);
    scoreText.innerText += " : " + playerScore;

}

function LoseGame() {
    TranslateText("score", scoreText);
    scoreText.innerText += " : " + playerScore;
    scoreText.style.color = "Red";

    setTimeout(() => {
        location.reload();
    }, 3000);
}

function Rotate() {
    blocksToRotate = [];
    canRotate = true;
    for (i = 0; i < gridRows; i++)
        for (j = 0; j < gridCols; j++)
            if (grid[i][j] > 0)
                blocksToRotate.push([i, j]);

    blockStart = [Math.max(gridRows, gridCols), Math.max(gridRows, gridCols)];
    blockEnd = [0, 0];

    for (i = 0; i < blocksToRotate.length; i++) {
        blockStart[0] = Math.min(blockStart[0], blocksToRotate[i][0]);
        blockStart[1] = Math.min(blockStart[1], blocksToRotate[i][1]);
        blockEnd[0] = Math.max(blockEnd[0], blocksToRotate[i][0]);
        blockEnd[1] = Math.max(blockEnd[1], blocksToRotate[i][1]);
    }

    blockSize = Math.max(blockEnd[0] - blockStart[0], blockEnd[1] - blockStart[1]) + 1;

    newBlock = [];

    for (i = 0; i < blockSize; i++) {
        newBlock[i] = [];
        for (j = 0; j < blockSize; j++)
            newBlock[i][j] = grid[blockStart[0] + j][blockStart[1] + i];
    }

    for (i = 0; i < blockSize; i++) {
        for (j = 0; j < Math.floor(blockSize / 2); j++) {
            t = newBlock[i][j];
            newBlock[i][j] = newBlock[i][blockSize - 1 - j];
            newBlock[i][blockSize - 1 - j] = t;
        }
    }

    canRotate = true;
    for (i = 0; i < blockSize; i++)
        for (j = 0; j < blockSize; j++)
            if (blockStart[0] + i < 0 || blockStart[0] + i >= gridRows || blockStart[1] + j < 0 || blockStart[1] + j >= gridCols)
                return;
            else if (grid[blockStart[0] + i][blockStart[1] + j] == -1)
                return;


    for (i = 0; i < blockSize; i++)
        for (j = 0; j < blockSize; j++)
            grid[blockStart[0] + i][blockStart[1] + j] = newBlock[i][j];

    DrawToScreen();
}

function IncreaseSpeed(amount) {
    if (gameSpeed > 100)
        gameSpeed = Math.max(100, gameSpeed - amount);
}
