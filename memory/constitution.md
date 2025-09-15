# Yarukinai.fm Project Constitution

## Project Identity

**Name:** Yarukinai.fm
**Purpose:** Japanese tech podcast platform for knowledge sharing and community building
**Mission:** Provide a sustainable, accessible platform for Japanese engineers to share insights, experiences, and discussions about technology trends and engineering practices

## Core Values

### Simplicity First
- Maintain minimalist architecture prioritizing functionality over complexity
- Prefer Jekyll static generation for reliability and performance
- Keep technical debt minimal through clear documentation and automation

### Community Focus
- Serve Japanese-speaking engineering community
- Enable easy episode discovery and consumption
- Foster ongoing dialogue through consistent content delivery

### Sustainability
- Automate repetitive tasks (episode generation, metadata updates)
- Leverage GitHub Pages for zero-maintenance hosting
- Design for long-term maintainability without constant intervention

### Quality Standards
- Consistent episode formatting and metadata
- Mobile-responsive design optimized for Japanese content
- Fast loading times with external audio hosting

## Technical Philosophy

### Architecture Principles
1. **Static-First:** Jekyll generates fast, cacheable static content
2. **Automation-Driven:** TypeScript scripts handle repetitive tasks
3. **External Dependencies:** Audio hosting on SoundCloud reduces bandwidth
4. **Version Controlled:** All content and configuration in Git

### Development Approach
1. **Specification-Driven:** Define requirements before implementation
2. **Iterative Enhancement:** Improve existing features before adding new ones
3. **Documentation-First:** Update specs and documentation before code changes
4. **Testing Integration:** Validate changes against expected behavior

## Content Standards

### Episode Structure
- Standardized YAML frontmatter with complete metadata
- Japanese episode descriptions following established format
- Consistent host attribution and audio file linking
- SEO-optimized titles and descriptions

### Host Management
- Centralized actor profiles in `_config.yml`
- Consistent image dimensions and formats
- Social media integration where applicable

## Operational Guidelines

### Release Process
1. Episode generation through automated scripts
2. Content review and enhancement
3. Audio metadata synchronization
4. Branch creation and pull request workflow
5. Automated deployment via GitHub Pages

### Change Management
- Specification documents for new features
- Implementation plans for architectural changes
- Backward compatibility for existing content
- Performance impact assessment

## Success Metrics

### Technical Metrics
- Page load times under 3 seconds
- Mobile responsiveness across devices
- Zero-downtime deployments
- Automated process success rates

### Content Metrics
- Consistent episode publication schedule
- Complete metadata for all episodes
- Accessible audio player functionality
- SEO performance for episode discovery

## Constraints and Boundaries

### Technical Constraints
- GitHub Pages hosting limitations
- Jekyll plugin restrictions
- External audio hosting dependency
- Static site generation requirements

### Content Constraints
- Japanese language primary focus
- Tech/engineering topic relevance
- Audio quality standards
- Copyright and licensing compliance

## Evolution and Adaptation

### Continuous Improvement
- Regular specification reviews and updates
- Community feedback integration
- Technology stack evaluation
- Performance optimization opportunities

### Future Considerations
- Scalability for increased episode volume
- Enhanced social media integration
- Advanced search and discovery features
- Community interaction capabilities

This constitution guides all development decisions and ensures consistency with the project's core mission of providing a reliable, sustainable platform for the Japanese engineering podcast community.