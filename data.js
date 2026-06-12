/* =====================================================
   QuestionPro BD — Office Request Portal
   data.js  —  categories, strings, storage helpers
   Exposed on window.AppData
   ===================================================== */

window.AppData = {

  /* ── Request categories ── */
  categories: [
    { id: 'tea_coffee',   en: 'Tea / Coffee',      bn: 'চা / কফি',         icon: 'local_cafe',         color: '#7B4F2E' },
    { id: 'chanachur',    en: 'Chanachur / Snacks', bn: 'চানাচুর মাখা',      icon: 'fastfood',           color: '#D4652A' },
    { id: 'supplies',     en: 'Office Supplies',    bn: 'অফিস সাপ্লাই',     icon: 'inventory_2',        color: '#1B87E6' },
    { id: 'it_help',      en: 'IT / Tech Help',     bn: 'আইটি সাহায্য',     icon: 'computer',           color: '#6B4EAF' },
    { id: 'meeting',      en: 'Meeting Room',       bn: 'মিটিং রুম',        icon: 'meeting_room',       color: '#1B6FA3' },
    { id: 'housekeeping', en: 'Housekeeping',       bn: 'পরিষ্কার',         icon: 'cleaning_services',  color: '#2E8B57' },
    { id: 'custom',       en: 'Other Request',      bn: 'অন্যান্য',          icon: 'add_circle',         color: '#545E6B' },
  ],

  /* ── Utility: generate short unique id ── */
  genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  },

  /* ── Time-ago formatter ── */
  timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 5)   return 'Just now';
    if (s < 60)  return s + 's ago';
    if (s < 3600) return Math.floor(s / 60) + ' min ago';
    return Math.floor(s / 3600) + 'h ago';
  },

  /* ── localStorage helpers ── */
  STORE_KEY: 'qp_requests',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY) || '[]'); }
    catch { return []; }
  },

  getActive() {
    return this.getAll().filter(r => r.status !== 'done');
  },

  add(req) {
    const list = this.getAll();
    list.push(req);
    localStorage.setItem(this.STORE_KEY, JSON.stringify(list));
  },

  update(id, patch) {
    const list = this.getAll();
    const i = list.findIndex(r => r.id === id);
    if (i !== -1) {
      list[i] = { ...list[i], ...patch };
      localStorage.setItem(this.STORE_KEY, JSON.stringify(list));
      return list[i];
    }
    return null;
  },
};
