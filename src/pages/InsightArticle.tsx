import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import NotFound from './NotFound';
import { PUBLISHED_INSIGHTS, formatInsightDate } from '@/data/insights';
import { getPlatform } from '@/components/platforms/catalog';
import { ArticleDoodle } from '@/components/Doodles';

/** /insights/:slug — one article. Unknown slugs fall through to the 404 page. */
export default function InsightArticle() {
  const { slug } = useParams();
  const a = PUBLISHED_INSIGHTS.find((x) => x.slug === slug);
  if (!a) return <NotFound />;

  const related = (a.relatedProducts ?? [])
    .map((s) => getPlatform(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const others = PUBLISHED_INSIGHTS.filter((x) => x.slug !== a.slug);

  return (
    <article>
      <header className="pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="wrap relative">
          <ArticleDoodle slug={a.slug} className="hidden xl:block absolute right-0 top-14 w-[300px]" />
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 label">
            <Link to="/" className="hover:text-signal transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link to="/insights" className="hover:text-signal transition-colors">Insights</Link>
          </nav>
          <div className="rule mb-6" />
          <h1 className="display-xl text-[clamp(2rem,5.2vw,4rem)] max-w-[22ch]">{a.title}</h1>
          <p className="lead max-w-2xl mt-7">{a.summary}</p>
          <p className="body-tight mt-6">
            By BeForth ·{' '}
            <time dateTime={a.publishedOn}>{formatInsightDate(a.publishedOn)}</time>
          </p>
        </div>
      </header>

      <div className="pb-16 md:pb-20">
        <div className="wrap">
          <div className="max-w-2xl">
            {a.sections.map((s) => (
              <section key={s.heading} className="mb-10 md:mb-12">
                <h2 className="display-lg text-[clamp(1.4rem,2.6vw,1.9rem)] mb-4">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="body mb-4">{p}</p>
                ))}
                {s.points && (
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 body">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2.5 shrink-0" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      {(related.length > 0 || others.length > 0) && (
        <aside className="pb-16 md:pb-20">
          <div className="wrap grid md:grid-cols-2 gap-10">
            {related.length > 0 && (
              <div>
                <span className="label block mb-4">Related products</span>
                <ul>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/product/${r.slug}`}
                        className="flex items-center justify-between py-3 border-b border-ink/12 hover:text-signal transition-colors"
                      >
                        <span className="display-md text-base">{r.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {others.length > 0 && (
              <div>
                <span className="label block mb-4">More from Insights</span>
                <ul>
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        to={`/insights/${o.slug}`}
                        className="flex items-center justify-between gap-4 py-3 border-b border-ink/12 hover:text-signal transition-colors"
                      >
                        <span className="display-md text-base">{o.title}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      )}

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="surface-ink p-7 md:p-10 max-w-3xl">
            <h2 className="display-md text-xl md:text-2xl text-paper mb-4">Talk it through with us.</h2>
            <p className="body !text-paper/75 mb-7">
              Tell us how your business runs today and we will say honestly whether custom
              software helps.
            </p>
            <Link to="/contact" className="btn-paper">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
