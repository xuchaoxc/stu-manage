create table public.score (
    id uuid default uuid_generate_v4(),
    score decimal(3,2),
    s_id uuid references public.student,
    c_id uuid references  public.course
);
comment on table public.score is 'xxx';
comment on column public.score.id is 'xxx';