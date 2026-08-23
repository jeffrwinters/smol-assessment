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
  assert.match(visibleText, /already above 15%/i);
  assert.match(visibleText, /January 4, 2027/i);
  assert.match(visibleText, /16\.06%/);
  assert.match(html, /href="#overview"/);
  assert.match(html, /href="#numbers"/);
  assert.match(html, /href="#risk"/);
  assert.doesNotMatch(html, /href="#action"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders a dedicated opening backdrop behind the scrolling financial story", async () => {
  const response = await render();
  const html = await response.text();

  const backdropIndex = html.indexOf('class="opening-backdrop"');
  const heroIndex = html.indexOf('class="hero"');
  const secondImageIndex = html.indexOf('class="evidence-section"');

  assert.ok(backdropIndex >= 0, "opening backdrop should render");
  assert.ok(heroIndex > backdropIndex, "hero content should render over the backdrop");
  assert.ok(secondImageIndex > heroIndex, "second image should follow the opening story");
  assert.match(html, /class="opening-backdrop"[^>]*aria-hidden="true"/i);
});

test("loads the privacy-conscious analytics client", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<script[^>]+src="\/analytics\.js"[^>]*><\/script>/i);
});

test("renders the official formula and the association's pass-through evidence", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.match(visibleText, /What the official guidance says/i);
  assert.match(visibleText, /annual replacement-reserve allocation/i);
  assert.match(visibleText, /annual budgeted assessment income/i);
  assert.match(visibleText, /utility pass-through income/i);
  assert.match(visibleText, /Cable.*\$\s*23,976\.50.*\$\s*23,976\.00/i);
  assert.match(visibleText, /Sewer.*\$\s*31,244\.00.*\$\s*31,244\.48/i);
  assert.match(visibleText, /Make the record airtight/i);
  assert.match(
    visibleText,
    /obtain a short written statement from management confirming that cable and recurring sewer collections merely offset the corresponding provider charges/i,
  );
  assert.doesNotMatch(visibleText, /or its accountant/i);
  assert.doesNotMatch(visibleText, /What it costs/i);
  assert.doesNotMatch(visibleText, /The owner impact/i);
  assert.doesNotMatch(visibleText, /\$\s*0\.00 additional per owner per quarter/i);
  assert.doesNotMatch(html, /class="decision-band"/i);
  assert.match(html, /fanniemae\.com/i);
  assert.match(html, /guide\.freddiemac\.com/i);
});

test("renders the dock image without detailed owner-billing evidence", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.match(html, /dock-lake\.jpg/i);
  assert.match(html, /alt="[^"]*dock[^"]*"/i);
  assert.doesNotMatch(visibleText, /The current budget clears the 15% line-item threshold/i);
  assert.doesNotMatch(visibleText, /shoreline to structure/i);
  assert.doesNotMatch(visibleText, /Cable is itemized separately|Sewer is a special assessment/i);
  assert.doesNotMatch(visibleText, /Jeffrey|Emily|808 N Sumac|G-4/i);
});

test("renders the adopted-budget math immediately before the second image", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  const calculationIndex = html.indexOf('class="calculation-strip"');
  const secondImageIndex = html.indexOf('class="evidence-section"');

  assert.ok(calculationIndex >= 0, "calculation strip should render");
  assert.ok(secondImageIndex > calculationIndex, "calculation strip should precede the second image");
  assert.match(visibleText, /Regular HOA \+ COA assessments \$194,150/i);
  assert.match(visibleText, /Insurance assessments \$79,342/i);
  assert.match(visibleText, /Eligible assessment income \$273,492/i);
  assert.match(visibleText, /15% requirement \$41,023\.80/i);
  assert.match(visibleText, /Current allocation \$43,936/i);
  assert.match(visibleText, /Amount above minimum \$2,912\.20/i);
  assert.match(visibleText, /Current funding rate 16\.06%/i);
  assert.match(visibleText, /Cable and sewer are excluded as permitted pass-throughs/i);
  assert.doesNotMatch(visibleText, /Cable assessments \$47,953|Sewer assessments \$62,488/i);
});

test("renders an evergreen member reference without meeting-specific framing", async () => {
  const response = await render();
  const html = await response.text();
  const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.match(html, /<title>Reserve Health Guide \| St\. Moritz on the Lake<\/title>/i);
  assert.match(visibleText, /2027 reserve funding/i);
  assert.doesNotMatch(visibleText, /Recommended board action|2027 budget direction/i);
  assert.doesNotMatch(html, /class="motion-section"/i);
  assert.match(visibleText, /fewer conventional financing options/i);
  assert.match(visibleText, /sale or refinancing delays/i);
  assert.match(visibleText, /smaller buyer pool/i);
  assert.doesNotMatch(visibleText, /meeting-ready|read this aloud|board briefing|meeting’s key question/i);
});
