# Yarukinai.fm - Jekyll Podcast Website

## Project Overview

Yarukinai.fm is a Japanese podcast website built with Jekyll and hosted on GitHub Pages. The site serves as a platform for a tech podcast featuring Japanese engineers discussing various topics. The project focuses on simplicity and automated deployment through GitHub Pages.

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

## Development Workflow

### Local Development Setup

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
└── _responsive.scss    # Mobile responsiveness
```

## Deployment Process

### GitHub Pages Integration
- **Automatic Deployment**: Pushes to `master` branch trigger builds
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

### Local Testing
```bash
# Start development server
docker-compose up

# Build site locally
bundle exec jekyll build

# Serve with future posts
bundle exec jekyll serve --future
```

## Configuration Notes

### Jekyll Settings
- **Timezone**: Asia/Tokyo
- **Markdown**: Kramdown processor
- **Permalinks**: `/episode/:title` structure
- **Exclusions**: Development files excluded from builds

### Dependencies
- **Minimal**: Only `github-pages` gem required
- **No Node.js**: Pure Ruby/Jekyll stack
- **CDN Assets**: MediaElement.js loaded from CDN

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