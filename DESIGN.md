---
name: Yarukinai.fm
description: ショーノートを主役にした、グレー地に白いカードを重ねる読み物型のポッドキャストサイト。
colors:
  ink: "rgba(0, 0, 0, 0.87)"
  ink-muted: "rgba(0, 0, 0, 0.54)"
  ink-muted-on-gray: "rgba(0, 0, 0, 0.6)"
  ink-hint: "rgba(0, 0, 0, 0.38)"
  on-header: "#fff"
  on-header-muted: "rgba(255, 255, 255, 0.7)"
  link-navy: "#1c3c7c"
  page-gray: "#eee"
  paper-white: "#fff"
  header-scrim: "rgba(0, 0, 0, 0.3)"
  code-wash: "rgba(0, 0, 0, 0.04)"
  pre-wash: "#f7f7f7"
  rule-gray: "#ddd"
  quote-gray: "#777"
  table-stripe: "#f8f8f8"
  pager-border: "#dee2e6"
  pager-text: "#495057"
  pager-hover-bg: "#f8f9fa"
  pager-current: "#007bff"
  pager-current-hover: "#0056b3"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, meiryo, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  site-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, meiryo, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.7
  card-heading:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, meiryo, sans-serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.25
  list-heading:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, meiryo, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.7
  section-heading:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, meiryo, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.25
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Hiragino Kaku Gothic ProN, meiryo, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.7
  code:
    fontFamily: "Consolas, Liberation Mono, Menlo, Courier, monospace"
    fontSize: "85%"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  card: "2px"
  code: "3px"
  avatar: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "48px"
  footer: "64px"
  header: "96px"
components:
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px 0"
  list-item:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "16px 0"
  pager-item:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.pager-text}"
    padding: "7px 16px"
  pager-item-hover:
    backgroundColor: "{colors.pager-hover-bg}"
  pager-item-current:
    backgroundColor: "{colors.pager-current}"
    textColor: "{colors.on-header}"
  site-header:
    textColor: "{colors.on-header}"
    typography: "{typography.site-title}"
    padding: "96px 0"
---

# Design System: Yarukinai.fm

## Overview

**Creative North Star: "The Show Notes Library"**

グレーの地（`page-gray`）に、白いカード（`paper-white`）を 1 枚だけ置く。サイトの主役はデザインではなく、エピソードごとに積み上がるショーノート（話題と参照リンクの束）であり、UI は書架のように静かに内容を支える。ヘッダーの背景画像だけが唯一の視覚的な「表紙」で、その下は読み物として一貫した白い面が続く。

全体は軽く、カジュアルな手触りを持つ。影や強い装飾はなく、角丸も 2px に留まる。強調は色や大きな面ではなく、文字サイズと余白、そして濃紺のリンクで行う。ショーノートは長いリスト構造になるため、行間（1.7）と下線付きリンクで走査性を保つ。

**Key Characteristics:**
- 背景はグレー、コンテンツは白いカードに集約する。
- アクセントは濃紺のリンク 1 色のみ。
- 影を使わないフラットな面構成。ヘッダー文字の影だけが例外。
- 日本語本文を想定したシステムフォントと 17px / 行間 1.7 の読みやすい本文。
- 幅 960px 以下の 1 カラム構成で、スマートフォンでもそのまま読める。

## Colors

無彩色のグレーと白を土台に、濃紺のリンクだけが色味を持つ、抑制されたパレット。

### Primary
- **Ink Navy** (`#1c3c7c`): すべてのリンクの色。通常・hover・focus・active で同一。本文中のリンクは下線付き（`.markdown a`）、見出しやナビ内のリンクは下線なし。

### Neutral
- **Page Gray** (`#eee`): ページ全体の背景。カードの外側の「額縁」。
- **Paper White** (`#fff`): カード・メイン領域の面。
- **Ink** (`rgba(0,0,0,0.87)`): 本文テキスト。
- **Ink Muted** (`rgba(0,0,0,0.54)`): 白いカード上の日付などの補足。
- **Ink Muted on Gray** (`rgba(0,0,0,0.6)`): グレー地（`#eee`）に直接置くフッターの文字。0.54 では 4.4:1 で AA に届かないため、0.6（約 5.5:1）にしている。
- **Ink Hint** (`rgba(0,0,0,0.38)`): 定義済み。最も弱いヒント用。
- **Header Scrim** (`rgba(0,0,0,0.3)`): ヘッダー画像の上に重ねる暗幕。白文字の可読性を確保する。
- **Rule Gray** (`#ddd`): 引用の縦線、表の罫線。
- **Quote Gray** (`#777`): 引用文、h6 の文字色。
- **Code Wash** (`rgba(0,0,0,0.04)`) / **Pre Wash** (`#f7f7f7`): インラインコード、コードブロックの背景。

### Pagination Blue
- **Pager Current** (`#007bff`, hover `#0056b3`): ページネーションの現在ページのみ。リンクの濃紺（`#1c3c7c`）とは別の青であり、現状は不揃い。

### Named Rules
**The One Link Color Rule.** 色味を持つのはリンクの濃紺だけ。装飾目的でカラーを足さない。
**The Gray Frame Rule.** グレー（`#eee`）は常に外側、白（`#fff`）は常に内容。この内外の関係を逆転させない。

## Typography

**Display / Body Font:** OS 標準のシステムフォント（`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Helvetica Neue`, `Hiragino Kaku Gothic ProN`, `meiryo`, sans-serif）
**Mono Font:** Consolas, Liberation Mono, Menlo, Courier

