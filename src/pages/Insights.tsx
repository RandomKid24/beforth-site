import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { InsightsDoodle, ArticleDoodle } from '@/components/Doodles';
import { PUBLISHED_INSIGHTS, TOPIC_BACKLOG, formatInsightDate } from '@/data/insights';

/**
 * /insights — long-form articles.
 *
 * This is the highest-leverage section for search and AI answer engines,
 * because it is the only part of the site that can answer a question a prospect
 * is actually typing. Everything else describes BeForth; this explains a
 * problem.
 *
 * When there is nothing published, this page does not show placeholder cards or
 * filler. It states plainly that nothing has been published yet and lists the
 * topics planned. A section of thin articles dilutes topical authority and
 * gives crawlers nothing worth citing, so an honest empty state beats a padded
 * one.
 */
export default function InsightsPage() {
  const articles = PUBLISHED_INSIGHTS;

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap relative">
          <InsightsDoodle className="hidden xl:block absolute right-0 top-6 w-[360px]" />
          <Reveal>
            <div className="rule mb-6" />
            <span className="label block mb-7">Insights</span>
            <h1 className="display-xl text-[clamp(2.2rem,6.4vw,4.8rem)] max-w-[16ch]">
              Practical notes on <span className="accent">running</span> the business.
            </h1>
            <p className="lead max-w-2xl mt-8">
              Written for owners and managers dealing with the systems a business
              actually runs on. No product announcements.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          {articles.length > 0 ? (
            <>
              <div className="rule mb-6" />
              <span className="label block mb-8">All articles</span>
              <div className="border-t border-ink/12">
                {articles.map((a, i) => (
                  <Reveal key={a.slug} delay={Math.min(i, 4) * 0.04}>
                    <Link
                      to={`/insights/${a.slug}`}
                      className="group flex flex-col md:flex-row md:items-start gap-3 md:gap-10 py-6 md:py-8 px-3 -mx-3 border-b border-ink/12 transition-colors duration-300 hover:bg-bone/40"
                    >
                      <span className="body-tight md:w-40 shrink-0">{formatInsightDate(a.publishedOn)}</span>
                      <span className="flex-1">
                        <span className="display-lg text-xl md:text-2xl block transition-colors duration-300 group-hover:text-signal">
                          {a.title}
                        </span>
                        <span className="body block mt-2">{a.summary}</span>
                      </span>
                      <ArticleDoodle slug={a.slug} className="hidden md:block w-32 shrink-0" />
                      <span className="w-8 h-8 border border-ink/15 flex items-center justify-center shrink-0 transition-[background-color,border-color,color] duration-300 group-hover:bg-signal group-hover:border-signal group-hover:text-white">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <Reveal>
              <div className="surface p-7 md:p-10 max-w-3xl">
                <h2 className="display-md text-xl md:text-2xl mb-4">Nothing published yet.</h2>
                <p className="body mb-8">
                  This section is where we write about the problems our work keeps
                  running into — the ones that cost a business time or money before any
                  software is involved. It is deliberately empty rather than filled with
                  thin posts, because short articles written to fill a slot are worse than
                  none.
                </p>
                <span className="label block mb-4">On the list</span>
                <ul className="flex flex-col gap-2.5 mb-9">
                  {TOPIC_BACKLOG.map((t) => (
                    <li key={t} className="flex items-start gap-3 body-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-signal">
                  Ask about a specific problem <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

/** Shown on the footer and sitemap so the section is reachable even while empty. */
export function InsightsTeaser() {
  return (
    <SectionHead
      label="Insights"
      title={<>Notes on <span className="accent">running</span> the business.</>}
    />
  );
}