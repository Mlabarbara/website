# Website Migration Plan

## Sequential Analysis of Dependencies

### 1. CSS Dependencies

1. Current state:
   - website/styles/main.css contains source styles
   - website/styles/mainout.css is generated via tailwind
   - Using command: `npx tailwindess -i styles/main.css -o styles/mainout.css --minify --watch`
   - Tailwind config tracks all HTML, CSS, and JS changes in website folder

2. Target state:
   - src/styles/main.css will be source of truth
   - src/styles/out.css will be generated output
   - New command: `npx tailwindess -i src/styles/main.css -o src/styles/out.css --minify --watch`
   - Tailwind config will track src/ directory

### 2. File Dependencies

1. HTML Files:
   - Each HTML file references styles/mainout.css
   - Need to update all src/pages/*.html to reference src/styles/out.css
   - Must maintain proper relative paths in component structure

2. JavaScript Dependencies:
   - website/js/ contains new files including github.js
   - src/js/ has specific structure with config/ and modules/
   - Need to map current JS files to component structure

### 3. Component Dependencies

1. Navigation:
   - src/components/nav/nav.html needs updating
   - src/js/config/nav.config.js requires new routes
   - Must integrate msu-project.html into navigation

## Sequential Migration Process

### Phase 0: Analysis and Backup

1. Create backup branch

   ```bash
   git checkout -b backup/pre-migration
   git push origin backup/pre-migration
   ```

2. Create working branch

   ```bash
   git checkout -b feature/component-migration
   ```

### Phase 1: CSS Migration

1. Compare and merge CSS files:
   - Extract unique styles from website/styles/main.css
   - Integrate into src/styles/main.css
   - Preserve all recent style changes including dark mode
   - Document all merged styles

2. Update Tailwind Configuration:
   - Modify tailwind.config.js to track src/ directory
   - Test new configuration:

     ```bash
     npx tailwindcss -i src/styles/main.css -o src/styles/out.css --minify
     ```

   - Verify output generates correctly

### Phase 2: Component Structure Updates

1. Update Navigation Component:
   - Modify src/components/nav/nav.html
   - Update src/js/config/nav.config.js
   - Add new routes including msu-project
   - Test navigation compilation

2. JavaScript Migration:
   - Analyze website/js/github.js
   - Map functionality to src/js/modules structure
   - Update any shared utilities
   - Test JavaScript functionality

### Phase 3: Page Migration (Sequential)

1. For each page in order:
   - blog.html
   - contact.html
   - github.html
   - index.html
   - pageStructure.html
   - projects.html
   - msu-project.html (new)

2. Page Migration Process:
   a. Update HTML imports
      - Change stylesheet reference to src/styles/out.css
      - Update JavaScript imports to use module structure
      - Fix all relative paths

   b. Component Integration
      - Extract reusable parts into components
      - Update navigation links
      - Test component integration

   c. Style Verification
      - Test with new CSS output
      - Verify dark mode
      - Check responsive design
      - Validate animations

   d. Functionality Testing
      - Test all JavaScript features
      - Verify form submissions
      - Check all links and routes

### Phase 4: New Page Integration

1. MSU Project Integration:
   - Create src/pages/msu-project.html
   - Set up required JavaScript modules
   - Add new styles to main.css if needed
   - Test all scroll animations
   - Verify code snippets display

### Phase 5: Testing and Validation

1. Systematic Testing:
   - Test each page individually
   - Verify all JavaScript modules
   - Check component integration
   - Test navigation system
   - Validate CSS compilation
   - Cross-browser testing
   - Mobile responsiveness

2. Performance Testing:
   - Measure load times
   - Check CSS optimization
   - Verify JavaScript bundling
   - Test animations performance

### Phase 6: Deployment Preparation

1. Documentation:
   - Update all import paths
   - Document component structure
   - Update build processes
   - Create deployment checklist

2. Cleanup:
   - Remove deprecated files
   - Update website.db
   - Clean up temporary files
   - Organize asset structure

## CSS Development Process

1. During development:

   ```bash
   npx tailwindcss -i src/styles/main.css -o src/styles/out.css --minify --watch
   ```

2. Production build:

   ```bash
   npx tailwindcss -i src/styles/main.css -o src/styles/out.css --minify
   ```

## Testing Checklist

### For Each Page

1. [ ] Stylesheet properly linked (src/styles/out.css)
2. [ ] All JavaScript modules imported correctly
3. [ ] Navigation works
4. [ ] Dark mode functions
5. [ ] Animations work
6. [ ] Responsive design intact
7. [ ] All links functional
8. [ ] Forms working (if applicable)
9. [ ] Code snippets displayed correctly (if applicable)
10. [ ] Custom functionality working

### Global Checks

1. [ ] Tailwind generating CSS correctly
2. [ ] No console errors
3. [ ] All routes accessible
4. [ ] Performance metrics acceptable
5. [ ] Cross-browser compatibility
6. [ ] Mobile responsiveness
7. [ ] Dark mode consistent across pages
8. [ ] Navigation highlighting correct
9. [ ] Asset paths working
10. [ ] Build process successful

## Rollback Procedures

1. If issues occur during migration:

   ```bash
   git checkout backup/pre-migration
   git checkout -b hotfix/migration-issues
   ```

2. For specific file issues:
   - Revert individual file changes
   - Test surrounding dependencies
   - Re-implement changes with fixes
