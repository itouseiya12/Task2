const time = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime;
let elapsed = 0; //経過時間。初期値は０
let timerID;
let holdTime = 0; //一時停止した時に時間を保持させる


function convertTime() {       //ミリ秒から時間・分・秒に変換する
  const ms = elapsed % 10;
  const s = Math.floor(elapsed / 1000);
  const m = Math.floor(elapsed / (1000 * 60));
  const h = Math.floor(elapsed / (1000 * 60 * 60));

time.textContent = `${h}:${m}:${s}:${ms}`; //画面表示させる
}

 //タイマー処理を開始
function countUp() {
  timerID = setTimeout(function() {
    elapsed = Date.now() - startTime + holdTime;
    convertTime();
 //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
    countUp();  
 //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言  
  }, 10);

}

startButton.addEventListener('click', function() {
  startTime = Date.now();
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  countUp();
});

stopButton.addEventListener('click', function() {
  clearTimeout(timerID);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  holdTime += Date.now() - startTime;
});

resetButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  elapsed = 0;
  holdTime = 0;
  convertTime();
  time.textContent = '0:0:0:0';
});
