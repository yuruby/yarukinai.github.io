---
name: Yarukinai.fm
description: 毎週のエピソードを手描きのマーカーと蛍光ペンで縁取る、ショーノート中心のポッドキャストサイト。
colors:
  ink: "rgba(0, 0, 0, 0.87)"
  ink-muted: "rgba(0, 0, 0, 0.54)"
  ink-muted-on-gray: "rgba(0, 0, 0, 0.6)"
  on-header: "#fff"
  link-navy: "#1c3c7c"
  page-gray: "#eee"
  paper-white: "#fff"
  header-scrim: "rgba(0, 0, 0, 0.3)"
  description-plate: "rgba(0, 0, 0, 0.6)"
  highlight-yellow: "#ffe14d"
  highlight-yellow-soft: "#fff6c2"
  highlight-pink: "#ff8fb1"
  code-wash: "rgba(0, 0, 0, 0.04)"
  pre-wash: "#f7f7f7"
  rule-gray: "#ddd"
  quote-gray: "#777"
  table-stripe: "#f8f8f8"
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
  marker-card-heading:
    fontFamily: "Yusei Magic, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.5
  marker-list-heading:
    fontFamily: "Yusei Magic, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  marker-badge:
    fontFamily: "Yusei Magic, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
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
  panel: "6px"
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
components:
  episode-panel:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "14px 16px 14px 78px"
  episode-badge:
    backgroundColor: "{colors.highlight-pink}"
    textColor: "{colors.ink}"
    typography: "{typography.marker-badge}"
    rounded: "{rounded.avatar}"
    size: "50px"
  site-title:
    textColor: "{colors.on-header}"
    typography: "{typography.site-title}"
  pager-item:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "7px 14px"
  pager-item-hover:
    backgroundColor: "{colors.highlight-yellow-soft}"
  pager-item-current:
    backgroundColor: "{colors.highlight-yellow}"
    textColor: "{colors.ink}"
---

# Design System: Yarukinai.fm

## Overview

**Creative North Star: "The Annotated Zine"**

毎週のエピソードを、手描きのメモが入った小冊子のように見せる。枠（ヘッダー、番号、タイトル、パネルの縁）は蛍光ペンとマーカー文字で番組らしい気軽さを担い、読み物であるショーノートの本文は落ち着いた白い面と通常のサンセリフのまま保つ。ロゴ・配色・ヘッダー写真は維持し、ベースのグレー・白・濃紺に、蛍光ペンの黄とピンクを小さな「印」として足している。

世界観は「枠」に限り、読む領域には持ち込まない。パネルは 2px の墨の縁と 6px の角丸を持ち、最大 0.5 度だけ傾くが、タップ・フォーカスで真っ直ぐになる。影や強い装飾は使わず、傾きは静的で動きではない。

**Key Characteristics:**
- 白い面とグレーの地という既存のベースに、蛍光ペンの黄・ピンクを小さな印として足す。
- マーカー書体は、回番号とエピソードタイトルだけに使う。サイト名（ロゴ表記）は従来どおり白文字のシステム書体。
- 一覧は墨の縁取りのパネル。最新回だけがやや大きい。パネル全体が 1 つのタップ領域。
- ショーノートの本文は傾きも装飾もない、読みやすいカラム。
- 影を使わないフラットな面構成。

## Colors

無彩色のグレーと白、墨色の文字、濃紺のリンクに、蛍光ペンの黄とピンクが小さな印として載る。

### Primary
- **Ink Navy** (`#1c3c7c`): すべてのリンクとフォーカスリングの色。本文中のリンクは下線付き。

### Highlighter
- **Highlighter Yellow** (`#ffe14d`): タイトルの下線（文字の下 38% を塗る）、ページネーションの現在ページ。
- **Highlighter Yellow Soft** (`#fff6c2`): ページネーションの hover 背景。
- **Highlighter Pink** (`#ff8fb1`): 回番号の丸いバッジのみ。

### Neutral
- **Page Gray** (`#eee`): ページ背景（フッター周り）。
- **Paper White** (`#fff`): カード・メイン領域・パネルの面。
- **Ink** (`rgba(0,0,0,0.87)`): 本文、パネルの縁、アバターの縁、ページネーションの縁。
- **Ink Muted** (`rgba(0,0,0,0.54)`): 白い面の上の日付・所要時間などの補足。
- **Ink Muted on Gray** (`rgba(0,0,0,0.6)`): グレー地に直接置くフッターの文字（AA を満たす）。
- **Header Scrim** (`rgba(0,0,0,0.3)`): ヘッダー写真に重ねる暗幕。
- **Description Plate** (`rgba(0,0,0,0.6)`): ヘッダーの説明文の背面の濃い板。写真の上でも白文字が読める。
- **Code Wash** / **Pre Wash** / **Rule Gray** / **Quote Gray** / **Table Stripe**: コード・罫線・引用・表のための従来どおりの中性色。

### Named Rules
**The Highlighter Is a Mark Rule.** 黄とピンクは「印」としてだけ使う。広い面（背景、ヘッダー全体）を塗らない。
**The One Link Color Rule.** リンクとフォーカスは濃紺のみ。
**The Calm Column Rule.** ショーノートの本文には蛍光ペンの色もマーカー書体も傾きも持ち込まない。

## Typography

**Marker Font:** Yusei Magic（Google Fonts、`display=swap`。フォールバックは Hiragino Maru Gothic ProN, Yu Gothic）
**Body Font:** OS 標準のシステムサンセリフ（-apple-system, Hiragino Kaku Gothic ProN, meiryo など）
**Mono Font:** Consolas, Liberation Mono, Menlo, Courier

