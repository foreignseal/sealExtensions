const api = typeof browser !== "undefined" ? browser : chrome;

const STYLE_ID = "sealPatch_pinterest";

function applyStyle() {
  if (document.getElementById(STYLE_ID)) return;

  const link = document.createElement("link");
  link.id = STYLE_ID;
  link.rel = "stylesheet";
  link.href = api.runtime.getURL("content.css") + "?t=" + Date.now();
  document.head.appendChild(link);
}

function removeStyle() {
  document.getElementById(STYLE_ID)?.remove();
}

api.storage.local.get("enabled", ({ enabled }) => {
  if (enabled !== false) applyStyle();
});

api.runtime.onMessage.addListener((msg) => {
  if (msg.enabled) applyStyle();
  else removeStyle();
});