/* =====================================================
   QuestionPro BD — Office Request Portal
   app.jsx  —  Full React SPA
   Screens: NameEntry → RoleSelect → Requester / Fulfillment
   ===================================================== */
'use strict';

const { Button, Card, Input, Chip, Avatar } =
  (window.QuestionProDesignSystem_8f51d4 || {});
const { categories, genId, timeAgo, getAll, getActive, add, update } = window.AppData;
const { useState, useEffect, useRef, useCallback } = React;

/* ─────────────────── NOTIFICATION HELPERS ─────────────────── */

function askNotifPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function fireNotification(title, body, urgency, reqId) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification(title, {
        body,
        icon: './icon.svg',
        badge: './icon.svg',
        tag: reqId,
        requireInteraction: urgency === 'urgent',
        silent: false,
      });
      n.onclick = () => { window.focus(); n.close(); };
    } catch (_) { /* some browsers block Notification constructor in SW scope */ }
  }
  /* Also push via service worker for background support */
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(
      { type: 'NEW_REQUEST', title, body, urgency, reqId }
    );
  }
}

/* ─────────────────── TINY STYLE TOKENS ─────────────────── */

const S = {
  card: {
    background: 'white',
    border: '1px solid var(--qp-gray-40)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-xs)',
  },
  ghostBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px',
    background: 'white',
    border: '1.5px solid var(--qp-gray-40)',
    borderRadius: 'var(--radius-md)',
    font: 'var(--text-button-sm)', fontFamily: 'var(--font-sans)',
    color: 'var(--qp-gray-lead)',
    cursor: 'pointer',
    transition: 'border-color .12s',
  },
  primaryBtn: (disabled) => ({
    width: '100%', padding: '14px',
    background: disabled ? 'var(--qp-gray-40)' : 'var(--qp-electric-blue)',
    color: disabled ? 'var(--qp-gray-100)' : 'white',
    border: 'none', borderRadius: 'var(--radius-md)',
    font: 'var(--text-button-lg)', fontFamily: 'var(--font-sans)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'background .15s',
  }),
  icon: (sz = 20, color = 'inherit') => ({
    fontSize: sz, color,
    fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
  }),
};

/* ─────────────────── CATEGORY CARD ─────────────────── */

function CategoryCard({ cat, selected, onSelect }) {
  const active = selected === cat.id;
  return (
    <button
      onClick={() => onSelect(cat.id)}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: '14px 10px',
        background: active ? 'var(--qp-electric-blue)' : 'white',
        border: `2px solid ${active ? 'var(--qp-electric-blue)' : 'var(--qp-gray-40)'}`,
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer', minHeight: 90,
        transition: 'background .13s, border-color .13s',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 26, color: active ? 'white' : cat.color }}>
        {cat.icon}
      </span>
      <div style={{ textAlign: 'center', lineHeight: 1.25 }}>
        <div style={{ font: 'var(--text-subtitle-02)', fontWeight: 500, color: active ? 'white' : 'var(--qp-dark-blue)' }}>
          {cat.en}
        </div>
        <div style={{ font: 'var(--text-body-03)', color: active ? 'rgba(255,255,255,.75)' : 'var(--qp-gray-100)', marginTop: 2 }}>
          {cat.bn}
        </div>
      </div>
    </button>
  );
}

/* ─────────────────── SCREEN: NAME ENTRY ─────────────────── */

function NameEntryScreen({ onContinue }) {
  const [name, setName] = useState('');
  function submit(e) { e.preventDefault(); if (name.trim()) onContinue(name.trim()); }
  return (
    <div style={{ padding: '48px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%', boxSizing: 'border-box' }}>
      {/* Logo mark */}
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <svg width="56" height="56" viewBox="0 0 192 192" fill="none">
          <rect width="192" height="192" rx="38" fill="var(--qp-dark-blue)"/>
          <circle cx="96" cy="44" r="9" fill="white"/>
          <path d="M96 53 C76 53 56 70 56 94 L56 130 L44 146 L148 146 L136 130 L136 94 C136 70 116 53 96 53 Z" fill="white"/>
          <path d="M84 146 Q84 160 96 160 Q108 160 108 146 Z" fill="white"/>
        </svg>
        <div style={{ font: 'var(--text-heading-02)', color: 'var(--qp-dark-blue)', marginTop: 16 }}>Office Requests</div>
        <div style={{ font: 'var(--text-heading-03)', color: 'var(--qp-gray-lead)', marginTop: 2 }}>অফিস রিকোয়েস্ট</div>
        <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-100)', marginTop: 4 }}>QuestionPro BD</div>
      </div>

      <form onSubmit={submit} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)' }}>
            Your name — আপনার নাম
          </span>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Karim Hossain"
            autoFocus autoComplete="given-name"
            style={{
              padding: '11px 14px',
              border: '1.5px solid var(--qp-gray-40)',
              borderRadius: 'var(--radius-md)',
              font: 'var(--text-body-01)', fontFamily: 'var(--font-sans)',
              color: 'var(--qp-dark-blue)', outline: 'none',
              transition: 'border-color .12s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--qp-electric-blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--qp-gray-40)'}
          />
        </label>
        <button type="submit" disabled={!name.trim()} style={S.primaryBtn(!name.trim())}>
          <span className="material-symbols-rounded" style={S.icon(18)}>arrow_forward</span>
          Continue
        </button>
      </form>
    </div>
  );
}

