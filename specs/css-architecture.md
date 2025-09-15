# CSS/SCSS Architecture Specification

## Overview

The CSS architecture for Yarukinai.fm follows a modular, component-based approach using SCSS preprocessing with a strict import order and BEM-like naming conventions.

## Purpose

**Why:** Maintain scalable, maintainable styles for a content-focused podcast website
**What:** Modular SCSS architecture with component isolation and consistent design patterns
**Who:** Frontend developers and designers working on the podcast site

## Architecture Philosophy

### Design Principles

#### Modular Components
- Each UI component has its own SCSS file
- Components are self-contained with minimal external dependencies
- Clear separation between layout, typography, and visual styling

#### Japanese Content Optimization
- Typography optimized for Japanese text rendering
- Responsive design considering Japanese text flow
- Proper spacing for mixed Japanese/English content

#### Performance First
- Minimal CSS output through efficient SCSS compilation
- Mobile-first responsive approach
- Optimized for static site generation

## File Structure

### Directory Organization
```
css/
├── main.scss              # Main entry point with import order
├── _variables.scss        # Global design tokens
├── _mixins.scss          # Reusable style patterns
└── blocks/               # Component-specific styles
    ├── _reset.scss       # Browser normalization
    ├── _actor.scss       # Host profile components
    ├── _article.scss     # Episode page layout
    ├── _base.scss        # Base HTML element styles
    ├── _card.scss        # Card component system
    ├── _container.scss   # Layout containers
    ├── _footer.scss      # Site footer
    ├── _header.scss      # Site header
    ├── _list-group.scss  # List components
    ├── _main.scss        # Main content area
    ├── _markdown.scss    # Content typography
    ├── _pagination.scss  # Pagination navigation
    ├── _responsive.scss  # Mobile responsive styles
    └── _utilities.scss   # Utility classes
```

## Import Order Specification

### Critical Import Sequence
The main.scss file MUST follow this exact import order:

1. **Fixed Order (Required)**
   ```scss
   @import "blocks/reset";      // Browser normalization first
   @import "_mixins";           // Mixins before variables usage
   @import "_variables";        // Variables before component usage
   ```

2. **Alphabetical Order (Components)**
   ```scss
   @import "blocks/actor";
   @import "blocks/article";
   @import "blocks/base";
   // ... all other blocks in alphabetical order
   ```

### Rationale
- **Reset First:** Ensures consistent browser baseline
- **Mixins Before Variables:** Allows mixins to use variables
- **Variables Before Components:** Enables component access to design tokens
- **Alphabetical Components:** Predictable import order for maintainability

## Design System

### Color Palette

#### Text Colors
```scss
// Dark theme text (primary usage)
$color-text-dark-primary: rgba(0, 0, 0, 0.87);      // High contrast
$color-text-dark-secondary: rgba(0, 0, 0, 0.54);    // Medium contrast
$color-text-dark-hint: rgba(0, 0, 0, 0.38);         // Low contrast

// Light theme text (for dark backgrounds)
$color-text-light-primary: #fff;                     // High contrast
$color-text-light-secondary: rgba(255, 255, 255, 0.7); // Medium contrast
$color-text-light-hint: rgba(255, 255, 255, 0.5);   // Low contrast
```

### Typography

#### Font Stacks
```scss
$font-family-monospace: Consolas, "Liberation Mono", Menlo, Courier, monospace;
```

#### Usage Guidelines
- Default font: System font stack for Japanese content
- Monospace: Code blocks and technical content
- Fallbacks: Comprehensive font fallback chains

### Layout System

#### Spacing
```scss
$width-gutter: 24px;  // Standard content gutters
```

#### Breakpoints
```scss
$width-screen-extra-small-maximum: 767px;              // Mobile breakpoint
$width-screen-small-minimum: $width-screen-extra-small-maximum + 1; // Desktop minimum
```

#### Responsive Mixin
```scss
@mixin respond-to($screen) {
  @if $screen == mobile {
    @media (max-width: $width-screen-extra-small-maximum) {
      @content;
    }
  }
}
```

## Component Specifications

### Core Components

#### Reset (`_reset.scss`)
- **Purpose:** Browser normalization and consistent baseline
- **Priority:** Must be imported first
- **Scope:** Global HTML element resets

#### Base (`_base.scss`)
- **Purpose:** Fundamental HTML element styling
- **Scope:** Typography, links, basic element appearance
- **Dependencies:** Variables for colors and fonts

#### Container (`_container.scss`)
- **Purpose:** Layout wrapper and content width management
- **Responsive:** Fluid width with maximum constraints
- **Usage:** Main content area wrapping

#### Header (`_header.scss`)
- **Purpose:** Site navigation and branding
- **Features:** Responsive navigation, logo placement
- **Mobile:** Collapsible navigation pattern

#### Footer (`_footer.scss`)
- **Purpose:** Site footer with links and metadata
- **Content:** Copyright, social links, additional navigation

