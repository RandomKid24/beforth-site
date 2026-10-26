import { useState } from 'react';
import { Check } from 'lucide-react';
import { Tile } from './chrome';
import { rupees } from '../demo/format';

interface Order { id: string; customer: string; item: string; qty: number; value: number; approved: boolean }
interface Sku { item: string; qty: number; reorder: number }

const ORDERS: Order[] = [
  { id: 'SO-2041', customer: 'Kothari Distributors', item: 'Valve set A', qty: 40, value: 184000, approved: false },
  { id: 'SO-2042', customer: 'Godavari Engineering', item: 'Bearing 6204', qty: 120, value: 96000, approved: false },
  { id: 'SO-2043', customer: 'Deccan Packaging', item: 'Pump head P2', qty: 12, value: 148000, approved: true },
  { id: 'SO-2044', customer: 'Nimgaon Foods', item: 'Valve set A', qty: 25, value: 115000, approved: false },
];
const STOCK: Sku[] = [
  { item: 'Valve set A', qty: 82, reorder: 40 },
  { item: 'Bearing 6204', qty: 190, reorder: 100 },
  { item: 'Pump head P2', qty: 31, reorder: 20 },
];
const TABS = ['Sales', 'Inventory'] as const;

export default function ErpPreview() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Sales');
  const [orders, setOrders] = useState(ORDERS);
  const [stock, setStock] = useState(STOCK);

  const pending = orders.filter((o) => !o.approved);
  const approve = (o: Order) => {
    setOrders((l) => l.map((x) => (x.id === o.id ? { ...x, approved: true } : x)));
    setStock((s) => s.map((k) => (k.item === o.item ? { ...k, qty: Math.max(0, k.qty - o.qty) } : k)));
  };
  const low = stock.filter((k) => k.qty <= k.reorder);

  return (
    <div className="flex flex-col gap-3 max-w-[780px] mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <Tile label="Awaiting approval" value={pending.length} sub={rupees(pending.reduce((a, o) => a + o.value, 0))} tone={pending.length ? 'warn' : 'good'} />
        <Tile label="Approved today" value={orders.length - pending.length} sub="Stock deducted" tone="good" />
        <Tile label="Below reorder level" value={low.length} sub={low.length ? low.map((k) => k.item).join(', ') : 'All items healthy'} tone={low.length ? 'bad' : 'good'} />
      </div>

      <div className="bg-white border border-ink/10">
        <div className="flex border-b border-ink/10" role="tablist" aria-label="ERP module">
          {TABS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`px-4 min-h-[38px] text-[12px] font-semibold border-r border-ink/10 transition-colors ${tab === t ? 'bg-ink text-paper' : 'text-ash hover:text-ink'}`}>{t}</button>
          ))}
          <span className="ml-auto px-4 flex items-center text-[10.5px] text-ash">Sales approvals update stock</span>
        </div>
        {tab === 'Sales' ? (
          <ul>
            {orders.map((o) => (
              <li key={o.id} className="flex items-center gap-3 px-3.5 py-2.5 border-b border-ink/10 last:border-0 text-[12px]">
                <span className="w-16 text-ash tabular-nums">{o.id}</span>
                <span className="flex-1 min-w-0"><span className="block truncate font-medium">{o.customer}</span><span className="block text-[10.5px] text-ash">{o.qty} × {o.item}</span></span>
                <span className="tabular-nums w-20 text-right">{rupees(o.value)}</span>
                {o.approved ? (
                  <span className="w-20 flex items-center justify-end gap-1 text-emerald-700 font-semibold"><Check className="w-3.5 h-3.5" strokeWidth={3} /> Approved</span>
                ) : (
                  <button type="button" onClick={() => approve(o)} className="w-20 min-h-[28px] bg-signal text-white text-[11.5px] font-medium hover:bg-signal-deep transition-colors">Approve</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {stock.map((k) => (
              <li key={k.item} className="flex items-center gap-3 px-3.5 py-2.5 border-b border-ink/10 last:border-0 text-[12px]">
                <span className="flex-1 font-medium">{k.item}</span>
                <span className="tabular-nums">{k.qty} in stock</span>
                <span className={`w-24 text-right text-[11px] ${k.qty <= k.reorder ? 'text-red-600 font-semibold' : 'text-ash'}`}>{k.qty <= k.reorder ? 'Reorder now' : `Reorder at ${k.reorder}`}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
