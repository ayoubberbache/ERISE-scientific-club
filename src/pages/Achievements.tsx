import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Medal, Loader2 } from 'lucide-react';

const iconMap: Record<string, any> = {
  Award,
  Trophy,
  Star,
  Medal
};

export function Achievements() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 text-[#0d8282] rounded-full mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Our <span className="text-[#0d8282]">Achievements</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Celebrating our milestones, trophies, and the impact we've made in the fields of renewable energy and environmental sustainability.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#0d8282]" /></div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">No achievements added yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {achievements.map((achievement) => {
              const Icon = iconMap[achievement.icon] || Trophy;
              return (
                <div key={achievement.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm border border-white/30">
                        {achievement.year}
                      </div>
                      <div className="w-12 h-12 bg-[#0d8282] rounded-full flex items-center justify-center shadow-lg text-white transform group-hover:-translate-y-2 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-[#0d8282] uppercase tracking-wider mb-2">
                      {achievement.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0d8282] transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-24 bg-[#0d8282] rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Help Us Achieve More</h2>
            <p className="text-teal-100 text-lg mb-8">
              Every great achievement starts with a single step. Join E.R.I.S.E. today and be part of our next big success story in sustainable innovation.
            </p>
            <button className="px-8 py-4 bg-white text-[#0d8282] font-bold rounded-full shadow-lg hover:bg-gray-50 hover:scale-105 transition-all">
              Become a Member
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
