import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // March 2026
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Simple calendar generation
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Map events to calendar days (simple matching for demo)
  const calendarEvents: Record<number, string> = {};
  events.forEach(event => {
    // Extract day from date string like "March 15, 2026"
    const match = event.date.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if (match) {
      const monthStr = match[1];
      const day = parseInt(match[2]);
      const year = parseInt(match[3]);
      
      if (monthNames.indexOf(monthStr) === currentMonth.getMonth() && year === currentMonth.getFullYear()) {
        calendarEvents[day] = event.title;
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Events & <span className="text-[#0d8282]">Calendar</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Stay updated with our latest workshops, symposiums, and hackathons. Join us in shaping a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Latest Events List */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-[#0d8282]" /> Latest Events
            </h2>
            
            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#0d8282]" /></div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">No events scheduled yet.</div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0d8282] shadow-sm">
                        {event.status}
                      </div>
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-[#0d8282]" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#0d8282]" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#0d8282]" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button className="text-[#0d8282] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                          Register Now <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                <span>Calendar</span>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </h2>
              
              <div className="text-center font-semibold text-lg text-[#0d8282] mb-4">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-xs font-medium text-gray-400 py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {days.map((day, idx) => {
                  const hasEvent = day && calendarEvents[day];
                  return (
                    <div 
                      key={idx} 
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-full relative
                        ${!day ? '' : 'hover:bg-teal-50 cursor-pointer transition-colors'}
                        ${hasEvent ? 'bg-[#0d8282] text-white hover:bg-[#0a6b6b] font-bold' : 'text-gray-700'}
                      `}
                      title={hasEvent ? calendarEvents[day] : ''}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Upcoming this month</h3>
                {Object.keys(calendarEvents).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(calendarEvents).map(([day, title]) => (
                      <div key={day} className="flex items-start gap-3 text-sm">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0d8282] flex flex-col items-center justify-center shrink-0 font-bold">
                          <span className="text-xs leading-none">{monthNames[currentMonth.getMonth()].slice(0, 3)}</span>
                          <span className="leading-none mt-1">{day}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No events scheduled for this month.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
