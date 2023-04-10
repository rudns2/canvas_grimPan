const canvas = document.querySelector("canvas");
const color = document.getElementById("input-color"); 
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value; 

let isPainting = false;

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

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

// onMouseUp함수를 전역으로 addEventListener 해줬을시에 실행됨
// document.addEventListener("mouseup", onMouseUp);


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