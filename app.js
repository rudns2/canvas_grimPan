const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions =  Array.from(document.getElementsByClassName("color-option"));
const canvas = document.querySelector("canvas");
const color = document.getElementById("input-color"); 
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEGHIT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEGHIT;
ctx.lineWidth = lineWidth.value; 
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
  isPainting = true;
  ctx.beginPath();
}
function cancelPainting(){
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event){
  ctx.lineWidth = event.target.value;
}
function onColorChange(event){
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeClick(){
  if(isFilling){
    isFilling = false;
    modeBtn.innerText = "Fill";
    } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
function onCanvasClick(){
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGHIT);
  }
}
function onDestroyClick(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGHIT);
}
function onEraserClick(){
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}
function onFileChange(event){
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0,0,CANVAS_WIDTH, CANVAS_HEGHIT);
    fileInput.value = null;
  }
}
function onDoubleClick(event){
  const text = textInput.value;
  if(text !== ""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif"
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }  
}
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange); 

// onMouseUp함수를 전역으로 addEventListener 해줬을시에 실행됨
// document.addEventListener("mouseup", onMouseUp);

colorOptions.forEach(color => color.addEventListener("click", onColorClick))

//색깔을 바꾸는 이벤트들

modeBtn.addEventListener("click", onModeClick);
//클릭시 새로운 색의 도화지로 바꿈, ex)fill버튼을 클릭 후 원하는 색을 클릭한 다음에 canvas를 누르면 클릭한 색으로 바뀜

destroyBtn.addEventListener("click", onDestroyClick);
//destroy버튼을 클릭시 하얀색으로 배경색이 바뀜

eraserBtn.addEventListener("click", onEraserClick)
//stroke의 색을 하얀색으로 바꿔준다.

file.addEventListener("change", onFileChange);
//파일을 넣는 이벤트 와 함수


//컬러s 배열 선언 후 마우스 클릭 할때 마다 선색이 랜덤으로 변하는 함수
// const colors = [
//   "#1abc9c",
//   "#2ecc71",
//   "#3498db",
//   "#9b59b6",
//   "#34495e",
//   "#16a085",
//   "#27ae60",
//   "#2980b9"
// ]
// ctx.lineWidth = 2;

// function onClick(event){
//   ctx.beginPath();
//   ctx.moveTo(400,400);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("click", onClick);