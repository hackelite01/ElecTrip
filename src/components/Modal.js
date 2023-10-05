import styles from './Modal.module.css';

export default function Modal({ children }) {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    )
}
