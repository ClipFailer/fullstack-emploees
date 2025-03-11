import styles from './Loader.module.scss'

export const Loader = () => {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.loader}></div>
				<h1 className={styles.title}>Загрузка</h1>
			</div>
		</div>
	)
}
