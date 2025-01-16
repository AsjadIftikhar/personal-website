import Image from 'next/image';
import styles from '../styles/Titlebar.module.css';

const Titlebar = () => {
    const handleClose = () => {
        const titlebar = document.querySelector(`.${styles.titlebar}`);
        const body = document.querySelector('body');

        // Animate the titlebar
        titlebar.style.transition = 'all 1s ease-in-out';
        titlebar.style.transform = 'scale(0)';
        titlebar.style.opacity = '0';

        // Animate the rest of the page
        body.style.transition = 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out';
        body.style.opacity = '0';
        body.style.transform = 'scale(0.9)';

        // Optionally redirect after animation (e.g., to a goodbye page)
        setTimeout(() => {
            window.close()
        }, 1500);
    };


    return (
        <section className={styles.titlebar}>
            <Image
                src="/vscode_icon.svg"
                alt="VSCode Icon"
                height={15}
                width={15}
                className={styles.icon}
            />

            <div className={styles.windowButtons}>
                <span className={styles.close} onClick={handleClose}></span>
            </div>
        </section>
    );
};

export default Titlebar;
