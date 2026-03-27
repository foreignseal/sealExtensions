const STYLE_ID = "sealPatch_pinterest";

function applyStyle() {
  if (document.getElementById(STYLE_ID)) return;

  const link = document.createElement("link");
  link.id = STYLE_ID;
  link.rel = "stylesheet";
  link.href = browser.runtime.getURL("content.css") + "?t=" + Date.now();
  document.head.appendChild(link);
}

function removeStyle() {
  document.getElementById(STYLE_ID)?.remove();
}

browser.storage.local.get("enabled").then(({ enabled }) => {
  if (enabled !== false) applyStyle();
});

browser.runtime.onMessage.addListener((msg) => {
  if (msg.enabled) applyStyle();
  else removeStyle();
});