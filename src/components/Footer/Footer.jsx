import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p>© Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer