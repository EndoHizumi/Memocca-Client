window.onload = function () {
  function onClick(e) {
    var div = document.createElement('t');
    div.className = 'sticky in_stock';
    document.getElementById('stock').appendChild(div);
  }

  append = document.getElementById('Append')
  append.addEventListener('click', onClick, false);
}