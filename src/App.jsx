import { useState, useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import BackToTop from './components/BackToTop.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

// Lazy-style imports (all static for Vite compatibility)
import Home        from './pages/Home.jsx'
import Library     from './pages/Library.jsx'
import Shop        from './pages/Shop.jsx'
import Contact     from './pages/Contact.jsx'
import Methodology from './pages/Methodology.jsx'
import About       from './pages/About.jsx'
import Terms       from './pages/Terms.jsx'
import Updates     from './pages/Updates.jsx'
import Admin       from './pages/Admin.jsx'

const PAGES = {
  home: Home, library: Library, pricing: Shop,
  contact: Contact, methodology: Methodology, about: About,
  terms: Terms, updates: Updates, admin: Admin,
}

// Simple hash router
function useRoute() {
  const get = () => window.location.hash.replace('#', '').split('?')[0] || 'home'
  const [page, setPage] = useState(get)
  useEffect(() => {
    const h = () => { setPage(get()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', h)
    return () => window.removeEventListener('hashchange', h)
  }, [])
  const navigate = (p) => { window.location.hash = p }
  return { page, navigate }
}

export default function App() {
  const { page, navigate } = useRoute()
  const isAdmin = page === 'admin'
  const Page = PAGES[page] || ErrorPage

  return (
    <>
      {!isAdmin && <Nav currentPage={page} navigate={navigate} />}
      <main>
        <Page navigate={navigate} />
      </main>
      {!isAdmin && <Footer navigate={navigate} />}
      {!isAdmin && <CookieBanner />}
      <BackToTop />
    </>
  )
}
