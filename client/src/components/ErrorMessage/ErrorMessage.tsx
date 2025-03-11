import styles from './ErrorMessage.module.scss'

interface Props {
	message: string
}

export const ErrorMessage = ({ message }: Props) => {
	return <div className={styles.errorMsg}>{message}</div>
}
