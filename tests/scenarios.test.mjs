import test from "node:test";
import assert from "node:assert/strict";
import { calculateScenario } from "../app/lib/scenarios.mjs";

test("calculates compliance from the adopted 2026 budget", () => {
  assert.deepEqual(calculateScenario("adopted-budget"), {
    id: "adopted-budget",
    label: "2026 adopted budget",
    regularAssessments: 194150,
    insuranceAssessments: 79342,
    denominator: 273492,
    reserveAllocation: 43936,
    currentPct: 16.06,
    target: 41023.8,
    cushion: 2912.2,
    additionalAnnual: 0,
    additionalQuarterly: 0,
  });
});
