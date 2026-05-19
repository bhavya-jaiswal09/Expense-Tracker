function RecentTranscation({ transactions = [] }) {
	return (
		<section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
						Recent Transaction
					</p>
					<h2 className="mt-2 text-2xl font-semibold text-white">
						Food, rent, salary, and deposit data
					</h2>
				</div>
				<button
					type="button"
					className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
				>
					View all
				</button>
			</div>

			<div className="mt-6 space-y-3">
				{transactions.map((transaction) => {
					const isIncome = transaction.type === 'income'
					const displayAmount = Number(transaction.amount) || 0

					return (
						<article
							key={transaction.id}
							className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
						>
							<div>
								<p className="text-base font-semibold text-white">{transaction.title}</p>
								<p className="text-sm text-slate-400">
									{transaction.category} • {transaction.date}
								</p>
								{transaction.notes ? (
									<p className="mt-1 text-xs text-slate-500">{transaction.notes}</p>
								) : null}
							</div>
							<div
								className={`text-lg font-semibold ${
									isIncome ? 'text-emerald-300' : 'text-rose-300'
								}`}
							>
								{isIncome ? '+' : '-'}${Math.abs(displayAmount).toLocaleString()}
							</div>
						</article>
					)
				})}
			</div>
		</section>
	)
}

export default RecentTranscation
