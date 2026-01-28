/**
 * カウントダウンタイマーを開始する関数
 */
export function startCountdown() {
    // presentかつdata-state="with-timer"を持つsection要素を探す
    const targetSection = document.querySelector('section.present[data-state="with-timer"]');
    if (!targetSection) return;
    // 現在のスライドの既存のタイマーを全て削除
    targetSection.querySelectorAll('.countdown-timer').forEach(timer => timer.remove());
    
    const h1Element = targetSection.querySelector('h1');
    if (!h1Element) return;
    
    // タイマー表示用のdiv要素を作成
    const timerElement = document.createElement('div');
    let limit = targetSection.dataset.limit;
    let time = limit ? parseInt(limit) : 10;  //未定義なら10秒
    timerElement.className = 'countdown-timer';
    timerElement.textContent = time;
    targetSection.appendChild(timerElement);
    
    const timer = setInterval(() => {
        time--;
        if (time < 0) {
            time = 0;
        }
        timerElement.textContent = time;
        // 残り3秒以降演出を加える
        if (time <= 3) {
            timerElement.classList.remove('timer-warning');
            void timerElement.offsetWidth; // リフロー強制
            timerElement.classList.add('timer-warning');
        }
        if (time <= 0) {
            clearInterval(timer);
            // アニメーション終了後にクラスを削除
            setTimeout(() => {
                timerElement.classList.remove('timer-warning');
            }, 1000);
        }
    }, 1000);
}
