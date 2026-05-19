import { Routes, Route } from 'react-router-dom'
import { TransactionProvider } from './context/TransactionContext'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import History from './pages/History'
import Reports from './pages/Reports'

function App() {
	return (
		<TransactionProvider>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="add-expense" element={<AddExpense />} />
					<Route path="history" element={<History />} />
					<Route path="reports" element={<Reports />} />
				</Route>
			</Routes>
		</TransactionProvider>
	)
}

export default App
