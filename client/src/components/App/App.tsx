import { RouterProvider } from 'react-router-dom'
import { router } from '../../router'

import styles from './App.module.css'

export default function App() {
	return (
		<div className={styles.app}>
			<RouterProvider router={router}></RouterProvider>
		</div>
	)
}
