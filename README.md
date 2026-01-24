# Reveal-thanksgiving

Marp形式から変換されたReveal.jsプレゼンテーションで、カウントダウンタイマー付きのクイズスライドです。

## ファイル構成

- `index.html` - メインプレゼンテーションファイル
- `styles.css` - Marpから変換されたカスタムスタイル
- `lib/reveal_countdown-master/countdown.js` - カウントダウンタイマープラグイン
- `quiz.md` - クイズコンテンツ

## 機能

- 質問の横に配置された10秒カウントダウンタイマー
- キーボードコントロール：
  - `T` - タイマーの一時停止/再開
  - `+` - 30秒追加（デフォルト設定）
  - `-` - 30秒減算（デフォルト設定）

## 使用方法

1. ブラウザで`index.html`を開く
2. スライドが読み込まれると自動的にタイマーが開始される
3. 必要に応じてキーボードコントロールでタイマーを管理

## タイマー設定

`index.html`でタイマー設定を変更できます：

```javascript
countdown: {
    defaultTime: 10,    // デフォルトタイマー時間（秒）
    autostart: "yes"    // 自動開始するかどうか
}
```

## カスタマイズ

- `styles.css`を編集して外観を変更
- `index.html`でクイズコンテンツを直接編集
- タイマーの動作は`lib/reveal_countdown-master/countdown.js`で制御

## 使用ライブラリ

- [reveal.js](https://revealjs.com/) - プレゼンテーションフレームワーク
- [reveal_countdown](https://github.com/christer79/reveal_countdown) - カウントダウンタイマープラグイン