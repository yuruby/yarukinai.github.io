# Episode Generation System Specification

## Overview

The episode generation system automates the creation of podcast episodes for Yarukinai.fm, handling file creation, metadata management, and git workflow automation.

## Purpose

**Why:** Eliminate manual repetitive tasks in episode creation and ensure consistent formatting and workflow
**What:** Automated episode file generation with proper metadata, templates, and git integration
**Who:** Podcast maintainers and content creators

## User Stories

### Primary Use Case: Standard Episode Creation
**As a** podcast maintainer
**I want to** quickly generate the next episode with default settings
**So that** I can focus on content creation rather than file setup

**Acceptance Criteria:**
- Generate episode with auto-incremented number
- Create properly formatted markdown file with frontmatter
- Set publication date to next Monday
- Use default hosts (tetuo41, sugaishun)
- Create git branch following naming convention
- Stage generated file automatically

### Custom Episode Creation
**As a** podcast maintainer
**I want to** create episodes with custom titles and host configurations
**So that** I can accommodate special episodes and varying participant lists

**Acceptance Criteria:**
- Accept custom episode titles via command line
- Allow specification of host combinations
- Validate host IDs against available actors
- Generate appropriate Japanese descriptions based on hosts

### Actor Management
**As a** podcast maintainer
**I want to** view available hosts and their information
**So that** I can correctly specify participants for episodes

**Acceptance Criteria:**
- List all available actors with IDs and names
- Show social media URLs where available
- Validate actor IDs against _config.yml data

## Technical Requirements

### Core Functionality

#### Episode Number Management
- **Requirement:** Auto-detect latest episode number from _posts directory
- **Implementation:** Parse filenames matching pattern `YYYY-MM-DD-{number}.md`
- **Validation:** Ensure new episode number is latest + 1

#### Date Calculation
- **Requirement:** Set episode date to next Monday from current date
- **Implementation:** Use date-fns `nextMonday()` function
- **Format:** ISO date format `YYYY-MM-DD`

#### Template Processing
- **Requirement:** Generate episode content from template with variable substitution
- **Template Location:** `_templates/episode-template.md`
- **Variables:** `{{EPISODE_NUMBER}}`, `{{DATE}}`, `{{TITLE}}`, `{{DESCRIPTION}}`, `{{ACTOR_IDS}}`

#### Actor Configuration
- **Requirement:** Load actor data from _config.yml
- **Format:** YAML parsing for actors section
- **Validation:** Ensure specified actors exist in configuration
- **Japanese Names:** Map actor IDs to Japanese nicknames for descriptions

### Git Integration

#### Branch Management
- **Requirement:** Create new feature branch for each episode
- **Naming Convention:** `add/yarukinai-{episode-number}`
- **Base Branch:** Always branch from latest master
- **Pre-checks:** Ensure clean working directory before branching

#### File Staging
- **Requirement:** Automatically stage generated episode file
- **Location:** `_posts/{date}-{number}.md`
- **Workflow:** Create file → Add to git staging area

### Command Line Interface

#### Basic Usage
```bash
pnpm create-episode                           # Default episode
pnpm create-episode "Custom Title"            # Custom title
pnpm create-episode --actors tetuo41,snowlong # Custom actors
pnpm create-episode --list-actors             # Show available actors
```

#### Options
- `--actors, -a`: Comma-separated actor IDs
- `--title, -t`: Custom episode title
- `--list-actors`: Display available actors
- `--help, -h`: Show usage information

### Data Flow

```
1. Parse CLI arguments
2. Load actors from _config.yml
3. Validate specified actors
4. Detect latest episode number
5. Calculate next Monday date
6. Generate episode data structure
7. Check git status (clean working directory)
8. Switch to master and pull latest
9. Create new feature branch
10. Load episode template
11. Replace template variables
12. Write episode file
13. Stage file in git
14. Display next steps to user
```

### Error Handling

#### Input Validation
- Invalid actor IDs → Show available actors and exit
- Existing branch name → Error message and exit
- Dirty git working directory → List uncommitted files and exit

#### File System Errors
- Missing template file → Error message with expected location
- Missing _posts directory → Error message and exit
- Missing _config.yml → Error message and exit

#### Git Errors
- Not a git repository → Error message and exit
- Network errors during pull → Error message and exit
- Branch creation failures → Error message and exit

## Configuration

### Actor Japanese Name Mapping
```typescript
const ACTOR_JAPANESE_NAMES = {
  tetuo41: 'マーク',
  sugaishun: '須貝',
  snowlong: '駿河',
  // ... additional mappings
};
```

### Default Settings
- **Default Actors:** `['tetuo41', 'sugaishun']`
- **Publication Day:** Next Monday
- **Branch Prefix:** `add/yarukinai-`
- **Template Location:** `_templates/episode-template.md`

### Episode Description Format
Japanese format: `{俳優名1}、{俳優名2}の{人数}人で「」「」「」などについて話しました。`

## Dependencies

### Runtime Dependencies
- `date-fns`: Date manipulation and formatting
- `simple-git`: Git operations automation
- `fs-extra`: Enhanced file system operations

### Development Dependencies
- `tsx`: TypeScript execution runtime
- `@types/node`: Node.js type definitions

## Testing Strategy

### Unit Testing Scope
- Date calculation functions
- Template variable replacement
- Actor name mapping
- CLI argument parsing

### Integration Testing Scope
- File system operations
- Git workflow automation
- Template processing end-to-end

### Manual Testing Checklist
- [ ] Default episode creation
- [ ] Custom title episode creation
- [ ] Custom actor selection
- [ ] Actor listing functionality
- [ ] Error handling for invalid actors
- [ ] Git branch creation and switching
- [ ] File staging automation

## Future Enhancements

### Potential Improvements
- Audio file URL auto-detection from SoundCloud
- Episode scheduling with custom dates
- Template selection for different episode types
- Integration with podcast hosting platforms
- Automated social media post generation

### Maintainability
- Regular review of actor mappings for accuracy
- Template format evolution support
- Command line interface improvements based on usage patterns