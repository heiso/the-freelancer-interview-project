type ButtonProps = {
  type: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  className?: string
}

export function FullButton({ type, children, className }: ButtonProps) {
  return (
    <button
      type={type}
      className="ml-3 inline-flex justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  )
}

export function OutlinedButton({ type, children }: ButtonProps) {
  return (
    <button
      type={type}
      className="flex mx-auto px-4 py-2 shadow-sm text-sm font-medium rounded-md border border-gray-300 lg:text-base text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  )
}
