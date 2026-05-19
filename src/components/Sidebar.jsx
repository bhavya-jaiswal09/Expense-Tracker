import { Link, useLocation } from 'react-router-dom'

const navItems = [
	{ path: '/', label: 'Dashboard', helper: 'Overview and summary' },
	{ path: '/add-expense', label: 'Add Expense', helper: 'Create new entry' },
	{ path: '/history', label: 'History', helper: 'View past activity' },
	{ path: '/reports', label: 'Reports', helper: 'Charts and insights' },
]

function Sidebar() {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<aside className="border-b border-white/10 bg-slate-950/90 px-4 py-5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5">
			<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur">
				<div className="flex items-center gap-3">
					<div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400 text-lg font-bold text-slate-950">
						ET
					</div>
					<div>
						<p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
							Expense Tracker
						</p>
						<p className="text-sm text-slate-400">Frontend dashboard</p>
					</div>
				</div>

				<nav className="mt-8 space-y-2">
					{navItems.map((item) => {
						const isActive = currentPath === item.path

						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
									isActive
										? 'border-cyan-400/40 bg-cyan-400/10 text-white'
										: 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
								}`}
							>
								<span>
									<span className="block text-base font-medium">{item.label}</span>
									<span className="mt-1 block text-xs text-slate-400">
										{item.helper}
									</span>
								</span>
								<span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
									{item.label}
								</span>
							</Link>
						)
					})}
				</nav>

				<div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
					<p className="font-medium text-white">Quick note</p>
					<p className="mt-2 leading-6 text-slate-400">
						Navigate using the buttons above to explore your expense tracker.
					</p>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar