エピソードの音声情報をSoundCloud RSSフィードから取得して更新してください。以下の手順に従ってください。

引数: $ARGUMENTS
- 数値が指定された場合、そのエピソード番号のファイルを更新
- 指定なしの場合、`_posts/` から最新エピソード番号を自動検出

## 手順

### 1. 対象エピソードの特定
- 引数にエピソード番号があればそれを使用
- なければ `_posts/` ディレクトリから最新のエピソード番号を検出（ファイル名末尾の数字の最大値）

### 2. RSSフィードの取得
WebFetchツールで以下のURLからRSSフィードを取得:
`https://feeds.soundcloud.com/users/soundcloud:users:919880566/sounds.rss`

以下の情報をRSSフィードの最新エピソード（最初の `<item>`）から抽出するようプロンプトで指示:
- `audio_file_url`: `<enclosure>` タグの `url` 属性
- `audio_file_size`: `<enclosure>` タグの `length` 属性（数値）
- `duration`: `<itunes:duration>` タグの値

### 3. エピソードファイルの更新
対象ファイル `_posts/YYYY-MM-DD-{N}.md` をReadで読み込み、Editツールでfrontmatterの以下のフィールドを更新:
- `audio_file_url:` の行を取得したURLに置換
- `audio_file_size:` の行を取得したファイルサイズに置換
- `duration:` の行を取得した再生時間に置換（`"HH:MM:SS"` 形式でクォート）

### 4. コミットメッセージの生成と表示
ファイルのfrontmatterから `date` フィールドを読み取り（例: `2026-02-16 07:00:00 +0900`）、以下の形式でコミットメッセージを表示:

```
Add EP {N}

/schedule {YYYY-MM-DD}T{HH:MM:SS}
```

例: dateが `2026-02-16 07:00:00 +0900` の場合:
```
Add EP 307

/schedule 2026-02-16T07:00:00
```

### 5. 完了メッセージ
- 更新したファイルパスと更新内容のサマリーを表示
- 推奨コミットメッセージを表示
- ユーザーにコミットとプッシュを案内
