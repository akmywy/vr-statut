// VR Status v4 - m3a application_id 7a9i9i
(function () {
  // ===== beddel hna =====
  const ACTIVITY_NAME = "VR";
  const DETAILS = "Dakhl f VR";
  const STATE = "";
  const SHOW_TIMER = true;
  const APP_ID = "1556117383955878049";
  const REFRESH_MS = 30000;
  // =======================

  const SOCKET_ID = "VRStatus@Revenge";
  const startedAt = Date.now();
  let interval = null;
  let startTimeout = null;

  function toast(msg) {
    try {
      vendetta.ui.toasts.showToast(msg);
    } catch (e) {}
  }

  function getDispatcher() {
    try {
      const d = vendetta.metro.common.FluxDispatcher;
      if (d && d.dispatch) return d;
    } catch (e) {}
    try {
      const d = vendetta.metro.findByProps("dispatch", "subscribe");
      if (d && d.dispatch) return d;
    } catch (e) {}
    return null;
  }

  function buildActivity() {
    const a = {
      name: ACTIVITY_NAME,
      type: 0,
      application_id: APP_ID,
      flags: 1,
      created_at: startedAt,
    };
    if (DETAILS) a.details = DETAILS;
    if (STATE) a.state = STATE;
    if (SHOW_TIMER) a.timestamps = { start: startedAt };
    return a;
  }

  function setActivity(activity) {
    const d = getDispatcher();
    if (!d) {
      toast("VR: ma l9itch Dispatcher");
      return false;
    }
    d.dispatch({
      type: "LOCAL_ACTIVITY_UPDATE",
      activity,
      pid: 1608,
      socketId: SOCKET_ID,
    });
    return true;
  }

  function push() {
    try {
      setActivity(buildActivity());
    } catch (e) {
      toast("VR error: " + (e && e.message ? e.message : String(e)));
    }
  }

  return {
    onLoad() {
      toast("VR Status v4: tcharja");
      startTimeout = setTimeout(() => {
        push();
        toast("VR: tsift l-activity");
        interval = setInterval(push, REFRESH_MS);
      }, 3000);
    },
    onUnload() {
      if (startTimeout) clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
      try {
        setActivity(null);
      } catch (e) {}
    },
  };
})();
