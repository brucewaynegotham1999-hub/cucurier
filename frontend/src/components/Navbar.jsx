import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiChevronRight } from 'react-icons/fi'
import { FaShip } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Track', path: '/#track' },
    { name: 'Services', path: '/#services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const renderLink = (link, isMobile = false) => {
    const isAnchor = link.path.startsWith('/#')
    const baseClasses = isMobile
      ? "flex items-center justify-between text-lg font-semibold text-slate-800 hover:text-primary-600 py-4 border-b border-slate-100 transition-colors"
      : "text-slate-600 hover:text-primary-600 font-medium transition-colors"

    if (isAnchor) {
      return (
        <a key={link.name} href={link.path} className={baseClasses} onClick={isMobile ? () => setIsOpen(false) : undefined}>
          {link.name}
          {isMobile && <FiChevronRight className="w-5 h-5 text-slate-400" />}
        </a>
      )
    }

    return (
      <Link key={link.name} to={link.path} className={baseClasses} onClick={isMobile ? () => setIsOpen(false) : undefined}>
        {link.name}
        {isMobile && <FiChevronRight className="w-5 h-5 text-slate-400" />}
      </Link>
    )
  }

  return (
    <>
      <nav className="fixed w-full z-[40] bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-heading font-bold text-primary-600 flex items-center gap-2 group border-none outline-none">
                <FaShip className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-300" />
                Oceanic Delivery
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => renderLink(link, false))}
              <div className="flex items-center gap-4 ml-4">
                <Link to="/login" className="text-slate-600 font-medium hover:text-primary-600 transition-colors">Log In</Link>
                <Link to="/signup" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile menu toggle button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-slate-50 focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <FiMenu className="block h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Side Nav */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-[300px] sm:w-[350px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Mobile Nav Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <Link to="/" className="text-xl font-heading font-bold text-primary-600 flex items-center gap-2 border-none outline-none" onClick={() => setIsOpen(false)}>
            <FaShip className="w-6 h-6" />
            Oceanic Delivery
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors"
          >
            <span className="sr-only">Close menu</span>
            <FiX className="block h-5 w-5" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 h-full">
          <div className="flex flex-col mb-8">
            {navLinks.map((link) => renderLink(link, true))}
          </div>

          <div className="flex flex-col gap-4 mt-auto shrink-0">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-primary-600 bg-primary-50 hover:bg-primary-100 px-4 py-4 rounded-xl font-bold transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-4 rounded-xl font-bold shadow-lg shadow-primary-500/25 transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
