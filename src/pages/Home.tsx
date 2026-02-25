import React from 'react';
import { ArrowRight, Leaf, Zap, Globe, Users, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <Logo className="w-32 h-32 md:w-48 md:h-48" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
            >
              Engineers For Renewable Energy <br />
              <span className="text-[#0d8282]">Innovation & Environmental Sustainability</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Welcome to E.R.I.S.E. Scientific Club. We are a community of passionate students at the Higher National School of Renewable Energies, Environment, and Sustainable Development in Batna, Algeria.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex justify-center gap-4"
            >
              <Link to="/events" className="px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#0d8282] hover:bg-[#0a6b6b] transition-colors">
                Discover Events
              </Link>
              <Link to="/team" className="px-8 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Meet the Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Mission & Vision</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              E.R.I.S.E. is dedicated to fostering innovation, promoting environmental sustainability, and preparing the next generation of engineers to tackle global energy challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-teal-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#0d8282] rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Environmental Sustainability</h3>
              <p className="text-gray-600">Promoting eco-friendly practices and raising awareness about environmental conservation within our community and beyond.</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#0d8282] rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Renewable Energy</h3>
              <p className="text-gray-600">Exploring and developing innovative solutions in solar, wind, and other renewable energy sources to power a sustainable future.</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#0d8282] rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Impact</h3>
              <p className="text-gray-600">Connecting with international organizations and participating in global initiatives to contribute to worldwide sustainability goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Latest Events Preview */}
            <Link to="/events" className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gray-200 relative">
                <img src="https://picsum.photos/seed/event1/800/600" alt="Event" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#0d8282] mb-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Latest Events</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0d8282] transition-colors">Green Tech Symposium 2026</h3>
                <p className="text-gray-500 mb-4 line-clamp-2">Join us for an inspiring day of talks and workshops on the latest advancements in green technology and sustainable engineering.</p>
                <span className="text-[#0d8282] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View all events <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Team Preview */}
            <Link to="/team" className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gray-200 relative">
                <img src="https://picsum.photos/seed/team/800/600" alt="Team" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#0d8282] mb-3">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Our Team</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0d8282] transition-colors">Meet the Innovators</h3>
                <p className="text-gray-500 mb-4 line-clamp-2">Discover the passionate leaders and members who drive E.R.I.S.E. forward, organizing events and leading impactful projects.</p>
                <span className="text-[#0d8282] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View members <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Achievements Preview */}
            <Link to="/achievements" className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all md:col-span-2 lg:col-span-1">
              <div className="h-48 bg-gray-200 relative">
                <img src="https://picsum.photos/seed/trophy/800/600" alt="Achievements" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#0d8282] mb-3">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Achievements</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0d8282] transition-colors">Our Trophies & Awards</h3>
                <p className="text-gray-500 mb-4 line-clamp-2">Explore our proudest moments, from winning national competitions to receiving recognition for our environmental initiatives.</p>
                <span className="text-[#0d8282] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View achievements <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