#### Article (`_article.scss`)
- **Purpose:** Episode page layout and structure
- **Content:** Episode metadata, audio player integration
- **Typography:** Optimized for Japanese content

#### Actor (`_actor.scss`)
- **Purpose:** Host profile display components
- **Features:** Profile images, social links, bio information
- **Layout:** Flexible grid arrangement

#### Card (`_card.scss`)
- **Purpose:** Episode preview and content card components
- **Features:** Consistent spacing, hover states, responsive layout
- **Usage:** Episode listings, related content

#### List Group (`_list-group.scss`)
- **Purpose:** Structured content lists
- **Features:** Consistent spacing, separators, nested lists
- **Usage:** Episode lists, navigation menus

#### Markdown (`_markdown.scss`)
- **Purpose:** Content typography and formatting
- **Scope:** Headings, paragraphs, links, lists, code blocks
- **Optimization:** Japanese text rendering and spacing

#### Pagination (`_pagination.scss`)
- **Purpose:** Episode navigation controls
- **Features:** Previous/next links, page numbers
- **Responsive:** Mobile-optimized navigation

#### Responsive (`_responsive.scss`)
- **Purpose:** Mobile-specific overrides and optimizations
- **Breakpoint:** Uses mobile mixin for consistent breakpoints
- **Content:** Mobile layout adjustments

#### Utilities (`_utilities.scss`)
- **Purpose:** Helper classes for common styling needs
- **Examples:** Text alignment, spacing, visibility
- **Usage:** Quick styling without component modification

### Mixins and Utilities

#### Clearfix Mixin
```scss
@mixin clearfix {
  &::after,
  &::before {
    clear: both;
    content: "";
    display: table;
  }
}
```

#### Responsive Mixin Usage
```scss
.component {
  width: 100%;

  @include respond-to(mobile) {
    padding: $width-gutter / 2;
  }
}
```

## Development Guidelines

### Naming Conventions

#### BEM-Like Methodology
- **Block:** Component name (e.g., `.card`, `.header`)
- **Element:** Component part (e.g., `.card__title`, `.header__nav`)
- **Modifier:** Variant or state (e.g., `.card--featured`, `.header--sticky`)

#### SCSS File Naming
- Prefix with underscore for partials: `_component.scss`
- Use kebab-case for multi-word names: `_list-group.scss`
- Organize by component purpose, not visual appearance

### Code Organization

#### Within Component Files
1. **Component Variables** (if needed)
2. **Base Component Styles**
3. **Element Styles** (nested)
4. **Modifier Styles**
5. **Responsive Overrides**

#### Example Structure
```scss
// Component variables
$card-padding: $width-gutter;
$card-border-radius: 4px;

// Base component
.card {
  padding: $card-padding;
  border-radius: $card-border-radius;

  // Elements
  &__title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__content {
    line-height: 1.6;
  }

  // Modifiers
  &--featured {
    background-color: $color-text-dark-hint;
  }

  // Responsive
  @include respond-to(mobile) {
    padding: $card-padding / 2;
  }
}
```

### Performance Considerations

#### SCSS Compilation
- Minimize nesting depth (max 3 levels)
- Use variables for repeated values
- Avoid unnecessary selector specificity

#### CSS Output
- Monitor compiled CSS size
- Remove unused styles during refactoring
- Optimize for critical path rendering

## Integration with Jekyll

### Jekyll Processing
- SCSS files automatically compiled by Jekyll
- Variables available across all partials
- Source maps generation for development

### Output Configuration
```yaml
# _config.yml
sass:
  sass_dir: css
```

### Build Integration
- Automatic compilation on Jekyll build
- Development server with live reload
- Production optimization through Jekyll

## Maintenance Procedures

### Adding New Components
1. Create new partial in `blocks/` directory
2. Add import to `main.scss` in alphabetical order
3. Follow BEM-like naming conventions
4. Document component purpose and usage
5. Test responsive behavior

### Modifying Existing Components
1. Review existing usage across site
2. Maintain backward compatibility
3. Update related components if needed
4. Test across all breakpoints
5. Update documentation

### Variable Management
1. Add new variables to `_variables.scss`
2. Use semantic naming over visual names
3. Group related variables together
4. Document variable purpose and usage

## Testing Strategy

### Visual Regression Testing
- Test components across different screen sizes
- Verify Japanese text rendering
- Check component isolation and reusability

### Performance Testing
- Monitor CSS bundle size
- Validate load times on mobile devices
- Check for unused CSS elimination

### Browser Compatibility
- Test across modern browsers
- Verify mobile browser rendering
- Ensure graceful degradation

## Future Enhancements

### Potential Improvements
- CSS custom properties for runtime theming
- Advanced responsive typography scaling
- Component-level CSS modules
- Automated critical CSS extraction
- Enhanced Japanese typography features

### Maintenance Roadmap
- Regular audit of unused styles
- Performance optimization reviews
- Component library documentation
- Design system evolution planning