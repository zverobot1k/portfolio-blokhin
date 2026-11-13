import { profile } from '../data/profile'
import { useMoscowClock, Reveal } from '../hooks'
import { CopyButton } from './CopyButton'
import { SectionHeader } from './Ui'
import {
  ArrowUpRightIcon,
  GitHubIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TelegramIcon,
} from './Icons'

export function Contact() {
  const clock = useMoscowClock()

  return (
    <section className="section section--contact" id="contact">
      <Reveal>
        <SectionHeader
          index="05"
          command="./contact --now"
          title="contact"
          subtitle="открыт к предложениям и интересным задачам"
        />
      </Reveal>

      <div className="contact">
        <Reveal className="contact__intro" delay={60}>
          <p className="contact__echo">
            <span className="contact__echo-prompt">$</span> echo "let&apos;s talk" &gt;{' '}
            <span className="contact__echo-target">inbox</span>
            <span className="caret" aria-hidden="true" />
          </p>

          <h3 className="contact__title">
            Давайте сделаем
            <br />
            что-то <span>надёжное</span>.
          </h3>

          <p className="contact__text">
            Ищу позицию backend-разработчика, где можно расти: API, данные, инфраструктура.
            Открыт к стажировкам, junior-позициям и интересным пет-коллаборациям.
          </p>

          <div className="contact__status">
            <span className="live-dot" aria-hidden="true" />
            <span>open to opportunities</span>
            <span className="contact__status-sep">·</span>
            <span className="contact__status-loc">
              <MapPinIcon size={13} /> Москва
            </span>
            <span className="contact__status-sep">·</span>
            <span className="contact__status-time">{clock} MSK</span>
          </div>
        </Reveal>

        <Reveal className="contact__list" delay={140}>
          <div className="contact-card">
            <span className="contact-card__icon">
              <MailIcon size={19} />
            </span>
            <div className="contact-card__body">
              <span className="contact-card__label">email</span>
              <a className="contact-card__value" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <CopyButton value={profile.email} label="copy" copiedLabel="ok" />
          </div>

          <a
            className="contact-card"
            href={profile.telegramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-card__icon">
              <TelegramIcon size={19} />
            </span>
            <div className="contact-card__body">
              <span className="contact-card__label">telegram</span>
              <span className="contact-card__value">{profile.telegram}</span>
            </div>
            <ArrowUpRightIcon size={17} className="contact-card__arrow" />
          </a>

          <a
            className="contact-card"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-card__icon">
              <GitHubIcon size={19} />
            </span>
            <div className="contact-card__body">
              <span className="contact-card__label">github</span>
              <span className="contact-card__value">github.com/{profile.github}</span>
            </div>
            <ArrowUpRightIcon size={17} className="contact-card__arrow" />
          </a>

          <div className="contact-card">
            <span className="contact-card__icon">
              <PhoneIcon size={19} />
            </span>
            <div className="contact-card__body">
              <span className="contact-card__label">phone</span>
              <a className="contact-card__value" href={`tel:${profile.phoneRaw}`}>
                {profile.phone}
              </a>
            </div>
            <CopyButton value={profile.phoneRaw} label="copy" copiedLabel="ok" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
