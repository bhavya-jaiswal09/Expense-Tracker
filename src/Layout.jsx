import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function Layout() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
				<Sidebar />
				<main className="flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default Layout