/* ─────────────────── SCREEN: ROLE SELECT ─────────────────── */

function RoleSelectScreen({ name, onSelect }) {
  const roles = [
    { id: 'requester',   en: 'I need something',   bn: 'আমার কিছু দরকার',    icon: 'add_circle',  color: 'var(--qp-electric-blue)', bg: '#EBF4FD' },
    { id: 'fulfillment', en: 'I handle requests',  bn: 'আমি অনুরোধ পূরণ করি', icon: 'task_alt',    color: '#227700',                bg: '#DFF2BF' },
  ];
  return (
    <div style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', minHeight: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ font: 'var(--text-heading-02)', color: 'var(--qp-dark-blue)' }}>Hi, {name}</div>
        <div style={{ font: 'var(--text-body-01)', color: 'var(--qp-gray-lead)', marginTop: 4 }}>
          How will you use the app today?
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {roles.map(r => (
          <button key={r.id} onClick={() => onSelect(r.id)} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '18px 20px',
            background: 'white',
            border: '1.5px solid var(--qp-gray-40)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer', textAlign: 'left',
            transition: 'border-color .12s, box-shadow .12s',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--qp-gray-40)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <span style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 26, color: r.color }}>
                {r.icon}
              </span>
            </span>
            <div>
              <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>{r.en}</div>
              <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', marginTop: 2 }}>{r.bn}</div>
            </div>
            <span className="material-symbols-rounded" style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--qp-gray-100)' }}>
              chevron_right
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── SCREEN: REQUESTER ─────────────────── */

function RequesterScreen({ name, onSubmit, onBack }) {
  const [catId, setCatId]   = useState(null);
  const [text, setText]     = useState('');
  const [urgency, setUrgency] = useState('normal');

  function submit() {
    if (!catId) return;
    const cat = categories.find(c => c.id === catId);
    const req = {
      id: genId(),
      name,
      category: catId,
      categoryEn: cat.en,
      categoryBn: cat.bn,
      categoryIcon: cat.icon,
      customText: text.trim(),
      urgency,
      status: 'pending',
      timestamp: Date.now(),
    };
    add(req);
    const notifTitle = urgency === 'urgent' ? 'URGENT request!' : 'New office request';
    const notifBody  = `${name}: ${cat.en}${req.customText ? ' — ' + req.customText : ''}`;
    fireNotification(notifTitle, notifBody, urgency, req.id);
    onSubmit(req);
  }

  const urgencyOpts = [
    { val: 'normal', en: 'Normal', bn: 'সাধারণ', icon: 'schedule',      color: 'var(--qp-electric-blue)', bg: '#EBF4FD' },
    { val: 'urgent', en: 'Urgent', bn: 'জরুরি',   icon: 'priority_high', color: 'var(--qp-upgrade)',       bg: '#FFF8E7' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sub-header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--qp-gray-25)', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--qp-gray-lead)', display: 'flex' }}>
          <span className="material-symbols-rounded" style={S.icon(22)}>arrow_back</span>
        </button>
        <div>
          <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>What do you need?</div>
          <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>আপনার কি দরকার?</div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Category grid */}
        <div>
          <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)', marginBottom: 10 }}>
            Select category — বিভাগ বেছে নিন
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {categories.map(cat => (
              <CategoryCard key={cat.id} cat={cat} selected={catId} onSelect={setCatId} />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)', marginBottom: 8 }}>
            Add details (optional) — বিস্তারিত
          </div>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="e.g. 2 cups, extra sugar / ২ কাপ, বেশি চিনি"
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px',
              border: '1.5px solid var(--qp-gray-40)',
              borderRadius: 'var(--radius-md)',
              font: 'var(--text-body-01)', fontFamily: 'var(--font-sans)',
              color: 'var(--qp-dark-blue)', resize: 'none', outline: 'none',
              transition: 'border-color .12s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--qp-electric-blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--qp-gray-40)'}
          />
        </div>

        {/* Urgency */}
        <div>
          <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)', marginBottom: 10 }}>
            Priority — অগ্রাধিকার
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {urgencyOpts.map(opt => (
              <button key={opt.val} onClick={() => setUrgency(opt.val)} style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px',
                background: urgency === opt.val ? opt.bg : 'white',
                border: `2px solid ${urgency === opt.val ? opt.color : 'var(--qp-gray-40)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer', transition: 'all .13s',
                WebkitTapHighlightColor: 'transparent',
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: opt.color }}>
                  {opt.icon}
                </span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ font: 'var(--text-subtitle-02)', fontWeight: 500, color: 'var(--qp-dark-blue)' }}>{opt.en}</div>
                  <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>{opt.bn}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed submit footer */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid var(--qp-gray-25)', background: 'white', flexShrink: 0 }}>
        <button onClick={submit} disabled={!catId} style={S.primaryBtn(!catId)}>
          <span className="material-symbols-rounded" style={S.icon(18)}>send</span>
          Send Request — পাঠান
        </button>
      </div>
    </div>
  );
}

/* ─────────────────── SCREEN: SUCCESS ─────────────────── */

function SuccessScreen({ request, onAnother }) {
  const cat = categories.find(c => c.id === request.category);
  return (
    <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--qp-success-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 40, color: 'var(--qp-success-deep)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>
      <div style={{ font: 'var(--text-heading-02)', color: 'var(--qp-dark-blue)' }}>Request sent!</div>
      <div style={{ font: 'var(--text-heading-03)', color: 'var(--qp-gray-lead)', marginTop: 4, marginBottom: 28 }}>অনুরোধ পাঠানো হয়েছে</div>

      {/* Summary card */}
      <div style={{ width: '100%', maxWidth: 340, ...S.card, padding: 16, textAlign: 'left', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: request.customText ? 10 : 0 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22, color: cat?.color }}>
            {cat?.icon}
          </span>
          <span style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)', flex: 1 }}>{cat?.en}</span>
          {request.urgency === 'urgent' && (
            <span style={{ background: '#FFF3CD', color: '#9F6000', padding: '2px 8px', borderRadius: 'var(--radius-sm)', font: 'var(--text-body-03)', fontWeight: 500 }}>
              URGENT
            </span>
          )}
        </div>
        {request.customText && (
          <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', background: 'var(--qp-gray-10)', borderRadius: 'var(--radius-sm)', padding: '7px 10px' }}>
            {request.customText}
          </div>
        )}
      </div>

      <button onClick={onAnother} style={{
        ...S.ghostBtn,
        borderColor: 'var(--qp-electric-blue)', color: 'var(--qp-electric-blue)',
        padding: '10px 22px',
      }}>
        <span className="material-symbols-rounded" style={S.icon(18)}>add</span>
        Send another request
      </button>
    </div>
  );
}

/* ─────────────────── REQUEST ITEM ─────────────────── */

function RequestItem({ req, onAck, onDone }) {
  const cat = categories.find(c => c.id === req.category);
  const isAcked = req.status === 'acknowledged';
  const isUrgent = req.urgency === 'urgent';

  return (
    <div style={{
      ...S.card,
      border: `1.5px solid ${isUrgent ? 'var(--qp-upgrade)' : 'var(--qp-gray-40)'}`,
      overflow: 'hidden',
    }}>
      {/* Urgent banner */}
      {isUrgent && (
        <div style={{ background: 'var(--qp-upgrade)', color: 'white', padding: '5px 14px', font: 'var(--text-body-03)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 14 }}>priority_high</span>
          URGENT — জরুরি
        </div>
      )}

      <div style={{ padding: '12px 14px' }}>
        {/* Requester row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--qp-dark-blue)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: 'var(--text-subtitle-02)', fontWeight: 500, flexShrink: 0,
            }}>
              {req.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>{req.name}</div>
              <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>{timeAgo(req.timestamp)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: cat?.color }}>{cat?.icon}</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-dark-blue)', fontWeight: 500 }}>{req.categoryEn}</div>
              <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>{req.categoryBn}</div>
            </div>
          </div>
        </div>

        {/* Custom text */}
        {req.customText && (
          <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', background: 'var(--qp-gray-10)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', marginBottom: 10 }}>
            {req.customText}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!isAcked ? (
            <button onClick={onAck} style={S.ghostBtn}>
              <span className="material-symbols-rounded" style={S.icon(15)}>thumb_up</span>
              Acknowledge
            </button>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, font: 'var(--text-body-02)', color: 'var(--qp-success-deep)' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Acknowledged
            </span>
          )}
          <button onClick={onDone} style={{
            ...S.ghostBtn,
            marginLeft: 'auto',
            background: 'var(--qp-success-deep)',
            border: 'none', color: 'white',
          }}>
            <span className="material-symbols-rounded" style={S.icon(15)}>task_alt</span>
            Done — সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── SCREEN: FULFILLMENT ─────────────────── */

function FulfillmentScreen({ name, onSwitchRole }) {
  const [requests, setRequests]   = useState([]);
  const [notifPerm, setNotifPerm] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  );
  const prevCountRef = useRef(-1);

  const reload = useCallback(() => {
    const active = window.AppData.getActive();
    setRequests([...active].reverse()); /* newest first */
    return active;
  }, []);

  useEffect(() => {
    askNotifPermission();
    const active = reload();
    prevCountRef.current = active.length;

    /* Poll every 6 s for fresh requests (same-device same-tab) */
    const timer = setInterval(() => {
      const fresh = window.AppData.getActive();
      if (fresh.length > prevCountRef.current) {
        const newest = fresh[fresh.length - 1];
        const notifTitle = newest.urgency === 'urgent' ? 'URGENT request!' : 'New office request';
        const notifBody  = `${newest.name}: ${newest.categoryEn}${newest.customText ? ' — ' + newest.customText : ''}`;
        fireNotification(notifTitle, notifBody, newest.urgency, newest.id);
      }
      prevCountRef.current = fresh.length;
      setRequests([...fresh].reverse());
    }, 6000);

    /* Cross-tab storage event */
    function onStorage(e) {
      if (e.key !== window.AppData.STORE_KEY) return;
      const fresh = window.AppData.getActive();
      if (fresh.length > prevCountRef.current) {
        const newest = fresh[fresh.length - 1];
        if (Notification.permission === 'granted') {
          fireNotification(
            newest.urgency === 'urgent' ? 'URGENT request!' : 'New office request',
            `${newest.name}: ${newest.categoryEn}${newest.customText ? ' — ' + newest.customText : ''}`,
            newest.urgency, newest.id
          );
        }
      }
      prevCountRef.current = fresh.length;
      setRequests([...fresh].reverse());
    }

    /* SW message: OPEN_FULFILLMENT (from notification click) */
    function onSwMsg(e) { if (e.data?.type === 'OPEN_FULFILLMENT') reload(); }

    window.addEventListener('storage', onStorage);
    navigator.serviceWorker && navigator.serviceWorker.addEventListener('message', onSwMsg);

    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', onStorage);
      navigator.serviceWorker && navigator.serviceWorker.removeEventListener('message', onSwMsg);
    };
  }, []);

  async function enableNotifs() {
    const p = await Notification.requestPermission();
    setNotifPerm(p);
  }

  function handleAck(id)  { window.AppData.update(id, { status: 'acknowledged' }); reload(); }
  function handleDone(id) { window.AppData.update(id, { status: 'done' });         reload(); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sub-header */}
      <div style={{ padding: '12px 16px 10px', background: 'white', borderBottom: '1px solid var(--qp-gray-25)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>Active requests</div>
            <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>সক্রিয় অনুরোধ</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {requests.length > 0 && (
              <span style={{ background: 'var(--qp-electric-blue)', color: 'white', minWidth: 26, height: 26, borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-subtitle-02)', fontWeight: 600, padding: '0 6px' }}>
                {requests.length}
              </span>
            )}
            <button onClick={onSwitchRole} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--qp-gray-100)', padding: 2 }} title="Switch role">
              <span className="material-symbols-rounded" style={S.icon(20)}>swap_horiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification prompt */}
      {notifPerm === 'default' && (
        <div style={{ margin: '12px 16px 0', padding: '10px 14px', background: 'var(--qp-info-soft)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--qp-info-deep)', flexShrink: 0 }}>notifications</span>
          <div style={{ flex: 1, font: 'var(--text-body-02)', color: 'var(--qp-info-deep)' }}>
            Enable notifications to get instant alerts when requests come in
          </div>
          <button onClick={enableNotifs} style={{ background: 'var(--qp-electric-blue)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', padding: '6px 12px', font: 'var(--text-button-sm)', fontFamily: 'var(--font-sans)', cursor: 'pointer', flexShrink: 0 }}>
            Enable
          </button>
        </div>
      )}

      {/* Request list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--qp-gray-100)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 60, display: 'block', marginBottom: 14, opacity: 0.35 }}>inbox</span>
            <div style={{ font: 'var(--text-body-01)' }}>No active requests</div>
            <div style={{ font: 'var(--text-body-02)', marginTop: 4 }}>কোনো অনুরোধ নেই</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {requests.map(req => (
              <RequestItem
                key={req.id + req.status}
                req={req}
                onAck={() => handleAck(req.id)}
                onDone={() => handleDone(req.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────── APP (ROUTER) ─────────────────── */

function App() {
  const [screen, setScreen]   = useState('loading');
  const [userName, setUserName] = useState('');
  const [role, setRole]       = useState('');
  const [lastReq, setLastReq] = useState(null);

  /* Restore session on mount */
  useEffect(() => {
    const n = localStorage.getItem('qp_user_name')  || '';
    const r = localStorage.getItem('qp_user_role')  || '';
    setUserName(n);
    setRole(r);
    if (n && r) {
      setScreen(r === 'fulfillment' ? 'fulfillment' : 'request');
    } else if (n) {
      setScreen('role');
    } else {
      setScreen('name');
    }

    /* Handle notification-click open */
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', e => {
        if (e.data?.type === 'OPEN_FULFILLMENT') setScreen('fulfillment');
      });
    }
  }, []);

  function handleName(n) {
    setUserName(n);
    localStorage.setItem('qp_user_name', n);
    setScreen('role');
  }
  function handleRole(r) {
    setRole(r);
    localStorage.setItem('qp_user_role', r);
    setScreen(r === 'fulfillment' ? 'fulfillment' : 'request');
  }
  function handleSubmit(req) { setLastReq(req); setScreen('success'); }
  function handleAnother()   { setScreen('request'); }
  function handleBack()      {
    setRole('');
    localStorage.removeItem('qp_user_role');
    setScreen('role');
  }
  function handleSwitchRole() {
    setRole('');
    localStorage.removeItem('qp_user_role');
    setScreen('role');
  }
  function handleLogout() {
    ['qp_user_name', 'qp_user_role'].forEach(k => localStorage.removeItem(k));
    setUserName(''); setRole('');
    setScreen('name');
  }

  if (screen === 'loading') return null;

  const showHeader = screen !== 'name';

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--qp-gray-10)', fontFamily: 'var(--font-sans)', userSelect: 'none' }}>
      {/* ── App Header ── */}
      <header style={{ background: 'var(--qp-dark-blue)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 2px 8px rgba(27,51,128,.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="30" height="30" viewBox="0 0 192 192" fill="none" style={{ flexShrink: 0 }}>
            <rect width="192" height="192" rx="38" fill="rgba(255,255,255,.15)"/>
            <circle cx="96" cy="44" r="9" fill="white"/>
            <path d="M96 53 C76 53 56 70 56 94 L56 130 L44 146 L148 146 L136 130 L136 94 C136 70 116 53 96 53 Z" fill="white"/>
            <path d="M84 146 Q84 160 96 160 Q108 160 108 146 Z" fill="white"/>
          </svg>
          <div>
            <div style={{ font: '500 14px/18px var(--font-sans)', color: 'white' }}>Office Requests</div>
            <div style={{ font: '400 11px/14px var(--font-sans)', color: 'rgba(255,255,255,.55)' }}>QuestionPro BD</div>
          </div>
        </div>
        {showHeader && userName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,.18)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500 }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <span style={{ font: '400 13px/16px var(--font-sans)', color: 'rgba(255,255,255,.8)', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userName}
            </span>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.45)', padding: 2, display: 'flex' }} title="Switch user">
              <span className="material-symbols-rounded" style={S.icon(16)}>logout</span>
            </button>
          </div>
        )}
      </header>

      {/* ── Screen Content ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%', maxWidth: 480,
          display: 'flex', flexDirection: 'column',
          background: ['request','fulfillment'].includes(screen) ? 'white' : 'transparent',
          height: '100%', overflow: 'hidden',
        }}>
          {screen === 'name'        && <div style={{ overflowY: 'auto', flex: 1 }}><NameEntryScreen onContinue={handleName} /></div>}
          {screen === 'role'        && <div style={{ overflowY: 'auto', flex: 1 }}><RoleSelectScreen name={userName} onSelect={handleRole} /></div>}
          {screen === 'request'     && <RequesterScreen name={userName} onSubmit={handleSubmit} onBack={handleBack} />}
          {screen === 'success'     && <div style={{ overflowY: 'auto', flex: 1 }}><SuccessScreen request={lastReq} onAnother={handleAnother} /></div>}
          {screen === 'fulfillment' && <FulfillmentScreen name={userName} onSwitchRole={handleSwitchRole} />}
        </div>
      </div>
    </div>
  );
}

/* ── Mount ── */
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
