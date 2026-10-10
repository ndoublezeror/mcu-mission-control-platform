import { NextResponse } from 'next/server'

const table = 'official_watch_progress'
const headers = () => ({
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? '',
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? ''}`,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates',
})

export async function GET() {
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}?profile_id=eq.demo-profile&select=item_id,watched,saved`, { headers: headers(), cache: 'no-store' })
  if (!response.ok) return NextResponse.json({ items: [] }, { status: 200 })
  return NextResponse.json({ items: await response.json() })
}

export async function POST(request: Request) {
  const body = await request.json() as { itemId?: string; watched?: boolean; saved?: boolean }
  if (!body.itemId) return NextResponse.json({ error: 'itemId is required' }, { status: 400 })
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ profile_id: 'demo-profile', item_id: body.itemId, watched: Boolean(body.watched), saved: Boolean(body.saved), updated_at: new Date().toISOString() }),
  })
  if (!response.ok) return NextResponse.json({ error: 'Persistence unavailable' }, { status: 503 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request) {
  const itemId = new URL(request.url).searchParams.get('itemId')
  if (!itemId) return NextResponse.json({ error: 'itemId is required' }, { status: 400 })
  await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}?profile_id=eq.demo-profile&item_id=eq.${encodeURIComponent(itemId)}`, { method: 'DELETE', headers: headers() })
  return NextResponse.json({ ok: true })
}
