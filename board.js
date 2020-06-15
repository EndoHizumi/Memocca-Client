window.onload = function () {
// 　const api_domain='api.ws-factory.app/memocca'
  const api_domain='http://localhost:3000'
  //やっぱり、ログイン画面で部屋と名前を入力してからボードに入る方が楽
  // index.htmlで部屋入力→/authを叩いて、部屋IDを確認→あったら、部屋IDを返す（なかったら、401エラー）
  // 返ってきたIDをboard.htmlのクエリに追加して、リクエスト(ex: board.html?boardId=hogehoge)

  // board_idをクエリから取得
  // 付箋取得APIを叩いて、付箋を取得
  // 付箋を描画
  const board_id = (new URL(document.location)).searchParams.get('boardId')
  sticky = fetch(`${api_domain}/sticky/${board_id}`).then(response => response.ok ? response.json: "" )

  isChanged = false
  function inStockOnClick(e) {
    sticky = createSticky(e)
    document.getElementById('canvas').appendChild(sticky);
  }

  function drawSticky(color, text, x, y) {
    // サーバーからもらったデータをもとに付箋を追加できるように、する
    sticky = document.createElement('div');
    sticky.className = 'sticky in_canvas';
    sticky.style.position = "absolute"
    sticky.style.top = x;
    sticky.style.left = y;
    sticky.appendChild(createButton())
    sticky.appendChild(createTextArea(color, text));
    $(sticky).draggable();
  }

  function createSticky(event) {
    // サーバーからもらったデータをもとに付箋を追加できるように、する
    drawSticky(event)
    console.log("[POST] ./sticky/{board_id}")
    return sticky
  }

  function createButton(params) {
    button = document.createElement('button')
    button.innerHTML = 'X'
    button.addEventListener('click',function(e) {
      document.getElementById('canvas').removeChild(e.target.parentElement)
      console.log("[DELETE] ./sticky/{board_id}")
    })
    return button
  }

  function createTextArea(e) {
    textarea = document.createElement('textarea');
    textarea.style.backgroundColor = e.target.style.backgroundColor;
    textarea.value = "";
    textarea.addEventListener("mouseleave", function (e) {
      if(isChanged){
        console.log("[PUT] ./sticky/{board_id}")
        console.log(e.target.value);
        isChanged = false
      }
      e.target.blur();
    })
    textarea.addEventListener("input", function() {isChanged=true})
    return textarea
  }

  this.console.log("[GET] ./sticky/{board_id}")
  in_stock_stickies = Array.from(document.getElementsByClassName('in_stock'))
  in_stock_stickies.forEach(sticky => {
    sticky.addEventListener('click', inStockOnClick, false);
  });
}