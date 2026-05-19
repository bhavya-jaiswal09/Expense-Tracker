import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Reports() {
	const { transactions, incomeTotal, expenseTotal, balanceTotal } =
		useContext(TransactionContext)
	// Calculate category-wise expense data
	const categoryExpenseMap = transactions
		.filter((t) => t.type === 'expense')
		.reduce((acc, transaction) => {
			const existing = acc.find((item) => item.name === transaction.category)
			if (existing) {
				existing.value += Number(transaction.amount)
			} else {
				acc.push({
					name: transaction.category,
					value: Number(transaction.amount),
				})
			}
			return acc
		}, [])

	// Sort by value (highest first)
	const categoryWiseData = categoryExpenseMap.sort((a, b) => b.value - a.value)

	// Use only categories with actual spending for pie chart
	const categoryWiseDataForChart = categoryWiseData.filter((item) => item.value > 0)

	// Calculate income vs expense data
	const incomeVsExpenseData = [
		{
			name: 'Income vs Expense',
			Income: incomeTotal,
			Expense: expenseTotal,
		},
	]

	// Calculate top spending category
	const topSpendingCategory = categoryWiseDataForChart.length > 0
		? categoryWiseDataForChart.reduce((prev, current) =>
				prev.value > current.value ? prev : current,
			)
		: null

	// Colors for pie chart
	const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar userName="Bhavya" />

			<section className="flex-1 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
				<div className="mx-auto w-full max-w-6xl space-y-6">
					{/* Header Section */}
					<section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-slate-900 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
							Analytics
						</p>
						<h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
							Your Financial Reports
						</h1>
						<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
							Track your spending patterns, analyze expenses by category, and monitor your
							savings growth.
						</p>
					</section>

					{/* Quick Stats */}
					<div className="grid gap-4 md:grid-cols-3">
						<div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
							<p className="text-xs font-medium uppercase text-slate-400">Total Income</p>
							<p className="mt-3 text-2xl font-semibold text-emerald-300">
								${incomeTotal.toLocaleString()}
							</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
							<p className="text-xs font-medium uppercase text-slate-400">Total Expense</p>
							<p className="mt-3 text-2xl font-semibold text-rose-300">
								${expenseTotal.toLocaleString()}
							</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
							<p className="text-xs font-medium uppercase text-slate-400">Total Savings</p>
							<p className={`mt-3 text-2xl font-semibold ${balanceTotal >= 0 ? 'text-cyan-300' : 'text-rose-300'}`}>
								${balanceTotal.toLocaleString()}
							</p>
						</div>
					</div>

					{/* Income vs Expense Bar Chart */}
					<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
						<h2 className="mb-6 text-lg font-semibold text-white">Income vs Expense</h2>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={incomeVsExpenseData}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
								<XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
								<YAxis stroke="rgba(255,255,255,0.5)" />
								<Tooltip
									contentStyle={{
										backgroundColor: 'rgba(15, 23, 42, 0.9)',
										border: '1px solid rgba(255,255,255,0.1)',
										borderRadius: '12px',
									}}
									labelStyle={{ color: '#fff' }}
								/>
								<Legend />
								<Bar dataKey="Income" fill="#06b6d4" radius={[8, 8, 0, 0]} />
								<Bar dataKey="Expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Category-wise Expense Pie Chart and Top Spending */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Pie Chart */}
						<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
							<h2 className="mb-6 text-lg font-semibold text-white">Expense by Category</h2>
						{categoryWiseDataForChart.length > 0 ? (
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={categoryWiseDataForChart}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={({ name, value }) =>
											`${name}: $${value.toLocaleString()}`
										}
										outerRadius={100}
										fill="#8884d8"
										dataKey="value"
									>
										{categoryWiseDataForChart.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
										</Pie>
										<Tooltip
											formatter={(value) => `$${value.toLocaleString()}`}
											contentStyle={{
												backgroundColor: 'rgba(15, 23, 42, 0.9)',
												border: '1px solid rgba(255,255,255,0.1)',
												borderRadius: '12px',
											}}
											labelStyle={{ color: '#fff' }}
										/>
									</PieChart>
								</ResponsiveContainer>
							) : (
								<div className="flex h-[300px] items-center justify-center text-slate-400">
									<p>No expense data available</p>
								</div>
							)}
						</div>

						{/* Top Spending Category and Legend */}
						<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
							<h2 className="mb-6 text-lg font-semibold text-white">Category Breakdown</h2>

							{topSpendingCategory ? (
								<div className="space-y-4">
									<div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-4">
										<p className="text-sm font-medium text-cyan-300/80">Top Spending Category</p>
										<p className="mt-2 text-2xl font-semibold text-cyan-300">
											{topSpendingCategory.name}
										</p>
										<p className="mt-1 text-lg font-semibold text-cyan-200">
											${topSpendingCategory.value.toLocaleString()}
										</p>
									</div>

									<div className="space-y-2">
										<p className="text-sm font-medium text-slate-300">All Categories:</p>
										{categoryWiseData.map((category, index) => (
											<div
												key={category.name}
												className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2"
											>
												<div className="flex items-center gap-3">
													<div
														className="h-3 w-3 rounded-full"
														style={{
															backgroundColor:
																COLORS[index % COLORS.length],
														}}
													/>
													<span className="text-sm text-slate-200">
														{category.name}
													</span>
												</div>
												<span className={`font-semibold ${category.value > 0 ? 'text-white' : 'text-slate-500'}`}>
													${category.value.toLocaleString()}
												</span>
											</div>
										))}
									</div>
								</div>
							) : (
								<div className="flex h-full items-center justify-center text-slate-400">
									<p>No expense data available</p>
								</div>
							)}
						</div>
					</div>

					{/* Savings Analysis */}
					<div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-emerald-500/10 to-slate-900 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
						<div className="grid gap-6 sm:grid-cols-3">
							<div>
								<p className="text-sm font-medium uppercase text-slate-400">Total Income</p>
								<p className="mt-3 text-2xl font-semibold text-emerald-300">
									${incomeTotal.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium uppercase text-slate-400">Total Expenses</p>
								<p className="mt-3 text-2xl font-semibold text-rose-300">
									${expenseTotal.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium uppercase text-slate-400">Money Saved</p>
								<p className={`mt-3 text-2xl font-semibold ${balanceTotal >= 0 ? 'text-cyan-300' : 'text-rose-300'}`}>
									${Math.abs(balanceTotal).toLocaleString()}
								</p>
								<p className="mt-1 text-xs text-slate-300">
									{balanceTotal >= 0
										? 'You are saving money!'
										: 'You are spending more than earning'}
								</p>
							</div>
						</div>

						<div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
							<p className="text-sm text-slate-300">
								<span className="font-semibold text-white">Savings Rate:</span>{' '}
								{incomeTotal > 0
									? ((balanceTotal / incomeTotal) * 100).toFixed(1)
									: '0'}
								% of your income
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Reports
