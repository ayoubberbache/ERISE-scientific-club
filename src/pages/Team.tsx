import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Github, Users, ArrowRight, Loader2 } from 'lucide-react';

export function Team() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        setTeam(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const leaders = team.filter(member => member.type === 'leader');
  const members = team.filter(member => member.type === 'member');

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Meet the <span className="text-[#0d8282]">E.R.I.S.E. Team</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            The dedicated students behind our initiatives, working together to promote renewable energy and environmental sustainability.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#0d8282]" /></div>
        ) : team.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">No team members added yet.</div>
        ) : (
          <>
            {/* Leaders Section */}
            {leaders.length > 0 && (
              <div className="mb-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center flex items-center justify-center gap-3">
                  <Users className="w-8 h-8 text-[#0d8282]" /> Club Leaders
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {leaders.map((leader, idx) => (
                    <div key={idx} className="group bg-gray-50 rounded-2xl p-6 text-center hover:bg-teal-50 transition-colors border border-gray-100 hover:border-teal-100 shadow-sm">
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full rounded-full object-cover border-4 border-white shadow-md group-hover:border-[#0d8282] transition-colors"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 rounded-full ring-1 ring-black/5"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                      <p className="text-[#0d8282] font-medium text-sm mb-4 uppercase tracking-wider">{leader.role}</p>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-3">{leader.bio}</p>
                      
                      <div className="flex justify-center gap-3">
                        {leader.linkedin && (
                          <a href={leader.linkedin} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#0d8282] hover:shadow-sm transition-all border border-gray-200">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {leader.mail && (
                          <a href={`mailto:${leader.mail}`} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#0d8282] hover:shadow-sm transition-all border border-gray-200">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {leader.github && (
                          <a href={leader.github} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#0d8282] hover:shadow-sm transition-all border border-gray-200">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members Section */}
            {members.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Active Members</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {members.map((member, idx) => (
                    <div key={idx} className="text-center group">
                      <div className="w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full border-2 border-transparent group-hover:border-[#0d8282] transition-all shadow-sm">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{member.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-16 text-center">
                  <p className="text-gray-500 mb-6">And many more passionate students...</p>
                  <button className="px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#0d8282] hover:bg-[#0a6b6b] transition-colors inline-flex items-center gap-2">
                    Join Our Team <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
