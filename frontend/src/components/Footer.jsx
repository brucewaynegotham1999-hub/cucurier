import { Link } from 'react-router-dom'
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaShip } from 'react-icons/fa'

export default function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Team", path: "/team" },
        { name: "Careers", path: "/careers" },
        { name: "Partners", path: "/partners" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Education", path: "/education" },
        { name: "Infrastructure", path: "/infrastructure" },
        { name: "Solutions", path: "/solutions" },
        { name: "Help Center", path: "/help" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Contact", path: "/contact" }
      ]
    }
  ]

  return (
    <footer className="bg-dark-bg text-slate-300 border-t border-dark-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">

          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-heading font-bold text-white flex items-center gap-2 mb-6">
              <FaShip className="w-8 h-8 text-primary-500" />
              Oceanic Delivery
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              Global logistics and parcel delivery solutions designed to seamlessly connect the world, with real-time tracking transparency at every step.
            </p>
            <div className="flex space-x-4">
              {/* Social icons */}
              <a href="#" className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-heading font-semibold mb-6 tracking-wide">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Oceanic Delivery Logistics. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <span className="text-red-500">♥</span> for global trade</p>
        </div>
      </div>
    </footer>
  )
}
