// VR Status - plugin Revenge/Vendetta (plain JS, bla build)
// Mnin kat7ll Discord, kayban f profile: "Playing VR"

const { FluxDispatcher } = vendetta.metro.common;

// ===== beddel hna =====
const ACTIVITY_NAME = "VR";          // l-ism li kayban ("Playing VR")
const DETAILS = "Dakhl f VR";        // star lwl (khlih "" ila ma bghitich)
const STATE = "";                    // star tani (khlih "" ila ma bghitich)
const SHOW_TIMER = true;             // ybyyen ch7al hadi mn mnin dkhlti
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

export default {
  onLoad() {
    const activity = {
      name: ACTIVITY_NAME,
      type: 0, // 0 = Playing
      application_id: "0",
      flags: 1,
    };
    if (DETAILS) activity.details = DETAILS;
    if (STATE) activity.state = STATE;
    if (SHOW_TIMER) activity.timestamps = { start: Date.now() };

    setActivity(activity);
  },

  onUnload() {
    // kay7ayyed l-statut mnin tqffl l-plugin
    setActivity(null);
  },
};
