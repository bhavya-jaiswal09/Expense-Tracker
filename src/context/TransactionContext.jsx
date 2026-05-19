import { createContext, useState, useEffect } from 'react'

export const TransactionContext = createContext()

const initialTransactions = [
	{
		id: 1,
		title: 'Food',
		amount: 200,
		type: 'expense',
		category: 'Groceries',
		date: 'Today',
		notes: 'Lunch and groceries',
	},
	{
		id: 2,
		title: 'Rent',
		amount: 5000,
		type: 'expense',
		category: 'Housing',
		date: 'Yesterday',
		notes: 'Monthly rent payment',
	},
	{
		id: 3,
		title: 'Salary',
		amount: 20000,
		type: 'income',
		category: 'Income',
		date: 'Today',
		notes: 'Main salary deposit',
	},
]

export function TransactionProvider({ children }) {
	const [transactions, setTransactions] = useState(() => {
		// Load from localStorage on mount
		try {
			const saved = localStorage.getItem('transactions')
			return saved ? JSON.parse(saved) : initialTransactions
		} catch (error) {
			console.error('Failed to load transactions from localStorage:', error)
			return initialTransactions
		}
	})

	// Save to localStorage whenever transactions change
	useEffect(() => {
		try {
			localStorage.setItem('transactions', JSON.stringify(transactions))
		} catch (error) {
			console.error('Failed to save transactions to localStorage:', error)
		}
	}, [transactions])

	const incomeTotal = transactions
		.filter((transaction) => transaction.type === 'income')
		.reduce((total, transaction) => total + transaction.amount, 0)

	const expenseTotal = transactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((total, transaction) => total + transaction.amount, 0)

	const balanceTotal = incomeTotal - expenseTotal

	function handleSaveTransaction(formData) {
		const nextTransaction = {
			id: Date.now(),
			title: formData.title,
			amount: Number(formData.amount) || 0,
			type: formData.type,
			category: formData.category,
			date: formData.date || 'Today',
			notes: formData.notes,
		}

		setTransactions((current) => [nextTransaction, ...current])
		return true
	}

	function handleDeleteTransaction(id) {
		setTransactions((current) => current.filter((transaction) => transaction.id !== id))
	}

	function handleEditTransaction(updatedTransaction) {
		setTransactions((current) =>
			current.map((transaction) =>
				transaction.id === updatedTransaction.id ? updatedTransaction : transaction,
			),
		)
	}

	const value = {
		transactions,
		incomeTotal,
		expenseTotal,
		balanceTotal,
		handleSaveTransaction,
		handleDeleteTransaction,
		handleEditTransaction,
	}

	return (
		<TransactionContext.Provider value={value}>
			{children}
		</TransactionContext.Provider>
	)
}
