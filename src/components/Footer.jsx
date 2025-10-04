import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Film, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  Heart,
  TrendingUp,
  Star,
  BookmarkCheck,
  Home,
  Search
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Trending', path: '/trending', icon: TrendingUp },
      { name: 'Top Rated', path: '/', icon: Star },
      { name: 'Search', path: '/search', icon: Search },
    ],
    myLists: [
      { name: 'Watchlist', path: '/watchlist', icon: BookmarkCheck },
      { name: 'Favorites', path: '/favorites', icon: Heart },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/mayankbhar01/', color: 'hover:text-blue-500' },
    { name: 'Github', icon: Github, url: 'https://github.com/rogger001', color: 'hover:text-purple-400' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <Film className="w-10 h-10 text-red-600 relative z-10" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                MovieRec
              </span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your ultimate destination for discovering amazing movies. Get personalized recommendations and never miss a great film.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 bg-gray-800 rounded-full ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Explore Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* My Lists Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>My Lists</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.myLists.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Company Links */}
            <h3 className="text-white font-bold text-lg mb-4 mt-6">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:technifier001@gmail.com" className="hover:text-white transition-colors">
                  technifier001@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Delhi, Rithala<br />India</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-r-lg hover:from-red-700 hover:to-red-800 transition-all">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-white/10"
        >
          {[
            { label: 'Movies', value: '10,000+' },
            { label: 'Active Users', value: '50,000+' },
            { label: 'Reviews', value: '1M+' },
            { label: 'Countries', value: '150+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-gray-400 text-sm">
          <p className="mb-4 md:mb-0">
            © {currentYear} MovieRec. All rights reserved. Made with{' '}
            <Heart className="inline w-4 h-4 text-red-500 fill-current" /> by Movie Lovers
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">Powered by TMDB API</span>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;
