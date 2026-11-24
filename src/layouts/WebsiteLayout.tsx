import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { FloatingChat } from '@/features/chat/FloatingChat'

/**
 * Public website shell: fixed navbar, main content, global footer.
 * `main#main` is the skip-link target declared in Navbar.
 */
export function WebsiteLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Navbar />
      <main id="main" className="flex-1" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  )
}

/**
 * Admin shell has no public chrome. Rendered without navbar/footer.
 * (Separate component kept here so route config stays declarative.)
 */
export function BareLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.classList.add('admin-scope')
    return () => document.documentElement.classList.remove('admin-scope')
  }, [pathname])

  return (
    <div className="min-h-screen bg-ivory-deep">
      <main id="main" className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