**Character:** Web フォントを読み込まない、軽量で素直な日本語サンセリフ。リセット CSS の `font: inherit` により見出しも通常ウェイト（400）で、見出しと本文の差は主にサイズで付く。太字は `strong` と一部の要素に限られる。

### Hierarchy
- **Site Title** (500, 2.5rem, 行間 1.7): ヘッダーの番組名。白文字に `text-shadow` を付ける。
- **Card Heading** (400, 2rem, 行間 1.25): エピソード詳細ページのタイトル。中央揃え。
- **List Heading** (400, 1.5rem): 一覧ページの各エピソードタイトル。
- **Section Heading** (400, 1.3rem, 上余白 50px): 本文中の `h2`（話したこと・出演者など）。
- **Body** (400, 17px / 1.7): 本文全般。
- **Label** (400, 0.9rem): 一覧の補足、フッター、日付。
- **Code** (400, 85%, 行間 1.45): コードとコードブロック。

### Named Rules
**The Size-Over-Family Rule.** 階層はフォントを切り替えず、主にサイズで作る。太字は `strong` など意味のある箇所に限る。

## Layout

`.container` は最大幅 960px、左右 16px の余白で中央に置く。その中に 1 枚のカードを縦に並べる 1 カラム構成。`main` は上下 48px、フッターは上下 64px、ヘッダーの暗幕は上下 96px（767px 以下では 40px）の余白を持つ。

余白は 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96px の 8 の倍数に近いスケール。カードの下余白は 24px。レスポンシブの切り替え点は 767px（`respond-to(mobile)`）。12 カラムのフロートグリッド（ガター 24px）も定義されているが、現在使われているのはフッター（`_includes/footer.html`）のみで、一覧・詳細ページは 1 カラム。

## Elevation & Depth

奥行きは影ではなく、グレー地と白いカードの明度差だけで表す。カードに `box-shadow` はない。例外は 2 つ: ヘッダーの番組名の `text-shadow: 0 1px 5px black`（画像上の可読性）と、`kbd` の内側ライン。

### Named Rules
**The Flat-By-Default Rule.** 面はフラット。深さが必要なら影を足す前に、地と面の明度差を使う。

## Shapes

形は直線的でほぼ角を持つ。カードは 2px、コードは 3px のごく小さな角丸。唯一の大きな丸はホストのアバター画像（`50%`）で、人であることを示す記号として使う。区切りは 1px の細い罫線（`#ddd`, `#dee2e6`）で行う。

## Components

### Site Header
- **Style:** 番組アートの背景画像（`cover`, 中央）に暗幕、白文字の番組名と説明。画像は 800px 版（標準解像度のスマホ）と 1600px 版（768px 以上、または高解像度）を切り替える。元画像 `headerbg.jpg` は保存用で参照しない。
- **Typography:** Site Title（2.5rem / 500）。説明文は 0.9rem・白 70%。
- **Behavior:** 番組名はトップへのリンク。リンク色は文字色を継承する。

### Cards / Containers
- **Corner Style:** 2px
- **Background:** Paper White
- **Shadow Strategy:** なし
- **Padding:** 上下 32px。ヘッダーは中央揃え、本文は左揃え。

### Episode List Item
- **Style:** 一覧の 1 エピソード。タイトル（1.5rem）、日付、説明、出演者アバター（40px・丸）の順。
- **Rhythm:** 上下 16px。リンクはタイトルのみ。

### Actor Avatar
- **Style:** 丸い画像。詳細ページでは 72px、一覧では 40px。名前を画像の下に中央揃えで添える。
- **Link:** 下線なし。複数名は 1rem 間隔で横並び。

### Pagination
- **Item:** 白背景、`#dee2e6` の細い枠、角丸なし、`7px 16px`。
- **Hover:** 背景 `#f8f9fa`、枠 `#adb5bd`。0.2s のトランジション。
- **Current:** 背景・枠とも `#007bff`、白文字、太字。
- **Container:** 中央寄せ・折り返し。上に 1px の罫線。

### Show Notes (`.markdown`)
- **Style:** 見出し、箇条書き、リンクで構成される本文。箇条書きは入れ子の深さでマーカーが変わる。
- **Links:** 文章の中にあるリンク（本文、フッターの説明文・コピーライト）は下線付きの濃紺。見出しやリスト項目など単独のリンクは下線なし。
- **Audio:** MediaElement.js のプレーヤーを本文先頭に幅いっぱいで置く。

## Do's and Don'ts

### Do:
- **Do** 色味はリンクの濃紺（`#1c3c7c`）だけに留め、新しいアクセントを足さない。
- **Do** グレー地（`#eee`）の上に白いカードを置く構成を保つ。
- **Do** 階層は主にサイズで作り、日本語システムフォントのままにする。
- **Do** ショーノートの箇条書きとリンクの走査性（行間 1.7、下線）を最優先する。
- **Do** スマートフォン幅（〜767px）で崩れないよう、1 カラムを基本にする。

### Don't:
- **Don't** カードに影や大きな角丸を付けない。フラットで軽い印象を保つ。
- **Don't** ロゴ・ヘッダー画像・濃紺のリンク色を、ユーザーの確認なしに変えない（ブランドとして保持する方針）。
- **Don't** Web フォントや装飾を足して、読み込みと情報密度を損なわない。
- **Don't** ページネーションの青（`#007bff`）を他の箇所に広げない。統一する場合はリンク色との整理を先に決める。
