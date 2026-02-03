/**
 * 動画の最終フレームを画像として抽出する関数
 * @param {HTMLVideoElement} video - 動画要素
 * @returns {Promise<string>} - 画像のData URL
 */
function extractLastFrame(video) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 動画のメタデータが読み込まれていない場合は読み込む
        if (video.readyState < 1) {
            video.addEventListener('loadedmetadata', () => {
                processVideo();
            }, { once: true });
            video.load();
        } else {
            processVideo();
        }
        
        function processVideo() {
            canvas.width = video.videoWidth || video.width || 640;
            canvas.height = video.videoHeight || video.height || 480;
            
            // 最終フレームに移動
            video.currentTime = video.duration - 0.001;
            
            video.addEventListener('seeked', () => {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png'));
            }, { once: true });
        }
    });
}

/**
 * 前のスライドの内容をコピーする関数
 * @param {Object} Reveal - Reveal.jsのインスタンス
 */
export async function copyPreviousSlide(Reveal) {
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
    const videoPromises = Array.from(videos).map(async (video) => {
        try {
            const imageDataUrl = await extractLastFrame(video);
            const img = document.createElement('img');
            img.src = imageDataUrl;
            img.alt = video.alt || '';
            
            // 動画要素を画像要素に置き換え
            video.parentNode.replaceChild(img, video);
        } catch (error) {
            console.error('動画の最終フレーム抽出に失敗しました:', error);
        }
    });
    
    // 全ての動画処理が完了するまで待機
    await Promise.all(videoPromises);
    
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
