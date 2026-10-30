// v1.10.83 - Offline mode (Settings → Privacy & internet). On: the app never
// goes online by itself - no update check, no supporters list, no automatic copy to
// Google Drive with each PDF. What the user clicks (Update, Check for Updates, help pages,
// WhatsApp, Report) still works. Kept in the data folder too (prefsMirror), so
// the server's own update check (server.js /api/check-update) obeys it.
export const OFFLINE_KEY = 'gst_offlineMode';

export const isOfflineMode = () => {
  try { return localStorage.getItem(OFFLINE_KEY) === '1'; } catch { return false; }
};

export const setOfflineMode = (on) => {
  try {
    if (on) localStorage.setItem(OFFLINE_KEY, '1');
    else localStorage.removeItem(OFFLINE_KEY);
  } catch { /* storage blocked */ }
};
