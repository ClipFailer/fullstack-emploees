import { FaUser } from 'react-icons/fa'
import { IoIosExit } from 'react-icons/io'
import { RiLoginCircleFill, RiTeamFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { Button } from '../UI/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'
import styles from './Header.module.css'

export const Header = () => {
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onLogoutClick = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<div className={styles.leftNav}>
					<Link to={Paths.home}>
						<Button>
							<RiTeamFill className={styles.icon} />
							Сотрудники
						</Button>
					</Link>
				</div>

				{user ? (
					<div className={styles.rightNav}>
						<Button onClick={onLogoutClick}>
							<IoIosExit />
							Выйти
						</Button>
					</div>
				) : (
					<div className={styles.rightNav}>
						<Link to={Paths.register}>
							<Button>
								<FaUser className={styles.icon} />
								Регистрация
							</Button>
						</Link>
						<Link to={Paths.login}>
							<Button>
								<RiLoginCircleFill className={styles.icon} />
								Вход
							</Button>
						</Link>
					</div>
				)}
			</nav>
		</header>
	)
}
