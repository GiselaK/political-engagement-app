// routes.tsx
import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import SearchBills from './pages/SearchBills'
import BillDetail from './pages/BillDetail'

const rootRoute = createRootRoute({
  notFoundComponent: () => <div className="p-4 text-center text-red-500">Page not found 😢</div>,
})

const searchBillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // Optional but good to include for clarity
  component: SearchBills,
})

const billDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills/$billId',
  component: BillDetail,
})

const routeTree = rootRoute.addChildren([
  searchBillsRoute,
  billDetailRoute,
])

export const router = createRouter({ routeTree })
