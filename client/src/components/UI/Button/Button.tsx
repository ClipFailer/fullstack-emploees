import { ReactNode } from 'react'

import styles from './Button.module.css'

type Props = {
	children: ReactNode
	onClick?: () => void
	type?: 'submit' | 'reset' | 'button' | undefined
}

export const Button = ({ children, onClick, type = 'button' }: Props) => {
	return (
		<button className={styles.btn} onClick={onClick} type={type}>
			{children}
		</button>
	)
}
