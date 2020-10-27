import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { SnackMessage, useSnack } from '../../../hooks/snack'

import { Container } from './styles'

interface SnackProps {
	message: SnackMessage
	style: Record<string, unknown>
}

const icons = {
	warning: <FiInfo size={24} />,
	danger: <FiAlertCircle size={24} />,
	success: <FiCheckCircle size={24} />,
}

const Snack: React.FC<SnackProps> = ({ message, style }) => {
	const { removeSnack } = useSnack()

	useEffect(() => {
		const timer = setTimeout(() => {
			removeSnack(message.id)
		}, 3000)

		return () => {
			clearTimeout(timer)
		}
	}, [removeSnack, message.id])

	return (
		<Container
			type={message.type}
			hasDescription={Number(!!message.description)}
			style={style}
		>
			{icons[message.type || 'warning']}

			<div>
				<strong>{message.title}</strong>
				{message.description && <p>{message.description}</p>}
			</div>

			<button onClick={() => removeSnack(message.id)} type="button">
				<FiXCircle size={18} />
			</button>
		</Container>
	)
}

export default Snack
