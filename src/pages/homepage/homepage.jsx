import { useEffect, useRef, useState } from 'react'
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
    const [activeCards, setActiveCards] = useState([false, false, false, false])

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const scrolled = -rect.top
            const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
            const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))

            setActiveCards([
                progress > 0,
                progress > 0.33,
                progress > 0.66,
                progress > 0.95,
            ])
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={styles.homePage}>
            <div className={styles.homeHeader}>
                <div className={styles.navBar}>
                    <img className={styles.syenaLogo} src="/assets/Logo-nome-branco.webp" alt="syena-logo" />
                    {/* <div>
                        <span>SOBRE</span>
                        <span>CLIENTES</span>
                        <span>CAPS</span>
                        <span>MAIS</span>
                    </div> */}
                </div>


                <div>
                    <h1 className={styles.title}>DAMOS ASAS às maiores referências nacionais</h1>

                    {/* <h1 className={styles.title}>DAMOS <br /> ASAS</h1>
                    <span className={styles.subTitle}>às maiores referências nacionais</span> */}
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

                <div className={styles.container}>
                    <div className={styles.clientsTitle}>Algumas marcas <br /> que impulsionamos.</div>
                </div>

            </div>

            <div ref={sectionRef} className={styles.portfolioSection}>
                <div className={styles.portfolioSticky}>
                    <div className={`${styles.client} ${styles.client1} ${activeCards[0] ? styles.clientActive : ''}`} >
                        <span className={styles.clientName}>JORGE COUTINHO</span>
                        <span className={`${styles.clientActivity} ${styles.jorgeActivity}`}>
                            COACH MOTIVATIONAL
                        </span>

                    </div>



                    <div className={`${styles.client} ${styles.client2} ${activeCards[1] ? styles.clientActive : ''}`} >

                        <span className={styles.clientName}>INÊS GAYA</span>
                        <span className={`${styles.clientActivity} ${styles.inesActivity}`}>
                            SAGRADO FEMININO
                        </span>

                    </div>

                    <div className={`${styles.client} ${styles.client3} ${activeCards[2] ? styles.clientActive : ''}`} >
                        <span className={styles.clientName}>RUI ESTRELA</span>
                        <span className={`${styles.clientActivity} ${styles.ruiActivity}`}>
                            FILHOS DO SOL
                        </span>
                    </div>

                    <div className={`${styles.client} ${styles.client4} ${activeCards[3] ? styles.clientActive : ''}`} >

                        <div className={styles.services}>
                            {['BRANDING', 'LANÇAMENTOS', 'SOCIALS', 'CONSULTORIA', 'FORMAÇÃO'].map((s) => (
                                <span key={s} className={`${styles.singleService} ${activeCards[3] ? styles.singleServiceVisible : ''}`}>{s}</span>
                            ))}
                        </div>



                    </div>
                </div>
            </div>

            {/* ── Add new sections below here — they scroll normally ── */}

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