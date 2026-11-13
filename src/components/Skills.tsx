import { skillGroups } from '../data/profile'
import { Reveal } from '../hooks'
import { SectionHeader } from './Ui'

const totalSkills = skillGroups.reduce((sum, group) => sum + group.items.length, 0)

function plural(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

export function Skills() {
  return (
    <section className="section" id="stack">
      <Reveal>
        <SectionHeader
          index="02"
          command="ls -la ~/stack"
          title="stack"
          subtitle="инструменты, которыми решаю задачи"
        />
      </Reveal>

      <Reveal className="skills__meta" delay={40}>
        <span className="skills__meta-path">~/stack</span>
        <span className="skills__meta-info">
          {skillGroups.length} директорий · {totalSkills}{' '}
          {plural(totalSkills, 'инструмент', 'инструмента', 'инструментов')}
        </span>
      </Reveal>

      <div className="skills">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 45}>
            <article className="skill" data-group={group.id}>
              <div className="skill__bar">
                <span className="skill__perm">drwxr-xr-x</span>
                <span className="skill__dir">{group.dir}</span>
                <span className="skill__count">{group.items.length}</span>
              </div>
              <h3 className="skill__title">{group.title}</h3>
              <p className="skill__comment">{group.comment}</p>
              <ul className="skill__items">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="skill__bullet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="skills__note" delay={100}>
        <span className="skills__note-sign">//</span>
        Базы изучаю системно: от ACID и уровней изоляции до партиционирования и оптимизации
        запросов.
      </Reveal>
    </section>
  )
}
