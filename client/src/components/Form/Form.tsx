import { ReactNode } from 'react'

import styles from './Form.module.scss'

interface Props {
	children: ReactNode
}

export const Form = ({ children }: Props) => {
	return <div className={styles.form}>{children}</div>
}
