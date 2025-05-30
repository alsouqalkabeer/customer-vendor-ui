import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      id: 'legal',
      title: 'Legal & Policies',
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: 'bx-shield-alt-2' },
        { label: 'Terms of Service', href: '/terms', icon: 'bx-file-blank' },
        { label: 'Merchant Agreement', href: '/merchant-terms', icon: 'bx-store' },
        { label: 'Consumer Rights', href: '/consumer-rights', icon: 'bx-user-check' },
        { label: 'Cookie Policy', href: '/cookies', icon: 'bx-cookie' },
        { label: 'Updates & Changes', href: '/updates', icon: 'bx-bell' }
      ]
    },
    {
      id: 'support',
      title: 'Support & Contact',
      links: [
        { label: 'Help Center', href: '/help', icon: 'bx-help-circle' },
        { label: 'Live Chat Support', href: '/chat', icon: 'bx-chat' },
        { label: 'Submit Feedback', href: '/feedback', icon: 'bx-message-dots' },
        { label: 'Report an Issue', href: '/report', icon: 'bx-error-circle' },
        { label: 'Contact Sales', href: '/sales', icon: 'bx-phone' }
      ],
      contact: {
        email: 'info@noshamarket.com',
        phone: '+1-555-NOSHA-1',
        address: 'San Francisco, CA'
      }
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { label: 'About Nosha', href: '/about', icon: 'bx-info-circle' },
        { label: 'Our Mission', href: '/mission', icon: 'bx-target-lock' },
        { label: 'Careers', href: '/careers', icon: 'bx-briefcase' },
        { label: 'Press & Media', href: '/press', icon: 'bx-news' },
        { label: 'Partner with Us', href: '/partners', icon: 'bx-handshake' },
        { label: 'Investor Relations', href: '/investors', icon: 'bx-trending-up' }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      links: [
        { label: 'For Merchants', href: '/merchants', icon: 'bx-store-alt' },
        { label: 'For Shoppers', href: '/shop', icon: 'bx-shopping-bag' },
        { label: 'Business Solutions', href: '/business', icon: 'bx-buildings' },
        { label: 'API & Integrations', href: '/api', icon: 'bx-code-alt' },
        { label: 'Mobile Apps', href: '/mobile', icon: 'bx-mobile-alt' },
        { label: 'Analytics Dashboard', href: '/analytics', icon: 'bx-line-chart' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'bxl-instagram', href: 'https://instagram.com/nosha', color: 'hover:bg-pink-100 hover:text-pink-600' },
    { name: 'Facebook', icon: 'bxl-facebook', href: 'https://facebook.com/nosha', color: 'hover:bg-blue-100 hover:text-blue-600' },
    { name: 'Twitter', icon: 'bxl-twitter', href: 'https://twitter.com/nosha', color: 'hover:bg-sky-100 hover:text-sky-600' },
    { name: 'LinkedIn', icon: 'bxl-linkedin', href: 'https://linkedin.com/company/nosha', color: 'hover:bg-blue-100 hover:text-blue-700' },
    { name: 'TikTok', icon: 'bxl-tiktok', href: 'https://tiktok.com/@nosha', color: 'hover:bg-gray-100 hover:text-gray-800' },
    { name: 'YouTube', icon: 'bxl-youtube', href: 'https://youtube.com/nosha', color: 'hover:bg-red-100 hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 xl:gap-12">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <i className="bx bx-chevron-right text-blue-500 mr-2"></i>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                    >
                      <i className={`bx ${link.icon} mr-2 text-sm text-gray-400 group-hover:text-blue-500`}></i>
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Contact Information for Support Section */}
              {section.id === 'support' && section.contact && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Direct Contact</h4>
                  <div className="space-y-2 text-sm">
                    <a href={`mailto:${section.contact.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <i className="bx bx-envelope mr-2 text-blue-500"></i>
                      {section.contact.email}
                    </a>
                    <a href={`tel:${section.contact.phone}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <i className="bx bx-phone mr-2 text-blue-500"></i>
                      {section.contact.phone}
                    </a>
                    <div className="flex items-center text-gray-600">
                      <i className="bx bx-map mr-2 text-blue-500"></i>
                      {section.contact.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {footerSections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg bg-white">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <i className="bx bx-chevron-right text-blue-500 mr-2"></i>
                  {section.title}
                </h3>
                <i className={`bx bx-chevron-down text-gray-400 transition-transform duration-200 ${
                  expandedSections[section.id] ? 'rotate-180' : ''
                }`}></i>
              </button>
              
              {expandedSections[section.id] && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <ul className="space-y-3 mt-4">
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                        >
                          <i className={`bx ${link.icon} mr-3 text-blue-500`}></i>
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Mobile Contact Info */}
                  {section.id === 'support' && section.contact && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Quick Contact</h4>
                      <div className="space-y-2 text-sm">
                        <a href={`mailto:${section.contact.email}`} className="flex items-center text-gray-600">
                          <i className="bx bx-envelope mr-2 text-blue-500"></i>
                          {section.contact.email}
                        </a>
                        <a href={`tel:${section.contact.phone}`} className="flex items-center text-gray-600">
                          <i className="bx bx-phone mr-2 text-blue-500"></i>
                          {section.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 lg:mt-12 p-6 bg-white rounded-xl border border-blue-100 shadow-sm">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600">Get the latest updates, features, and merchant tips delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
              <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm">
                <i className="bx bx-envelope mr-2"></i>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Logo and Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                  <i className="bx bx-check text-white text-lg"></i>
                </div>
                <span className="text-xl font-semibold text-blue-800">Nosha</span>
              </Link>
              <p className="text-sm text-gray-500">
                © {currentYear} Nosha Marketplace. All rights reserved.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-3">Follow us:</span>
              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 bg-gray-100 rounded-lg text-gray-600 transition-all duration-200 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <i className={`bx ${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-gray-500">
              <Link to="/accessibility" className="hover:text-blue-600 transition-colors">Accessibility</Link>
              <Link to="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link>
              <Link to="/security" className="hover:text-blue-600 transition-colors">Security</Link>
              <Link to="/compliance" className="hover:text-blue-600 transition-colors">Compliance</Link>
              <Link to="/transparency" className="hover:text-blue-600 transition-colors">Transparency Report</Link>
              <span className="text-gray-400">|</span>
              <span>Made with ❤️ for merchants worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;