import { useEffect, useRef } from 'react'
import styles from './homepage.module.css'
import FAQ from '../../components/FAQ/FAQ'

export default function Homepage() {
    const statsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.statVisible)
                    }
                })
            },
            { threshold: 0 }
        )

        statsRef.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const sectionRef = useRef(null)
    const cardRefs = useRef([])
    const serviceRefs = useRef([])

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const scrolled = -rect.top
            const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
            const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))

            cardRefs.current.forEach((el, i) => {
                if (!el) return
                const start = i / 4
                const end = (i + 1) / 4
                const p = Math.max(0, Math.min(1, (progress - start) / (end - start)))
                // Card 0 starts with its top edge 150px from the viewport bottom
                const startY = i === 0
                    ? (window.innerHeight - 150) / window.innerHeight * 100
                    : 100
                el.style.transform = `translateY(${startY * (1 - p)}%)`
            })

            // Show services once card 4 is more than halfway in
            const card4p = Math.max(0, Math.min(1, (progress - 0.75) / 0.25))
            serviceRefs.current.forEach((el) => {
                if (!el) return
                if (card4p > 0.5) {
                    el.classList.add(styles.singleServiceVisible)
                } else {
                    el.classList.remove(styles.singleServiceVisible)
                }
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={styles.homePage}>
            <div className={styles.homeHeader}>
                <div className={styles.navBar}>
                    <img className={styles.syenaLogo} src="/assets/Logo-nome-branco.webp" alt="syena-logo" />
                </div>

                <div>
                    <h1 className={styles.title}>DAMOS ASAS às maiores referências nacionais</h1>
                    <a
                        href="https://form.syenadigital.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    ><span className={styles.mainButton}>
                            sou referência
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span></a>
                </div>
                <div className={styles.container}>
                    <div className={styles.footerWrap}>
                        <span className={styles.tag}>LANÇAMENTOS</span>
                        <span className={styles.tag}>MARCAS PESSOAIS</span>
                        <span className={styles.tag}>INFOPRODUTOS</span>
                    </div>
                </div>
            </div>

            <div className={styles.massiveTitleWrapper}>
                <span className={styles.runningText}>
                    A Syena nasceu da convicção de que a presença digital não é um luxo é uma necessidade.
                    <br /><br />
                    Somos uma agência criativa especializada em branding, design e estratégia digital, com foco em marcas que querem destacar-se num mercado cada vez mais competitivo. Trabalhamos com fundadores, empresas e criadores que recusam ser mais um entre muitos.
                </span>

                <span className={styles.massiveTitle}>
                    MARCAS COM ESSÊNCIA
                </span>

                <div className={styles.stats}>
                    <span ref={(el) => (statsRef.current[0] = el)} className={styles.stat}>+30 marcas</span>
                    <span ref={(el) => (statsRef.current[1] = el)} className={styles.stat}>+1 Milhão gerado</span>
                    <span ref={(el) => (statsRef.current[2] = el)} className={styles.stat}>Top 5% PME's</span>
                </div>

            </div>

            <div ref={sectionRef} className={styles.portfolioSection}>
                <div className={styles.portfolioSticky}>

                    <div className={styles.container}>
                        <div className={styles.clientsTitle}>Algumas marcas <br /> que impulsionamos.</div>
                    </div>
                    <div ref={(el) => (cardRefs.current[0] = el)} className={`${styles.client} ${styles.client1}`}>
                        <span className={styles.clientName}>JORGE COUTINHO</span>
                        <span className={`${styles.clientActivity} ${styles.jorgeActivity}`}>
                            COACH MOTIVATIONAL
                        </span>
                    </div>

                    <div ref={(el) => (cardRefs.current[1] = el)} className={`${styles.client} ${styles.client2}`}>
                        <span className={styles.clientName}>INÊS GAYA</span>
                        <span className={`${styles.clientActivity} ${styles.inesActivity}`}>
                            SAGRADO FEMININO
                        </span>
                    </div>

                    <div ref={(el) => (cardRefs.current[2] = el)} className={`${styles.client} ${styles.client3}`}>
                        <span className={styles.clientName}>RUI ESTRELA</span>
                        <span className={`${styles.clientActivity} ${styles.ruiActivity}`}>
                            FILHOS DO SOL
                        </span>
                    </div>

                    <div ref={(el) => (cardRefs.current[3] = el)} className={`${styles.client} ${styles.client4}`}>
                        <div className={styles.services}>
                            {['BRANDING', 'LANÇAMENTOS', 'SOCIALS', 'CONSULTORIA', 'FORMAÇÃO'].map((s, i) => (
                                <span key={s} ref={(el) => (serviceRefs.current[i] = el)} className={styles.singleService}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.section}>
                <FAQ />
            </section>

            <section className={styles.footer}>
                <img className={styles.syenaLogo} src="/assets/Logo-nome-branco.webp" alt="syena-logo" />
                <p>2026 syena digital. All rights reserved.</p>
            </section>
        </div>
    )
}
