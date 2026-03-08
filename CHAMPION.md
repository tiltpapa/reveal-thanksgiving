# チャンピオンスライドガイド

このドキュメントでは、並び替えクイズのチャンピオン回答表示スライドの使用方法とカスタマイズ方法について説明します。

## 目次

- [チャンピオンスライドとは](#チャンピオンスライドとは)
- [基本的な使い方](#基本的な使い方)
- [スライドの構成](#スライドの構成)
- [カスタマイズ](#カスタマイズ)
- [トラブルシューティング](#トラブルシューティング)

---

## チャンピオンスライドとは

チャンピオンスライドは、並び替えクイズにおいて、現在のチャンピオン（最高得点者）の回答を視覚的に表示し、正解と照らし合わせて答え合わせを行う機能です。

### 主な機能

- チャンピオンの回答順序を視覚的に表示
- 1つずつ正解を開示していく演出
- 正解・不正解の判定と結果表示
- 2択〜6択まで自動対応

---

## 基本的な使い方

### 1. 並び替えクイズの作成

`champion.html`で並び替えクイズを作成します：

```markdown
<!-- .slide: data-state="with-timer" data-limit="15" -->
<!-- .slide: class="quiz sort text-4taku" -->
# 高い順に並べて

1. 台北101
2. 東京スカイツリー
3. 東京タワー
4. あべのハルカス
```

**重要な設定：**
- `class="quiz sort text-4taku"` : `sort`クラスを必ず含める
- 選択肢数に応じて `text-2taku`, `text-4taku`, `text-6taku` を指定

### 2. チャンピオンの回答スライド

チャンピオンの回答を表示するスライドは、HTMLで定義されています：

```html
<section class="champion-answer" id="champion-answer-slide">
    <h1 class="champion-title">チャンピオンの回答</h1>
    <div class="champion-container">
        <div class="champion-left">
            <div class="crown-icon"></div>
            <div class="answer-symbols" id="answer-symbols"></div>
            <div class="arrow-icon"></div>
        </div>
        <div class="champion-right">
            <ol class="champion-choices" id="champion-choices"></ol>
        </div>
    </div>
</section>
```

このスライドは動的に内容が生成されます。

### 3. 正解の設定

解説スライドに `data-answer` 属性で正解順序を指定します：

```markdown
<!-- .slide: data-answer="2,1,3,4" -->
1. 509.2m
2. 634m
3. 333m
4. 300m
```

**data-answer の形式：**
- カンマ区切りで正解の順序を指定
- 数字は元の選択肢番号（1から始まる）
- 例：`"2,1,3,4"` = 2番目、1番目、3番目、4番目の順

### 4. データの読み込み

チャンピオンスライドで **Cキー** を押すと、以下のデータを取得して表示します：

1. Quagga APIからチャンピオン情報を取得
2. 直近の問題の回答データを取得
3. チャンピオンの回答を表示
4. ~~答え合わせスライドを動的生成~~開発中

---

## スライドの構成

### 完全な並び替えクイズの例

```markdown
<section>
    <section>
        <h1>ボーナスクイズ</h1>
    </section>
    <section data-markdown>
        <textarea data-template>
            <!-- .slide: data-state="with-timer" data-limit="15" -->
            <!-- .slide: class="quiz sort text-4taku" -->
            # 高い順に並べて

            1. 台北101
            2. 東京スカイツリー
            3. 東京タワー
            4. あべのハルカス
        </textarea>
    </section>
    
    <!-- チャンピオンの回答 -->
    <section class="champion-answer" id="champion-answer-slide">
        <h1 class="champion-title">チャンピオンの回答</h1>
        <div class="champion-container">
            <div class="champion-left">
                <div class="crown-icon"></div>
                <div class="answer-symbols" id="answer-symbols"></div>
                <div class="arrow-icon"></div>
            </div>
            <div class="champion-right">
                <ol class="champion-choices" id="champion-choices"></ol>
            </div>
        </div>
    </section>
    
    <!-- 答え合わせスライド（動的生成） -->
    <div id="reveal-slides-container"></div>
    
    <!-- 正解 or 残念演出 -->
    <section class="result-overlay" id="result-overlay">
        <div class="result-text" id="result-text"></div>
    </section>
    
    <!-- 解説 -->
    <section data-markdown>
        <textarea data-template>
            <!-- .slide: data-answer="2,1,3,4" -->
            1. 509.2m
            2. 634m
            3. 333m
            4. 300m
        </textarea>
    </section>
</section>
```

### スライドの流れ

1. **タイトルスライド** - クイズのタイトル
2. **問題スライド** - 並び替え問題を表示
3. **チャンピオン回答スライド** - チャンピオンの回答を表示（Cキーで初期化）
4. **答え合わせスライド** - 1つずつ正解を開示（自動生成）
5. **結果スライド** - 正解/残念の表示
6. **解説スライド** - 正解の詳細説明

---

## カスタマイズ

### 選択肢数の変更

選択肢数は2択、4択、6択に対応しています。問題スライドのクラスを変更するだけで自動調整されます：

#### 2択の場合
```markdown
<!-- .slide: class="quiz sort text-2taku" -->
# 問題文

1. 選択肢1
2. 選択肢2
```

#### 6択の場合
```markdown
<!-- .slide: class="quiz sort text-6taku" -->
# 問題文

1. 選択肢1
2. 選択肢2
3. 選択肢3
4. 選択肢4
5. 選択肢5
6. 選択肢6
```

選択肢数に応じて、以下が自動調整されます：
- 記号アイコンのサイズ
- 選択肢ボックスの高さ
- 間隔とマージン

### スタイルのカスタマイズ

`styles.css`で以下の要素をカスタマイズできます：

#### タイトルボックス
```css
.champion-answer .champion-title,
.reveal-answer .champion-title {
  /* 位置、サイズ、色などを調整 */
}
```

#### 王冠アイコン
```css
.crown-icon {
  /* サイズや画像を変更 */
  background-image: url('./images/crown.png');
}
```

#### 記号アイコン
```css
.symbol-item {
  /* サイズ、フォント、色を調整 */
}
```

#### 矢印の色
```css
.answer-symbols::before {
  /* 矢印の棒部分のグラデーション */
  background: linear-gradient(to right, #ff4444 0%, #ff8844 30%, #ffcc44 60%, #ff8844 80%, #ff4444 100%);
}

.arrow-icon::before {
  /* 矢印の先端の色 */
  border-top: 60px solid #ff4444;
}
```

#### 選択肢ボックス
```css
.champion-choices li {
  /* 背景、ボーダー、パディングなどを調整 */
}
```

### タイトルテキストの変更

タイトルを変更する場合は、`champion.html`のJavaScript部分を編集します：

```javascript
// generateRevealSlides関数内
h1.textContent = 'チャンピオンの回答'; // ← ここを変更
```

---

## トラブルシューティング

### チャンピオンの回答が表示されない

**原因と対処法：**

1. **Cキーを押していない**
   - チャンピオン回答スライドで **Cキー** を押してデータを読み込んでください

2. **問題スライドに`sort`クラスがない**
   - 問題スライドに `class="quiz sort text-4taku"` のように `sort` を含めてください

3. **APIからデータが取得できない**
   - `config.js`の設定を確認してください
   - ブラウザの開発者ツール（F12）でエラーを確認してください

4. **解説スライドに`data-answer`がない**
   - 解説スライドに `<!-- .slide: data-answer="2,1,3,4" -->` を追加してください

### 選択肢の位置がずれる

**原因と対処法：**

1. **選択肢数のクラスが間違っている**
   - 問題スライドのクラス（`text-2taku`, `text-4taku`, `text-6taku`）が実際の選択肢数と一致しているか確認してください

2. **CSSが正しく読み込まれていない**
   - ブラウザをリロード（Ctrl+R または Cmd+R）してください
   - キャッシュをクリアしてください

### 答え合わせスライドが生成されない

**原因と対処法：**

1. **正解順序の形式が間違っている**
   - `data-answer="2,1,3,4"` のようにカンマ区切りで指定してください
   - 数字は1から始まる選択肢番号です

2. **選択肢数と正解順序の数が一致しない**
   - 4択なら4つの数字、6択なら6つの数字を指定してください

### グレースケール表示にならない

不正解の場合、王冠と記号がグレースケールになりますが、これは自動的に処理されます。表示されない場合は：

1. ブラウザがCSSフィルターに対応しているか確認
2. 開発者ツールでCSSが適用されているか確認

---

## 制限事項

- **ブラウザ対応**: Chrome での動作確認を行なっています
- **選択肢数**: 2択、4択、6択のみ対応（3択、5択は未対応）
- **画像クイズ**: 現在はテキストのみ対応

---

## 参考

- [README.md](README.md) - プロジェクト全体の説明
- [CUSTOMIZE.md](CUSTOMIZE.md) - 通常のクイズスライドのカスタマイズ方法
- [Reveal.js公式ドキュメント](https://revealjs.com/)
