# Reveal-thanksgiving

Reveal.jsプレゼンテーションで、カウントダウンタイマー付きのクイズスライドです。

## ファイル構成

- `index.html` - メインプレゼンテーションファイル
- `styles.css` - スタイル定義
- `quiz.md` - クイズコンテンツ
- `plugin/quagga.js` - Quagga連携プラグイン
- `config.js` - 環境設定ファイル（gitignore対象）
- `config.example.js` - 設定ファイルのサンプル

## 機能

- カウントダウンタイマー付きクイズ表示
- 2択、4択、6択に対応
- テキスト・画像クイズに対応
- 正解発表アニメーション
- Quagga APIと連携した回答数表示

## インストール

```bash
npm install
```

## 使用方法

### 1. 環境設定

`config.example.js`を`config.js`にコピーして、Quaggaの設定を行います：

```bash
cp config.example.js config.js
```

`config.js`を編集：

```javascript
export const config = {
  token: 'your_access_token',
  eventId: 'your_event_id',
  debugMode: false  // 本番環境ではfalse
};
```

デバッグモード（モックAPI使用）の場合は`debugMode: true`に設定します。

### 2. サーバー起動

```bash
npm start
```

ブラウザで `http://localhost:3000` にアクセスします。

### 3. Quagga連携

回答スライドで **qキー** を押すと、直近の集計データを取得して各選択肢の回答数を表示します。

- 取得ステータスは画面左下に表示されます
- 回答数は各選択肢の右側に「○人」形式で表示されます

## カスタマイズ

- `styles.css`を編集して外観を変更
- `quiz.md`を編集してクイズ内容を変更
