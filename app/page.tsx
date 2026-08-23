import Image from "next/image";

const navItems = [
  ["Overview", "overview"],
  ["The research", "numbers"],
  ["The risk", "risk"],
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

      <div className="opening-story">
        <div className="opening-backdrop" aria-hidden="true" />
        <div className="opening-content">
          <section className="hero" id="overview">
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

          <section className="section research-section shell" id="numbers">
            <div className="research-heading">
              <div>
                <p className="eyebrow dark">What the official guidance says</p>
                <h2>The calculation allows these exclusions.</h2>
              </div>
              <p>
                Fannie Mae and Freddie Mac measure the annual replacement-reserve
                allocation against annual budgeted assessment income—not total
                expenditures. Their guidance permits specific income to be left out.
              </p>
            </div>

            <div className="guidance-grid">
              <article className="formula-card">
                <p>Agency calculation</p>
                <div className="formula-line">
                  <strong>Annual replacement-reserve allocation</strong>
                  <span aria-hidden="true">÷</span>
                  <strong>Annual budgeted assessment income</strong>
                </div>
                <b>Must equal at least 15%</b>
              </article>

              <article className="exclusions-card">
                <p>Income that may be excluded</p>
                <ul>
                  <li>Utility pass-through income, including cable or internet</li>
                  <li>Special-assessment income</li>
                  <li>Income allocated to reserve accounts</li>
                  <li>Qualifying incidental income</li>
                </ul>
              </article>
            </div>

            <div className="pass-through-proof">
              <div className="proof-intro">
                <p className="eyebrow dark">What our financials show</p>
                <h3>Cable and sewer behave like pass-throughs.</h3>
                <p>
                  In the January–June 2026 budget, the amount collected from owners
                  almost exactly offsets the corresponding provider expense.
                </p>
              </div>

              <div className="proof-cards" aria-label="Cable and sewer budget evidence">
                <article>
                  <div><span>Cable</span><small>Near 1:1 offset</small></div>
                  <dl>
                    <div><dt>Collected</dt><dd>{money(23976.5, 2)}</dd></div>
                    <div><dt>Provider expense</dt><dd>{money(23976, 2)}</dd></div>
                  </dl>
                </article>
                <article>
                  <div><span>Sewer</span><small>Near 1:1 offset</small></div>
                  <dl>
                    <div><dt>Collected</dt><dd>{money(31244, 2)}</dd></div>
                    <div><dt>Provider expense</dt><dd>{money(31244.48, 2)}</dd></div>
                  </dl>
                </article>
              </div>
            </div>

            <aside className="record-callout">
              <span className="record-icon" aria-hidden="true">✓</span>
              <div>
                <p>Make the record airtight</p>
                <h3>Confirm the classification in writing.</h3>
                <p>
                  The association should obtain a short written statement from
                  management confirming that cable and recurring sewer collections
                  merely offset the corresponding provider charges.
                </p>
                <small>
                  The agency rules permit these exclusions; the reviewing lender makes
                  the final project-eligibility determination.
                </small>
              </div>
            </aside>
          </section>
        </div>
      </div>

      <section className="calculation-strip" aria-labelledby="calculation-title">
        <div className="shell calculation-shell">
          <div className="calculation-heading">
            <div>
              <p className="eyebrow">2026 adopted budget math</p>
              <h2 id="calculation-title">How the <em>16.06%</em> is calculated.</h2>
            </div>
            <p>
              This uses assessment income that remains after the permitted
              pass-through exclusions.
            </p>
          </div>

          <div className="calculation-flow" aria-label="Reserve funding calculation">
            <article>
              <small>Regular HOA + COA assessments</small>
              <strong>{money(194150)}</strong>
            </article>
            <span aria-hidden="true">+</span>
            <article>
              <small>Insurance assessments</small>
              <strong>{money(79342)}</strong>
            </article>
            <span aria-hidden="true">=</span>
            <article>
              <small>Eligible assessment income</small>
              <strong>{money(273492)}</strong>
            </article>
            <span aria-hidden="true">×</span>
            <article>
              <small>15% requirement</small>
              <strong>{money(41023.8, 2)}</strong>
            </article>
            <span aria-hidden="true">vs.</span>
            <article>
              <small>Current allocation</small>
              <strong>{money(43936)}</strong>
            </article>
            <span aria-hidden="true">=</span>
            <article className="calculation-result">
              <small>Amount above minimum</small>
              <strong>{money(2912.2, 2)}</strong>
            </article>
          </div>

          <div className="calculation-footnote">
            <strong>Current funding rate <span>16.06%</span></strong>
            <p>Cable and sewer are excluded as permitted pass-throughs.</p>
          </div>
        </div>
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
              href="https://selling-guide.fanniemae.com/sel/b4-2.2-02/full-review-process"
              target="_blank"
              rel="noreferrer"
            >
              Fannie Mae Full Review Guide ↗
            </a>
            <a
              href="https://guide.freddiemac.com/app/servicing/section/5701.6"
              target="_blank"
              rel="noreferrer"
            >
              Freddie Mac Guide §5701.6 ↗
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
