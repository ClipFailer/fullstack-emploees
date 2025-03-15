import { ReactNode } from 'react'
import styles from './Modal.module.scss'

interface Props {
	children: ReactNode
	title?: string
	closeModal: () => void
}

export const Modal = ({ children, title, closeModal }: Props) => {
	return (
		<div className={styles.bg} onClick={closeModal}>
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				<h2 className={styles.title}>{title}</h2>
				{children}
			</div>
		</div>
	)
}
