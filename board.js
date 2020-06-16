window.onload = function () {
  // 　const api_domain='api.ws-factory.app/memocca'
  const api_domain = 'http://localhost:3000'
  //やっぱり、ログイン画面で部屋と名前を入力してからボードに入る方が楽
  // index.htmlで部屋入力→/authを叩いて、部屋IDを確認→あったら、部屋IDを返す（なかったら、401エラー）
  // 返ってきたIDをboard.htmlのクエリに追加して、リクエスト(ex: board.html?boardId=hogehoge)

  // board_idをクエリから取得
  // 付箋取得APIを叩いて、付箋を取得
  // 付箋を描画
  isChanged = false
  // sticky_text = e.target.text

  function drawSticky(color, text, x, y, width, height) {
    // サーバーからもらったデータをもとに付箋を追加できるように、する
    sticky = document.createElement('div');
    sticky.className = 'sticky in_canvas';
    sticky.style.position = "absolute"
    sticky.style.top = x;
    sticky.style.left = y;
    sticky.style.width = width;
    sticky.style.height = height;
    sticky.appendChild(createButton())
    sticky.appendChild(createTextArea(color, text));
    $(sticky).draggable();
    return sticky;
  }

  function appendSticky(sticky){
    sticky= drawSticky(sticky['color_code'], sticky['text'], sticky['point_x'], sticky['point_y'], sticky['width'], sticky['height'])
    document.getElementById('canvas').appendChild(sticky);
  }

  function createSticky(color) {
    sticky = drawSticky(color, "", 0, 0, 300, 150)
    console.log("[POST] ./sticky/{board_id}")
    document.getElementById('canvas').appendChild(sticky);
  }

  function createButton() {
    button = document.createElement('button')
    button.innerHTML = 'X'
    button.addEventListener('click', function (e) {
      document.getElementById('canvas').removeChild(e.target.parentElement)
      console.log("[DELETE] ./sticky/{board_id}")
    })
    return button
  }

  function createTextArea(rgb, text) {
    textarea = document.createElement('textarea');
    textarea.style.backgroundColor = rgb;
    textarea.value = text;
    textarea.addEventListener("mouseleave", function (e) {
      if (isChanged) {
        console.log("[PUT] ./sticky/{board_id}")
        console.log(e.target.value);
        isChanged = false
      }
      this.blur();
    })
    textarea.addEventListener("input", function () { isChanged = true })
    return textarea
  }

  function inStockOnClick(e) {
    sticky_color = e.target.style.backgroundColor
    sticky = createSticky(sticky_color)
  }

  this.console.log("[GET] ./sticky/{board_id}")
  const board_id = (new URL(document.location)).searchParams.get('boardId')
  stickies = fetch(`${api_domain}/sticky/${board_id}`).then(response => { return response.ok ? response.json() : "" }).then(sticky_data => sticky_data['data'].forEach(sticky => appendSticky(sticky)))

  in_stock_stickies = Array.from(document.getElementsByClassName('in_stock'))
  in_stock_stickies.forEach(sticky => {
    sticky.addEventListener('click', inStockOnClick, false);
  });
}