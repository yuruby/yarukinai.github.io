# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Yarukinai.fm - Jekyll Podcast Website

## Project Overview

Yarukinai.fm is a Japanese podcast website built with Jekyll and hosted on GitHub Pages at https://yarukinai.fm/. The site serves as a platform for a tech podcast featuring Japanese engineers discussing various topics. The project focuses on simplicity and automated deployment through GitHub Pages.

## Architecture

### Core Technology Stack
- **Jekyll**: Static site generator with GitHub Pages integration
- **Ruby 2.7.7**: Runtime environment (containerized)
- **SCSS**: CSS preprocessing with modular component structure
- **Docker**: Development environment containerization

### Project Structure

```
/
├── _config.yml           # Jekyll configuration and site metadata
├── _posts/              # Podcast episode markdown files
├── _layouts/            # HTML templates (default.html, article.html)
├── _includes/           # Reusable HTML components (head.html, header.html, footer.html)
├── css/                 # Modular SCSS architecture
│   ├── main.scss       # Main stylesheet entry point
│   ├── _variables.scss # SCSS variables
│   ├── _mixins.scss    # SCSS mixins
│   └── blocks/         # Component-specific stylesheets
├── images/             # Static assets
│   └── actors/         # Host profile images
├── feed.xml            # RSS/podcast feed generation
├── index.html          # Homepage with episode listing
└── docker/             # Development containerization
```

## Development Commands

### Essential Commands
- **Start development server**: `docker-compose up` (recommended) or `bundle exec jekyll serve --future --incremental`
- **Build site**: `bundle exec jekyll build`
- **Install dependencies**: `bundle install`
- **Serve with future posts**: `bundle exec jekyll serve --future`

### Episode Generation Commands
- **Install TypeScript dependencies**: `pnpm install`
- **Create new episode**: `pnpm create-episode`
- **Create episode with custom title**: `pnpm create-episode "カスタムタイトル"`
- **TypeScript type checking**: `pnpm type-check`
- **Build TypeScript**: `pnpm build`
- **Update audio info**: `pnpm update-audio`

### Development Setup

1. **Docker-based Development** (Recommended):
   ```bash
   docker-compose up
   ```
   - Starts Jekyll server on http://localhost:4000
   - Auto-reloads on file changes (`--incremental`, `--force_polling`)
   - Volume mounts for live development

2. **Manual Setup**:
   ```bash
   bundle install
   bundle exec jekyll serve --future --incremental
   ```

### Content Creation

#### Blog Post Structure
Each podcast episode follows a standardized YAML frontmatter format:

```yaml
---
actor_ids:              # Array of host identifiers
  - tetuo41
  - sugaishun
audio_file_url:         # Direct MP3 URL (SoundCloud)
audio_file_size:        # File size in bytes
date:                   # Publication date (YYYY-MM-DD HH:MM:SS +JTIMEZONE)
description:            # Episode summary
duration:               # Episode length (HH:MM:SS)
layout: article         # Template (always 'article')
title:                  # Episode title with number
---
```

#### Content Structure
- **Talk Topics**: Organized sections with links and references
- **Host Information**: Auto-generated from `_config.yml` actors data
- **Audio Player**: Embedded MediaElement.js player with custom controls

#### Naming Convention
Posts follow the pattern: `YYYY-MM-DD-{episode_number}.md`

### Actor/Host Management
Host information is centrally managed in `_config.yml`:

```yaml
actors:
  handle:
    image_url: /images/actors/handle.jpg
    name: Display Name
    url: https://twitter.com/handle
```

## CSS Architecture

### Modular SCSS Structure
- **Reset**: Browser normalization
- **Variables**: Color schemes, typography, breakpoints
- **Mixins**: Reusable style patterns
- **Blocks**: Component-specific styles (BEM-like methodology)

### Component Organization
```
blocks/
├── _actor.scss         # Host profile styling
├── _article.scss       # Episode page layout
├── _card.scss          # Card component system
├── _header.scss        # Site header
├── _footer.scss        # Site footer
├── _markdown.scss      # Content typography
├── _pagination.scss    # Pagination navigation styling
└── _responsive.scss    # Mobile responsiveness
```

## Deployment Process

### GitHub Pages Integration
- **Automatic Deployment**: Pushes to `master` branch trigger builds and deploy to https://yarukinai.fm/
- **GitHub Actions**: No custom CI/CD - relies on GitHub Pages Jekyll processing
- **Domain**: Custom domain configured via CNAME file

