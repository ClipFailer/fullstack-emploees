import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'

import styles from './Layout.module.css'

export const Layout = () => {
	return (
		<div className={styles.container}>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	)
}
