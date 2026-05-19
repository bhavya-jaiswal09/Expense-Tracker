import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionContext } from '../context/TransactionContext'
import { INCOME_TYPES, EXPENSE_CATEGORIES } from '../constants/transactions'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const incomeFormDefaults = {
	title: 'Salary',
	amount: '',
	date: '',
	notes: '',
}

const expenseFormDefaults = {
	title: 'Food',
	amount: '',
	category: 'Food',
	date: '',
	notes: '',
}

function validateForm(form, type) {
	if (!form.title || !form.title.trim()) {
		return 'Title is required'
	}
	if (!form.amount || Number(form.amount) <= 0) {
		return 'Amount must be a positive number'
	}
	if (type === 'expense' && !form.category) {
		return 'Category is required'
	}
	return null
}

function AddExpense() {
	const navigate = useNavigate()
	const { handleSaveTransaction } = useContext(TransactionContext)

	const [activeForm, setActiveForm] = useState('expense')
	const [incomeForm, setIncomeForm] = useState(incomeFormDefaults)
	const [expenseForm, setExpenseForm] = useState(expenseFormDefaults)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const isIncomeForm = activeForm === 'income'
	const currentForm = isIncomeForm ? incomeForm : expenseForm

	function handleModeChange(nextMode) {
		setActiveForm(nextMode)
		setError('')
		setSuccess('')
	}

	function handleSubmit(event) {
		event.preventDefault()
		setError('')
		setSuccess('')

		const validationError = validateForm(currentForm, activeForm)
		if (validationError) {
			setError(validationError)
			return
		}

		const success = handleSaveTransaction({
			type: activeForm,
			...currentForm,
		})

		if (success) {
			setSuccess('Transaction added successfully!')
			if (isIncomeForm) {
				setIncomeForm(incomeFormDefaults)
			} else {
				setExpenseForm(expenseFormDefaults)
			}

			setTimeout(() => {
				navigate('/')
			}, 1000)
		}
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar userName="Bhavya" />

			<section className="flex-1 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
				<div className="mx-auto w-full max-w-4xl space-y-6">
					<section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-slate-900 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
							Add Income or Expense
						</p>
						<h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
							Choose a form and add a new transaction
						</h1>
						<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
							Income entries are saved in green and expense entries are saved in red on
							the dashboard.
						</p>
					</section>

					<div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur">
						<button
							type="button"
							onClick={() => handleModeChange('income')}
							className={`rounded-2xl px-4 py-4 text-sm font-semibold transition ${
								isIncomeForm
									? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
									: 'text-slate-300 hover:bg-white/10'
							}`}
						>
							Income
						</button>
						<button
							type="button"
							onClick={() => handleModeChange('expense')}
							className={`rounded-2xl px-4 py-4 text-sm font-semibold transition ${
								!isIncomeForm
									? 'bg-rose-400 text-slate-950 shadow-lg shadow-rose-500/20'
									: 'text-slate-300 hover:bg-white/10'
							}`}
						>
							Expense
						</button>
					</div>

					{error && (
						<div className="rounded-2xl border border-rose-400/40 bg-rose-400/10 p-4">
							<p className="text-sm font-medium text-rose-300">{error}</p>
						</div>
					)}

					{success && (
						<div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4">
							<p className="text-sm font-medium text-emerald-300">{success}</p>
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8"
					>
						<div className="grid gap-5 md:grid-cols-2">
							{isIncomeForm ? (
								<label className="space-y-2">
									<span className="text-sm font-medium text-slate-200">Title</span>
									<select
										value={incomeForm.title}
										onChange={(event) =>
											setIncomeForm((current) => ({
												...current,
												title: event.target.value,
											}))
										}
										className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
									>
											{INCOME_TYPES.map((title) => (
											<option key={title} value={title}>
												{title}
											</option>
										))}
									</select>
								</label>
							) : (
								<label className="space-y-2">
									<span className="text-sm font-medium text-slate-200">Title</span>
									<input
										type="text"
										value={expenseForm.title}
										onChange={(event) =>
											setExpenseForm((current) => ({
												...current,
												title: event.target.value,
											}))
										}
										placeholder="Food / Rent / Travel"
										className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
									/>
								</label>
							)}

							<label className="space-y-2">
								<span className="text-sm font-medium text-slate-200">Amount</span>
								<input
									type="number"
									value={currentForm.amount}
									onChange={(event) => {
										const nextValue = event.target.value

										if (isIncomeForm) {
											setIncomeForm((current) => ({
												...current,
												amount: nextValue,
											}))
											return
										}

										setExpenseForm((current) => ({
											...current,
											amount: nextValue,
										}))
									}}
									placeholder="Enter amount"
									className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
								/>
							</label>

							{isIncomeForm ? null : (
								<label className="space-y-2">
									<span className="text-sm font-medium text-slate-200">Category</span>
									<select
										value={expenseForm.category}
										onChange={(event) =>
											setExpenseForm((current) => ({
												...current,
												category: event.target.value,
											}))
										}
										className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
									>
										{EXPENSE_CATEGORIES.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</label>
							)}

							<label className="space-y-2 md:col-span-2">
								<span className="text-sm font-medium text-slate-200">Date</span>
								<input
									type="date"
									value={currentForm.date}
									onChange={(event) => {
										const nextValue = event.target.value

										if (isIncomeForm) {
											setIncomeForm((current) => ({
												...current,
												date: nextValue,
											}))
											return
										}

										setExpenseForm((current) => ({
											...current,
											date: nextValue,
										}))
								}}
									className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
								/>
							</label>

							<label className="space-y-2 md:col-span-2">
								<span className="text-sm font-medium text-slate-200">
									Notes <span className="text-slate-500">(optional)</span>
								</span>
								<textarea
									value={currentForm.notes}
									onChange={(event) => {
										const nextValue = event.target.value

										if (isIncomeForm) {
											setIncomeForm((current) => ({
												...current,
												notes: nextValue,
											}))
											return
										}

										setExpenseForm((current) => ({
											...current,
											notes: nextValue,
										}))
									}}
									rows="4"
									placeholder={
										isIncomeForm
											? 'Optional income notes'
											: 'Summarize the expense here'
									}
									className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
								/>
							</label>
						</div>

						<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-sm text-slate-400">
								Use the add button to save the dummy entry and return to the dashboard.
							</p>
							<button
								type="submit"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-300"
							>
								<svg
									className="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M12 5v14m-7-7h14"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								Add
							</button>
						</div>
					</form>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default AddExpense