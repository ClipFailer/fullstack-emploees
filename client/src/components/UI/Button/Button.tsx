import { ReactNode } from 'react'

import styles from './Button.module.css'

type Props = {
	children: ReactNode
	onClick?: () => void
	type?: 'submit' | 'reset' | 'button' | undefined
	width?: string
}

export const Button = ({
	children,
	onClick,
	type = 'button',
	width,
}: Props) => {
	return (
		<button
			className={styles.btn}
			onClick={onClick}
			type={type}
			style={{ maxWidth: width }}
		>
			{children}
		</button>
	)
}
