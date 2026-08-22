import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the reserve-readiness hero and primary navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.match(html, /<title>Reserve Health Guide \| St\. Moritz on the Lake<\/title>/i);
  assert.match(visibleText, /Closing the 15% reserve gap/i);
  assert.match(visibleText, /January 4, 2027/i);
  assert.match(visibleText, /\$\s*3,122/);
  assert.match(html, /href="#overview"/);
  assert.match(html, /href="#numbers"/);
  assert.match(html, /href="#risk"/);
  assert.match(html, /href="#action"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders one fixed 15% funding answer without scenario choices", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.match(visibleText, /Current annual allocation/i);
  assert.match(visibleText, /\$\s*43,936/);
  assert.match(visibleText, /\$\s*47,058/);
  assert.match(visibleText, /\$\s*3,122/);
  assert.match(visibleText, /\$\s*12\.80 more per owner per quarter/i);
  assert.doesNotMatch(visibleText, /\$\s*50,000/);
  assert.doesNotMatch(html, /aria-label="Choose a reserve calculation scenario"/i);
  assert.doesNotMatch(visibleText, /Sensitivity check|Upper-bound check/i);
  assert.match(visibleText, /Adopt a 2027 budget/i);
  assert.match(html, /singlefamily\.fanniemae\.com/i);
  assert.match(html, /guide\.freddiemac\.com/i);
});

test("renders the dock image without detailed owner-billing evidence", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.match(html, /dock-lake\.jpg/i);
  assert.match(html, /alt="[^"]*dock[^"]*"/i);
  assert.doesNotMatch(visibleText, /shoreline to structure/i);
  assert.doesNotMatch(visibleText, /Cable is itemized separately|Sewer is a special assessment/i);
  assert.doesNotMatch(visibleText, /Jeffrey|Emily|808 N Sumac|G-4/i);
});

test("renders an evergreen member reference without meeting-specific framing", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.match(html, /<title>Reserve Health Guide \| St\. Moritz on the Lake<\/title>/i);
  assert.match(visibleText, /2027 reserve funding/i);
  assert.match(visibleText, /Recommended board action/i);
  assert.match(visibleText, /fewer conventional financing options/i);
  assert.match(visibleText, /sale or refinancing delays/i);
  assert.match(visibleText, /smaller buyer pool/i);
  assert.doesNotMatch(visibleText, /meeting-ready|read this aloud|board briefing|meeting’s key question/i);
});
