import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaPlane, FaShip, FaTruck, FaStar } from 'react-icons/fa';
import SplashPage from '../components/SplashPage';

export default function LandingPage() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    try {
      setIsLoading(true);
      await axios.get(`https://oceanicdeliverydumbbackend.vercel.app/api/track/${trackingNumber.trim()}/`);

      // Show splash page on success
      setShowSplash(true);
      setTimeout(() => {
        navigate(`/track/${trackingNumber.trim()}`);
      }, 2500); // 2.5 seconds of splash
    } catch (err) {
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      {showSplash && <SplashPage />}

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=2070&auto=format&fit=crop"
            alt="Cargo ship at sea"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight mb-6">
              Global Logistics, <span className="text-primary-500">Delivered Swiftly.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Experience seamless global shipping and supply chain solutions tailored for businesses of all sizes. Fast, reliable, and trackable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#track" className="bg-primary-600 hover:bg-primary-500 text-white font-medium px-8 py-4 rounded-full text-center transition-all shadow-lg shadow-primary-500/30">
                Track Package
              </a>
              <a href="#services" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-medium px-8 py-4 rounded-full text-center transition-all border border-white/20">
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Track Form Section */}
      <section id="track" className="scroll-mt-24 py-12 bg-white relative -mt-8 z-20 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8" data-aos="fade-up" data-aos-delay="200">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Track Your Shipment</h2>
            <p className="text-slate-500">Enter your tracking number to get real-time updates on your package location.</p>
          </div>

          <form onSubmit={handleTrackSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g. SWIFT123456789"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-grow px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all text-lg mb-0"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-75"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <FiSearch className="w-5 h-5" />
              )}
              {isLoading ? 'Searching...' : 'Track Now'}
            </button>
          </form>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold tracking-wide text-sm mb-6">
                ABOUT Oceanic Delivery
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
                Empowering businesses through reliable logistics.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With over a decade of experience bridging the gap between supply and demand, Oceanic Delivery has built a global infrastructure that prioritizes speed, security, and transparency.
              </p>
              <ul className="space-y-4 mb-8">
                {['Global network spanning 150+ countries', 'State-of-the-art climate-controlled facilities', 'Real-time API tracking integrations', 'Sustainable packaging initiatives'].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                      <FiCheck className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/about" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group">
                Read our full story
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-primary-300 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" alt="Warehouse operations" className="relative z-10 rounded-2xl shadow-2xl object-cover h-[500px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Comprehensive Solutions</h2>
            <p className="text-lg text-slate-600">Tailored logistics services meant to optimize your entire supply chain pipeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Air Freight", icon: <FaPlane className="w-8 h-8" />, desc: "Expedited global shipping for time-sensitive cargo with priority handling." },
              { title: "Ocean Freight", icon: <FaShip className="w-8 h-8" />, desc: "Cost-effective large volume shipping with FCL and LCL options available." },
              { title: "Ground Transport", icon: <FaTruck className="w-8 h-8" />, desc: "Nationwide fleet ensuring safe and punctual last-mile deliveries." }
            ].map((service, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="group p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors text-primary-600">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features Section & 6. Statistics */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] opacity-10 bg-gradient-radial from-primary-400 to-transparent blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] opacity-10 bg-gradient-radial from-blue-400 to-transparent blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-heading font-bold mb-6">Why Partner With Us?</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-md">We don't just deliver packages; we deliver peace of mind through technological innovation and strict security protocols.</p>
              <div className="space-y-6">
                {[
                  { title: "Security First", desc: "24/7 monitoring and tamper-proof warehousing." },
                  { title: "Smart Tracking", desc: "AI-driven ETA predictions down to the minute." },
                  { title: "Global Reach", desc: "Local expertise in over 150 international markets." }
                ].map((feat, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center shrink-0">✓</div>
                    <div>
                      <h4 className="font-semibold text-lg">{feat.title}</h4>
                      <p className="text-slate-400">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Statistics Grid */}
            <div className="grid grid-cols-2 gap-6 items-center">
              {[
                { number: "1M+", label: "Packages Delivered" },
                { number: "150+", label: "Countries Served" },
                { number: "99.9%", label: "On-Time Delivery" },
                { number: "24/7", label: "Customer Support" }
              ].map((stat, i) => (
                <div key={i} data-aos="zoom-in" data-aos-delay={i * 100} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl font-heading font-bold text-primary-400 mb-2">{stat.number}</div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-slate-600">Hear what our global partners have to say.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Oceanic Delivery revolutionized our European distribution network. Their API integration saved us countless hours of manual tracking.",
                author: "Sarah Jenkins",
                role: "Supply Chain Director, TechCorp",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              },
              {
                text: "We needed a partner who could handle cross-border sensitive medical equipment. They delivered flawlessly every single time.",
                author: "Dr. Michael Chen",
                role: "Operations Head, Medifast",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
              },
              {
                text: "The sheer transparency of the process gives us and our customers immense confidence. Highly recommended.",
                author: "Elena Rodriguez",
                role: "CEO, E-comm Solutions",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
              }
            ].map((review, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <FaStar key={star} className="w-5 h-5 text-amber-400" />)}
                  </div>
                  <p className="text-slate-700 italic mb-8">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={review.img} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-slate-900">{review.author}</h5>
                    <p className="text-sm text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Form Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-duration="1000">
            {/* Decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-600 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Request a Custom Quote</h2>
              <p className="text-slate-300">Leave your details and our logistics experts will get back to you within 24 hours.</p>
            </div>

            <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" className="bg-white/10 border border-white/20 text-white placeholder-slate-400 px-6 py-4 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" />
              <input type="email" placeholder="Email Address" className="bg-white/10 border border-white/20 text-white placeholder-slate-400 px-6 py-4 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" />
              <input type="text" placeholder="Company Name" className="bg-white/10 border border-white/20 text-white placeholder-slate-400 px-6 py-4 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors md:col-span-2" />
              <textarea placeholder="Tell us about your logistics needs..." rows="4" className="bg-white/10 border border-white/20 text-white placeholder-slate-400 px-6 py-4 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors md:col-span-2 resize-none"></textarea>
              <button className="md:col-span-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg">Submit Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowErrorModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl relative z-10 w-full max-w-md overflow-hidden p-8 text-center transform transition-all animate-fade-in-up">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-red-200 opacity-75"></div>
              <FiAlertCircle className="w-10 h-10 text-red-600 relative z-10" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">Package Not Found</h3>
            <p className="text-slate-500 mb-8 text-lg">
              We couldn't find any shipment matching "{trackingNumber}". Please verify the tracking number and try again.
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full inline-flex justify-center rounded-xl bg-slate-900 px-4 py-4 text-lg font-bold text-white shadow-md hover:bg-slate-800 focus:outline-none transition-colors hover:-translate-y-0.5"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
