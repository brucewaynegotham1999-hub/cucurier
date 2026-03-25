import React from 'react';

const PageHero = ({ title, subtitle, imageUrl }) => (
  <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
    <div className="absolute inset-0 z-0">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6" data-aos="fade-up">{title}</h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">{subtitle}</p>
    </div>
  </div>
);

const ContentSection = ({ children, className = "" }) => (
  <section className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

export const AboutUs = () => (
  <div className="bg-white">
    <PageHero
      title="Our Story"
      subtitle="Connecting continents, empowering commerce, and delivering promises since 2010."
      imageUrl="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">A Legacy of Reliability</h2>
          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Founded in a small warehouse in 2010, Oceanic Delivery began with a single vision: to make global shipping as simple as sending a local parcel. Today, we are a leading logistics provider with a presence in over 150 countries.
          </p>
          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            We don't just move boxes; we move the world. From critical medical supplies to high-tech components, we ensure that every shipment is handled with the precision and care it deserves.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=2070&auto=format&fit=crop" alt="Logistics center" />
        </div>
      </div>
    </ContentSection>
  </div>
);

export const Team = () => (
  <div className="bg-slate-50">
    <PageHero
      title="The Minds Behind the Move"
      subtitle="Our global team of logistics experts is dedicated to your success."
      imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { name: "Sarah Jenkins", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
          { name: "Michael Chen", role: "Head of Global Ops", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" },
          { name: "Elena Rodriguez", role: "Director of Tech", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
        ].map((member, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
            <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary-500" />
            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="text-slate-500">{member.role}</p>
          </div>
        ))}
      </div>
    </ContentSection>
  </div>
);

export const Careers = () => (
  <div className="bg-white">
    <PageHero
      title="Join the Express"
      subtitle="Help us redefine the future of global logistics."
      imageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
      <div className="space-y-6">
        {[
          { title: "Logistics Analyst", location: "Singapore / Remote", type: "Full-time" },
          { title: "Full Stack Engineer", location: "London / Hybrid", type: "Full-time" },
          { title: "Supply Chain Manager", location: "New York", type: "Full-time" },
        ].map((job, i) => (
          <div key={i} className="flex flex-col sm:flex-row justify-between items-center p-8 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
              <p className="text-slate-500">{job.location} • {job.type}</p>
            </div>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-500 transition-colors">Apply Now</button>
          </div>
        ))}
      </div>
    </ContentSection>
  </div>
);

export const Partners = () => (
  <div className="bg-white">
    <PageHero
      title="Global Partnerships"
      subtitle="Collaborating with the world's most innovative companies to deliver excellence."
      imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-60">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
            PARTNER {i}
          </div>
        ))}
      </div>
      <div className="mt-20 bg-slate-900 rounded-3xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Join our global network of carriers and technology providers to scale your business and reach new markets.</p>
        <button className="bg-primary-500 hover:bg-primary-400 text-white px-10 py-4 rounded-full font-bold transition-all">Get in Touch</button>
      </div>
    </ContentSection>
  </div>
);

export const Education = () => (
  <div className="bg-white">
    <PageHero
      title="Logistics Insights"
      subtitle="Deep dives into supply chain management, international trade, and last-mile delivery."
      imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          { title: "Understanding Incoterms 2024", date: "March 15, 2026", img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop" },
          { title: "Sustainable Shipping Practices", date: "March 10, 2026", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop" },
        ].map((post, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="rounded-3xl overflow-hidden mb-6 h-64 shadow-lg group-hover:shadow-xl transition-all">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <p className="text-primary-600 font-bold mb-2">{post.date}</p>
            <h3 className="text-2xl font-bold group-hover:text-primary-600 transition-colors">{post.title}</h3>
          </div>
        ))}
      </div>
    </ContentSection>
  </div>
);

export const Infrastructure = () => (
  <div className="bg-slate-900 text-white">
    <PageHero
      title="Built for Speed"
      subtitle="Our world-class infrastructure is designed for maximum efficiency and security."
      imageUrl="https://images.unsplash.com/photo-1586528116311-ad8ed7c1590a?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {[
          { title: "Smart Warehousing", desc: "Automated sorting systems and IoT monitoring ensure your cargo is always accounted for.", icon: "🏢" },
          { title: "Global Fleet", desc: "Over 5,000 trucks and 50 cargo planes operating 24/7 across every time zone.", icon: "✈️" },
          { title: "Security Hubs", desc: "Tamper-proof storage and biometric access controls at every major transit point.", icon: "🛡️" },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-6">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </ContentSection>
  </div>
);

