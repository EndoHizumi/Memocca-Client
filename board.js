window.onload = function () {
  
  function inStockOnClick(e) {
    var sticky = document.createElement('textarea');
    sticky.className = 'sticky in_canvas';
    sticky.style.backgroundColor = e.target.style.backgroundColor;
    sticky.addEventListener("mousedown",function() {
      sticky.addEventListener("mousemove",onMouseMove)
    })
    sticky.addEventListener("mouseup",function() {
      sticky.removeEventListener("mousemove",onMouseMove)
    })
    sticky.addEventListener("mouseleave",function(e){
      console.log(e.target.value)
      e.target.blur()
    })
    document.getElementById('canvas').appendChild(sticky);
  }

  function onMouseMove(e){
      var x = e.clientX;
      var y = e.clientY;
      var width = e.target.offsetWidth;
      var height = e.target.offsetHeight;
      console.log(e.target.style.cursor)
      e.target.style.top = y + "px";
      e.target.style.left = x + "px";
  }

  in_stock_stickies =  Array.from(document.getElementsByClassName('in_stock'))
  in_stock_stickies.forEach(sticky => {
    sticky.addEventListener('click', inStockOnClick, false);
  });
}