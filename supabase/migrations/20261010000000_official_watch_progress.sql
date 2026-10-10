create table if not exists public.official_watch_progress (
  profile_id text not null,
  item_id text not null,
  watched boolean not null default false,
  saved boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (profile_id, item_id)
);

alter table public.official_watch_progress enable row level security;

revoke all on public.official_watch_progress from anon, authenticated;

create index if not exists official_watch_progress_profile_idx
  on public.official_watch_progress (profile_id, updated_at desc);
