import { RouterProvider } from 'react-router-dom'
import { router } from '../../router'

import { Auth } from '../../features/auth/auth'
import styles from './App.module.css'

export default function App() {
	return (
		<div className={styles.app}>
			<Auth>
				<RouterProvider router={router}></RouterProvider>
			</Auth>
		</div>
	)
}
