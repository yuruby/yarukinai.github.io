---
actor_ids:
{{ACTOR_IDS}}
audio_file_url: # TODO: SoundCloudのURLを追加
audio_file_size: # TODO: ファイルサイズを追加
date: {{DATE}} 07:00:00 +0900
description: {{DESCRIPTION}}
duration: # TODO: 録音時間を追加
layout: article
title: {{EPISODE_NUMBER}}. {{TITLE}}
---

## 話したこと
- opトーク
- TODO: トピックを追加

## 話してる人
{% for actor_id in page.actor_ids %}
  {% assign actor = site.actors[actor_id] %}
- [{{ actor.name }}]({{ actor.url }})
{% endfor %}

## Yarukinai.fmについて
[Yarukinai.fmをサポートする]({{ site.fanclub }})