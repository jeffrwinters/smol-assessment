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
  assert.match(html, /<title>15% Reserve Readiness \| St\. Moritz on the Lake<\/title>/i);
  assert.match(visibleText, /Closing the 15% reserve gap/i);
  assert.match(visibleText, /January 4, 2027/i);
  assert.match(visibleText, /\$\s*3,122/);
  assert.match(html, /href="#overview"/);
  assert.match(html, /href="#scenarios"/);
  assert.match(html, /href="#plan"/);
  assert.match(html, /href="#motion"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});
