/**
 * 前のスライドの内容をコピーする関数
 * @param {Object} Reveal - Reveal.jsのインスタンス
 */
export function copyPreviousSlide(Reveal) {
    const currentSlide = document.querySelector('section.present[data-state="copy-prev"]');
    if (!currentSlide) return;
    
    const previousSlide = Reveal.getPreviousSlide();
    if (!previousSlide) return;
    
    // 既にコピー済みの場合はスキップ
    if (currentSlide.dataset.copied === 'true') return;
    
    // 前のスライドの子要素を全てクローン
    Array.from(previousSlide.children).forEach(child => {
        const clonedChild = child.cloneNode(true);
        currentSlide.appendChild(clonedChild);
    });
    
    // クローン完了後、タイマー要素があれば値を0に設定
    const timer = currentSlide.querySelector('.countdown-timer');
    if (timer) {
        timer.textContent = '0';
    }
    
    // コピー済みフラグを設定
    currentSlide.dataset.copied = 'true';
    
    // Reveal.jsにレイアウトを再計算させる
    Reveal.sync();
}
