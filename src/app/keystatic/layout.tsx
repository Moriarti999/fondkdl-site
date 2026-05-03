// src/app/keystatic/layout.tsx
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-auto">
      {children}
    </div>
  )
}