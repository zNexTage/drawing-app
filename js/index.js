document.addEventListener("DOMContentLoaded", ()=> {
  const canvas = document.getElementById("drawing");

  const ctx = canvas.getContext("2d");

  let coord = {x:0,y:0};

  const draw = event => {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ACD3ED';
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  }

  const start = event => {
    document.addEventListener('mousemove', draw);
    reposition(event);
  }

  const reposition = event => {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
  }

  const stop = () => {
    document.removeEventListener('mousemove', draw);
  }

  const resize = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  resize();

  document.addEventListener('mousedown', start);
  document.addEventListener('mouseup', stop);
  document.addEventListener('resize', resize);


});