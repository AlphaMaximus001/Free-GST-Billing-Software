import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { FEATURE_GROUPS, isModuleEnabled } from '../utils';
import { BUSINESS_TYPES, businessTypeById, businessTypeChanges, applyBusinessType, moduleLabel, orderedMenu, moveMenuItem } from '../utils/businessTypes';
import { getBusinessType, setBusinessType, getMenuOrder, setMenuOrder, getAllRecurring } from '../store';
import { confirmAction } from './ConfirmModal';
import { toast } from './Toast';

// v1.10.83 - Settings → Business type and Settings → Features.
// Both only change what is shown; nothing is ever deleted.

const muted = { fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 };

// Recurring invoices are made by the server (server.js processDueRecurring)
// whether or not the Recurring screen is shown, so say so where it is hidden.
function useActiveRecurringCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    getAllRecurring().then(list => setCount((list || []).filter(t => t && t.active !== false).length)).catch(() => {});
  }, []);
  return count;
}
const recurringNote = (n) => `You have ${n} recurring invoice${n === 1 ? '' : 's'}; ${n === 1 ? 'it keeps' : 'they keep'} being made while Recurring is hidden. Pause ${n === 1 ? 'it' : 'them'} on the Recurring screen to stop.`;

export function BusinessTypePanel({ modules, onModulesChange }) {
  const [current, setCurrent] = useState(getBusinessType);
  const recurring = useActiveRecurringCount();

  const choose = async (type) => {
    const { turnOn, turnOff } = businessTypeChanges(type.id, modules);
    if (turnOn.length || turnOff.length) {
      const lines = [];
      if (turnOn.length) lines.push(`Turn on: ${turnOn.map(moduleLabel).join(', ')}`);
      if (turnOff.length) lines.push(`Turn off: ${turnOff.map(moduleLabel).join(', ')}`);
      lines.push('', 'Nothing is deleted. This only changes what you see, and you can switch anything back in Features.');
      if (turnOff.includes('recurring') && recurring > 0) lines.push('', recurringNote(recurring));
      const ok = await confirmAction({ title: `Set up the app for "${type.label}"?`, message: lines.join('\n'), confirmLabel: 'Apply' });
      if (!ok) return;
      onModulesChange(applyBusinessType(type.id, modules));
    }
    setBusinessType(type.id);
    setCurrent(type.id);
    toast(`Business type: ${type.label}`, 'success');
  };

  const chosen = businessTypeById(current);
  return (
    <div id="section-biztype" className="glass-panel p-6 mb-6" style={{ order: 0 }}>
      <h3 className="section-title" style={{ marginTop: 0, marginBottom: '0.25rem' }}>Business type</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
        Pick what kind of business you run. The app then shows the features that business needs and hides the rest.
        You will see what changes before anything happens.
      </p>
      <p style={{ fontSize: '0.85rem', margin: '0.85rem 0' }}>
        Your business type: <strong>{chosen ? chosen.label : 'Not chosen yet'}</strong>
      </p>
      {!chosen && (
        <div className="notice notice-info" style={{ fontSize: '0.8rem', marginBottom: '0.85rem' }}>
          Pick one below so the menu shows only what you use. Your current switches stay exactly as they are until you pick.
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.6rem' }}>
        {BUSINESS_TYPES.map(type => (
          <button key={type.id} type="button" onClick={() => choose(type)}
            className={`type-chip ${current === type.id ? 'type-chip-active' : ''}`}
            aria-pressed={current === type.id}
            style={{ textAlign: 'left', padding: '0.7rem 0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
            <span style={{ fontWeight: 600 }}>{type.label}</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 400, opacity: 0.85 }}>{type.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Switch({ mod, modules, onToggle, note }) {
  const on = isModuleEnabled(mod.id, modules);
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', flex: 1, minWidth: 0 }}>
      <input type="checkbox" checked={on} onChange={() => onToggle(mod.id)}
        style={{ width: 15, height: 15, accentColor: 'var(--primary)', marginTop: '2px', flexShrink: 0 }} />
      <span>
        <span style={{ fontWeight: 600 }}>{mod.label}</span>
        <span style={{ ...muted, display: 'block' }}>{mod.help}</span>
        {!on && note && <span style={{ ...muted, display: 'block', color: 'var(--warn-text)' }}>{note}</span>}
      </span>
    </label>
  );
}

export function FeaturesPanel({ modules, onModulesChange, regionMode }) {
  const [order, setOrder] = useState(getMenuOrder);
  const recurring = useActiveRecurringCount();
  const type = businessTypeById(getBusinessType());
  const notes = { recurring: recurring > 0 ? recurringNote(recurring) : '' };

  const toggle = (id) => onModulesChange({ ...modules, [id]: !isModuleEnabled(id, modules) });
  const move = (id, dir) => { const next = moveMenuItem(order, id, dir); setOrder(next); setMenuOrder(next); };
  const resetOrder = () => { setOrder([]); setMenuOrder([]); };
  const reset = async () => {
    if (!type) {
      onModulesChange({});
      toast('Features reset to default', 'success');
      return;
    }
    const { turnOn, turnOff } = businessTypeChanges(type.id, modules);
    if (!turnOn.length && !turnOff.length) { toast(`Already set up for "${type.label}"`, 'info'); return; }
    const msg = [turnOn.length && `Turn on: ${turnOn.map(moduleLabel).join(', ')}`, turnOff.length && `Turn off: ${turnOff.map(moduleLabel).join(', ')}`].filter(Boolean).join('\n');
    if (!await confirmAction({ title: `Reset to "${type.label}"?`, message: `${msg}\n\nNothing is deleted.`, confirmLabel: 'Reset' })) return;
    onModulesChange(applyBusinessType(type.id, modules));
    toast(`Features reset to "${type.label}"`, 'success');
  };

  const menu = orderedMenu(order);
  const menuGroup = FEATURE_GROUPS.find(g => g.id === 'menu');
  const modFor = (item) => menuGroup.modules.find(m => m.id === item.module);
  const renderSection = (section, title) => {
    const items = menu.filter(m => m.section === section);
    return (
      <div className="surface-card">
        <div style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.5rem' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {items.map((item, i) => {
            const mod = modFor(item);
            return (
              <div key={item.id} data-menu-item={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <span style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                  <button type="button" className="icon-btn" disabled={i === 0} onClick={() => move(item.id, -1)}
                    aria-label={`Move ${item.label} up`} title="Move up" style={{ padding: 2 }}><ChevronUp size={16} /></button>
                  <button type="button" className="icon-btn" disabled={i === items.length - 1} onClick={() => move(item.id, 1)}
                    aria-label={`Move ${item.label} down`} title="Move down" style={{ padding: 2 }}><ChevronDown size={16} /></button>
                </span>
                {mod && !mod.core ? (
                  <Switch mod={mod} modules={modules} onToggle={toggle} note={notes[mod.id]} />
                ) : (
                  <span style={{ fontSize: '0.8rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                    <span style={{ ...muted, marginLeft: '0.4rem' }}>(always shown)</span>
                    <span style={{ ...muted, display: 'block' }}>{item.help}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id="section-modules" className="glass-panel p-6 mb-6" style={{ order: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 className="section-title" style={{ marginTop: 0, marginBottom: '0.25rem' }}>Features</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Turn off what you don't need. It disappears from the menu and screens; your data stays untouched.
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={reset} style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}>
          {type ? 'Reset to my business type' : 'Reset to default'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', margin: '1.1rem 0 0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.92rem' }}>Menu</h4>
        <span style={muted}>
          Use the arrows to change the order of the menu.{' '}
          {order.length > 0 && <button type="button" className="btn-link" onClick={resetOrder} style={{ fontSize: '0.72rem', background: 'none', border: 0, color: 'var(--primary)', cursor: 'pointer', padding: 0 }}>Default order</button>}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        {renderSection('main', 'Top of the menu')}
        {renderSection('bottom', 'Bottom of the menu')}
      </div>

      <h4 style={{ margin: '1.25rem 0 0.5rem', fontSize: '0.92rem' }}>Features inside screens</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        {FEATURE_GROUPS.filter(g => g.id !== 'menu').map(group => {
          // India-only switches do nothing outside India, so they are not listed.
          const mods = group.modules.filter(m => !(m.indiaOnly && regionMode === 'international'));
          if (!mods.length) return null;
          return (
            <div key={group.id} className="surface-card">
              <div style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.5rem' }}>{group.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {mods.map(mod => <Switch key={mod.id} mod={mod} modules={modules} onToggle={toggle} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
