# カスタマイズガイド

このドキュメントでは、クイズスライドのカスタマイズ方法について説明します。

## 目次

- [Reveal.jsについて](#revealjsについて)
- [quiz.mdの編集方法](#quizmdの編集方法)
- [使用可能なクラス一覧](#使用可能なクラス一覧)
- [スタイルのカスタマイズ](#スタイルのカスタマイズ)
- [複数のスライドファイルを使い分ける](#複数のスライドファイルを使い分ける)
- [動画を使用する場合](#動画を使用する場合)

---

## Reveal.jsについて

### スライドの方向

Reveal.jsでは、スライドを2方向に配置できます：

- **横方向（Horizontal）**: 基本的なスライドの進行方向。左右の矢印キーまたはスペースキーで移動します。
- **縦方向（Vertical）**: 各トピック内の詳細スライド。上下の矢印キーで移動します。

```
横方向 →
[ 1   ] → [ 2   ]
   ↓        ↓
[ 1-1 ]   [ 2-1 ]  縦方向

```

### 区切り文字

- `---` : 横方向の区切り（新しいトピック）
- `>>>` : 縦方向の区切り（同じトピック内の詳細）

---

## quiz.mdの編集方法

### 基本的な構成

一問のクイズは、通常3つのスライドで構成されます：

1. **問題スライド** - タイマー付きでクイズを表示
2. **回答数表示スライド** - Quagga APIから取得した回答数を表示
3. **正解発表スライド** - 正解の選択肢が赤く光って表示

### 推奨される構成と表記法

#### 1. 問題スライド

```markdown
>>>
<!-- .slide: data-state="with-timer" data-limit="10" -->
<!-- .slide: class="quiz text-4taku" -->
# 問題文

1. 選択肢1
2. 選択肢2
3. 選択肢3
4. 選択肢4
```

**設定項目：**
- `data-state="with-timer"` : カウントダウンタイマーを表示
- `data-limit="10"` : 制限時間（秒）。省略時は10秒
- `class="quiz text-4taku"` : クイズスライドで4択テキスト形式

#### 2. 回答数表示スライド

```markdown
>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer text-4taku" -->
```

**設定項目：**
- `data-state="copy-prev"` : 前のスライドの内容をコピー
- `class="answer text-4taku"` : 回答表示スライドで4択テキスト形式

このスライドで **Qキー** を押すと、Quagga APIから回答数を取得して表示します。

#### 3. 正解発表スライド

```markdown
>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer text-4taku maru-3" -->
```

**設定項目：**
- `maru-3` : 3番目の選択肢の背景が赤く光る
- 複数正解の場合は `maru-1 maru-2 maru-3` のように複数指定可能

---

## 使用可能なクラス一覧

### クイズ形式

#### テキストクイズ
- `text-2taku` : 2択
- `text-4taku` : 4択
- `text-6taku` : 6択

#### 画像クイズ
- `image-2taku` : 2択
- `image-4taku` : 4択
- `image-6taku` : 6択

### スライドタイプ

- `quiz` : 問題スライド
- `answer` : 回答・正解発表スライド

### 正解マーク

- `maru-1` : 1番目の選択肢に正解マーク
- `maru-2` : 2番目の選択肢に正解マーク
- `maru-3` : 3番目の選択肢に正解マーク
- `maru-4` : 4番目の選択肢に正解マーク
- `maru-5` : 5番目の選択肢に正解マーク
- `maru-6` : 6番目の選択肢に正解マーク
- `maru-this` : リスト項目に直接指定（`<!-- .element: class="maru-this" -->`）

### データ属性

- `data-state="with-timer"` : カウントダウンタイマーを表示
- `data-state="copy-prev"` : 前のスライドの内容をコピー
- `data-limit="秒数"` : タイマーの制限時間を設定

---

## クイズの作成例

### テキスト4択クイズ

```markdown
# 問題タイトル
>>>
<!-- .slide: data-state="with-timer" data-limit="10" -->
<!-- .slide: class="quiz text-4taku" -->
# 日本の首都はどこ？

1. 東京
2. 大阪
3. 京都
4. 名古屋

>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer text-4taku" -->

>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer text-4taku maru-1" -->
```

### 画像2択クイズ

```markdown
# 画像問題
>>>
<!-- .slide: data-state="with-timer" data-limit="5" -->
<!-- .slide: class="quiz image-2taku" -->
# どちらが好き？

1. ![野球](images/baseball.png)
2. ![サッカー](images/soccer.png)

>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer image-2taku" -->

>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer image-2taku maru-1" -->
```

### 複数正解の例

```markdown
>>>
<!-- .slide: data-state="with-timer" -->
<!-- .slide: class="quiz text-4taku" -->
# 果物はどれ？（複数選択可）

1. バナナ
2. りんご
3. ポップコーン
4. オレンジ

>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer text-4taku" -->

>>>
<!-- .slide: data-state="copy-prev" -->
<!-- .slide: class="answer text-4taku maru-1 maru-2 maru-4" -->
```

---

## スタイルのカスタマイズ

### styles.cssの編集

外観をカスタマイズする場合は、`styles.css`を編集します。

---

## 複数のスライドファイルを使い分ける

異なるクイズセットを作成したい場合、スライドファイルを分けることができます。

### 手順

1. **index.htmlをコピー**
   
   例：`period2.html`という名前でコピー
   ```bash
   cp index.html period2.html
   ```

2. **新しいmdファイルを作成**
   
   例：`quiz2.md`を作成してクイズ内容を記述

3. **コピーしたHTMLファイルを編集**
   
   `period2.html`を開いて、以下の部分を変更：
   
   ```html
   <!-- 変更前 -->
   <section data-markdown="quiz.md"
            data-separator="^\r?\n---\r?\n"
            data-separator-vertical="^\r?\n>>>\r?\n"
   >
   </section>
   
   <!-- 変更後 -->
   <section data-markdown="quiz2.md"
            data-separator="^\r?\n---\r?\n"
            data-separator-vertical="^\r?\n>>>\r?\n"
   >
   </section>
   ```

4. **アクセス**
   
   サーバー起動後、`http://localhost:3000/period2.html`にアクセス

---

## 動画を使用する場合

クイズスライドで動画を使用する場合、回答スライドでは事前に用意した動画の最終フレーム画像を表示します。

### 事前準備

1. **ffmpegのインストール**（初回のみ）

   macOS:
   ```bash
   brew install ffmpeg
   ```
   
   Windows: https://ffmpeg.org/download.html からダウンロード

2. **動画の最終フレーム画像を生成**

   ```bash
   node extract-last-frame.js images/sample.mp4 images/sample2.mp4
   ```

   または、imagesフォルダ内の全mp4ファイルを一括処理：
   ```bash
   node extract-last-frame.js images/*.mp4
   ```

   これにより、各動画ファイルと同じディレクトリに同名の`.png`ファイルが生成されます。
   例: `images/sample.mp4` → `images/sample.png`

3. **スライドで動画を使用**

   `quiz.md`で通常通り動画を指定すれば、回答スライドでは自動的に対応する画像が使用されます：

   ```markdown
   1. <video src="images/sample.mp4"></video>
   2. <video src="images/sample2.mp4"></video>
   ```

---

## 制限事項

- **ブラウザ対応**: Chrome での動作確認を行なっています。他のブラウザでは表示が崩れる可能性があります。

---

## トラブルシューティング

### スライドが正しく表示されない

1. `quiz.md`の構文を確認してください
2. クラス名のスペルミスがないか確認してください
3. リロードしてください

### 回答数が表示されない

1. `config.js`の設定を確認してください
2. ブラウザの開発者ツールでエラーを確認してください
