import { useCurrentQuery } from '../../app/services/auth'
import { Loader } from '../../components/Loader/Loader'

interface Props {
	children: JSX.Element
}

export const Auth = ({ children }: Props) => {
	const { isLoading } = useCurrentQuery()

	if (isLoading) <Loader />

	return children
}
