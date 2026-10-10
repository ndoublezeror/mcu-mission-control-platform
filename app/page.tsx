'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Film,
  Flame,
  Gauge,
  LayoutDashboard,
  ListFilter,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  Shield,
  Sparkles,
  Star,
  Target,
  Tv,
  Users,
  WandSparkles,
} from 'lucide-react'

const movies = [
  { title: 'Captain America: Brave New World', year: '2025', phase: 'Phase 5', runtime: '1h 58m', status: 'Up next', color: 'from-red-950 via-red-800 to-amber-900', mark: 'CAPTAIN AMERICA', initials: 'CA' },
  { title: 'The Fantastic Four: First Steps', year: '2025', phase: 'Phase 6', runtime: '2h 10m', status: 'Plan to watch', color: 'from-sky-950 via-cyan-800 to-orange-700', mark: 'FANTASTIC FOUR', initials: '4' },
  { title: 'Avengers: Endgame', year: '2019', phase: 'Phase 3', runtime: '3h 02m', status: 'Watched', color: 'from-indigo-950 via-slate-800 to-red-950', mark: 'AVENGERS', initials: 'A' },
  { title: 'Loki · Season 1', year: '2021', phase: 'Series', runtime: '5h 30m', status: 'Watched', color: 'from-emerald-950 via-teal-800 to-amber-800', mark: 'LOKI', initials: 'L' },
]

const nav = [
  { label: 'Command center', icon: LayoutDashboard },
  { label: 'My library', icon: Film },
  { label: 'Viewing orders', icon: ListFilter },
  { label: 'Road to Doomsday', icon: Target },
  { label: 'Marvel Guide', icon: Sparkles },
]

