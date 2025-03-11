import { IoMdCloseCircle } from 'react-icons/io'
import styles from './ErrorModal.module.css'

interface Props {
	closeModal: React.Dispatch<React.SetStateAction<boolean>>
	message?: string
}

export const ErrorModal = ({ closeModal, message }: Props) => {
	return (
		<div className={styles.modal}>
			<div className={styles.errorBody}>
				<h1 className={styles.title}>Произошла ошибка!</h1>
				<p className={styles.text}>{message}</p>
				<button className={styles.closeBtn} onClick={() => closeModal(false)}>
					<IoMdCloseCircle />
				</button>
			</div>
		</div>
	)
}
