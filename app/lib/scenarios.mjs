export const RESERVE_ALLOCATION = 43936;
export const UNIT_COUNT = 61;

export const SCENARIOS = [
  {
    id: "both-excluded",
    label: "Cable + sewer excluded",
    denominator: 313720,
  },
  {
    id: "sewer-included",
    label: "Cable excluded; sewer included",
    denominator: 376108,
  },
  {
    id: "none-excluded",
    label: "Neither excluded",
    denominator: 424061,
  },
];

const round = (value, digits = 2) => Number(value.toFixed(digits));

export function calculateScenario(id) {
  const scenario = SCENARIOS.find((item) => item.id === id);

  if (!scenario) {
    throw new Error(`Unknown scenario: ${id}`);
  }

  const target = scenario.denominator * 0.15;
  const gap = target - RESERVE_ALLOCATION;

  return {
    ...scenario,
    currentPct: round((RESERVE_ALLOCATION / scenario.denominator) * 100),
    target: round(target),
    gap: round(gap),
    monthlyPerUnit: round(gap / UNIT_COUNT / 12),
  };
}

