document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawing");
  const sideMenu = document.getElementById("side-menu");
  const drawingColor = document.getElementById("drawing-color");
  const txtLineWidth = document.getElementById("txtLineWidth");
  let lineWidth = 5;

  txtLineWidth.value = lineWidth;

  const ctx = canvas.getContext("2d");

  let coord = { x: 0, y: 0 };
  let color = "#000";

  drawingColor.addEventListener("change", event => {
    color = event.target.value;
  });

  txtLineWidth.addEventListener("change", event => {
    const newLineWidth = Number.parseInt(event.target.value);

    if (newLineWidth > 200) {
      event.preventDefault();
      txtLineWidth.value = 200;
      return;
    }

    lineWidth = event.target.value;
  });  
  
  let selectedShape = "line";
  
  const onShapeClick = event => {
    const previousSelected = document.getElementsByClassName("side-tools-button selected");
    for(let prevSelected of previousSelected){
      prevSelected.classList.remove("selected");
    }

    event.target.classList.toggle("selected");
    selectedShape = event.target.value; 

    color = drawingColor.value;
  }

  const onEraserClick = event => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  const eraser = document.getElementById("eraser");
  eraser.addEventListener("click", onEraserClick);

  const line = document.getElementById("line");
  line.addEventListener("click", onShapeClick);

  const square = document.getElementById("square");
  square.addEventListener("click", onShapeClick);

  const circle = document.getElementById("circle");
  circle.addEventListener("click", onShapeClick);

  const draw = event => {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    
    if (selectedShape == "square") {
      reposition(event);
      ctx.rect(coord.x, coord.y, 90, 90);      
    } 
    else if(selectedShape == "circle"){
      reposition(event);
      ctx.arc(coord.x, coord.y, 50, 0, 2 * Math.PI);
    }
    else if(selectedShape == "line" || selectedShape == "eraser") {
      ctx.lineCap = 'round';
      ctx.moveTo(coord.x, coord.y);
      reposition(event);
      ctx.lineTo(coord.x, coord.y);
    }

    ctx.stroke();
  }

  const start = event => {
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('click', draw);
    reposition(event);
  }

  const reposition = event => {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
  }

  const stop = () => {
    canvas.removeEventListener('mousemove', draw);
  }

  const resize = () => {
    ctx.canvas.width = window.innerWidth - sideMenu.clientWidth;
    ctx.canvas.height = window.innerHeight;
  }

  resize();

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mouseup', stop);
  document.addEventListener('resize', resize);

  const saveButton = document.getElementById("save-button");

  const onSaveClick = event => {
    const link = document.createElement("a");

    link.setAttribute('download', "download");
    link.href= canvas.toDataURL("image/png");
    link.click();
  }

  saveButton.addEventListener("click", onSaveClick);
});
