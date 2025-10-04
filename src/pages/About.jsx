import React from 'react';
import { motion } from 'framer-motion';
import { 
  Film, 
  Heart, 
  Star, 
  Users, 
  Zap, 
  Target,
  Github,
  Linkedin,
  Mail,
  Code,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized movie suggestions based on your watch history and ratings.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Heart,
      title: 'Watchlist & Favorites',
      description: 'Create your personal collection of movies you want to watch and love.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Trending Movies',
      description: 'Stay updated with the latest trending and popular movies worldwide.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Rate movies and help others discover great films.',
      color: 'from-yellow-400 to-yellow-600'
    },
  ];

  const techStack = [
    { name: 'React', color: 'text-blue-400' },
    { name: 'Tailwind CSS', color: 'text-cyan-400' },
    { name: 'Framer Motion', color: 'text-purple-400' },
    { name: 'TMDB API', color: 'text-green-400' },
    { name: 'Vite', color: 'text-yellow-400' },
    { name: 'React Router', color: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 text-center mb-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-50 animate-pulse" />
            <Film className="w-24 h-24 text-red-600 relative z-10" />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          About <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">MovieRec</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Your ultimate destination for discovering amazing movies with AI-powered recommendations and personalized suggestions.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            MovieRec aims to revolutionize how people discover and enjoy movies. We believe that finding your next favorite film should be easy, personalized, and fun. Using advanced recommendation algorithms and a beautiful, intuitive interface, we help movie lovers explore thousands of films and find hidden gems tailored to their taste.
          </p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-20"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10"
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-lg mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Code className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Built With</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-gray-800 rounded-full border border-white/10"
              >
                <span className={`font-semibold ${tech.color}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Developer Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Developer</h2>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Mayank Bhar</h3>
            <p className="text-gray-400 mb-6">Full Stack Developer & Movie Enthusiast</p>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Passionate about creating beautiful, functional web applications that solve real problems. 
              MovieRec combines my love for movies with modern web technologies to help others discover 
              great films.
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/mayankbhar01/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-semibold">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://github.com/rogger001"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-lg"
              >
                <Github className="w-5 h-5" />
                <span className="font-semibold">GitHub</span>
              </motion.a>

              <motion.a
                href="mailto:technifier001@gmail.com"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Email</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: 'Movies', value: '10,000+', icon: Film },
            { label: 'Active Users', value: '50,000+', icon: Users },
            { label: 'Reviews', value: '1M+', icon: Star },
            { label: 'Features', value: '20+', icon: Zap },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-white/10"
            >
              <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
