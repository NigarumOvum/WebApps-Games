swipeThreshold = 50;
holdThreshold = 500;

gameStarted = false;
mouseDownTime = 0;
mousePressed = false;
moved = false;
loaded = false;

window.addEventListener('keydown',KeyDown,true);
window.addEventListener('mousedown',function() {MouseDown(false)},true);
window.addEventListener('mousemove',function() {MouseMove(false)},true);
window.addEventListener('mouseup',MouseUp,true);

function KeyDown(key){
    if (!gameStarted && key.key == 'Enter'){
        event.preventDefault();
        gameStarted = true;
        StartGameLoop();
    }
    if (!gameStarted)
        return;
    if (key.key == 'ArrowRight'){
        event.preventDefault();
        Move(1);
    }
    if (key.key == 'ArrowLeft'){
        event.preventDefault();
        Move(-1);
    }
    if (key.key == 'ArrowUp'){
        event.preventDefault();
        Rotate()
    };
    if (key.key == 'ArrowDown'){
        event.preventDefault();
        DropBlock();
        DrawToScreen();
    }
}

function MouseDown(isTouch) {
    if (!gameStarted)
        return;
    if (isTouch){
        try{event.preventDefault();} catch {};
        tapStartXPos = event.changedTouches[0].pageX - canvas.getBoundingClientRect().left;
        tapStartYPos = event.changedTouches[0].pageY - canvas.getBoundingClientRect().top;
    } else {
        tapStartXPos = event.clientX - canvas.getBoundingClientRect().left;
        tapStartYPos = event.clientY - canvas.getBoundingClientRect().top;
    }
    mouseDownTime = performance.now();
    mousePressed = true;
}

function MouseMove(isTouch) {
    if (!mousePressed || !gameStarted)
        return;
    event.preventDefault();
    if (isTouch){
        try{event.preventDefault();} catch {};
        deltaX = event.changedTouches[0].pageX - canvas.getBoundingClientRect().left - tapStartXPos;
        deltaY = event.changedTouches[0].pageY - canvas.getBoundingClientRect().top - tapStartYPos;
    } else {
        deltaX = event.clientX - canvas.getBoundingClientRect().left - tapStartXPos;
        deltaY = event.clientY - canvas.getBoundingClientRect().top - tapStartYPos;
    }
    mouseTapTime = performance.now() - mouseDownTime;
    if (Math.abs(deltaX) > swipeThreshold){
        moved = true;
        if (deltaX > 0)
            Move(1);
        else
            Move(-1);
        
        if (isTouch){
            tapStartXPos = event.changedTouches[0].pageX - canvas.getBoundingClientRect().left;
            tapStartYPos = event.changedTouches[0].pageY - canvas.getBoundingClientRect().top;
        } else {
            tapStartXPos = event.clientX - canvas.getBoundingClientRect().left;
            tapStartYPos = event.clientY - canvas.getBoundingClientRect().top;
        }
    } else if(deltaY > swipeThreshold){
        moved = true;
        DropBlock();
        DrawToScreen();
        
        if (isTouch){
            tapStartXPos = event.changedTouches[0].pageX - canvas.getBoundingClientRect().left;
            tapStartYPos = event.changedTouches[0].pageY - canvas.getBoundingClientRect().top;
        } else {
            tapStartXPos = event.clientX - canvas.getBoundingClientRect().left;
            tapStartYPos = event.clientY - canvas.getBoundingClientRect().top;
        }
    }
}

function MouseUp(isTouch) {
    if (!gameStarted && loaded){
        gameStarted = true;
        StartGameLoop();
        return;
    }
    mouseTapTime = performance.now() - mouseDownTime;
    mousePressed = false;
    if (!moved && mouseTapTime < holdThreshold)
        Rotate();
    moved = false;
}