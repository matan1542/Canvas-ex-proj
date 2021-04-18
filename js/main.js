let gCanvas
let gCtx
let gCurrShape = 'circle'
let gColor;
const gTouchEvs = ['panstart', 'panmove', 'panend'];
let gIsDrawn = false;
let gCountMoves = 0;


function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = window.innerWidth
    gCanvas.height = window.innerHeight
    // addMouseListeners()
    addTouchListeners()



}


function onChangeShape(elShape) {
    gCurrShape = elShape.value;

}


function onBgcChange() {
    const elBgcColor = document.querySelector('[name=pageBackgroundColor]').value;
    gCanvas.style.backgroundColor = elBgcColor;
}

function onTextColorChange() {
    const elTextColor = document.querySelector('[name=pageTextColor]').value;
    gColor = elTextColor
    gCtx.fillStyle = gColor;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function drawLine(startX, startY, endX = getRandomIntInclusive(20, gCanvas.width), endY = getRandomIntInclusive(20, gCanvas.height)) {
    gCtx.strokeStyle = gColor;
    gCtx.beginPath();
    gCtx.moveTo(startX, startY);
    gCtx.lineTo(endX, endY);
    gCtx.closePath()
    gCtx.stroke();
}

function drawArc(offsetX,offsetY) {
    gCtx.beginPath();
    var width = getRandomIntInclusive(10,150)
    gCtx.arc( offsetX , offsetY , width, 0 ,2*Math.PI);
    gCtx.strokeStyle = gColor;
    gCtx.stroke();
}

function saveAndRestoreExample() {
    if(!gCtx) return;
    gCtx.save()
}


function drawSquare(x, y) {
    var randomX = getRandomIntInclusive(20, 150);
    gCtx.beginPath();
    gCtx.rect(x, y, randomX, randomX)
    gCtx.fillRect(x, y, randomX, randomX)
    gCtx.stroke()
    gCtx.closePath()

}

function  drawRectangle(x, y){
    var randomX = getRandomIntInclusive(20, 150);
    gCtx.beginPath();
    gCtx.rect(x* 0.75, y , randomX  , randomX * 0.75)
    gCtx.fillRect(x * 0.75, y, randomX, randomX * 0.75)
    gCtx.stroke()
    gCtx.closePath()
}
function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(50, 50, 100, 100)
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)

    gCanvas.addEventListener('mousedown', onDown)

    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    var hammertime = new Hammer(gCanvas);
    hammertime.on('panmove',onMove)

    hammertime.on('panstart', onDown)

    hammertime.on('panend', onUp)
}

function getEvPos(ev) {
    let pos = {
        offsetX: ev.offsetX,
        offsetY: ev.offsetY
    }
    // console.log(ev.center.x)
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()

        pos = {
            offsetX: ev.center.x,
            offsetY: ev.center.y
        }
        console.log(pos)
    }
    return pos
}

function onMove(ev){
    if(!gIsDrawn) return
    gCountMoves++;
    if(gCountMoves % 15 === 0){
        const pos = getEvPos(ev)
        draw(pos);
    }
   

}

function onDown(ev) {
    gIsDrawn = true;
}

function onUp(ev){
    gIsDrawn = false;
    gCountMoves = 0;
}

function draw(ev) {
    gCtx.save()
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    // const { offsetX, offsetY } = ev
    switch (gCurrShape) {
        case 'circle':
            drawArc(offsetX,offsetY)
            break;
        case 'square':
            drawSquare(offsetX, offsetY)
            break;
        case 'line':
            drawLine(offsetX, offsetY)
            break;
        case 'rectangle':
            drawRectangle(offsetX, offsetY)
            break;
    }
    gCtx.restore()
}