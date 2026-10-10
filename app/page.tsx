'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink, Menu, Play, Plus, Search, Sparkles, X } from 'lucide-react'

type Movie = { id: string; title: string; year: string; phase: string; poster: string; backdrop?: string; description: string }

const poster = (path: string) => `https://image.tmdb.org/t/p/w500${path}`
const backdrop = (path: string) => `https://image.tmdb.org/t/p/w1280${path}`

const movies: Movie[] = [
  { id: 'iron-man', title: 'Iron Man', year: '2008', phase: 'Phase One', poster: poster('/78lPtwv72eTNqFW9COBYI0dWDJa.jpg'), backdrop: backdrop('/cyecB7godNrp1DvrL1xDddW6kP4.jpg'), description: 'The beginning of a legend.' },
  { id: 'captain-america', title: 'Captain America: The First Avenger', year: '2011', phase: 'Phase One', poster: poster('/vSNxAJwAC0kAMgXHjwALZ7p4h0r.jpg'), backdrop: backdrop('/9zq4fL8elvFdY5nG3s8qT7W6mP1.jpg'), description: 'Every legend has a beginning.' },
  { id: 'avengers', title: 'The Avengers', year: '2012', phase: 'Phase One', poster: poster('/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'), backdrop: backdrop('/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg'), description: 'Some assembly required.' },
  { id: 'guardians', title: 'Guardians of the Galaxy', year: '2014', phase: 'Phase Two', poster: poster('/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'), backdrop: backdrop('/u31vM7vG9j9x4cG2W1J2TQhV5cM.jpg'), description: 'All heroes start somewhere.' },
  { id: 'civil-war', title: 'Captain America: Civil War', year: '2016', phase: 'Phase Three', poster: poster('/rAGiXaUfPzY7C5f4pYf8tL1WZ1E.jpg'), backdrop: backdrop('/wdwc8v3z4X6dL7F8mQ1wX2Y3Z4A.jpg'), description: 'Divided we fall.' },
  { id: 'infinity-war', title: 'Avengers: Infinity War', year: '2018', phase: 'Phase Three', poster: poster('/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'), backdrop: backdrop('/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg'), description: 'An entire universe. Once and for all.' },
]

