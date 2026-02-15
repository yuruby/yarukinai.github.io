新しいエピソードファイルを作成してください。以下の手順に従ってください。

引数: $ARGUMENTS
- 引数がカンマ区切りのアクターID（例: `tetuo41,snowlong`）の場合、それをアクターとして使用
- 引数がそれ以外のテキストの場合、エピソードタイトルとして使用
- `--actors <ids>` フラグがある場合、アクターIDとして使用
- 引数なしの場合、デフォルトアクター（tetuo41, sugaishun）を使用

## 手順

### 1. 最新エピソード番号の検出
`_posts/` ディレクトリ内のファイルから最新のエピソード番号を検出する。ファイル名は `YYYY-MM-DD-{number}.md` 形式。末尾の数字がエピソード番号。最大値 + 1 を新エピソード番号とする。

### 2. 次の月曜日の日付を計算
今日の日付から次の月曜日を計算し、`YYYY-MM-DD` 形式で使用する。今日が月曜日の場合は来週の月曜日を使う。

### 3. アクター日本語名マッピング
以下のマッピングを使用して description を生成する:
- tetuo41 → マーク
- sugaishun → 須貝
- snowlong → 駿河
- operandoOS → operandoOS
- tsunacan → つなかん
- adachi → あだち
- morizyun → もりずん
- chikuwabu → ちくわぶ
- yuuki → ゆうき
- z_ohnami → おおなみ
- mktakuya → まくた
- kgmyshin → かげ
- umekun123 → うめくん
- nagatanuen → ながたぬえん
- darquro → だーくろ
- flada → ふらだ
- toshiemon18 → としえもん
- iwashi → いわし

### 4. description の生成
`{日本語名1}、{日本語名2}の{人数}人で「」「」「」などについて話しました。` の形式で生成。

### 5. Git操作
1. `git status` で未コミットの変更がないことを確認。変更がある場合はユーザーに警告して中止。
2. `git checkout master` でmasterに切替
3. `git pull origin master` で最新化
4. `git checkout -b add/yarukinai-{N}` で新ブランチ作成

### 6. テンプレートからファイル生成
`_templates/episode-template.md` を読み込み、以下のプレースホルダーを置換:
- `{{EPISODE_NUMBER}}` → エピソード番号
- `{{DATE}}` → 次の月曜日の日付（YYYY-MM-DD）
- `{{TITLE}}` → タイトル（指定なしの場合 `Episode {N}`）
- `{{DESCRIPTION}}` → 生成した description
- `{{ACTOR_IDS}}` → アクターIDのYAML配列（各行 `  - {id}` 形式）

### 7. ファイル書き込みとステージング
- `_posts/{YYYY-MM-DD}-{N}.md` にファイルを作成（Writeツール使用）
- `git add _posts/{YYYY-MM-DD}-{N}.md` でステージング

### 8. 完了メッセージ
以下を表示:
- 作成したファイルパス
- 次の手順（ファイル編集、コミット、プッシュ）
