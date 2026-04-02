# KGCentral Forum UI Design Brief for Stitch

Use this document as the prompt for [Stitch](https://stitch.withgoogle.com/).

## Goal

Create a forum UI for KGCentral that matches the existing frontend design system exactly. Do not invent a new visual language. The new forum screens must feel like they belong to the current KGCentral app.

## Product Context

KGCentral is the King God Castle community platform. The frontend already has:

- A royal fantasy landing page with gold CTA buttons, soft gradients, and large feature cards
- A sticky header and navigation bar with subtle blur and border
- A chat page with clean message bubbles, muted backgrounds, and readable markdown content
- A light and dark theme system
- Vietnamese-first content with English support

## Critical Constraint

The forum UI must be visually consistent with the current frontend.

Non-negotiable constraints:

- Keep the current KGCentral top header and top navigation pattern (do not redesign into a different nav system)
- Do not introduce a left sidebar as the primary navigation layout
- Do not rename or rebrand the product name, logo style, or navigation labels
- Do not replace the current rounded card language with flat or enterprise table layouts
- Do not introduce a different font pairing than the current serif heading + sans body style
- Keep color hierarchy as gold primary and purple secondary, not monochrome beige or grayscale
- Keep spacing density similar to the current landing page and chat page (airy, not compressed)
- Preserve current button personality: gold primary CTA, accent outline secondary CTA

Do not use:

- Generic SaaS dashboard layouts
- Neon, cyberpunk, or glassmorphism-heavy styling
- Strong purple-only AI app aesthetics
- Overly complex panels or dense admin UI
- Shadows, spacing, or border radius that conflict with the current app

## Visual Direction

The forum should follow the same visual language as the current KGCentral app:

- Royal fantasy and castle inspired
- Gold as the primary accent
- Purple as the secondary accent
- Soft stone and off-white surfaces in light mode
- Dark blue and night castle surfaces in dark mode
- Rounded-xl and rounded-2xl cards
- Soft hover lift, subtle border, gentle blur on header areas
- Serif font for headings, clean sans-serif for body text
- Lucide-style simple icons

## Existing UI Reference Patterns

Match these existing patterns from KGCentral:

- Landing page hero section with crown icon, gold gradient title, and gold CTA buttons
- Feature cards with icon, title, description, rounded-xl card style, and hover shadow
- Header with logo left and action buttons right
- Navigation with sticky top bar and dropdown menu style
- Chat page with readable message bubbles, muted content areas, and markdown-friendly prose styling

## Stitch Regeneration Instructions

If previous outputs were off-brand, regenerate with these hard instructions:

- This is a feature extension of an existing app, not a new app concept
- Reuse the existing KGCentral visual system and interaction style without reinterpretation
- Keep header and top navigation consistent with current production UI
- Use forum content cards inside the existing page shell rather than introducing a new app shell
- Maintain current radius, spacing rhythm, border style, and button treatment
- Favor consistency over novelty in every layout decision

## Design Tokens to Keep

Light mode:

- Background: off-white / stone tone
- Foreground: dark blue text
- Primary: royal gold
- Accent: mystical purple
- Secondary: castle stone
- Muted: soft gray stone
- Success: green
- Warning: orange
- Info: blue
- Destructive: red

Dark mode:

- Background: deep blue / night castle tone
- Foreground: bright off-white
- Primary: brighter gold
- Accent: brighter purple
- Muted and borders should remain subtle and readable

## Typography

- Headings: serif, royal, elegant, similar to the current landing page
- Body: clean sans-serif, readable, compact but not dense
- Thread titles should stand out clearly
- Metadata should be smaller, muted, and secondary
- Markdown content should be easy to scan

## Forum Screens to Design

### 1. Forum Home

A landing page for the forum section.

- Category cards for Announcements, Discussions, Help and Questions, Art and Showcase, and Events
- Each category card should show icon, title, short description, thread count, and latest activity
- Top area should include search, filter, and sort controls
- Layout should be responsive and airy, not crowded

### 2. Category Thread List

A page that shows all threads inside a category.

- Breadcrumb at the top
- Category header with icon, title, and short description
- Search bar and sort controls
- Thread list items with avatar, username, title, preview, tags, reply count, view count, and timestamp
- Status badges such as Pinned, Solved, Hot, and Locked
- Hover state should feel like the existing card hover behavior in KGCentral

### 3. Thread Detail

A single thread page with comments.

- Thread title and breadcrumb at the top
- Main post card with author avatar, username, role badge, timestamp, edit state, and markdown content
- Action row with upvote, reply, bookmark, report, and more actions
- Comment thread below with nested replies and indentation
- Reply form at the bottom
- Content must be very readable and not overly dense

### 4. Create Post Modal or Page

A form to create a new thread.

- Category selector
- Title input
- Content editor with markdown support
- Tags input
- Preview state
- Cancel and Post buttons
- Buttons should use the same gold primary and accent outline styling used in KGCentral

### 5. Search Results

A forum search page.

- Search bar at the top
- Result count
- Sort and filter controls
- Result cards should look like thread cards from the main list

### 6. Empty, Loading, and Error States

- Empty states should use crown, castle, or sparkle icons
- Loading should use simple skeletons, not heavy animations
- Error states should be clear and friendly, but still fit the brand

## Component List

Please design these components so they can be reused in React:

- Forum page shell
- Category card
- Thread card
- Thread list item
- Thread detail container
- Comment card
- Reply card
- Author profile mini card
- Vote controls
- Status badge
- Search and filter bar
- Create post form
- Empty state
- Loading skeleton
- Report and moderation menu

## Layout Rules

- Mobile first
- Full-width on small screens
- Comfortable spacing
- Use grid and flex layouts that match the current app style
- Do not create a heavy left sidebar unless absolutely necessary
- The forum should remain content-first and easy to scan

## Interaction Rules

- Hover should feel soft and premium
- Active states should use gold or purple highlights
- Buttons should follow the existing KGCentral button style
- Dropdowns and menus should feel consistent with the current navigation menu
- Modal open and close should be smooth and subtle

## Responsive Behavior

Mobile:

- One column layout
- Large touch targets
- Search and filters stacked vertically

Tablet:

- One or two columns depending on content
- Compact controls but still spacious

Desktop:

- Two or three columns where useful
- More information visible at once, but not cluttered

## Accessibility

- Semantic HTML structure
- Clear focus states
- Good contrast in both light and dark mode
- Touch targets at least 44px
- Text must remain readable on small screens

## Must Match Existing UI

The new forum UI must look like it was designed together with the current KGCentral frontend.

Use the same visual tone, spacing, border radius, button style, icon style, and card style as the landing page, header, navigation, and chat page.

## Output Expected From Stitch

Please generate a polished forum UI kit or screen set that includes:

- Forum home
- Category thread list
- Thread detail page
- Create post modal or page
- Search results
- Empty, loading, and error states

The final result should feel native to KGCentral, not like a separate product.
