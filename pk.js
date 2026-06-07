// ページが読み込まれたら実行する
window.onload = function() {
    document.getElementById('btn-top-left').addEventListener('click', function() { shoot('top-left'); });
    document.getElementById('btn-top-center').addEventListener('click', function() { shoot('top-center'); });
    document.getElementById('btn-top-right').addEventListener('click', function() { shoot('top-right'); });
    document.getElementById('btn-bottom-left').addEventListener('click', function() { shoot('bottom-left'); });
    document.getElementById('btn-bottom-center').addEventListener('click', function() { shoot('bottom-center'); });
    document.getElementById('btn-bottom-right').addEventListener('click', function() { shoot('bottom-right'); });

    // リセットボタン
    document.getElementById('reset-btn').addEventListener('click', resetGame);
};

// グローバル変数の準備
let currentRound = 1;
let score = 0;
let isShooting = false; // 連打防止用

const maxRound = 5;
const targetsArray = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
];

// 座標のデータ（辞書型で管理）
const positions = {
    'top-left': { ballX: '150px', ballY: '70px', keeperX: '150px', keeperY: '80px' },
    'top-center': { ballX: '280px', ballY: '70px', keeperX: '275px', keeperY: '80px' },
    'top-right': { ballX: '410px', ballY: '70px', keeperX: '400px', keeperY: '80px' },
    'bottom-left': { ballX: '150px', ballY: '140px', keeperX: '180px', keeperY: '130px' },
    'bottom-center': { ballX: '280px', ballY: '140px', keeperX: '275px', keeperY: '130px' },
    'bottom-right': { ballX: '410px', ballY: '140px', keeperX: '370px', keeperY: '130px' },
    'start': { ballX: '280px', ballY: '300px', keeperX: '275px', keeperY: '120px' }
};

// シュート関数
function shoot(playerTarget) {
    if (isShooting) return; // すでに蹴っていたら何もしない
    if (currentRound > maxRound) {
        document.getElementById('message').innerText = "ゲーム終了です！リセットしてください。";
        return;
    }

    isShooting = true;
    document.getElementById('message').innerText = "";

    // キーパーの動きをランダムに決める
    let randomNum = Math.floor(Math.random() * 6);
    let keeperTarget = targetsArray[randomNum];

    // デバッグ用（消し忘れた設定）
    // console.log("プレイヤー: " + playerTarget + ", キーパー: " + keeperTarget);

    // アニメーションのためにCSSのtopとleftを変更
    let ballStyle = document.getElementById('ball').style;
    let keeperStyle = document.getElementById('keeper').style;

    ballStyle.left = positions[playerTarget].ballX;
    ballStyle.top = positions[playerTarget].ballY;

    keeperStyle.left = positions[keeperTarget].keeperX;
    keeperStyle.top = positions[keeperTarget].keeperY;

    // 少し待ってから結果判定 (0.6秒)
    setTimeout(function() {
        if (playerTarget !== keeperTarget) {
            document.getElementById('message').innerText = "ゴーーーール！！";
            score++;
        } else {
            document.getElementById('message').innerText = "止められた！！";
        }

        // スコア更新
        document.getElementById('score-text').innerText = score;

        // さらに少し待って次のラウンドへ準備
        setTimeout(function() {
            if (currentRound >= maxRound) {
                document.getElementById('message').innerText = "終了！あなたのスコアは " + score + "点 でした！";
                currentRound++; // これ以上進めないようにする
            } else {
                currentRound++;
                document.getElementById('round-text').innerText = currentRound;
                document.getElementById('message').innerText = "次のシュート！的をクリック！";
                
                // 位置を元に戻す
                ballStyle.left = positions['start'].ballX;
                ballStyle.top = positions['start'].ballY;
                keeperStyle.left = positions['start'].keeperX;
                keeperStyle.top = positions['start'].keeperY;
            }
            isShooting = false;
        }, 1500); // 1.5秒待つ

    }, 600);
}

// ゲームをリセットする関数
function resetGame() {
    currentRound = 1;
    score = 0;
    isShooting = false;

    document.getElementById('round-text').innerText = currentRound;
    document.getElementById('score-text').innerText = score;
    document.getElementById('message').innerText = "的をクリックしてシュート！";

    // 位置を初期位置に戻す
    let ballStyle = document.getElementById('ball').style;
    let keeperStyle = document.getElementById('keeper').style;
    ballStyle.left = positions['start'].ballX;
    ballStyle.top = positions['start'].ballY;
    keeperStyle.left = positions['start'].keeperX;
    keeperStyle.top = positions['start'].keeperY;
}