export const Solutions = () => (
  <div className="bg-white">
    <PageHero
      title="Tailored Solutions"
      subtitle="From e-commerce fulfillment to industrial cargo, we have the right solution for you."
      imageUrl="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="space-y-20">
        {[
          { title: "E-Commerce Logistics", desc: "End-to-end fulfillment for growing brands. We handle the storage, picking, packing, and shipping so you can focus on growth.", img: "https://images.unsplash.com/photo-1512418490979-92798ccc9340?q=80&w=2070&auto=format&fit=crop" },
          { title: "Cold Chain Management", desc: "Specialized transport for perishables and pharmaceuticals. Constant temperature monitoring from origin to destination.", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb75bb44?q=80&w=2070&auto=format&fit=crop" },
        ].map((sol, i) => (
          <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">{sol.title}</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{sol.desc}</p>
              <button className="text-primary-600 font-bold hover:gap-4 flex items-center gap-2 transition-all">Learn More <span>→</span></button>
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
              <img src={sol.img} alt={sol.title} className="w-full h-80 object-cover" />
            </div>
          </div>
        ))}
      </div>
    </ContentSection>
  </div>
);

export const HelpCenter = () => (
  <div className="bg-slate-50">
    <PageHero
      title="How can we help?"
      subtitle="Search our knowledge base or contact our 24/7 support team."
      imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="max-w-3xl mx-auto space-y-6">
        {[
          { q: "How do I track my package?", a: "Enter your tracking number on the home page search bar for real-time status updates." },
          { q: "What is your refund policy?", a: "Refunds are processed based on the specific service level and any delays outside of our standard delivery windows." },
          { q: "Do you ship internationally?", a: "Yes, we serve over 150 countries with a wide range of air and ocean freight options." },
        ].map((faq, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-4">{faq.q}</h3>
            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </ContentSection>
  </div>
);

export const TermsConditions = () => (
  <div className="bg-white">
    <ContentSection className="pt-32">
      <h1 className="text-4xl font-bold mb-10">Terms & Conditions</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-500 mb-8">Last updated: March 24, 2026</p>
        <h3 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h3>
        <p className="mb-6">By accessing and using the services provided by Oceanic Delivery, you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, users, and others who access or use our service.</p>
        <h3 className="text-2xl font-bold mb-4">2. Service Usage</h3>
        <p className="mb-6">Oceanic Delivery provides logistics and tracking services. You agree to use these services only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of this service by, any third party.</p>
        <h3 className="text-2xl font-bold mb-4">3. Limitation of Liability</h3>
        <p className="mb-6">Oceanic Delivery shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.</p>
      </div>
    </ContentSection>
  </div>
);

export const PrivacyPolicy = () => (
  <div className="bg-white">
    <ContentSection className="pt-32">
      <h1 className="text-4xl font-bold mb-10">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-500 mb-8">Last updated: March 24, 2026</p>
        <h3 className="text-2xl font-bold mb-4">1. Information We Collect</h3>
        <p className="mb-6">We collect personal information that you provide to us directly, such as your name, email address, and shipping details when you use our tracking or contact services.</p>
        <h3 className="text-2xl font-bold mb-4">2. How We Use Your Information</h3>
        <p className="mb-6">We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you regarding your shipments.</p>
        <h3 className="text-2xl font-bold mb-4">3. Data Security</h3>
        <p className="mb-6">We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your data.</p>
      </div>
    </ContentSection>
  </div>
);

export const CookiePolicy = () => (
  <div className="bg-white">
    <ContentSection className="pt-32">
      <h1 className="text-4xl font-bold mb-10">Cookie Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-500 mb-8">Last updated: March 24, 2026</p>
        <p className="mb-6">Our website uses cookies to enhance your experience, analyze site traffic, and for personalization. By continuing to use our site, you consent to our use of cookies.</p>
        <h3 className="text-2xl font-bold mb-4">What are cookies?</h3>
        <p className="mb-6">Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and actions over time.</p>
        <h3 className="text-2xl font-bold mb-4">How we use them</h3>
        <p className="mb-6">We use both session cookies and persistent cookies to remember your login details and tracking history to provide a seamless experience.</p>
      </div>
    </ContentSection>
  </div>
);

export const Contact = () => (
  <div className="bg-white">
    <PageHero
      title="Get in Touch"
      subtitle="Our global support network is available 24/7 to assist with your inquiries."
      imageUrl="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2070&auto=format&fit=crop"
    />
    <ContentSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-primary-600 uppercase tracking-wide text-sm mb-2">Global Headquarters</h4>
              <p className="text-lg text-slate-600">123 Logistics Way, Suite 500<br />New York, NY 10001, USA</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-600 uppercase tracking-wide text-sm mb-2">Phone</h4>
              <p className="text-lg text-slate-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-600 uppercase tracking-wide text-sm mb-2">Email</h4>
              <p className="text-lg text-slate-600">support@oceanicdelivery.vercel.app</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="w-full px-6 py-4 rounded-xl border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20" />
              <input type="text" placeholder="Last Name" className="w-full px-6 py-4 rounded-xl border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-xl border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20" />
            <textarea placeholder="Message" rows="5" className="w-full px-6 py-4 rounded-xl border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 resize-none"></textarea>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </ContentSection>
  </div>
);
