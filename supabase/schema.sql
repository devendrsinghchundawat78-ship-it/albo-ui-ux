-- Optional hosted sync schema. Apply only in your own Supabase project after configuring Auth.
-- The Expo prototype uses local storage by default and never connects without explicit environment setup.
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  handle text not null default '',
  bio text not null default '',
  preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  cover_url text,
  created_at timestamptz not null default now()
);
create table if not exists public.saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  collection_id uuid references public.collections(id) on delete set null,
  title text not null,
  source_url text,
  source_type text not null default 'link',
  category text not null default 'Inspiration',
  note text not null default '',
  image_url text,
  tags text[] not null default '{}',
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists saves_owner_created_idx on public.saves(user_id, created_at desc);
create index if not exists collections_owner_idx on public.collections(user_id);
alter table public.profiles enable row level security;
alter table public.collections enable row level security;
alter table public.saves enable row level security;
create policy "profiles_owner" on public.profiles for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "collections_owner" on public.collections for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "saves_owner" on public.saves for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
