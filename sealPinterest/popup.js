const api = typeof browser !== "undefined" ? browser : chrome;
const btn = document.getElementById("toggle");

api.storage.local.get("enabled", ({ enabled }) => {
  const on = enabled !== false;
  btn.textContent = on ? "Styles ON" : "Styles OFF";
});

btn.addEventListener("click", () => {
  api.storage.local.get("enabled", ({ enabled }) => {
    const newState = enabled === false ? true : false;
    api.storage.local.set({ enabled: newState });

    api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if(tab.url && tab.url.includes("pinterest.com")) {
        try {
          api.tabs.sendMessage(tab.id, { enabled: newState });
        } catch (e) {}
      }
    });

    btn.textContent = newState ? "Styles ON" : "Styles OFF";
  });
});