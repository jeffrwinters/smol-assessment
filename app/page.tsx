import { calculateScenario } from "./lib/scenarios.mjs";

const defaultScenario = calculateScenario("both-excluded");

const navItems = [
  ["Overview", "overview"],
  ["Scenarios", "scenarios"],
  ["Plan", "plan"],
  ["Motion", "motion"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="Reserve readiness overview">
          <span className="brand-mark" aria-hidden="true">15</span>
          <span>
            <strong>Reserve Readiness</strong>
            <small>St. Moritz on the Lake</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>

        <details className="mobile-nav">
          <summary aria-label="Open navigation menu">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <a href={`#${id}`} key={id}>{label}</a>
            ))}
          </nav>
        </details>
      </header>

      <section className="hero" id="overview">
        <div className="hero-shade" />
        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow">2027 board briefing</p>
            <h1>Closing the <em>15%</em> reserve gap</h1>
            <p className="hero-intro">
              A focused plan to protect financing eligibility, strengthen our reserves,
              and make the smallest responsible budget change.
            </p>
            <div className="hero-tags" aria-label="Key briefing facts">
              <span>Effective January 4, 2027</span>
              <span>Planning estimate</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Likely shortfall summary">
            <p>Likely annual shortfall</p>
            <strong>${defaultScenario.gap.toLocaleString("en-US")}</strong>
            <span>About ${defaultScenario.monthlyPerUnit.toFixed(2)} per unit / month</span>

            <div className="meter-row">
              <div className="meter" aria-label="Current allocation is 14 percent toward a 15 percent requirement">
                <span>{defaultScenario.currentPct.toFixed(2)}%</span>
              </div>
              <div>
                <small>Current allocation</small>
                <b>Target: 15.00%</b>
              </div>
            </div>
          </aside>
        </div>

        <a className="scroll-cue" href="#scenarios">
          See the calculation <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="preview-anchor shell" id="scenarios" aria-label="Scenario analysis coming next">
        <p className="eyebrow dark">The decision in one view</p>
        <h2>One percentage point. One practical plan.</h2>
      </section>
      <div id="plan" className="anchor-target" />
      <div id="motion" className="anchor-target" />
    </main>
  );
}

