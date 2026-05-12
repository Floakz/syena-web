import { useState } from 'react'
import styles from './FAQ.module.css'

const items = [
    {
        question: 'O que é que a Syena faz exatamente?',
        answer: 'Somos uma agência criativa focada em branding, design e estratégia digital. Ajudamos marcas a construir uma presença sólida e diferenciada — desde a identidade visual até à execução em todos os canais digitais.',
    },
    {
        question: 'Quanto tempo demora um projeto?',
        answer: 'Depende do âmbito. Um branding completo leva tipicamente 3 a 6 semanas. Lançamentos e campanhas têm timelines próprias definidas na proposta. Trabalhamos sempre com datas claras desde o início.',
    },
    {
        question: 'Trabalham com que tipo de clientes?',
        answer: 'Trabalhamos com fundadores, criadores de conteúdo, coaches e empresas que querem crescer com intenção. Não aceitamos todos os projetos — queremos parceiros que acreditem no que constroem.',
    },
    {
        question: 'Como funciona o processo de trabalho?',
        answer: 'Começa com uma chamada de diagnóstico. Depois apresentamos uma proposta personalizada. Aprovada, arrancamos com um onboarding estruturado para garantir que estamos totalmente alinhados antes de qualquer entrega.',
    },
    {
        question: 'Quais são os preços?',
        answer: 'Os preços variam consoante o projeto e o nível de envolvimento. Não publicamos tabelas — cada proposta é feita à medida. Fala connosco para perceberes o que faz sentido para o teu caso.',
    },
]

export default function FAQ() {
    const [open, setOpen] = useState(null)

    const toggle = (i) => setOpen(open === i ? null : i)

    return (
        <div className={styles.faq}>
            <h2 className={styles.title}>Perguntas frequentes</h2>
            <ul className={styles.list}>
                {items.map((item, i) => (
                    <li key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
                        <button className={styles.question} onClick={() => toggle(i)}>
                            <span>{item.question}</span>
                            <span className={styles.icon}>{open === i ? '−' : '+'}</span>
                        </button>
                        <div className={styles.answerWrap}>
                            <div className={styles.answerInner}>
                                <p className={styles.answer}>{item.answer}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
