# Yarukinai.fm

**日本のエンジニアによるテックポッドキャスト**

🎙️ **サイト**: https://yarukinai.fm
🎧 **Apple Podcasts**: https://podcasts.apple.com/jp/podcast/yarukinai-fm/id1468116415
🎵 **Spotify**: https://open.spotify.com/show/4MY6pVYpu7bnUhWqvzVH6m

## 概要

Yarukinai.fmは、アラフォーのおじさんエンジニアたちと30代のエンジニアが雑談ベースで話すポッドキャストです。技術的な話題から日常の出来事まで、幅広いトピックを扱っています。

## 開発環境

このサイトはJekyllを使用してGitHub Pagesでホストされています。

### ローカル開発

```bash
# Dockerを使用（推奨）
docker-compose up

# または直接実行
bundle install
bundle exec jekyll serve --future --incremental
```

開発サーバーは http://localhost:4000 で起動します。

### 新しいエピソードの追加

1. `_posts/` ディレクトリに `YYYY-MM-DD-{episode_number}.md` 形式でファイルを作成
2. 必要なfrontmatterを設定（詳細は [CLAUDE.md](CLAUDE.md) を参照）
3. コミット・プッシュで自動デプロイ
