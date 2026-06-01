# Pekka - Development Instructions

Complete guide for setting up, developing, and maintaining the Pekka project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Workflow](#development-workflow)
4. [Adding New Blocks](#adding-new-blocks)
5. [Working with Queries](#working-with-queries)
6. [Type Generation](#type-generation)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js** - v18.17 or higher
- **pnpm** - Package manager (install globally: `npm install -g pnpm`)
- **Sanity CLI** - `pnpm install -g sanity@latest`

### Accounts Required

- [Sanity.io](https://www.sanity.io/) account
- [Resend](https://resend.com/) account (for contact forms)
- [Vercel](https://vercel.com/) account (for deployment)

---

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url> pekka
cd pekka

# Install all dependencies (frontend + studio)
pnpm install
```

### 2. Sanity Project Setup

1. Log in to Sanity CLI:
   ```bash
   sanity login
   ```

2. Create a new project at [sanity.io/manage](https://www.sanity.io/manage)

3. In your Sanity project settings:
   - Go to **API** > **CORS Origins**
   - Add `http://localhost:3000` (for development)
   - Add `http://localhost:3333` (for studio)

4. Create an API token:
   - Go to **API** > **Tokens**
   - Create a new token with **Viewer** permissions
   - Save the token securely

### 3. Environment Configuration

#### Frontend (`/frontend/.env.local`)

```bash
cp frontend/.env.local.example frontend/.env.local
```

Edit the file with your values:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_ENV=development
NEXT_PUBLIC_STUDIO_URL=http://localhost:3333

# Sanity Configuration
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<your-viewer-token>

# Resend (Contact Forms)
RESEND_API_KEY=<your-resend-api-key>
RESEND_TO_EMAIL=<email-to-receive-submissions>
RESEND_FROM_EMAIL=<email-to-send-from>
```

#### Studio (`/studio/.env.local`)

```bash
cp studio/.env.local.example studio/.env.local
```

Edit the file:

```env
SANITY_STUDIO_PROJECT_ID=<your-project-id>
SANITY_STUDIO_DATASET=production
```

### 4. Import Sample Data (Optional)

```bash
cd studio
sanity dataset import sample-data.tar.gz production --replace
```

> **Warning:** The `--replace` flag will overwrite existing data.

### 5. Start Development Servers

```bash
# From root directory - starts both frontend and studio
pnpm dev

# Or run individually
pnpm dev:next    # Frontend at http://localhost:3000
pnpm dev:studio  # Studio at http://localhost:3333
```

---

## Development Workflow

### Project Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both frontend and studio |
| `pnpm dev:next` | Start frontend only |
| `pnpm dev:studio` | Start studio only |
| `pnpm build` | Build both projects |
| `pnpm typegen` | Generate TypeScript types |
| `pnpm typecheck` | Run TypeScript type checking |

### File Structure Conventions

```
frontend/
├── components/
│   └── blocks/
│       └── <category>/
│           └── <block-name>.tsx    # e.g., card-option-1.tsx
│
├── sanity/
│   └── queries/
│       └── <category>/
│           └── <block-name>.ts     # e.g., card1.ts
│
studio/
└── schemas/
    └── blocks/
        └── <category>/
            └── <block-name>.ts     # e.g., card1.ts
```

---

## Adding New Blocks

### Step 1: Create Schema (Studio)

Create a new file in `studio/schemas/blocks/<category>/<blockname>.ts`:

```typescript
import { defineType, defineField } from "sanity";
import { IconName } from "lucide-react";

export default defineType({
  name: "block-name",
  type: "object",
  title: "Block Name",
  icon: IconName,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    // Add your fields here
  ],
  preview: {
    prepare() {
      return { title: "Block Name" };
    },
  },
});
```

### Step 2: Register Schema

Add to `studio/schemas/index.ts`:

```typescript
import blockName from "./blocks/<category>/<blockname>";

export const schemaTypes = [
  // ... existing schemas
  blockName,
];
```

Add to page schema blocks array in `studio/schemas/documents/page.ts`:

```typescript
defineField({
  name: "blocks",
  type: "array",
  of: [
    // ... existing blocks
    { type: "block-name" },
  ],
});
```

### Step 3: Create Query (Frontend)

Create `frontend/sanity/queries/<category>/<blockname>.ts`:

```typescript
import { imageQuery } from "../shared/image";

export const blockNameQuery = `
  _type == "block-name" => {
    _type,
    _key,
    padding,
    // Add your fields here
  }
`;
```

Add to page query in `frontend/sanity/queries/page.ts`:

```typescript
import { blockNameQuery } from "./<category>/<blockname>";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    // ...
    blocks[]{
      // ... existing queries
      ${blockNameQuery},
    },
    // ...
  }
`;
```

### Step 4: Create Component (Frontend)

Create `frontend/components/blocks/<category>/<block-name>.tsx`:

```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

type BlockNameProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "block-name" }
>;

const BlockName = ({ /* props */ }: BlockNameProps) => {
  return (
    <section className="block-name">
      {/* Your component */}
    </section>
  );
};

export default BlockName;
```

### Step 5: Register Component

Add to `frontend/components/blocks/index.tsx`:

```typescript
import BlockName from "@/components/blocks/<category>/<block-name>";

const componentMap: Record<string, React.ComponentType<any>> = {
  // ... existing components
  "block-name": BlockName,
};
```

### Step 6: Generate Types

```bash
pnpm typegen
```

---

## Working with Queries

### Shared Query Fragments

Located in `frontend/sanity/queries/shared/`:

| File | Usage |
|------|-------|
| `image.ts` | Image with asset metadata |
| `link.ts` | Internal/external links |
| `button.ts` | Button with variants |
| `intro-content.ts` | Eyebrow, heading, description |
| `column-builder.ts` | Dynamic content blocks |
| `meta.ts` | SEO metadata |

### Example: Using Shared Queries

```typescript
import { imageQuery } from "../shared/image";
import { introContentQuery } from "../shared/intro-content";

export const myBlockQuery = `
  _type == "my-block" => {
    _type,
    _key,
    image {
      ${imageQuery}
    },
    ${introContentQuery}
  }
`;
```

### Field Aliasing

When schema field names differ from component expectations:

```typescript
collections[]->{
  _id,
  "title": name,        // Alias 'name' as 'title'
  "description": location,  // Alias 'location' as 'description'
}
```

---

## Type Generation

### When to Run

Run `pnpm typegen` after:

- Adding/modifying schemas
- Adding/modifying GROQ queries
- Changing field names or types

### What It Generates

- `studio/schema.json` - Extracted schema
- `frontend/sanity.types.ts` - TypeScript types for all queries

### Type Usage in Components

```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

// Extract specific block type
type MyBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "my-block" }
>;

// Use NonNullable for required nested types
type ImageType = NonNullable<NonNullable<PAGE_QUERYResult>["bannerImage"]>;
```

---

## Deployment

### Vercel Deployment

#### Frontend

1. Create new Vercel project
2. Connect GitHub repository
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
4. Add environment variables from `.env.local`
5. Deploy

#### Studio

1. Create new Vercel project
2. Connect same GitHub repository
3. Settings:
   - **Root Directory:** `studio`
   - **Framework Preset:** Other
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`
4. Add environment variables from `.env.local`
5. Deploy

### Post-Deployment

1. Update CORS origins in Sanity:
   - Add production frontend URL
   - Add production studio URL

2. Update environment variables:
   - `NEXT_PUBLIC_SITE_URL` → production URL
   - `NEXT_PUBLIC_STUDIO_URL` → production studio URL
   - `NEXT_PUBLIC_SITE_ENV` → `production`

---

## Troubleshooting

### Common Issues

#### Types Not Updating

```bash
# Regenerate types
pnpm typegen

# Clear Next.js cache
rm -rf frontend/.next
pnpm dev:next
```

#### Sanity Connection Errors

1. Check CORS origins in Sanity dashboard
2. Verify API token has correct permissions
3. Confirm project ID matches

#### Build Errors

```bash
# Type check for errors
pnpm typecheck

# Check for missing dependencies
pnpm install
```

#### Images Not Loading

1. Verify image has `asset` reference in query
2. Check `urlFor` function is imported correctly
3. Ensure image field includes `${imageQuery}`

### Getting Help

- Check Sanity documentation: [sanity.io/docs](https://www.sanity.io/docs)
- Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Review existing blocks for patterns

---

## Best Practices

1. **Always run typegen** after schema/query changes
2. **Use shared queries** for consistent data fetching
3. **Follow naming conventions** for files and components
4. **Test locally** before deploying
5. **Keep schemas simple** - use references for complex data
6. **Document custom fields** with descriptions in schemas
