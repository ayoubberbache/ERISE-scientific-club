import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const [visitors, setVisitors] = useState(0);
  const [nations, setNations] = useState(0);

  useEffect(() => {
    // Simulate fetching visitor data
    setVisitors(12458);
    setNations(42);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="h-10 w-10 text-[#0d8282]" />
              <span className="font-bold text-xl text-white tracking-wider">E.R.I.S.E.</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Engineers For renewable Energy Innovation & Environmental sustainability. 
              A scientific club at the Higher National School of Renewable Energies, Environment, and Sustainable Development (Batna, Algeria).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="hover:text-[#0d8282] transition-colors">Home</a></li>
              <li><a href="/events" className="hover:text-[#0d8282] transition-colors">Events & Calendar</a></li>
              <li><a href="/team" className="hover:text-[#0d8282] transition-colors">Our Team</a></li>
              <li><a href="/achievements" className="hover:text-[#0d8282] transition-colors">Achievements</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0d8282] shrink-0" />
                <span>Higher National School of Renewable Energies, Environment and Sustainable Development, Batna, Algeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0d8282] shrink-0" />
                <span>+213 (0) 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0d8282] shrink-0" />
                <a href="mailto:contact@erise-club.dz" className="hover:text-white transition-colors">contact@erise-club.dz</a>
              </li>
            </ul>
          </div>

          {/* Social Media & Visitor Stats */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Connect With Us</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0d8282] hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0d8282] hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0d8282] hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Visitor Stats Frame */}
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 backdrop-blur-sm">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Global Reach
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{visitors.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Visitors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0d8282] mb-1">{nations}</div>
                  <div className="text-xs text-gray-500">Nations Reached</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} E.R.I.S.E. Scientific Club. All rights reserved.</p>
          <p>Designed with <span className="text-red-500">&hearts;</span> for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
}
