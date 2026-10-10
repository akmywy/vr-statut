// VR Status v2 - plugin Revenge/Vendetta (plain JS, expression bla export)
(function () {
  const { FluxDispatcher } = vendetta.metro.common;

  // ===== beddel hna =====
  const ACTIVITY_NAME = "VR";
  const DETAILS = "Dakhl f VR";
  const STATE = "";
  const SHOW_TIMER = true;
  const APP_ID = "1";            // ay snowflake (string)
  const REFRESH_MS = 30000;      // kay3awd yb3t l-activity kol 30s
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

  function setActivity(activity) {
    FluxDispatcher.dispatch({
      type: "LOCAL_ACTIVITY_UPDATE",
      activity,
      pid: 1608,
      socketId: SOCKET_ID,
    });
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

  function push() {
    try {
      setActivity(buildActivity());
    } catch (e) {
      toast("VR Status error: " + (e && e.message));
    }
  }

  return {
    onLoad() {
      toast("VR Status: tcharja");
      // tsna chwiya bach Discord ykoun jahez, mn ba3d 3awd kol 30s
      startTimeout = setTimeout(() => {
        push();
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