export default function Page() {
  const [active, setActive] = useState('Command center')
  const [query, setQuery] = useState('')
  const [watched, setWatched] = useState<string[]>(['Avengers: Endgame', 'Loki · Season 1'])
  const [saved, setSaved] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)

  const filteredMovies = useMemo(() => {
    const result = movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    return showAll ? result : result.slice(0, 3)
  }, [query, showAll])

  const toggleWatched = (title: string) => setWatched((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])
  const toggleSaved = (title: string) => setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])

  return (
    <main className="min-h-screen bg-[#0b0d10] text-[#f5f1e9] selection:bg-red-500/30">
      <div className="flex min-h-screen">
        <aside className="hidden w-[245px] shrink-0 flex-col border-r border-white/[0.07] bg-[#101216] px-5 py-6 lg:flex">
          <div className="mb-12 flex items-center gap-3 px-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#b21f27] shadow-[0_0_24px_rgba(178,31,39,.35)]"><Shield className="size-5" /></div>
            <div><p className="font-serif text-lg leading-none tracking-wide">Mission Control</p><p className="mt-1 text-[9px] uppercase tracking-[.25em] text-white/35">MCU archive</p></div>
          </div>
          <div className="space-y-1">
            {nav.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] transition ${active === label ? 'bg-white/[0.09] text-white' : 'text-white/45 hover:bg-white/[0.04] hover:text-white/80'}`}><Icon className={`size-4 ${active === label ? 'text-[#d9a441]' : ''}`} />{label}</button>)}
          </div>
          <div className="mt-auto space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] text-white/45 hover:bg-white/[0.04] hover:text-white/80"><Settings2 className="size-4" />Settings</button>
            <div className="mt-5 flex items-center gap-3 border-t border-white/[0.07] px-2 pt-5"><div className="flex size-8 items-center justify-center rounded-full bg-[#d9a441] text-xs font-bold text-[#211a0e]">JD</div><div className="min-w-0"><p className="truncate text-xs">Jordan Davis</p><p className="text-[10px] text-white/35">Personal archive</p></div><MoreHorizontal className="ml-auto size-4 text-white/35" /></div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-[72px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8">
            <div className="flex items-center gap-2 text-xs text-white/40"><span className="text-white/75">{active}</span><ChevronDown className="size-3" /></div>
            <div className="flex items-center gap-4"><div className="relative hidden sm:block"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/35" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your archive" className="h-9 w-52 rounded-lg border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 text-xs outline-none placeholder:text-white/30 focus:border-[#d9a441]/60" /></div><button aria-label="Notifications" className="text-white/45 hover:text-white"><Bell className="size-4" /></button><div className="size-7 rounded-full border border-[#d9a441]/60 bg-[#d9a441]/15 p-1.5 text-center text-[9px] text-[#e8be68]">JD</div></div>
          </header>

          <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8 lg:px-12">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-[10px] font-medium uppercase tracking-[.28em] text-[#d9a441]">Tuesday · October 10, 2026</p><h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Good evening, Jordan.</h1><p className="mt-2 text-sm text-white/45">Your archive is ready when you are.</p></div><button onClick={() => setActive('Marvel Guide')} className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#b21f27] px-4 py-2.5 text-xs font-semibold shadow-[0_5px_20px_rgba(178,31,39,.2)] transition hover:bg-[#d02a32]"><WandSparkles className="size-3.5" /> Ask Marvel Guide</button></div>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[['Watched', watched.length, 'of 34 titles', 'text-[#d9a441]'], ['Completion', `${Math.round((watched.length / 34) * 100)}%`, 'Infinity Saga', 'text-[#83b7a0]'], ['Runtime logged', '28h 40m', 'this archive', 'text-[#d69272]'], ['In your orbit', saved.length + 3, 'saved titles', 'text-[#9c9bd0]']].map(([label, value, note, color]) => <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.16em] text-white/35">{label}</span><Gauge className={`size-3.5 ${color}`} /></div><p className="font-serif text-2xl">{value}</p><p className="mt-1 text-[10px] text-white/35">{note}</p></div>)}
            </div>

            <div className="mb-8 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
              <div className="relative min-h-[290px] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#2a1317] via-[#171417] to-[#111418] p-6 sm:p-8"><div className="absolute -right-16 -top-24 size-80 rounded-full border-[38px] border-white/[0.025]" /><div className="absolute bottom-0 right-16 h-40 w-24 rotate-12 bg-gradient-to-t from-red-950/80 to-transparent blur-2xl" /><div className="relative max-w-[430px]"><div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-[#d9a441]"><Flame className="size-3.5" /> Your next chapter</div><h2 className="font-serif text-3xl leading-tight sm:text-4xl">The road to <em className="text-[#d9a441]">Doomsday</em><br />starts here.</h2><p className="mt-4 max-w-[340px] text-sm leading-relaxed text-white/50">34 essential titles stand between your archive and the next great crossover.</p><div className="mt-6 flex items-center gap-4"><div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[8%] rounded-full bg-[#d9a441]" /></div><span className="text-[11px] text-white/45">8% prepared</span></div><button onClick={() => setActive('Road to Doomsday')} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#e8be68] hover:text-white">View preparation plan <ArrowRight className="size-3.5" /></button></div></div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#111418] p-6"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-white/40"><CalendarDays className="size-3.5 text-[#d9a441]" /> Countdown</div><span className="rounded-full bg-[#83b7a0]/10 px-2 py-1 text-[9px] text-[#83b7a0]">On schedule</span></div><p className="font-serif text-3xl">69 <span className="text-lg text-white/35">days</span></p><p className="mt-1 text-xs text-white/35">until December 18, 2026</p><div className="my-6 grid grid-cols-3 gap-2 border-y border-white/[0.07] py-4 text-center"><div><p className="text-lg">12</p><p className="text-[9px] uppercase tracking-wider text-white/30">essential</p></div><div><p className="text-lg">16</p><p className="text-[9px] uppercase tracking-wider text-white/30">recommended</p></div><div><p className="text-lg">6h</p><p className="text-[9px] uppercase tracking-wider text-white/30">to go</p></div></div><p className="text-xs leading-relaxed text-white/45">At your current pace, you&apos;ll complete the essentials with <span className="text-white/75">4 days to spare.</span></p></div>
            </div>

            <div className="mb-3 flex items-center justify-between"><div><h2 className="font-serif text-2xl">Continue your archive</h2><p className="mt-1 text-xs text-white/35">Picked up from your viewing plan</p></div><button onClick={() => setShowAll(!showAll)} className="text-xs text-[#d9a441] hover:text-white">{showAll ? 'Show less' : 'View all'} <ArrowRight className="ml-1 inline size-3" /></button></div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredMovies.map((movie) => { const isWatched = watched.includes(movie.title); const isSaved = saved.includes(movie.title); return <article key={movie.title} className="group overflow-hidden rounded-xl border border-white/[0.07] bg-[#111418] transition hover:border-white/20"><div className={`relative flex h-36 items-end bg-gradient-to-br ${movie.color} p-4`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,.25),transparent_28%)]" /><div className="relative"><p className="text-[9px] font-bold tracking-[.18em] text-white/70">{movie.mark}</p><p className="mt-1 font-serif text-4xl text-white/80">{movie.initials}</p></div><span className={`absolute right-3 top-3 rounded-full px-2 py-1 text-[9px] ${isWatched ? 'bg-[#83b7a0]/20 text-[#b6e2cc]' : 'bg-black/25 text-white/70'}`}>{isWatched ? 'Watched' : movie.status}</span></div><div className="p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-medium leading-snug">{movie.title}</h3><p className="mt-1 text-[10px] text-white/35">{movie.year} · {movie.phase} · {movie.runtime}</p></div><button aria-label={isSaved ? `Remove ${movie.title} from saved` : `Save ${movie.title}`} onClick={() => toggleSaved(movie.title)} className={isSaved ? 'text-[#d9a441]' : 'text-white/25 hover:text-white'}><Star className="size-4" fill={isSaved ? 'currentColor' : 'none'} /></button></div><div className="mt-4 flex items-center justify-between"><button onClick={() => toggleWatched(movie.title)} className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/60 hover:text-white">{isWatched ? <Check className="size-3 text-[#83b7a0]" /> : <Play className="size-3 text-[#d9a441]" />}{isWatched ? 'Watched' : 'Mark watched'}</button><button onClick={() => toggleSaved(movie.title)} className="text-[10px] text-white/35 hover:text-white">{isSaved ? 'Saved' : 'Add to list'}</button></div></div></article> })}</div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]"><div className="rounded-2xl border border-white/[0.07] bg-[#111418] p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[.2em] text-[#d9a441]">Your momentum</p><h2 className="mt-1 font-serif text-xl">Saga progress</h2></div><BookOpen className="size-5 text-white/25" /></div><div className="space-y-4">{[['Infinity Saga', '22 / 23', 96], ['Multiverse Saga', '2 / 11', 18], ['Legacy essentials', '4 / 12', 33]].map(([name, count, percent]) => <div key={name}><div className="mb-2 flex justify-between text-xs"><span>{name}</span><span className="text-white/35">{count}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-[#d9a441]" style={{ width: `${percent}%` }} /></div></div>)}</div></div><div className="rounded-2xl border border-[#b21f27]/30 bg-gradient-to-br from-[#251214] to-[#111418] p-6"><div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#e8be68]"><Sparkles className="size-3.5" /> Marvel Guide</div><h2 className="max-w-[330px] font-serif text-2xl leading-tight">Need a route through the multiverse?</h2><p className="mt-3 max-w-[340px] text-xs leading-relaxed text-white/45">Ask for a spoiler-free recommendation, a shorter marathon, or the perfect next title for tonight.</p><button onClick={() => setActive('Marvel Guide')} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/75 hover:bg-white/10">Start a conversation <ArrowRight className="size-3.5" /></button></div></div>
          </div>
        </section>
      </div>
    </main>
  )
}