**Character:** 手書きのマーカー書体は「番組の声」として回番号・タイトルだけに限り、サイト名と読む文章はシステムフォントのまま。

### Hierarchy
- **Site Title** (500, 2.5rem, 1.7): ヘッダーの番組名（ロゴ表記）。白文字で、写真の上の可読性のために柔らかい影を付ける。
- **Card Heading** (400, 2rem, 1.5): エピソードページのタイトル。黄色の下線。
- **List Heading** (400, 1.25rem、最新回は 1.5rem): 一覧のタイトル。黄色の下線。
- **Badge** (400, 1rem): 回番号。ピンクの丸の中。
- **Section Heading** (400, 1.3rem, 1.25): ショーノート内の h2。黄色の下線。
- **Body** (400, 17px / 1.7): 本文全般。
- **Label** (400, 0.85–0.9rem): 日付・所要時間・フッター。

### Named Rules
**The Marker-Only-Where-It-Speaks Rule.** マーカー書体は回番号・タイトルに限る。サイト名（ロゴ表記）には使わない。ナビゲーション、フッター、本文には使わない。

## Layout

`.container` は最大幅 960px、左右 16px の余白で中央に置く。一覧はパネルを縦に並べる 1 カラムで、エピソードページは 1 枚のカードに音声プレーヤー、内容紹介、出演者、ショーノートの順で積む。`main` は上下 48px、フッターは上下 64px。ヘッダーの暗幕は上下 96px（767px 以下は 40px）。

スマホではパネルは画面幅いっぱい（左右 16px）で、左の 78px に回番号バッジ、その右にタイトル・日付・説明・アバターを置く。レスポンシブの切り替え点は 767px。ページネーションは現在ページの前後 2 つに絞り、間を「…」で省略する。

## Elevation & Depth

奥行きは影ではなく、墨の縁取りと白い面の対比で表す。影はヘッダーの番組名の柔らかい文字影（写真の上の可読性）だけで、パネルの傾き（最大 0.5 度）は静的で、フォーカスまたは hover で真っ直ぐに戻る（`prefers-reduced-motion` ではトランジションなし）。

### Named Rules
**The Flat-By-Default Rule.** 面はフラット。深さが必要でも、影ではなく縁取りで示す。
**The Straighten-On-Touch Rule.** 傾きは 0.5 度まで。hover / focus-within で必ず 0 度に戻る。

## Shapes

形は直線的で、パネルとページネーションは 6px の小さな角丸に墨の 2px の縁。カードは 2px、コードは 3px。アバターと回番号バッジだけが完全な円で、アバターには墨の 2px の縁が付く。

## Components

### Site Header
- **Style:** 番組アートの背景画像に暗幕、下に墨の 3px の線。番組名は白文字のシステム書体に柔らかい影（ロゴ表記は刷新前のまま）。説明文は濃い板の上の白文字。
- **Image:** 800px 版（標準解像度のスマホ）と 1600px 版（768px 以上、または高解像度）を切り替える。

### Episode Panel
- **Style:** 白、墨の 2px の縁、6px の角丸。奇数番目は -0.5 度、偶数番目は +0.5 度。
- **Contents:** ピンクの丸い回番号バッジ、マーカー書体のタイトル（黄色の下線）、日付と所要時間、説明、出演者のアバター。
- **Latest:** 一覧の 1 ページ目の先頭だけが一回り大きい。
- **Interaction:** パネル全体が 1 つのリンク。hover / focus-within で傾きが戻り、focus-within には濃紺のフォーカスリング。

### Actor Avatar
- **Style:** 墨の 2px の縁の丸い画像。詳細ページでは 72px、一覧では 40px。

### Pagination
- **Item:** 白、墨の 2px の縁、6px の角丸、最小幅 44px。
- **Hover:** 淡い黄色（`#fff6c2`）。
- **Current:** 黄色（`#ffe14d`）と太字。
- **Ellipsis:** 枠も背景もない「…」。

### Show Notes (`.markdown`)
- **Style:** 見出し、箇条書き、リンクによる読み物。`h2` だけに黄色の下線。
- **Links:** 文章中のリンク（本文、フッターの説明文・コピーライト）は下線付きの濃紺。
- **Audio:** MediaElement.js のプレーヤーを本文の先頭に幅いっぱいで置く。

## Do's and Don'ts

### Do:
- **Do** 黄とピンクは回番号、タイトルの下線、現在ページなどの小さな印に限る。
- **Do** 傾きは最大 0.5 度、hover / focus で必ず真っ直ぐに戻す。
- **Do** ショーノートの本文は通常のサンセリフ・無装飾で、行間 1.7 を保つ。
- **Do** パネル全体を 1 つのタップ領域にし、44px 以上の操作領域を確保する。
- **Do** フォーカスは濃紺の 3px のリングで必ず見えるようにする。

### Don't:
- **Don't** マーカー書体を本文・ナビゲーション・フッター見出しに広げない。
- **Don't** 黄やピンクで広い面（背景、ヘッダー全体）を塗らない。
- **Don't** パネルにオフセットの影や、2px 以上の傾きを付けない。
- **Don't** ロゴ・ヘッダー写真・濃紺のリンク色を、ユーザーの確認なしに変えない。
- **Don't** パネルをさらに別の白いカードの中に入れ子にしない。
