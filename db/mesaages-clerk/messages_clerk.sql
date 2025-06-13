-- 1 ▸ New table: messages_clerk
create table public.messages_clerk
(
    id            uuid primary key     default gen_random_uuid(),
    clerk_user_id text not null default auth.jwt()->>'sub', -- Clerk userId (e.g. "user_29dkH…")
    name          text        not null check (char_length(name) <= 120),
    body          text        not null check (char_length(body) <= 5000),
    created_at    timestamptz not null default now()
);

-- 2 ▸ Handy composite index for “my newest messages”
create index messages_clerk_user_created_idx
    on public.messages_clerk (clerk_user_id, created_at desc);

-- 3 ▸ Turn on Row-Level Security
alter table public.messages_clerk
    enable row level security;

-- 4 ▸ Policies
--------------------------------------------------------------------------------
-- INSERT: any signed-in Clerk user may insert a row for *themselves*
--------------------------------------------------------------------------------
create policy "Clerk Users can insert their own tasks"
    on "public"."messages_clerk"
    as permissive
    for insert
    to authenticated
    with check (
    ((select auth.jwt()->>'sub') = (clerk_user_id)::text)
    );
--------------------------------------------------------------------------------
-- SELECT: each user sees only their own rows
--------------------------------------------------------------------------------
create policy "Clerk Users can view their own messages"
    on "public"."messages_clerk"
    for select
    to authenticated
    using (
    ((select auth.jwt()->>'sub') = (clerk_user_id)::text)
    );
