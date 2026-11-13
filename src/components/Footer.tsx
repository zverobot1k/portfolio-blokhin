import { profile } from '../data/profile'
import { Prompt } from './Ui'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__cmd">
        <Prompt path="~" sign="$">
          exit 0
        </Prompt>
        <span className="footer__out">// процесс завершён, но вы можете остаться</span>
      </div>

      <div className="footer__row">
        <span className="footer__copy">
          © {year} {profile.name}
        </span>
        <span className="footer__build">
          built with <span>React</span> + <span>TypeScript</span> + <span>Vite</span>
        </span>
        <span className="footer__hints">
          <kbd>T</kbd> тема
          <kbd>/</kbd> команды
          <kbd>⌘K</kbd> терминал
        </span>
      </div>
    </footer>
  )
}
