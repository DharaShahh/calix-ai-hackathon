# Supabase Setup

## Current State

The project now includes:

- `supabase/schema.sql`
- `supabase/migrations/20260314161000_initial_schema.sql`
- `supabase/seed.sql`
- `supabase/config.toml`

## Recommended Flow

1. Install Supabase CLI locally.
2. Link the workspace to the target Supabase project.
3. Apply the migration to the remote database.
4. Add initial seed data for tenant, roles, permissions, and test users.

Current project ref:

- `mfrmaxsvrvjizqbmpwxh`

## Current Limitation

The local environment currently has the public Supabase project URL configured, but does not include either:

- `SUPABASE_ACCESS_TOKEN`, or
- a direct database connection / database password

Because of that, the workspace is ready for migrations, but cannot safely link and push to the remote project yet.

## Ready Commands

Once credentials are added, use:

1. `npx supabase link --project-ref mfrmaxsvrvjizqbmpwxh`
2. `npm run supabase:db:push`

If local Docker-based Supabase is preferred first:

1. `npm run supabase:start`
2. `npm run supabase:db:reset`

## Notes

- The schema is versioned through the migration file.
- `seed.sql` is intentionally empty for now because initial role and tenant seed decisions should remain explicit.
- Auth is configured for invite-driven access, so public signup should remain disabled.
