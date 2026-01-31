# Reveal-thanksgiving

Reveal.jsプレゼンテーションで、カウントダウンタイマー付きのクイズスライドです。

## 機能

- カウントダウンタイマー付きクイズ表示
- 2択、4択、6択に対応
- テキスト・画像クイズに対応
- 正解発表アニメーション
- Quagga APIと連携した回答数表示・ランキング表示

## ファイル構成

- `index.html` - メインプレゼンテーションファイル
- `styles.css` - スタイル定義
- `quiz.md` - クイズコンテンツ
- `plugin/quagga.js` - Quagga連携プラグイン
- `config.js` - 環境設定ファイル
- `config.example.js` - 設定ファイルのサンプル

## インストール

### 必要な環境

このプロジェクトを動かすには、以下のソフトウェアが必要です：

- **Node.js と npm**（必須）- JavaScriptの実行環境とパッケージ管理ツール
- **Git**（任意）- バージョン管理システム（ダウンロード方法によっては不要）

#### 方法1: wingetを使ってインストール(Windowsの場合)

Windowsに標準搭載されているwingetを使用

1. **PowerShellまたはコマンドプロンプトを管理者権限で開く**

2. **Node.jsとnpmをインストール**
   ```bash
   winget install OpenJS.NodeJS
   ```

3. **Git をインストール（任意）**
   ```bash
   winget install Git.Git
   ```

4. **インストール確認**
   ```bash
   node --version
   npm --version
   ```

#### 方法2: 公式サイトからダウンロード

- Node.js: https://nodejs.org/ から「LTS版」をダウンロードしてインストール
- Git: https://git-scm.com/ からダウンロードしてインストール（任意）


```

### プロジェクトのダウンロード

#### Gitを使う場合
```bash
git clone <リポジトリURL>
cd reveal-thanksgiving
```

#### Gitを使わない場合
1. GitHubのリポジトリページで「Code」ボタンをクリック
2. 「Download ZIP」を選択してダウンロード
3. ZIPファイルを解凍
4. 解凍したフォルダをターミナル/コマンドプロンプトで開く

### 依存パッケージのインストール

プロジェクトフォルダで以下のコマンドを実行：

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

プロキシサーバーが起動し、ブラウザで `http://localhost:3000` にアクセスします。

プロキシサーバーは以下の機能を提供します：
- 静的ファイルの配信
- Quagga APIへのプロキシ（CORS回避）
- デバッグモード/本番モードの自動切り替え

### 3. Quagga連携

回答スライドで **Qキー** を押すと、直近の集計データを取得して各選択肢の回答数を表示します。

- 回答数は各選択肢の右側のボックスに表示されます
- 現在のスライドが回答スライドではない場合、直後の回答スライドに反映します。

## カスタマイズ

クイズの内容や見た目をカスタマイズする方法については、[CUSTOMIZE.md](CUSTOMIZE.md)を参照してください。

## 備考

- 動作確認はChromeで行なっています。他のブラウザでは動作やレイアウトが崩れる可能性があります。
- 動画対応は開発中