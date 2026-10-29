// v1.10.83 - "Is this open-source app safe?" answered where people first ask
// it: the welcome screen and Support & About. Every line here must stay true;
// the full, checked answer is the docs page docs-site/pages/security.mjs.
import { ShieldCheck } from 'lucide-react';
import { docsLink } from '../utils';

const POINTS = [
  'Your business data stays on this computer',
  'No account, no login, no ads',
  'Works without internet',
  'Free and open source: anyone can check the code',
];

export default function SafePrivateNote({ style }) {
  return (
    <div role="note" aria-label="Safe and private"
      style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', padding: '0.75rem 0.9rem', borderRadius: 10,
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'left', ...style }}>
      <ShieldCheck size={22} style={{ color: 'var(--success, #16a34a)', flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>Safe and private</div>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {POINTS.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <a href={docsLink('security')} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
          How we keep it safe →
        </a>
      </div>
    </div>
  );
}
