import { Leaf } from 'lucide-react'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 bg-forest rounded-sm flex items-center justify-center animate-pulse">
        <Leaf size={20} className="text-warm-white" />
      </div>
      <p className="font-sans text-sm text-light-grey">{message}</p>
    </div>
  )
}
