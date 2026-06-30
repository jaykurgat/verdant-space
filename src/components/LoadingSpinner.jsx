export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <img
        src="/logo.png"
        alt="Verdant Space"
        className="w-10 h-10 object-contain animate-pulse"
      />
      <p className="font-sans text-sm text-light-grey">{message}</p>
    </div>
  )
}
