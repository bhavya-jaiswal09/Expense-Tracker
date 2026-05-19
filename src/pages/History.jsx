import { useContext, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { INCOME_TYPES, EXPENSE_CATEGORIES } from '../constants/transactions'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function History() {
	const { transactions, handleDeleteTransaction, handleEditTransaction } =
		useContext(TransactionContext)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterType, setFilterType] = useState('all')
	const [filterCategory, setFilterCategory] = useState('')
	const [filterDate, setFilterDate] = useState('')
	const [expandedId, setExpandedId] = useState(null)
	const [editingId, setEditingId] = useState(null)
	const [editForm, setEditForm] = useState(null)

	const incomeTransactions = transactions.filter((t) => t.type === 'income')
	const expenseTransactions = transactions.filter((t) => t.type === 'expense')
	const allCategories = [...new Set(transactions.map((t) => t.category).filter(Boolean))]

	function filteredTransactions() {
		let result = transactions

		if (searchQuery) {
			const query = searchQuery.toLowerCase()
			result = result.filter(
				(t) =>
					t.title.toLowerCase().includes(query) ||
					t.category.toLowerCase().includes(query),
			)
		}

		if (filterType === 'income') {
			result = result.filter((t) => t.type === 'income')
		} else if (filterType === 'expense') {
			result = result.filter((t) => t.type === 'expense')
		}

		if (filterCategory) {
			result = result.filter((t) => t.category === filterCategory)
		}

		if (filterDate) {
			result = result.filter((t) => t.date === filterDate)
		}

		return result
	}

	function handleEditStart(transaction) {
		setEditingId(transaction.id)
		setEditForm({ ...transaction })
	}

	function handleEditSave() {
		if (editForm) {
			handleEditTransaction(editForm)
			setEditingId(null)
			setEditForm(null)
		}
	}

	function handleEditCancel() {
		setEditingId(null)
		setEditForm(null)
	}

	function getAvailableCategories() {
		if (filterType === 'income') {
			return incomeOptions
		} else if (filterType === 'expense') {
			return expenseCategories
		}
		return allCategories
	}

	const filteredList = filteredTransactions()

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar userName="Bhavya" />

			<section className="flex-1 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
				<div className="mx-auto w-full max-w-6xl space-y-6">
					<section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-slate-900 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
							History
						</p>
						<h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
							View all your transactions
						</h1>
						<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
							Search, filter, and manage your income and expense history. Edit or delete
							entries as needed.
						</p>
					</section>

					<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur space-y-4">
						<label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
							<svg
								className="h-4 w-4 shrink-0 text-slate-400"
								viewBox="0 0 24 24"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M21 21l-4.3-4.3m1.8-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search by title or category..."
								className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
							/>
						</label>

						<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
							<label className="space-y-1">
								<span className="text-xs font-medium uppercase text-slate-400">Type</span>
								<select
									value={filterType}
									onChange={(e) => {
										setFilterType(e.target.value)
										setFilterCategory('')
									}}
									className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60"
								>
									<option value="all">All Types</option>
									<option value="income">Income</option>
									<option value="expense">Expense</option>
								</select>
							</label>

							<label className="space-y-1">
								<span className="text-xs font-medium uppercase text-slate-400">
									Category
								</span>
								<select
									value={filterCategory}
									onChange={(e) => setFilterCategory(e.target.value)}
									className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60"
								>
									<option value="">All Categories</option>
									{getAvailableCategories().map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</label>

							<label className="space-y-1">
								<span className="text-xs font-medium uppercase text-slate-400">Date</span>
								<input
									type="text"
									value={filterDate}
									onChange={(e) => setFilterDate(e.target.value)}
									placeholder="e.g., Today"
									className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60"
								/>
							</label>

							<button
								onClick={() => {
									setSearchQuery('')
									setFilterType('all')
									setFilterCategory('')
									setFilterDate('')
								}}
								className="self-end rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
							>
								Clear Filters
							</button>
						</div>
					</div>

					{filteredList.length === 0 ? (
						<div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-2xl shadow-black/20 backdrop-blur">
							<p className="text-sm text-slate-400">
								No transactions found. Try adjusting your filters or search query.
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{filteredList.map((transaction) => {
								const isIncome = transaction.type === 'income'
								const isExpanded = expandedId === transaction.id
								const isEditing = editingId === transaction.id

								return (
									<article
										key={transaction.id}
										className="rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur overflow-hidden"
									>
										<div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
											<div className="flex-1">
												<p className="text-base font-semibold text-white">
													{transaction.title}
												</p>
												<p className="text-xs text-slate-500">
													{transaction.category}
												</p>
												<p className="text-xs text-slate-400 mt-1">{transaction.date}</p>
											</div>

											<div
												className={`text-lg font-semibold ${
													isIncome ? 'text-emerald-300' : 'text-rose-300'
												}`}
											>
												{isIncome ? '+' : '-'}$
												{Math.abs(Number(transaction.amount)).toLocaleString()}
											</div>

											<div className="flex flex-wrap gap-2">
												<button
													onClick={() =>
														setExpandedId(isExpanded ? null : transaction.id)
													}
													className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-white/10"
												>
													{isExpanded ? 'Hide' : 'Detail'}
												</button>
												<button
													onClick={() => handleEditStart(transaction)}
													className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/20"
												>
													Edit
												</button>
												<button
													onClick={() => handleDeleteTransaction(transaction.id)}
													className="rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-xs font-medium text-rose-300 transition hover:bg-rose-400/20"
												>
													Delete
												</button>
											</div>
										</div>

										{isExpanded && !isEditing && (
											<div className="border-t border-white/10 px-4 py-4 text-sm">
												<p className="text-slate-300">
													{transaction.notes || 'No notes added'}
												</p>
											</div>
										)}

										{isEditing && editForm && (
											<div className="border-t border-white/10 px-4 py-4 space-y-3">
												<label className="space-y-1 block">
													<span className="text-xs font-medium uppercase text-slate-400">
														Title
													</span>
													<input
														type="text"
														value={editForm.title}
														onChange={(e) =>
															setEditForm({ ...editForm, title: e.target.value })
														}
														className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
													/>
												</label>

												<label className="space-y-1 block">
													<span className="text-xs font-medium uppercase text-slate-400">
														Amount
													</span>
													<input
														type="number"
														value={editForm.amount}
														onChange={(e) =>
															setEditForm({ ...editForm, amount: e.target.value })
														}
														className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
													/>
												</label>

												<label className="space-y-1 block">
													<span className="text-xs font-medium uppercase text-slate-400">
														Notes
													</span>
													<textarea
														value={editForm.notes}
														onChange={(e) =>
															setEditForm({ ...editForm, notes: e.target.value })
														}
														rows="3"
														className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400/60"
													/>
												</label>

												<div className="flex gap-2">
													<button
														onClick={handleEditSave}
														className="flex-1 rounded-2xl bg-cyan-400 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
													>
														Save
													</button>
													<button
														onClick={handleEditCancel}
														className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
													>
														Cancel
													</button>
												</div>
											</div>
										)}
									</article>
								)
							})}
						</div>
					)}
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default History
