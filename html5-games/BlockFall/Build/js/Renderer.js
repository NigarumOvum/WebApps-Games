var colors = {
    "-1" : "#555555",
    1 : "#FF0000",
    2 : "#00FF00",
    3 : "#0000FF",
};

function Render(){
    Update();
    DrawToScreen();
    setTimeout(Render,gameSpeed);
}

function DrawToScreen() {
    //Clear Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Render Grid Lines
    DrawGridLines();

    //Render Game State
    DrawGameState();
}

function DrawGridLines() {
    //Draw Rows
    for (i = 0;i < gridRows;i++){
        ctx.beginPath();
        ctx.moveTo(0,i/gridRows * screenHeight);
        ctx.lineTo(screenWidth,i/gridRows * screenHeight);
        ctx.stroke();
    }
    //Draw Columns
    for (i = 0;i < gridCols;i++){
        ctx.beginPath();
        ctx.moveTo(i/gridCols * screenWidth, 0);
        ctx.lineTo(i/gridCols * screenWidth, screenHeight);
        ctx.stroke();
    }
}

function DrawGameState() {
    for (i = 0;i < gridRows;i++)
        for (j = 0;j < gridCols;j++)
            if (grid[i][j] != 0)
                DrawSquare(i,j);
}

function DrawSquare(i, j) {
    ctx.fillStyle = colors[grid[i][j]];
    ctx.fillRect(j/gridRows * screenHeight,i/gridCols * screenWidth,  screenWidth/gridCols, screenHeight/gridRows);
}