# v1.2 Navigation to Header/Footer Migration

This migration package moves data from the old navigation documents to the new header and footer singleton documents using Sanity's `sanity migration` command and built-in migration API.

## Overview

This migration consists of two parts:

1. **Create header/footer documents** - `v-1-2-navigation-to-header-footer.ts`
2. **Clean up old navigation documents** - Manual CLI commands

## What These Migrations Do

### Migration 1: v-1-2-navigation-to-header-footer

1. **Move navigation with title 'header'** → Create a `header` document with the links in the `links` array
2. **Move navigation with title 'header action'** → Add the links to the `header` document's `ctaLinks` array
3. **Move navigation with title 'footer'** → Create a `footer` document with the links in the `links` array
4. **Move navigation with title 'footer bottom'** → Add the links to the `footer` document's `bottomLinks` array

### Step 2: Manual Cleanup with CLI Commands

**DELETE ALL navigation documents** using Sanity CLI since you're removing the navigation document type entirely.

## Important Notes

- Header and Footer are singleton documents (only one of each will be created)
- The migration preserves the exact same structure for the links arrays
- ALL navigation documents will be deleted in step 2 (removing the document type entirely)
- Run migration first, then clean up manually with CLI commands

## Prerequisites

1. **Backup your data** before running any migration:

   ```bash
   cd studio
   npx sanity dataset export production backup-$(date +%Y%m%d-%H%M%S).tar.gz
   ```

## Running the Migrations

### Step 1: Create Header/Footer Documents

```bash
cd studio

# List available migrations to get the migration ID
npx sanity migration list

# Dry run first to preview changes (recommended)
npx sanity migration run <v-1-2-navigation-to-header-footer-ID>

# When ready to apply changes
npx sanity migration run <v-1-2-navigation-to-header-footer-ID> --no-dry-run
```

### Step 2: Clean Up Old Navigation Documents

⚠️ **Run this ONLY after successfully completing Step 1!**

```bash
cd studio

# Delete ALL navigation documents (since you're removing this document type)
# Requires jq to be installed: brew install jq (macOS) or apt-get install jq (Linux)

# First, preview what will be deleted:
npx sanity documents query '*[_type == "navigation"]._id'

# Then delete all navigation documents:
npx sanity documents query '*[_type == "navigation"]._id' | \
jq -r '.[]' | \
xargs -I {} npx sanity documents delete {}
```

## What to Expect

### Migration 1 Output:

```
📎 Collected header navigation data (6 links)
🔗 Collected header action data (2 CTA links)
🦶 Collected footer navigation data (5 links)
📍 Collected footer bottom data (2 bottom links)
✅ Created header document
✅ Created footer document
Migration completed successfully
```

### CLI Cleanup Output:

```bash
# Preview of ALL navigation documents to be deleted:
[
  "abc123-header-nav",
  "def456-header-action",
  "ghi789-footer-nav",
  "jkl012-footer-bottom",
  "mno345-some-other-nav",
  "pqr678-another-nav"
]

# Deletion output for ALL navigation documents:
Deleted 1 document
Deleted 1 document
Deleted 1 document
Deleted 1 document
```

## Verification

### After Migration 1:

1. **Check the new documents exist:**
   - Go to Sanity Studio → Vison
   - Use query: \*[_type == "navigation"]
   - Should show [] 0 items

2. **Check the old navigation documents still exist:**
   - Go to Sanity Studio → Content → Navigation
   - You should still see all the navigation documents (these will all be deleted in step 2)

3. **Test your frontend:**
   - Ensure header navigation works correctly
   - Ensure footer navigation works correctly

### After CLI Cleanup:

1. **Check ALL navigation documents are gone:**
   - Go to Sanity Studio → Content → Navigation
   - Should show "No documents" or the Navigation menu item should be removed entirely

2. **Verify header/footer still work:**
   - Check that header and footer documents still exist
   - Test your frontend navigation

## Rollback (if needed)

If you need to rollback:

1. **Restore from backup:**

   ```bash
   cd studio
   npx sanity dataset import backup-YYYYMMDD-HHMMSS.tar.gz --replace
   ```

2. **Or manually recreate navigation documents** from the header/footer data if needed.

## Files in this Migration Package

- `v-1-2-navigation-to-header-footer.ts` - Creates header and footer documents from navigation data
- `v-1-2-README.md` - This comprehensive documentation

The cleanup is done manually using Sanity CLI commands instead of a migration.

## Troubleshooting

**Error: "No navigation documents found"**

- This is normal if you've already run the migration or don't have the expected navigation documents

**Error: Migration fails partway through**

- Check your Sanity credentials and connection
- Ensure you have write permissions to the dataset
- Review any error messages in the console

**Frontend navigation broken after Migration 1**

- Check that header and footer documents exist and contain the correct data
- Verify your frontend queries are using the new document structure
- Make sure you haven't run the cleanup commands yet (old navigation docs should still exist)

**Documents not found during CLI cleanup**

- This is normal if you've already run the cleanup commands or the documents were deleted manually
- Verify Migration 1 completed successfully first

**Links not appearing correctly**

- Verify the link structure matches between your navigation and header/footer schemas
- Check that the link and link-group types are properly defined

## Need Help?

If you encounter any issues:

1. Check the console output for detailed error messages
2. Verify your navigation documents have the expected titles
3. Ensure your header and footer schemas match the expected structure
4. Run the migration first, then do the CLI cleanup
5. Contact your development team for assistance