### Content Delivery
- **Static Assets**: Served directly from GitHub Pages
- **Audio Files**: Hosted externally on SoundCloud
- **RSS Feed**: Auto-generated for podcast platforms

## Key Features

### Podcast Integration
- **MediaElement.js**: Audio player with speed controls, progress tracking
- **RSS Feed**: iTunes/Spotify compatible podcast feed
- **Multiple Platforms**: Links to Apple Podcasts, Spotify
- **Download Links**: Direct MP3 access

### SEO & Social
- **Open Graph**: Social media preview optimization
- **Twitter Cards**: Rich tweet previews
- **Google Analytics**: Traffic tracking (G-BTGD5S4VFT)
- **Structured Data**: Podcast-specific metadata

### Responsive Design
- **Mobile-First**: Responsive breakpoints defined in variables
- **Image Optimization**: Actor photos with defined dimensions
- **Typography**: Optimized for Japanese content

## Common Development Tasks

### Adding New Episodes

#### Automated Method (Recommended)
1. Run `pnpm install` to install dependencies (first time only)
2. Run `pnpm create-episode` to automatically generate next episode
3. Edit the generated file in `_posts/` to add content
4. Commit and push the new branch to trigger deployment

#### Manual Method
1. Create new markdown file in `_posts/` with proper naming convention
2. Add required frontmatter fields (audio_file_url, actor_ids, etc.)
3. Structure content with "話したこと" (Topics) and "話してる人" (Speakers) sections
4. Commit and push to trigger deployment

### Adding New Hosts
1. Add actor profile to `_config.yml` actors section
2. Add profile image to `/images/actors/`
3. Update episode frontmatter to include new actor_id

### CSS Modifications
1. Identify appropriate SCSS partial in `/css/blocks/`
2. Follow existing BEM-like naming conventions
3. Use defined variables for consistency
4. Test responsive behavior

## Architecture Notes

### Jekyll Integration
- Uses GitHub Pages with automatic deployment on push to `master` branch
- No custom build process or GitHub Actions - relies on GitHub Pages' built-in Jekyll processing
- Posts are automatically converted to HTML using the `article.html` layout
- RSS feed generation is handled by `feed.xml` template

### Content Management
- Episodes are stored as markdown files in `_posts/` directory
- Actor/host data is centralized in `_config.yml` under the `actors` key
- Each episode references actors by their ID, which maps to their profile data
- Audio files are hosted externally (SoundCloud) and referenced via URL
- Pagination displays 20 episodes per page using `paginator.posts` in index.html

### Styling System
- SCSS files are organized into modular blocks following BEM-like conventions
- Import order matters: reset → mixins → variables → components (alphabetical)
- Responsive design uses variables defined in `_variables.scss`
- `respond-to(mobile)` mixin available for responsive breakpoints

## Configuration Notes

### Jekyll Settings
- **Timezone**: Asia/Tokyo
- **Markdown**: Kramdown processor
- **Permalinks**: `/episode/:title` structure
- **Exclusions**: Development files excluded from builds

### Dependencies
- **Jekyll**: `github-pages` and `jekyll-paginate` gems required for site generation
- **Node.js**: TypeScript environment for episode generation scripts
- **CDN Assets**: MediaElement.js loaded from CDN
- **Pagination**: 20 episodes per page using jekyll-paginate plugin

### Episode Generation System
- **TypeScript**: Automated episode creation with `scripts/create-episode.ts`
- **Template**: Episode template in `_templates/episode-template.md`
- **Git Integration**: Automatic branch creation following `add/yarukinai-{number}` pattern
- **Dependencies**: `date-fns`, `fs-extra`, `simple-git` for date calculation and file operations
- **Actor Management**: Supports selecting specific actors with `--actors` flag
- **Auto-dating**: Automatically sets episode date to next Monday
- **Episode Numbering**: Auto-detects latest episode number and increments

## Monitoring & Analytics

### Performance
- **Static Site**: Fast loading with Jekyll optimization
- **External Audio**: Reduces bandwidth requirements
- **Minimal JS**: Only essential audio player functionality

### Analytics
- **Google Analytics 4**: Configured with gtag
- **RSS Tracking**: Podcast platform analytics
- **Social Metrics**: Twitter sharing integration

This architecture prioritizes simplicity, maintainability, and automated deployment while providing a robust platform for podcast content delivery and audience engagement.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.