const officialIds = ['iron-man', 'iron-man-2', 'thor', 'captain-america', 'avengers', 'guardians', 'avengers-ultron', 'civil-war', 'doctor-strange', 'ragnarok', 'infinity-war', 'endgame', 'loki-s1', 'loki-s2']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [watched, setWatched] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const featured = movies[activeIndex]

  useEffect(() => {
    fetch('/api/progress').then((response) => response.ok ? response.json() : { items: [] }).then(({ items = [] }) => setWatched(items.filter((item: { watched: boolean }) => item.watched).map((item: { item_id: string }) => item.item_id))).catch(() => {})
  }, [])

  const percent = Math.round((watched.length / officialIds.length) * 100)
  const next = movies.find((movie) => !watched.includes(movie.id)) ?? movies[0]
  const markWatched = (id: string) => {
    const isWatched = watched.includes(id)
    setWatched((current) => isWatched ? current.filter((item) => item !== id) : [...current, id])
    fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ itemId: id, watched: !isWatched, saved: false }) }).catch(() => {})
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-[#f4f0e8]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08090b]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Primary navigation">
          <a href="#top" className="flex items-center gap-3"><span className="flex size-9 items-center justify-center bg-[#cf2635] font-serif text-xl font-bold">M</span><span className="hidden text-sm font-semibold tracking-[.22em] sm:inline">MISSION CONTROL</span></a>
          <div className="hidden items-center gap-7 text-[11px] uppercase tracking-[.16em] text-white/60 lg:flex"><a href="#movies" className="hover:text-white">Explore Movies</a><a href="#timeline" className="hover:text-white">MCU Timeline</a><a href="#doomsday" className="hover:text-white">Road to Doomsday</a><a href="#guide" className="hover:text-white">Marvel Guide</a></div>
          <div className="hidden items-center gap-3 sm:flex"><a href="#guide" className="px-3 py-2 text-xs text-white/60 hover:text-white">Sign In</a><a href="#progress" className="bg-[#cf2635] px-4 py-2.5 text-xs font-semibold hover:bg-[#e13645]">Get Started <ArrowRight className="ml-2 inline size-3.5" /></a></div>
          <button className="sm:hidden" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
        {menuOpen && <div className="flex flex-col gap-5 border-t border-white/10 bg-[#0d0f13] px-5 py-6 text-sm"><a href="#movies" onClick={() => setMenuOpen(false)}>Explore Movies</a><a href="#timeline" onClick={() => setMenuOpen(false)}>MCU Timeline</a><a href="#doomsday" onClick={() => setMenuOpen(false)}>Road to Doomsday</a><a href="#guide" onClick={() => setMenuOpen(false)}>AI Marvel Guide</a></div>}
      </header>

      <section id="top" className="relative flex min-h-[700px] items-end overflow-hidden pt-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${featured.backdrop})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08090b_3%,rgba(8,9,11,.78)_40%,rgba(8,9,11,.18)_75%,#08090b_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(0deg,#08090b_2%,transparent_45%,rgba(8,9,11,.25))]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 lg:px-8"><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.35em] text-[#e0ad55]">The definitive MCU companion</p><h1 className="max-w-3xl font-serif text-6xl leading-[.9] tracking-tight sm:text-8xl">Your Marvel story.<br /><em className="text-[#e0ad55]">Your mission.</em></h1><p className="mt-7 max-w-lg text-base leading-7 text-white/65">Track every movie, master the timeline, and get ready for what comes next in the Marvel Cinematic Universe.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#progress" className="bg-[#cf2635] px-5 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-[#e13645]">Start your journey <ArrowRight className="ml-2 inline size-4" /></a><a href="#movies" className="border border-white/25 bg-white/5 px-5 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-white/10"><Play className="mr-2 inline size-3.5" /> Explore the MCU</a></div><div className="mt-16 flex items-center gap-3 text-[10px] uppercase tracking-[.25em] text-white/35"><ArrowDown className="size-4" /> Scroll to explore</div></div>
      </section>

      <section id="movies" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="mb-10 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.3em] text-[#e0ad55]">The universe</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Choose your next chapter</h2></div><a href="#timeline" className="hidden text-xs uppercase tracking-wider text-white/55 hover:text-white sm:block">View all movies <ArrowRight className="ml-2 inline size-4" /></a></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{movies.map((movie) => <article key={movie.id} className="group"><div className="relative aspect-[2/3] overflow-hidden bg-[#17191e]"><img src={movie.poster} alt={`${movie.title} poster`} className="size-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" /><button aria-label={`Mark ${movie.title} watched`} onClick={() => markWatched(movie.id)} className={`absolute bottom-3 right-3 flex size-9 items-center justify-center border ${watched.includes(movie.id) ? 'border-[#e0ad55] bg-[#e0ad55] text-black' : 'border-white/40 bg-black/40 text-white'} opacity-0 transition group-hover:opacity-100`}><Check className="size-4" /></button></div><p className="mt-3 text-sm font-medium">{movie.title}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">{movie.year} · {movie.phase}</p></article>)}</div></section>

      <section id="progress" className="border-y border-white/10 bg-[#0d0f13] px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="text-[10px] uppercase tracking-[.3em] text-[#e0ad55]">Your mission control</p><h2 className="mt-4 max-w-xl font-serif text-5xl leading-none">Every watch is a step deeper into the story.</h2><p className="mt-6 max-w-lg leading-7 text-white/55">Mark movies as watched, save the titles you want to revisit, and always know where you stand. Your progress is yours alone.</p><a href="#movies" className="mt-8 inline-block border border-white/20 px-5 py-3 text-xs uppercase tracking-wider hover:bg-white/10">Build my watchlist <Plus className="ml-2 inline size-4" /></a></div><div className="border border-white/10 bg-[#08090b] p-6"><div className="flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-widest text-white/35">Official selection progress</p><p className="mt-3 font-serif text-5xl text-[#e0ad55]">{percent}%</p></div><div className="text-right text-xs text-white/45"><p>{watched.length} of {officialIds.length} watched</p><p className="mt-1">Next: {next.title}</p></div></div><div className="mt-7 h-1.5 bg-white/10"><div className="h-full bg-[#cf2635] transition-all" style={{ width: `${percent}%` }} /></div><div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5"><img src={next.poster} alt="" className="size-12 object-cover" /><div><p className="text-[10px] uppercase tracking-wider text-[#e0ad55]">Continue watching</p><p className="mt-1 text-sm">{next.title}</p></div><button aria-label="Play next title" className="ml-auto flex size-9 items-center justify-center border border-white/20"><Play className="size-3" /></button></div></div></div></section>

      <section id="doomsday" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-[10px] uppercase tracking-[.3em] text-[#e0ad55]">Official Disney+ selection</p><h2 className="mt-4 font-serif text-5xl leading-none">Road to<br /><em className="text-[#e0ad55]">Doomsday.</em></h2><p className="mt-6 leading-7 text-white/55">Disney+ curated this 14-title selection, including both seasons of Loki. It is a recommendation for the journey, not a claim that every title is mandatory to understand Avengers: Doomsday.</p><a href="https://www.disneyplus.com/explore/articles/countdown-to-avengers-doomsday" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center border border-[#e0ad55]/40 px-4 py-3 text-xs uppercase tracking-wider text-[#e0ad55]">Read official source <ExternalLink className="ml-2 size-3.5" /></a></div><div className="grid grid-cols-4 gap-3 sm:grid-cols-7">{officialIds.slice(0, 7).map((id, index) => { const movie = movies.find((item) => item.id === id) ?? movies[index % movies.length]; return <img key={id} src={movie.poster} alt={`${movie.title} poster`} className="aspect-[2/3] w-full object-cover opacity-80 transition hover:opacity-100" loading="lazy" /> })}</div></div></section>

      <section id="timeline" className="border-t border-white/10 bg-[#0d0f13] px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.3em] text-[#e0ad55]">Explore the timeline</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">The story, in order.</h2></div><div className="hidden gap-2 sm:flex"><button aria-label="Previous movies" onClick={() => setActiveIndex((activeIndex - 1 + movies.length) % movies.length)} className="border border-white/20 p-3"><ChevronLeft /></button><button aria-label="Next movies" onClick={() => setActiveIndex((activeIndex + 1) % movies.length)} className="border border-white/20 p-3"><ChevronRight /></button></div></div><div className="mt-10 flex gap-5 overflow-hidden">{[...movies, ...movies].slice(activeIndex, activeIndex + 4).map((movie, index) => <div key={`${movie.id}-${index}`} className="min-w-[190px] flex-1"><img src={movie.poster} alt={`${movie.title} timeline poster`} className="aspect-[2/3] w-full object-cover" /><p className="mt-3 text-sm">{movie.title}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">{movie.year} · {movie.phase}</p></div>)}</div></div></section>

      <section id="guide" className="relative overflow-hidden px-5 py-28 lg:px-8"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(207,38,53,.22),transparent_45%)]" /><div className="relative mx-auto max-w-3xl text-center"><Sparkles className="mx-auto size-7 text-[#e0ad55]" /><p className="mt-5 text-[10px] uppercase tracking-[.3em] text-[#e0ad55]">Meet your AI Marvel Guide</p><h2 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">The multiverse is vast.<br /><em className="text-[#e0ad55]">You do not have to navigate it alone.</em></h2><p className="mx-auto mt-6 max-w-xl leading-7 text-white/55">Get real, personalized viewing-order advice based on your progress and preferences. Ask the Guide what to watch next.</p><a href="#progress" className="mt-8 inline-flex bg-[#cf2635] px-5 py-3.5 text-xs font-bold uppercase tracking-wider">Ask the Marvel Guide <ArrowRight className="ml-2 size-4" /></a></div></section>

      <footer className="border-t border-white/10 px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-[10px] uppercase tracking-wider text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>Mission Control · An independent fan project</p><div className="flex gap-5"><a href="#movies" className="hover:text-white">Explore</a><a href="#doomsday" className="hover:text-white">Doomsday</a><a href="#guide" className="hover:text-white">Guide</a></div><p>Not affiliated with Marvel or Disney.</p></div></footer>
    </main>
  )
}
