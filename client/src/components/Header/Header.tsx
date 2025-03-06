import { FaUser } from 'react-icons/fa'
import { RiLoginCircleFill, RiTeamFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'
import { Button } from '../UI/Button/Button'

import styles from './Header.module.css'

export const Header = () => {
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
			</nav>
		</header>
	)
}
