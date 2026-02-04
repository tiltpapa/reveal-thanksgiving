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
    
    // クローン後の動画要素を画像に置き換え
    const videos = currentSlide.querySelectorAll('video');
    videos.forEach((video) => {
        // 動画のパスから画像のパスを生成（拡張子を.pngに変更）
        const videoSrc = video.src || video.getAttribute('src');
        const imageSrc = videoSrc.replace(/\.(mp4|webm|ogg|mov)$/i, '.png');
        
        // 画像要素を作成
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = video.alt || '';
        
        // 動画要素を画像要素に置き換え
        video.parentNode.replaceChild(img, video);
        
        console.log('動画を画像に置き換え:', videoSrc, '->', imageSrc);
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
