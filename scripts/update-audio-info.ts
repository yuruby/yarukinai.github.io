#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import simpleGit from 'simple-git';

const git = simpleGit();

interface AudioInfo {
  url: string;
  length: number;
  duration: string;
}

interface RSSItem {
  title: string;
  enclosure: {
    '@_url': string;
    '@_length': string;
    '@_type': string;
  };
  'itunes:duration': string;
  guid: string;
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSItem[];
    };
  };
}

const RSS_FEED_URL = 'https://feeds.soundcloud.com/users/soundcloud:users:919880566/sounds.rss';

async function fetchRSSFeed(): Promise<RSSFeed> {
  try {
    console.log('🔍 SoundCloud RSSフィードを取得中...');
    const response = await fetch(RSS_FEED_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    });
    
    const result = parser.parse(xmlText) as RSSFeed;
    console.log('✅ RSSフィードの取得完了');
    
    return result;
  } catch (error) {
    console.error('❌ RSSフィード取得エラー:', error);
    process.exit(1);
  }
}

function extractAudioInfo(item: RSSItem): AudioInfo {
  return {
    url: item.enclosure['@_url'],
    length: parseInt(item.enclosure['@_length'], 10),
    duration: item['itunes:duration']
  };
}

function extractEpisodeNumber(filePath: string): number {
  const fileName = path.basename(filePath);
  const match = fileName.match(/(\d+)\.md$/);
  if (!match) {
    throw new Error(`Could not extract episode number from file: ${fileName}`);
  }
  return parseInt(match[1], 10);
}

function extractAndFormatDate(fileContent: string): string {
  const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch || !frontmatterMatch[1]) {
    throw new Error('Could not find frontmatter in episode file');
  }
  
  const frontmatter = frontmatterMatch[1];
  const dateMatch = frontmatter.match(/^date:\s*(.+)$/m);
  if (!dateMatch || !dateMatch[1]) {
    throw new Error('Could not find date in frontmatter');
  }
  
  // Parse date like "2025-08-04 07:00:00 +0900" and convert to "2025-08-04T07:00:00"
  const dateString = dateMatch[1].trim();
  const match = dateString.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/);
  if (!match || !match[1] || !match[2]) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  
  return `${match[1]}T${match[2]}`;
}

async function getLatestEpisodeNumber(): Promise<number> {
  try {
    const postsDir = path.join(process.cwd(), '_posts');
    const files = await fs.readdir(postsDir);
    
    const episodeNumbers = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const match = file.match(/(\d+)\.md$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(num => num > 0);
    
    if (episodeNumbers.length === 0) {
      throw new Error('No episode files found in _posts directory');
    }
    
    return Math.max(...episodeNumbers);
  } catch (error) {
    console.error('❌ Error reading _posts directory:', error);
    process.exit(1);
  }
}

async function findLatestEpisodeFile(episodeNumber?: number): Promise<string> {
  try {
    const postsDir = path.join(process.cwd(), '_posts');
    const files = await fs.readdir(postsDir);
    
    const targetNumber = episodeNumber || await getLatestEpisodeNumber();
    
    const episodeFile = files.find(file => 
      file.endsWith('.md') && file.includes(`-${targetNumber}.md`)
    );
    
    if (!episodeFile) {
      throw new Error(`Episode file for episode ${targetNumber} not found`);
    }
    
    return path.join(postsDir, episodeFile);
  } catch (error) {
    console.error('❌ Error finding episode file:', error);
    process.exit(1);
  }
}

async function updateEpisodeFrontmatter(filePath: string, audioInfo: AudioInfo): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Split content into frontmatter and body
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      throw new Error('Invalid frontmatter format');
    }
    
    let frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];
    
    // Update frontmatter fields
    if (!frontmatter) {
      throw new Error('Invalid frontmatter content');
    }
    
    frontmatter = frontmatter.replace(
      /^audio_file_url:.*$/m,
      `audio_file_url: ${audioInfo.url}`
    );
    
    frontmatter = frontmatter.replace(
      /^audio_file_size:.*$/m,
      `audio_file_size: ${audioInfo.length}`
    );
    
    frontmatter = frontmatter.replace(
      /^duration:.*$/m,
      `duration: "${audioInfo.duration}"`
    );
    
    // Reconstruct the file content
    const updatedContent = `---\n${frontmatter}\n---\n${body}`;
    
    await fs.writeFile(filePath, updatedContent, 'utf-8');
    console.log('✅ エピソードファイルを更新しました');
  } catch (error) {
    console.error('❌ Error updating episode file:', error);
    process.exit(1);
  }
}

