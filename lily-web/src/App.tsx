import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './context/ToastContext'
import { AppLayout } from './components/layout/AppLayout'

// Page components
import { DashboardPage } from './pages/DashboardPage'
import { IncidentsPage } from './pages/IncidentsPage'
import { IncidentDetailsPage } from './pages/IncidentDetailsPage'
import { ApprovalsPage } from './pages/ApprovalsPage'
import { ActionsPage } from './pages/ActionsPage'
import { AutomationPage } from './pages/AutomationPage'
import { ReportsPage } from './pages/ReportsPage'
import { SettingsPage } from './pages/SettingsPage'
import { UserGuidePage } from './pages/UserGuidePage'
import { NotFoundPage } from './pages/NotFoundPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/incidents" element={<IncidentsPage />} />
              <Route path="/incidents/:id" element={<IncidentDetailsPage />} />
              <Route path="/approvals" element={<ApprovalsPage />} />
              <Route path="/actions" element={<ActionsPage />} />
              <Route path="/automation" element={<AutomationPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/guide" element={<UserGuidePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App
