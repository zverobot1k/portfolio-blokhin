import { education, profile } from '../data/profile'
import { Reveal } from '../hooks'
import { Prompt, SectionHeader } from './Ui'

export function Education() {
  return (
    <section className="section" id="education">
      <Reveal>
        <SectionHeader
          index="04"
          command="git log --education"
          title="education"
          subtitle="академическая база под backend"
        />
      </Reveal>

      <Reveal className="gitlog" delay={60}>
        <div className="gitlog__top">
          <Prompt path="~/education" sign="$">
            git log --oneline --graph
          </Prompt>
          <span className="gitlog__count">2 commits</span>
        </div>

        <div className="gitlog__body">
          {education.map((entry) => (
            <article className="commit" key={entry.school}>
              <div className="commit__rail" aria-hidden="true">
                <span className={`commit__dot ${entry.current ? 'is-current' : ''}`} />
              </div>

              <div className="commit__card">
                <div className="commit__head">
                  <span className="commit__hash">{entry.hash}</span>
                  <span className="commit__refs">({entry.branch})</span>
                  {entry.current ? <span className="commit__now">HEAD</span> : null}
                </div>

                <div className="commit__title-row">
                  <h3 className="commit__school">{entry.school}</h3>
                  <span className="commit__period">{entry.period}</span>
                </div>
                <p className="commit__degree">{entry.degree}</p>

                {entry.bullets.length > 0 ? (
                  <ul className="commit__bullets">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span className="commit__plus" aria-hidden="true">
                          +
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="commit__empty">// база: математика, информатика, инженерия</p>
                )}

                <div className="commit__author">
                  <span>Author: {profile.name}</span>
                  <span className="commit__author-mail">&lt;{profile.email}&gt;</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="gitlog__foot">
          <span className="gitlog__foot-star">*</span>
          <span>working tree clean</span>
          <span className="gitlog__foot-right">branch: main</span>
        </div>
      </Reveal>
    </section>
  )
}
