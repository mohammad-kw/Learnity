import React from "react";

/**
 * Shared, Learnity-branded layout for legal / policy style pages.
 *
 * Props:
 *  - title:       page title (string)
 *  - subtitle:    short intro paragraph shown under the title (string)
 *  - meta:        small label above the title, e.g. "Effective Date: ..." (string)
 *  - sections:    array of { heading?, paragraphs?: string[], bullets?: string[] }
 *  - footer:      optional node rendered after the sections (e.g. contact card)
 */
const LegalLayout = ({ title, subtitle, meta, sections = [], footer }) => {
  return (
    <div className="relative overflow-hidden bg-richblack-900 text-richblack-300">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[130px]" />

      <div className="relative mx-auto w-11/12 max-w-[820px] py-16 lg:py-24">
        {/* Header */}
        <header className="text-center">
          {meta && (
            <span className="inline-block rounded-full border border-white/10 bg-richblack-800 px-4 py-1 text-xs font-medium uppercase tracking-wider text-purple-200">
              {meta}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-bold text-richblack-5 lg:text-5xl">
            <span className="gradient-text">{title}</span>
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-richblack-300">
              {subtitle}
            </p>
          )}
        </header>

        {/* Content card */}
        <div className="glass-card mt-12 rounded-2xl border border-white/10 bg-richblack-800/50 p-6 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col gap-10">
            {sections.map((section, i) => (
              <section key={i} className="scroll-mt-24">
                {section.heading && (
                  <h2 className="flex items-baseline gap-3 text-xl font-semibold text-richblack-5">
                    <span className="gradient-text text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p
                    key={j}
                    className="mt-3 text-[15px] leading-7 text-richblack-300"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[15px] leading-7 text-richblack-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        {footer && <div className="mt-8">{footer}</div>}
      </div>
    </div>
  );
};

/** Branded contact card used at the bottom of legal pages. */
export const LegalContactCard = ({
  heading = "Contact Us",
  intro = "If you have any questions or concerns, please reach out to us:",
}) => {
  return (
    <div className="rounded-2xl border border-purple-300/20 bg-purple-900/10 p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-richblack-5">{heading}</h2>
      <p className="mt-2 text-[15px] leading-7 text-richblack-300">{intro}</p>
      <div className="mt-4 flex flex-col gap-1.5 text-[15px] text-richblack-200">
        <span className="font-semibold text-richblack-5">Learnity</span>
        <a
          href="mailto:info@learnity.com"
          className="text-purple-200 transition-colors hover:text-purple-100"
        >
          info@learnity.com
        </a>
      </div>
    </div>
  );
};

export default LegalLayout;
