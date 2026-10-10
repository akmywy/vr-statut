// VR Status - plugin Revenge/Vendetta (plain JS, bla build)
// L-plugin khass ykoun expression (machi `export`), 7it Revenge kay3mel eval.
(function () {
  const { FluxDispatcher } = vendetta.metro.common;

  // ===== beddel hna =====
  const ACTIVITY_NAME = "VR";      // l-ism li kayban ("Playing VR")
  const DETAILS = "Dakhl f VR";    // star lwl (khlih "" ila ma bghitich)
  const STATE = "";                // star tani
  const SHOW_TIMER = true;         // timer
  // =======================

  const SOCKET_ID = "VRStatus@Revenge";

  function setActivity(activity) {
    FluxDispatcher.dispatch({
      type: "LOCAL_ACTIVITY_UPDATE",
      activity,
      pid: 1608,
      socketId: SOCKET_ID,
    });
  }

  return {
    onLoad() {
      const activity = {
        name: ACTIVITY_NAME,
        type: 0,
        application_id: "0",
        flags: 1,
      };
      if (DETAILS) activity.details = DETAILS;
      if (STATE) activity.state = STATE;
      if (SHOW_TIMER) activity.timestamps = { start: Date.now() };
      setActivity(activity);
    },
    onUnload() {
      setActivity(null);
    },
  };
})();
