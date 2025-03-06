import styles from './Input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	register: any
	error?: boolean
}

export const Input = ({ register, ...props }: Props) => {
	const classes = [styles.input]
	if (props.error) classes.push(styles.error)
	return <input className={classes.join(' ')} {...props} {...register} />
}
