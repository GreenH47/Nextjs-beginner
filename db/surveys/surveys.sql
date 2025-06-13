

create table public.survey_responses
(
    id           uuid primary key     default gen_random_uuid(),
    user_id      text        not null references public.users (id) on delete cascade,
    execution_id uuid        not null unique,
    page1_data   jsonb       not null,
    page2_data   jsonb,
    completed    boolean     not null default false,
    created_at   timestamptz not null default now(),
    completed_at timestamptz
);

-- Enable RLS

