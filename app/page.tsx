import Image from "next/image";

const navItems = [
  ["Overview", "overview"],
  ["The numbers", "numbers"],
  ["The risk", "risk"],
  ["Board action", "action"],
];

const money = (value: number, digits = 0) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="Reserve funding overview">
          <span className="brand-mark" aria-hidden="true">15%</span>
          <span>
            <strong>Reserve Health Guide</strong>
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
            <p className="eyebrow">2027 reserve funding</p>
            <h1>The <em>15%</em> decision, made simple.</h1>
            <p className="hero-intro">
              The 2026 adopted budget is already above 15%, allocating 16.06% to
              reserves. No dues increase is needed solely to meet the standard.
            </p>
            <div className="hero-tags" aria-label="Key reserve facts">
              <span>Effective January 4, 2027</span>
              <span>Based on the 2026 budget</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Quarterly owner impact">
            <p>Additional owner increase</p>
            <strong>{money(0, 2)}</strong>
            <span>per quarter</span>

            <div className="meter-row">
              <div className="meter" aria-label="Current allocation is 16.06 percent, above the 15 percent requirement">
                <span>16.06%</span>
              </div>
              <div>
                <small>Current allocation</small>
                <b>Target: 15.00%</b>
              </div>
            </div>
            <small className="hero-card-note">Based on the adopted 2026 budget and permitted exclusions.</small>
          </aside>
        </div>

        <a className="scroll-cue" href="#numbers">
          See the numbers <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="decision-band" aria-label="Reserve funding summary">
        <div className="shell decision-grid simple">
          <div>
            <small>Current annual allocation</small>
            <strong>{money(43936)}</strong>
          </div>
          <span className="decision-arrow" aria-hidden="true">→</span>
          <div>
            <small>15% annual requirement</small>
            <strong>{money(41023.8, 2)}</strong>
          </div>
          <div className="decision-gap">
            <small>Amount above 15%</small>
            <strong>{money(2912.2, 2)}</strong>
          </div>
        </div>
      </section>

      <section className="section scenarios-section shell" id="numbers">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">What it costs</p>
            <h2>{money(0, 2)} additional per owner per quarter.</h2>
          </div>
          <p>
            The current reserve allocation already exceeds the 15% line-item minimum,
            so no new owner charge is needed for this requirement.
          </p>
        </div>

        <div className="scenario-output fixed-answer">
          <div className="scenario-summary">
            <p className="result-kicker">The owner impact</p>
            <strong className="result-gap">{money(0, 2)}</strong>
            <p className="result-label">additional per owner per quarter</p>
            <div className="result-pill">
              <span>Current funding already clears 15%</span>
              <span>No equal-share assumption needed</span>
            </div>
          </div>

          <div className="math-card" aria-label="15 percent reserve calculation">
            <div>
              <span>Regular HOA + COA assessments</span>
              <b>{money(194150)}</b>
            </div>
            <div>
              <span>+ Insurance assessments</span>
              <b>{money(79342)}</b>
            </div>
            <div>
              <span>Eligible assessment income</span>
              <b>{money(273492)}</b>
            </div>
            <div className="math-symbol">× 15% = {money(41023.8, 2)}</div>
            <div className="math-symbol">Current reserves: {money(43936)}</div>
            <div className="math-total">
              <span>Amount above the minimum</span>
              <b>{money(2912.2, 2)}</b>
            </div>
          </div>
        </div>

        <p className="calculation-note">
          Cable ({money(47953)}), sewer ({money(62488)}), special-assessment income,
          reserve-account income, and incidental income are excluded as permitted.
          Insurance assessments remain included as operating-assessment income.
        </p>
      </section>

      <section className="evidence-section" id="risk" aria-labelledby="risk-title">
        <div className="evidence-photo">
          <Image
            src="/dock-lake.jpg"
            alt="Community dock slips and shoreline at St. Moritz on the Lake"
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
          />
        </div>

        <div className="evidence-copy">
          <p className="eyebrow dark">If we stay below 15%</p>
          <h2 id="risk-title">The risk is financing friction.</h2>
          <p className="evidence-intro">
            If a future budget falls below 15%, applicable Full Review loan applications
            dated January 4, 2027 or later can face additional financing hurdles.
          </p>

          <div className="evidence-list risk-list">
            <article>
              <span aria-hidden="true">01</span>
              <div>
                <strong>Fewer conventional financing options</strong>
                <p>Some buyers may need a different loan path or lender.</p>
              </div>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <div>
                <strong>Sale or refinancing delays</strong>
                <p>Project-review questions can slow down an otherwise qualified loan.</p>
              </div>
            </article>
            <article>
              <span aria-hidden="true">03</span>
              <div>
                <strong>A smaller buyer pool</strong>
                <p>Financing uncertainty can make our units less attractive to some buyers.</p>
              </div>
            </article>
          </div>

          <p className="evidence-caveat">
            Falling below 15% is not an automatic financing ban. An acceptable reserve
            study or other lender-approved pathway may apply, but those routes add
            uncertainty and documentation.
          </p>
        </div>
      </section>

      <section className="section plan-section" id="plan">
        <div className="shell">
          <div className="recommendation simple-recommendation">
            <div className="recommendation-copy">
              <p className="eyebrow">The straightforward choice</p>
              <h2>Maintain the full <em>{money(43936)}</em>.</h2>
              <p>
                The existing annual allocation equals 16.06% of eligible assessment
                income and provides a {money(2912.2, 2)} cushion above the minimum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="motion-section" id="action">
        <div className="shell motion-grid">
          <div className="motion-label">
            <p className="eyebrow">Recommended board action</p>
            <span>2027 budget direction</span>
          </div>
          <blockquote>
            Maintain at least 15% of eligible assessment income for replacement
            reserves, show the calculation in the annual budget, and recalculate it
            each year. The current {money(43936)} allocation satisfies the standard
            using the adopted 2026 budget.
          </blockquote>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <strong>Reserve Health Guide</strong>
            <p>
              Planning estimates based on the 2026 adopted budget and June 30, 2026
              financial report. This measures the agency budget line-item requirement,
              not long-term reserve adequacy. Final eligibility determinations belong
              to the reviewing lender.
            </p>
          </div>
          <div className="source-links">
            <span>Official guidance</span>
            <a
              href="https://singlefamily.fanniemae.com/media/document/pdf/lender-letter-ll-2026-03-updates-project-standards-property-insurance-requirements"
              target="_blank"
              rel="noreferrer"
            >
              Fannie Mae LL-2026-03 ↗
            </a>
            <a
              href="https://guide.freddiemac.com/ci/okcsFattach/get/1010547_3"
              target="_blank"
              rel="noreferrer"
            >
              Freddie Mac Bulletin 2026-C ↗
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
