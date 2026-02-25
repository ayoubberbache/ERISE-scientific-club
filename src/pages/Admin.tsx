import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, Loader2 } from 'lucide-react';

export function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'events' | 'team' | 'achievements'>('events');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState<any>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('adminToken', token);
        setToken(token);
      } else {
        alert('Invalid password');
      }
    } catch (err) {
      alert('Login failed');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchData();
      setFormData({});
    }
  }, [token, activeTab]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/${activeTab}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      setFormData({});
      fetchData();
    } catch (err) {
      alert('Add failed');
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0d8282] focus:border-[#0d8282]"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0d8282] text-white py-2 rounded-lg hover:bg-[#0a6b6b] transition-colors flex justify-center items-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['events', 'team', 'achievements'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab ? 'border-[#0d8282] text-[#0d8282]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-6 capitalize">Add New {activeTab.slice(0, -1)}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {activeTab === 'events' && (
                <>
                  <input type="text" placeholder="Title" required className="w-full px-4 py-2 border rounded-lg" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Date (e.g., March 15, 2026)" required className="w-full px-4 py-2 border rounded-lg" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                  <input type="text" placeholder="Time (e.g., 09:00 AM - 04:00 PM)" required className="w-full px-4 py-2 border rounded-lg" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} />
                  <input type="text" placeholder="Location" required className="w-full px-4 py-2 border rounded-lg" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                  <input type="url" placeholder="Image URL" required className="w-full px-4 py-2 border rounded-lg" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                  <textarea placeholder="Description" required className="w-full px-4 py-2 border rounded-lg" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                  <select required className="w-full px-4 py-2 border rounded-lg" value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="">Select Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Registration Open">Registration Open</option>
                    <option value="Completed">Completed</option>
                  </select>
                </>
              )}

              {activeTab === 'team' && (
                <>
                  <input type="text" placeholder="Name" required className="w-full px-4 py-2 border rounded-lg" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="text" placeholder="Role" required className="w-full px-4 py-2 border rounded-lg" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
                  <select required className="w-full px-4 py-2 border rounded-lg" value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="">Select Type</option>
                    <option value="leader">Leader</option>
                    <option value="member">Member</option>
                  </select>
                  <input type="url" placeholder="Image URL" required className="w-full px-4 py-2 border rounded-lg" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                  <textarea placeholder="Bio (Leaders only)" className="w-full px-4 py-2 border rounded-lg" value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} />
                  <input type="url" placeholder="LinkedIn URL" className="w-full px-4 py-2 border rounded-lg" value={formData.linkedin || ''} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" value={formData.mail || ''} onChange={e => setFormData({...formData, mail: e.target.value})} />
                  <input type="url" placeholder="GitHub URL" className="w-full px-4 py-2 border rounded-lg" value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} />
                </>
              )}

              {activeTab === 'achievements' && (
                <>
                  <input type="text" placeholder="Title" required className="w-full px-4 py-2 border rounded-lg" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Year" required className="w-full px-4 py-2 border rounded-lg" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} />
                  <input type="text" placeholder="Category" required className="w-full px-4 py-2 border rounded-lg" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                  <input type="url" placeholder="Image URL" required className="w-full px-4 py-2 border rounded-lg" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                  <textarea placeholder="Description" required className="w-full px-4 py-2 border rounded-lg" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                  <select required className="w-full px-4 py-2 border rounded-lg" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})}>
                    <option value="">Select Icon</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Star">Star</option>
                    <option value="Medal">Medal</option>
                    <option value="Award">Award</option>
                  </select>
                </>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0d8282] text-white py-2 rounded-lg hover:bg-[#0a6b6b] transition-colors flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Add Item</>}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            {loading && data.length === 0 ? (
              <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#0d8282]" /></div>
            ) : data.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">No data found. Add some!</div>
            ) : (
              data.map((item: any) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title || item.name}</h3>
                      <p className="text-sm text-gray-500">{item.date || item.role || item.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
