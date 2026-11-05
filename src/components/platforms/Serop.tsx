import React from 'react';
import { Container, FileText, Terminal } from 'lucide-react';
import { Win } from './chrome';

const SERVERS = [
  { name: 'api-prod', host: 'ssh · key', on: true },
  { name: 'staging', host: 'ssh · key', on: false },
];
const CONTAINERS = [
  { name: 'web', state: 'running' },
  { name: 'worker', state: 'running' },
  { name: 'db', state: 'running' },
];

/** Static sketch of the Server Operator window: servers, containers, a terminal line. */
export default function SeropPreview() {
  return (
    <Win title="Server Operator" className="max-w-[640px] mx-auto">
      <div className="grid sm:grid-cols-[170px_1fr] min-h-[330px]">
        <div className="border-b sm:border-b-0 sm:border-r border-ink/10 bg-paper p-3 flex flex-col gap-2">
          <p className="text-[10.5px] uppercase tracking-[0.14em] text-ash px-1">Servers</p>
          {SERVERS.map((s) => (
            <div key={s.name} className={`border p-2.5 bg-white ${s.on ? 'border-signal' : 'border-ink/10'}`}>
              <p className="text-[12px] font-medium leading-tight">{s.name}</p>
              <p className="text-[10.5px] text-ash mt-0.5">{s.host}</p>
            </div>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <p className="flex items-center gap-1.5 text-[11px] text-ash"><Container className="w-3.5 h-3.5" /> Containers on api-prod</p>
          <ul className="flex flex-col gap-1.5">
            {CONTAINERS.map((c) => (
              <li key={c.name} className="flex items-center justify-between border border-ink/10 px-2.5 py-1.5 text-[12px]">
                <span>{c.name}</span>
                <span className="flex items-center gap-1.5 text-emerald-700"><i className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{c.state}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-1.5 text-[11px] text-ash mt-1"><FileText className="w-3.5 h-3.5" /> Files in /srv/app</p>
          <ul className="flex flex-col gap-1.5">
            {['docker-compose.yml', '.env', 'nginx.conf'].map((f) => (
              <li key={f} className="border border-ink/10 px-2.5 py-1.5 text-[12px] font-mono">{f}</li>
            ))}
          </ul>
          <div className="mt-auto bg-ink text-paper/90 text-[11px] font-mono p-2.5 flex items-center gap-2">
            <Terminal className="w-3 h-3 shrink-0" /> docker compose logs -f web
          </div>
        </div>
      </div>
    </Win>
  );
}
