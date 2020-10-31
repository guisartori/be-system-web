import React, { useEffect, useState } from 'react'

import { FiEdit2, FiInbox, FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { Container, FAB, TableRequest, ButtonGroup } from './styles'

import addToCartIcon from '../../assets/add-to-cart.svg'
import api from '../../services/api'

interface TableRequest {
	id: string
	number: number
	products: Products[]
}

interface Products {
	product_price: number
	quantity: number
}

const Dashboard: React.FC = () => {
	const [tableRequests, setTableRequests] = useState<TableRequest[]>()
	const history = useHistory()

	useEffect(() => {
		;(async () => {
			const { data } = await api.get('/table-request/')
			console.log(data)
			setTableRequests(data)
		})()
	}, [])

	return (
		<Container>
			<h1>Pedidos em aberto</h1>
			<p>Clique na mesa para ver os pedidos</p>
			<div className="tables">
				{tableRequests?.map((tableRequest, i) => (
					<TableRequest
						key={i}
						// onClick={() => {
						// 	history.push(`detalhes/${tableRequest.id}`)
						// }}
					>
						<h2>Mesa {tableRequest.number}</h2>
						<p>
							Total:{' '}
							{new Intl.NumberFormat('pt-BR', {
								currency: 'BRL',
								style: 'currency',
							}).format(
								tableRequest.products?.reduce(
									(a, b) => a + (b.product_price * b.quantity || 0),
									0,
								) || 0,
							)}
						</p>
						<ButtonGroup>
							<button
								onClick={() =>
									history.push(`detalhes-do-pedido/${tableRequest.id}`)
								}
							>
								<FiInbox size={24} />
							</button>
							<button
								onClick={() =>
									history.push(`adicionar-produto/${tableRequest.id}`)
								}
							>
								<FiEdit2 size={24} />
							</button>
						</ButtonGroup>
					</TableRequest>
				))}
			</div>
			<FAB onClick={() => history.push('/novo-pedido')}>
				<FiPlus size={24} />
			</FAB>
		</Container>
	)
}

export default Dashboard
