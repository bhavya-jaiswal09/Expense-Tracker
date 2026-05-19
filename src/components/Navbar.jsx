function Navbar({ userName = 'Bhavya' }) {
	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	})

	return (
		<header className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/70 px-6 py-5 backdrop-blur sm:px-8 lg:px-10">
			<div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300/80">
						Expense Tracker Dashboard
					</p>
					<h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
						Welcome back, {userName}
					</h1>
					<p className="mt-2 text-sm text-slate-400 sm:text-base">
						{today} • Track your income, expenses, and progress in one place.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<label className="flex min-w-[240px] flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-black/10 xl:flex-none">
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
							className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
							type="search"
							placeholder="Search transactions, categories..."
						/>
					</label>

					<button
						type="button"
						className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
					>
						Notifications
					</button>

					<div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 pr-4">
						<div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-400 font-semibold text-slate-950">
							B
						</div>
						<div>
							<p className="text-sm font-medium text-white">Bhavya</p>
							<p className="text-xs text-slate-400">Premium plan</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
