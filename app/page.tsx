"use client";

import { useState } from "react";
import Image from "next/image";
import {
  calculateScenario,
  RESERVE_ALLOCATION,
  SCENARIOS,
} from "./lib/scenarios.mjs";

const navItems = [
  ["Overview", "overview"],
  ["Calculation", "scenarios"],
  ["Evidence", "evidence"],
  ["Plan", "plan"],
  ["Action", "action"],
];

const scenarioNotes = {
  "both-excluded": {
    badge: "Recommended treatment",
    note: "Excludes separately itemized cable and the sewer special assessment.",
  },
  "sewer-included": {
    badge: "Sensitivity check",
    note: "Excludes cable, but counts sewer in assessment income.",
  },
  "none-excluded": {
    badge: "Upper-bound check",
    note: "Counts both cable and sewer in assessment income.",
  },
};

const money = (value: number, digits = 0) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function Home() {
  const [scenarioId, setScenarioId] = useState("both-excluded");
  const scenario = calculateScenario(scenarioId);
  const note = scenarioNotes[scenarioId as keyof typeof scenarioNotes];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="Reserve readiness overview">
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
            <p className="eyebrow">Association reserve health guide</p>
            <h1>Closing the <em>15%</em> reserve gap</h1>
            <p className="hero-intro">
              A clear view of what we fund today, what the new rule requires, and the
              practical path to stronger reserves.
            </p>
            <div className="hero-tags" aria-label="Key reserve facts">
              <span>Effective January 4, 2027</span>
              <span>Based on the 2026 budget</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Likely shortfall summary">
            <p>Likely annual shortfall</p>
            <strong>{money(3122)}</strong>
            <span>About $4.27 per unit / month</span>

            <div className="meter-row">
              <div className="meter" aria-label="Current allocation is 14 percent toward a 15 percent requirement">
                <span>14.00%</span>
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

      <section className="decision-band">
        <div className="shell decision-grid">
          <div>
            <small>Current annual allocation</small>
            <strong>{money(RESERVE_ALLOCATION)}</strong>
          </div>
          <span className="decision-arrow" aria-hidden="true">→</span>
          <div>
            <small>Recommended 2027 allocation</small>
            <strong>{money(50000)}</strong>
          </div>
          <p>
            The association is close to the new minimum. A modest increase creates
            compliance headroom and improves long-term reserve health.
          </p>
        </div>
      </section>

      <section className="section scenarios-section shell" id="scenarios">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">How the calculation works</p>
            <h2>Our supported denominator is {money(313720)}.</h2>
          </div>
          <p>
            Fannie Mae and Freddie Mac allow utility pass-throughs, special-assessment
            income, and reserve income to be excluded. The other tabs remain available as
            sensitivity checks—not competing recommendations.
          </p>
        </div>

        <div className="scenario-tabs" role="group" aria-label="Choose a reserve calculation scenario">
          {SCENARIOS.map((item: { id: string; label: string }) => {
            const itemNote = scenarioNotes[item.id as keyof typeof scenarioNotes];
            const selected = item.id === scenarioId;
            return (
              <button
                type="button"
                className={selected ? "scenario-tab active" : "scenario-tab"}
                aria-pressed={selected}
                onClick={() => setScenarioId(item.id)}
                key={item.id}
              >
                <span>{itemNote.badge}</span>
                <strong>{item.label}</strong>
                <small>{itemNote.note}</small>
              </button>
            );
          })}
        </div>

        <div className="scenario-output" aria-live="polite">
          <div className="scenario-summary">
            <p className="result-kicker">{note.badge} case</p>
            <strong className="result-gap">{money(scenario.gap)}</strong>
            <p className="result-label">annual shortfall</p>
            <div className="result-pill">
              <span>{scenario.currentPct.toFixed(2)}% funded</span>
              <span>{money(scenario.monthlyPerUnit, 2)} / unit / month</span>
            </div>
          </div>

          <div className="math-card">
            <div>
              <span>Qualifying assessments</span>
              <b>{money(scenario.denominator)}</b>
            </div>
            <div className="math-symbol">× 15%</div>
            <div>
              <span>Required annual allocation</span>
              <b>{money(scenario.target)}</b>
            </div>
            <div className="math-symbol">− {money(RESERVE_ALLOCATION)}</div>
            <div className="math-total">
              <span>Gap to close</span>
              <b>{money(scenario.gap)}</b>
            </div>
          </div>
        </div>

        <div className="exclusion-note">
          <span className="note-mark" aria-hidden="true">i</span>
          <div>
            <strong>Recommended treatment</strong>
            <p>
              Exclude cable ({money(47953)}) as an owner utility pass-through and sewer
              ({money(62388)}) as special-assessment income. That produces the supported
              {money(313720)} denominator used throughout this guide.
            </p>
          </div>
        </div>
      </section>

      <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
        <div className="evidence-photo">
          <Image
            src="/dock-lake.jpg"
            alt="Community dock slips and shoreline at St. Moritz on the Lake"
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
          />
          <p>Reserves protect the property we all share—from shoreline to structure.</p>
        </div>

        <div className="evidence-copy">
          <p className="eyebrow dark">Evidence from owner billing</p>
          <h2 id="evidence-title">What owner statements confirm.</h2>
          <p className="evidence-intro">
            Representative 2025–2026 statements separate the recurring condo charge from
            reserves and other owner-funded items. No owner-identifying information is
            included here.
          </p>

          <div className="evidence-list">
            <article>
              <span aria-hidden="true">01</span>
              <div>
                <strong>Cable is itemized separately</strong>
                <p>It appears as its own quarterly owner charge, supporting pass-through treatment.</p>
              </div>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <div>
                <strong>Sewer is a special assessment</strong>
                <p>Many owners have prepaid it, so it should not be treated as durable 2027 operating income.</p>
              </div>
            </article>
            <article>
              <span aria-hidden="true">03</span>
              <div>
                <strong>Reserves already have a clear line</strong>
                <p>Statements identify the condo reserve charge separately from the regular unit assessment.</p>
              </div>
            </article>
            <article>
              <span aria-hidden="true">04</span>
              <div>
                <strong>Other assessments remain distinct</strong>
                <p>Insurance is separately assessed, and dock charges are issued through a separate Dock Fund.</p>
              </div>
            </article>
          </div>

          <p className="evidence-caveat">
            Planning conclusion: {money(313720)} is the supported denominator. Keep the
            cable and sewer classifications with the budget package; the lender or project
            reviewer makes the final eligibility determination.
          </p>
        </div>
      </section>

      <section className="section plan-section" id="plan">
        <div className="shell">
          <div className="recommendation">
            <div className="recommendation-copy">
              <p className="eyebrow">Recommended target</p>
              <h2>Budget the greater of <em>$50,000</em> or 15%.</h2>
              <p>
                That creates a modest cushion above the likely requirement and makes the
                reserve allocation unmistakable to a lender reviewing the project.
              </p>
            </div>
            <div className="recommendation-number">
              <span>Additional annual funding</span>
              <strong>{money(6064)}</strong>
              <b>≈ $8.28 per unit / month</b>
              <small>Across 61 units; actual allocation may vary by unit class.</small>
            </div>
          </div>

          <div className="steps-heading">
            <div>
              <p className="eyebrow dark">What members should know</p>
              <h2>Three moves to stronger reserves.</h2>
            </div>
            <p>
              Reserve cash on hand matters for long-term health, while the agency test
              focuses on what each annual budget commits to replacement reserves.
            </p>
          </div>

          <ol className="steps-grid">
            <li>
              <span>01</span>
              <h3>Document the exclusions</h3>
              <p>
                Label cable as an owner utility pass-through and sewer as special-assessment
                income in the budget and supporting workpapers.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Make the allocation explicit</h3>
              <p>
                Add a line labeled “Replacement Reserve Allocation—Capital Expenditures
                and Deferred Maintenance” and transfer it monthly.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Choose the funding source</h3>
              <p>
                Cover the increase with a modest dues adjustment or a durable operating
                reduction—not a special assessment used as a substitute.
              </p>
            </li>
          </ol>

          <div className="watchouts">
            <article>
              <span className="status-dot good" aria-hidden="true" />
              <div>
                <strong>Timing is manageable</strong>
                <p>The new 15% minimum applies to applicable Full Review applications dated on or after January 4, 2027.</p>
              </div>
            </article>
            <article>
              <span className="status-dot caution" aria-hidden="true" />
              <div>
                <strong>A reserve study is not a shortcut</strong>
                <p>If used, the budget must fund its highest recommended allocation; baseline funding is no longer accepted after August 3, 2026.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="motion-section" id="action">
        <div className="shell motion-grid">
          <div className="motion-label">
            <p className="eyebrow">Recommended board action</p>
            <span>Ongoing budget direction</span>
          </div>
          <blockquote>
            Adopt a 2027 budget with the greater of
            <strong> $50,000 or 15% of qualifying assessment income</strong> allocated
            explicitly to replacement reserves. Document cable as an owner utility
            pass-through and sewer as special-assessment income, excluding both from the
            reserve denominator.
          </blockquote>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <strong>Reserve Health Guide</strong>
            <p>
              Planning estimates based on the 2026 adopted budget, June 30, 2026 financial
              report, and representative 2025–2026 owner statements reviewed privately.
              Final eligibility determinations belong to the reviewing lender.
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
            <a
              href="https://guide.freddiemac.com/app/guide/section/5701.6"
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
