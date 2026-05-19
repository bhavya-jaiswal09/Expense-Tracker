function BalanceSummary({ balanceTotal = 0, incomeTotal = 0, expenseTotal = 0 }) {
	const summaryItems = [
		{
			label: 'Balance',
			value: balanceTotal,
			tone: 'from-cyan-400 to-blue-500',
			note: 'Available after expenses',
		},
		{
			label: 'Income',
			value: incomeTotal,
			tone: 'from-emerald-400 to-emerald-600',
			note: 'Salary and other deposits',
		},
		{
			label: 'Expense',
			value: expenseTotal,
			tone: 'from-rose-400 to-red-500',
			note: 'Bills, food, rent and more',
		},
	]

	return (
		<section className="grid gap-4 md:grid-cols-3">
			{summaryItems.map((item) => (
				<article
					key={item.label}
					className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur"
				>
					<div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${item.tone}`} />
					<p className="mt-5 text-sm uppercase tracking-[0.24em] text-slate-400">
						{item.label}
					</p>
					<h2 className="mt-3 text-3xl font-semibold text-white">
						${item.value.toLocaleString()}
					</h2>
					<p className="mt-2 text-sm text-slate-300">{item.note}</p>
				</article>
			))}
		</section>
	)
}

export default BalanceSummary
