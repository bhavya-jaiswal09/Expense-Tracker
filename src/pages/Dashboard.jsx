import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import Navbar from '../components/Navbar'
import BalanceSummary from '../components/BalanceSummary'
import RecentTransaction from '../components/RecentTransaction'
import Footer from '../components/Footer'

function Dashboard() {
	const { balanceTotal, incomeTotal, expenseTotal, transactions } =
		useContext(TransactionContext)
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar userName="Bhavya" />

      <section className="flex-1 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-slate-900 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
              Welcome message
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Here is your expense dashboard overview for today.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              Manage your finances efficiently. Track all your income and expenses, monitor your balance, and get insights into your spending patterns.
            </p>
          </section>

          <BalanceSummary
            balanceTotal={balanceTotal}
            incomeTotal={incomeTotal}
            expenseTotal={expenseTotal}
          />
          <RecentTransaction transactions={transactions} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Dashboard