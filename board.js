window.onload = function () {
  function Append_onClick(e) {
    var sticky = document.createElement('textarea');
    sticky.className = 'sticky in_stock';
    document.getElementById('stock').appendChild(sticky);
    sticky.addEventListener('click', in_stock_onClick, false);
  }

  function in_stock_onClick(e) {
    var sticky = document.createElement('textarea');
    sticky.className = 'sticky in_canvas';
    document.getElementById('canvas').appendChild(sticky);
  }

  append = document.getElementById('Append')
  append.addEventListener('click', Append_onClick, false);

}