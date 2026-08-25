import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'
import { Button } from '../components/ui/Button'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-100">404 - Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md">
        The incident or platform route you are looking for does not exist or has been archived.
      </p>
      <Button
        variant="primary"
        size="md"
        onClick={() => navigate('/dashboard')}
        leftIcon={<Home className="w-4 h-4" />}
      >
        Back to Dashboard
      </Button>
    </div>
  )
}
