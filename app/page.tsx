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
          <span className="brand-mark" aria-hidden="true">15</span>
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
              Meeting the new standard means increasing our annual reserve allocation
              by {money(3122)}.
            </p>
            <div className="hero-tags" aria-label="Key reserve facts">
              <span>Effective January 4, 2027</span>
              <span>Based on the 2026 budget</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Quarterly owner impact">
            <p>Estimated owner increase</p>
            <strong>{money(12.8, 2)}</strong>
            <span>more per quarter</span>

            <div className="meter-row">
              <div className="meter" aria-label="Current allocation is 14 percent toward a 15 percent requirement">
                <span>14.00%</span>
              </div>
              <div>
                <small>Current allocation</small>
                <b>Target: 15.00%</b>
              </div>
            </div>
            <small className="hero-card-note">Equal-share estimate across 61 owners.</small>
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
            <strong>{money(47058)}</strong>
          </div>
          <div className="decision-gap">
            <small>Annual gap</small>
            <strong>{money(3122)}</strong>
          </div>
        </div>
      </section>

      <section className="section scenarios-section shell" id="numbers">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">What it costs</p>
            <h2>{money(12.8, 2)} more per owner per quarter.</h2>
          </div>
          <p>
            That is the estimated equal-share increase needed to close the current
            reserve-allocation gap and reach 15%.
          </p>
        </div>

        <div className="scenario-output fixed-answer">
          <div className="scenario-summary">
            <p className="result-kicker">The owner impact</p>
            <strong className="result-gap">{money(12.8, 2)}</strong>
            <p className="result-label">more per owner each quarter</p>
            <div className="result-pill">
              <span>{money(51.18, 2)} per year</span>
              <span>61-owner equal-share estimate</span>
            </div>
          </div>

          <div className="math-card" aria-label="15 percent reserve calculation">
            <div>
              <span>Eligible assessment income</span>
              <b>{money(313720)}</b>
            </div>
            <div className="math-symbol">× 15%</div>
            <div>
              <span>Required annual allocation</span>
              <b>{money(47058)}</b>
            </div>
            <div className="math-symbol">− {money(43936)}</div>
            <div className="math-total">
              <span>Annual gap to close</span>
              <b>{money(3122)}</b>
            </div>
          </div>
        </div>

        <p className="calculation-note">
          Cable pass-through charges and sewer special-assessment income are excluded
          from the settled {money(313720)} calculation. Actual owner billing may vary if
          the association does not divide the increase equally.
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
          <p>A small quarterly increase closes the current budget gap.</p>
        </div>

        <div className="evidence-copy">
          <p className="eyebrow dark">If we stay below 15%</p>
          <h2 id="risk-title">The risk is financing friction.</h2>
          <p className="evidence-intro">
            For applicable Full Review loan applications dated January 4, 2027 or
            later, an underfunded budget can make a unit harder to finance.
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
              <h2>Fund the full <em>{money(47058)}</em>.</h2>
              <p>
                Increasing the annual reserve allocation by {money(3122)} reaches the
                15% standard using the current eligible assessment income.
              </p>
            </div>
            <div className="recommendation-number">
              <span>Estimated quarterly increase</span>
              <strong>{money(12.8, 2)}</strong>
              <b>per owner</b>
              <small>Equal-share estimate across 61 owners.</small>
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
            Adopt a 2027 budget that allocates at least
            <strong> {money(47058)} to replacement reserves.</strong> This closes the
            {` ${money(3122)} `}annual gap—approximately {money(12.8, 2)} more per
            owner per quarter if divided equally.
          </blockquote>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <strong>Reserve Health Guide</strong>
            <p>
              Planning estimates based on the 2026 adopted budget and June 30, 2026
              financial report. Final eligibility determinations belong to the reviewing
              lender.
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