async function checkGitStatus(): Promise<void> {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      console.warn('⚠️  This is not a git repository. Skipping git status check.');
      return;
    }

    const status = await git.status();
    if (status.files.length > 0) {
      console.warn('⚠️  You have uncommitted changes. Consider committing them before updating audio info.');
      console.log('Uncommitted files:');
      status.files.forEach(file => console.log(`  - ${file.path}`));
      console.log(''); // Empty line for better readability
    }
  } catch (error) {
    console.warn('⚠️  Could not check git status:', error);
  }
}

function generateCommitMessage(episodeNumber: number, formattedDate: string): string {
  return `Add EP ${episodeNumber}\n\n/schedule ${formattedDate}`;
}

function parseCommandLineArgs(): { episodeNumber?: number; help?: boolean } {
  const args = process.argv.slice(2);
  const options: { episodeNumber?: number; help?: boolean } = {};
  
  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (!isNaN(parseInt(arg, 10))) {
      options.episodeNumber = parseInt(arg, 10);
    }
  }
  
  return options;
}

function showHelp(): void {
  console.log('Audio Info Updater for Yarukinai.fm');
  console.log('');
  console.log('Usage:');
  console.log('  pnpm update-audio [episode_number]');
  console.log('');
  console.log('Options:');
  console.log('  episode_number          Specific episode number to update (default: latest)');
  console.log('  -h, --help              Show this help');
  console.log('');
  console.log('Examples:');
  console.log('  pnpm update-audio       # Update latest episode');
  console.log('  pnpm update-audio 281   # Update episode 281');
}

async function main(): Promise<void> {
  try {
    const options = parseCommandLineArgs();
    
    if (options.help) {
      showHelp();
      return;
    }
    
    // Check git status
    await checkGitStatus();
    
    // Fetch RSS feed and get latest episode audio info
    const rssData = await fetchRSSFeed();
    const latestItem = rssData.rss.channel.item[0]; // First item is the latest
    
    if (!latestItem) {
      throw new Error('No episodes found in RSS feed');
    }
    
    const audioInfo = extractAudioInfo(latestItem);
    
    console.log('📻 最新エピソードの音声情報:');
    console.log(`   URL: ${audioInfo.url}`);
    console.log(`   サイズ: ${(audioInfo.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   再生時間: ${audioInfo.duration}`);
    console.log('');
    
    // Find and update the target episode file
    const targetEpisode = options.episodeNumber || await getLatestEpisodeNumber();
    console.log(`🎯 対象エピソード: ${targetEpisode}`);
    
    const episodeFilePath = await findLatestEpisodeFile(options.episodeNumber);
    console.log(`📝 更新ファイル: ${path.basename(episodeFilePath)}`);
    
    await updateEpisodeFrontmatter(episodeFilePath, audioInfo);
    
    // Read the updated file content to extract date
    const updatedContent = await fs.readFile(episodeFilePath, 'utf-8');
    
    // Extract episode number and formatted date for commit message
    const episodeNumber = extractEpisodeNumber(episodeFilePath);
    const formattedDate = extractAndFormatDate(updatedContent);
    
    // Generate commit message
    const commitMessage = generateCommitMessage(episodeNumber, formattedDate);
    
    console.log('🎉 音声情報の更新が完了しました！');
    console.log('');
    console.log('📋 推奨コミットメッセージ:');
    console.log('---');
    console.log(commitMessage);
    console.log('---');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
main();