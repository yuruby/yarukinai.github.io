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
  actorIds: string[];
}

interface CliOptions {
  actors?: string;
  title?: string;
  listActors?: boolean;
  help?: boolean;
}

interface ActorConfig {
  [key: string]: {
    image_url: string;
    name: string;
    url?: string;
  };
}

// Japanese nickname mapping for actors
const ACTOR_JAPANESE_NAMES: { [key: string]: string } = {
  tetuo41: 'マーク',
  sugaishun: '須貝',
  snowlong: '駿河',
  operandoOS: 'operandoOS',
  tsunacan: 'つなかん',
  adachi: 'あだち',
  morizyun: 'もりずん',
  chikuwabu: 'ちくわぶ',
  yuuki: 'ゆうき',
  z_ohnami: 'おおなみ',
  mktakuya: 'まくた',
  kgmyshin: 'かげ',
  umekun123: 'うめくん',
  nagatanuen: 'ながたぬえん',
  darquro: 'だーくろ',
  flada: 'ふらだ',
  toshiemon18: 'としえもん',
  iwashi: 'いわし'
};

async function loadActorsConfig(): Promise<ActorConfig> {
  try {
    const configPath = path.join(process.cwd(), '_config.yml');
    const configContent = await fs.readFile(configPath, 'utf-8');
    
    // Simple YAML parsing for actors section
    const actorsMatch = configContent.match(/^actors:\s*\n((?:[ ]{2}[^\n]*\n?)*?)(?=\n\w|\n$|$)/m);
    if (!actorsMatch) {
      throw new Error('No actors section found in _config.yml');
    }
    
    const actorsSection = actorsMatch[1];
    const actors: ActorConfig = {};
    
    const actorMatches = actorsSection.matchAll(/^  (\w+):\s*\n((?:    [^\n]*\n?)*)/gm);
    for (const match of actorMatches) {
      const actorId = match[1];
      const actorData = match[2];
      
      const imageMatch = actorData.match(/^\s*image_url:\s*(.+)$/m);
      const nameMatch = actorData.match(/^\s*name:\s*(.+)$/m);
      const urlMatch = actorData.match(/^\s*url:\s*(.+)$/m);
      
      if (imageMatch && nameMatch) {
        actors[actorId] = {
          image_url: imageMatch[1].trim(),
          name: nameMatch[1].trim(),
          url: urlMatch ? urlMatch[1].trim() : undefined
        };
      }
    }
    
    return actors;
  } catch (error) {
    console.error('❌ Error loading actors config:', error);
    process.exit(1);
  }
}

async function validateActors(actorIds: string[], availableActors: ActorConfig): Promise<void> {
  const invalidActors = actorIds.filter(id => !availableActors[id]);
  
  if (invalidActors.length > 0) {
    console.error(`❌ Invalid actor IDs: ${invalidActors.join(', ')}`);
    console.log('\nAvailable actors:');
    Object.keys(availableActors).forEach(id => {
      console.log(`  - ${id} (${availableActors[id].name})`);
    });
    process.exit(1);
  }
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

function generateDefaultDescription(episodeNumber: number, actorIds: string[]): string {
  // Get Japanese names for the actors
  const japaneseNames = actorIds.map(id => ACTOR_JAPANESE_NAMES[id] || id);
  
  // Join names with Japanese comma
  const namesText = japaneseNames.join('、');
  
  // Create description in the required format
  return `${namesText}の${actorIds.length}人で「」「」「」などについて話しました。`;
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

function generateActorIdsYaml(actorIds: string[]): string {
  return actorIds.map(id => `  - ${id}`).join('\n');
}

function replaceTemplateVariables(template: string, data: EpisodeData): string {
  return template
    .replace(/{{EPISODE_NUMBER}}/g, data.episodeNumber.toString())
    .replace(/{{DATE}}/g, data.date)
    .replace(/{{TITLE}}/g, data.title)
    .replace(/{{DESCRIPTION}}/g, data.description)
    .replace(/{{ACTOR_IDS}}/g, generateActorIdsYaml(data.actorIds));
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

    // Switch to master branch
    console.log('🔄 masterブランチに切り替え中...');
    await git.checkout('master');
    
    // Pull latest changes from origin/master
    console.log('📥 masterブランチを最新化中...');
    await git.pull('origin', 'master');
    console.log('✅ masterブランチを最新化完了');

    // Create and checkout new branch from updated master
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

function parseCommandLineArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--actors' || arg === '-a') {
      options.actors = args[++i];
    } else if (arg === '--title' || arg === '-t') {
      options.title = args[++i];
    } else if (arg === '--list-actors') {
      options.listActors = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (!arg.startsWith('-') && !options.title) {
      // Backward compatibility: first non-flag argument is title
      options.title = arg;
    }
  }
  
  return options;
}

function showHelp(): void {
  console.log('Episode Generator for Yarukinai.fm');
  console.log('');
  console.log('Usage:');
  console.log('  pnpm create-episode [options] [title]');
  console.log('');
  console.log('Options:');
  console.log('  -a, --actors <ids>      Comma-separated actor IDs (default: tetuo41,sugaishun)');
  console.log('  -t, --title <title>     Episode title');
  console.log('  --list-actors           List available actors');
  console.log('  -h, --help              Show this help');
  console.log('');
  console.log('Examples:');
  console.log('  pnpm create-episode');
  console.log('  pnpm create-episode "カスタムタイトル"');
  console.log('  pnpm create-episode --actors tetuo41,snowlong --title "カスタムタイトル"');
  console.log('  pnpm create-episode --list-actors');
}

async function listActors(): Promise<void> {
  const actors = await loadActorsConfig();
  console.log('Available actors:');
  Object.entries(actors).forEach(([id, actor]) => {
    console.log(`  ${id} - ${actor.name}${actor.url ? ` (${actor.url})` : ''}`);
  });
}

async function main(): Promise<void> {
  try {
    const options = parseCommandLineArgs();
    
    if (options.help) {
      showHelp();
      return;
    }
    
    if (options.listActors) {
      await listActors();
      return;
    }
    
    // Load actors configuration
    const availableActors = await loadActorsConfig();
    
    // Parse and validate actor IDs
    const defaultActors = ['tetuo41', 'sugaishun'];
    const actorIds = options.actors 
      ? options.actors.split(',').map(id => id.trim())
      : defaultActors;
    
    await validateActors(actorIds, availableActors);
    
    console.log('🔍 最新エピソード番号を検出中...');
    const latestNumber = await getLatestEpisodeNumber();
    const nextNumber = latestNumber + 1;
    
    console.log(`✅ 最新エピソード番号を検出: ${latestNumber}`);
    console.log(`👥 出演者: ${actorIds.join(', ')}`);
    
    const nextDate = getNextMondayDate();
    console.log(`📅 次の月曜日: ${nextDate}`);
    
    const episodeData: EpisodeData = {
      episodeNumber: nextNumber,
      date: nextDate,
      title: options.title || generateDefaultTitle(nextNumber),
      description: generateDefaultDescription(nextNumber, actorIds),
      filename: `${nextDate}-${nextNumber}.md`,
      branchName: `add/yarukinai-${nextNumber}`,
      actorIds
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