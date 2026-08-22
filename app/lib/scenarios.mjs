export const RESERVE_ALLOCATION = 43936;

export const SCENARIOS = [
  {
    id: "adopted-budget",
    label: "2026 adopted budget",
    regularAssessments: 194150,
    insuranceAssessments: 79342,
    denominator: 273492,
  },
];

const round = (value, digits = 2) => Number(value.toFixed(digits));

export function calculateScenario(id) {
  const scenario = SCENARIOS.find((item) => item.id === id);

  if (!scenario) {
    throw new Error(`Unknown scenario: ${id}`);
  }

  const target = scenario.denominator * 0.15;
  const cushion = RESERVE_ALLOCATION - target;

  return {
    ...scenario,
    reserveAllocation: RESERVE_ALLOCATION,
    currentPct: round((RESERVE_ALLOCATION / scenario.denominator) * 100),
    target: round(target),
    cushion: round(cushion),
    additionalAnnual: round(Math.max(0, -cushion)),
    additionalQuarterly: 0,
  };
}
