// routes.tsx
import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import SearchBills from './pages/SearchBills'
import BillDetail from './pages/BillDetail'
import Home from './pages/Home'

const rootRoute = createRootRoute({
  notFoundComponent: () => <div className="p-4 text-center text-red-500">Page not found 😢</div>,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // Optional but good to include for clarity
  component: Home,
})

const searchBillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search', // Optional but good to include for clarity
  component: SearchBills,
})

const billDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills/$billId',
  component: BillDetail,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  searchBillsRoute,
  billDetailRoute,
])

export const router = createRouter({ routeTree })
