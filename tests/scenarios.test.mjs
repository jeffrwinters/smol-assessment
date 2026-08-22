import test from "node:test";
import assert from "node:assert/strict";
import { calculateScenario } from "../app/lib/scenarios.mjs";

test("calculates the likely utility-exclusion case", () => {
  assert.deepEqual(calculateScenario("both-excluded"), {
    id: "both-excluded",
    label: "Cable + sewer excluded",
    denominator: 313720,
    currentPct: 14,
    target: 47058,
    gap: 3122,
    monthlyPerUnit: 4.27,
  });
});

test("calculates the sewer-included case", () => {
  const result = calculateScenario("sewer-included");
  assert.equal(result.denominator, 376108);
  assert.equal(result.currentPct, 11.68);
  assert.equal(result.target, 56416.2);
  assert.equal(result.gap, 12480.2);
});

test("calculates the no-exclusions case", () => {
  const result = calculateScenario("none-excluded");
  assert.equal(result.denominator, 424061);
  assert.equal(result.currentPct, 10.36);
  assert.equal(result.target, 63609.15);
  assert.equal(result.gap, 19673.15);
});

