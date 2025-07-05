#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { format, nextMonday } from 'date-fns';
import { ja } from 'date-fns/locale';
import simpleGit from 'simple-git';

const git = simpleGit();

interface EpisodeData {
  episodeNumber: number;
  date: string;
  title: string;
  description: string;
  filename: string;
  branchName: string;
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

function getNextMondayDate(): string {
  const today = new Date();
  const next = nextMonday(today);
  return format(next, 'yyyy-MM-dd');
}

function generateDefaultTitle(episodeNumber: number): string {
  return `Episode ${episodeNumber}`;
}

function generateDefaultDescription(episodeNumber: number): string {
  return `第${episodeNumber}回のエピソードです。`;
}

async function loadTemplate(): Promise<string> {
  try {
    const templatePath = path.join(process.cwd(), '_templates', 'episode-template.md');
    return await fs.readFile(templatePath, 'utf-8');
  } catch (error) {
    console.error('❌ Error loading template:', error);
    process.exit(1);
  }
}

function replaceTemplateVariables(template: string, data: EpisodeData): string {
  return template
    .replace(/{{EPISODE_NUMBER}}/g, data.episodeNumber.toString())
    .replace(/{{DATE}}/g, data.date)
    .replace(/{{TITLE}}/g, data.title)
    .replace(/{{DESCRIPTION}}/g, data.description);
}

async function checkGitStatus(): Promise<void> {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      console.error('❌ This is not a git repository');
      process.exit(1);
    }

    const status = await git.status();
    if (status.files.length > 0) {
      console.warn('⚠️  You have uncommitted changes. Please commit or stash them first.');
      console.log('Uncommitted files:');
      status.files.forEach(file => console.log(`  - ${file.path}`));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error checking git status:', error);
    process.exit(1);
  }
}

async function createBranch(branchName: string): Promise<void> {
  try {
    // Check if branch already exists
    const branches = await git.branch();
    if (branches.all.includes(branchName)) {
      console.error(`❌ Branch '${branchName}' already exists`);
      process.exit(1);
    }

    // Create and checkout new branch
    await git.checkoutLocalBranch(branchName);
    console.log(`🌿 新しいブランチを作成: ${branchName}`);
  } catch (error) {
    console.error('❌ Error creating branch:', error);
    process.exit(1);
  }
}

async function createEpisodeFile(data: EpisodeData, content: string): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), '_posts', data.filename);
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`📝 エピソードファイルを作成: _posts/${data.filename}`);
    
    // Add file to git
    await git.add(filePath);
    console.log('📋 ファイルをステージング完了');
  } catch (error) {
    console.error('❌ Error creating episode file:', error);
    process.exit(1);
  }
}

async function main(): Promise<void> {
  try {
    // Get custom title from command line argument
    const customTitle = process.argv[2];
    
    console.log('🔍 最新エピソード番号を検出中...');
    const latestNumber = await getLatestEpisodeNumber();
    const nextNumber = latestNumber + 1;
    
    console.log(`✅ 最新エピソード番号を検出: ${latestNumber}`);
    
    const nextDate = getNextMondayDate();
    console.log(`📅 次の月曜日: ${nextDate}`);
    
    const episodeData: EpisodeData = {
      episodeNumber: nextNumber,
      date: nextDate,
      title: customTitle || generateDefaultTitle(nextNumber),
      description: generateDefaultDescription(nextNumber),
      filename: `${nextDate}-${nextNumber}.md`,
      branchName: `add/yarukinai-${nextNumber}`
    };
    
    // Check git status
    await checkGitStatus();
    
    // Create new branch
    await createBranch(episodeData.branchName);
    
    // Load and process template
    const template = await loadTemplate();
    const content = replaceTemplateVariables(template, episodeData);
    
    // Create episode file
    await createEpisodeFile(episodeData, content);
    
    console.log('🎉 エピソード' + nextNumber + 'の準備が完了しました！');
    console.log('');
    console.log('次の手順:');
    console.log(`1. エピソード内容を編集: _posts/${episodeData.filename}`);
    console.log(`2. コミット: git commit -m "Add episode ${nextNumber}"`);
    console.log(`3. プッシュ: git push -u origin ${episodeData.branchName}`);
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
main();