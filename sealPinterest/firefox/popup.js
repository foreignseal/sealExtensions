const btn = document.getElementById("toggle");

// Show current state
browser.storage.local.get("enabled").then(({ enabled }) => {
  const on = enabled !== false;
  btn.textContent = on ? "Styles ON" : "Styles OFF";
});

btn.addEventListener("click", () => {
  browser.storage.local.get("enabled").then(({ enabled }) => {
    const newState = enabled === false ? true : false;
    browser.storage.local.set({ enabled: newState });

    // Tell the active Pinterest tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { enabled: newState });
    });

    btn.textContent = newState ? "Styles ON" : "Styles OFF";
  });
});