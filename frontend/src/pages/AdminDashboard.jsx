import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X, Briefcase, Code, User, History, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:8000/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState({
    projects: [],
    skills: [],
    experience: [],
    profile: []
  });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [proj, skill, exp, prof] = await Promise.all([
        axios.get(`${API_BASE}/projects/`),
        axios.get(`${API_BASE}/skills/`),
        axios.get(`${API_BASE}/experience/`),
        axios.get(`${API_BASE}/profile/`)
      ]);
      setData({
        projects: proj.data,
        skills: skill.data,
        experience: exp.data,
        profile: prof.data
      });
    } catch (err) {
      console.error("Error fetching data", err);
    }
    setLoading(false);
  };

  const handleSave = async (item) => {
    try {
      const formData = new FormData();
      Object.keys(item).forEach(key => {
        if (key === 'tech_stack' && Array.isArray(item[key])) {
          formData.append(key, JSON.stringify(item[key]));
        } else if (key === 'resume' && item[key] instanceof File) {
          formData.append(key, item[key]);
        } else if (item[key] !== null && item[key] !== undefined) {
          formData.append(key, item[key]);
        }
      });

      const url = `${API_BASE}/${activeTab}/${item.id ? item.id + '/' : ''}`;
      const method = item.id ? 'put' : 'post';
      
      await axios({
        method,
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Error saving item", err);
      alert("Error saving. Check console.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE}/${activeTab}/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const renderForm = () => {
    if (!editingItem) return null;

    const fields = {
      projects: ['title', 'company', 'category', 'description', 'award_name', 'live_link', 'github_link', 'tech_stack'],
      skills: ['name', 'category', 'proficiency'],
      experience: ['title', 'company', 'duration', 'description'],
      profile: ['name', 'role', 'email', 'phone', 'bio', 'vision', 'approach', 'leadership', 'current_focus', 'resume']
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ padding: '3rem', marginTop: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h3>{editingItem.id ? 'Edit' : 'Add New'} {activeTab}</h3>
          <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer' }}><X /></button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {fields[activeTab].map(field => (
            <div key={field} style={{ gridColumn: field === 'description' || field === 'bio' || field.includes('vision') || field.includes('leadership') || field.includes('approach') ? 'span 2' : 'span 1' }}>
              <label className="mono" style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.6 }}>{field.replace('_', ' ')}</label>
              {field === 'description' || field === 'bio' || field.includes('vision') || field.includes('leadership') || field.includes('approach') || field === 'current_focus' ? (
                <textarea 
                  value={editingItem[field] || ''} 
                  onChange={e => setEditingItem({...editingItem, [field]: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--fg)', padding: '1rem', minHeight: '100px' }}
                />
              ) : field === 'resume' ? (
                <div style={{ padding: '1rem', border: '1px dashed var(--border)', borderRadius: '0.5rem' }}>
                  <input 
                    type="file"
                    onChange={e => setEditingItem({...editingItem, [field]: e.target.files[0]})}
                    style={{ width: '100%', color: 'var(--fg)' }}
                  />
                  {editingItem[field] && !(editingItem[field] instanceof File) && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.5 }}>Current: {editingItem[field].split('/').pop()}</p>
                  )}
                </div>
              ) : field === 'tech_stack' ? (
                 <input 
                  type="text"
                  placeholder="React, Node, etc (comma separated)"
                  value={Array.isArray(editingItem[field]) ? editingItem[field].join(', ') : editingItem[field] || ''} 
                  onChange={e => setEditingItem({...editingItem, [field]: e.target.value.split(',').map(s => s.trim())})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--fg)', padding: '1rem' }}
                />
              ) : (
                <input 
                  type="text" 
                  value={editingItem[field] || ''} 
                  onChange={e => setEditingItem({...editingItem, [field]: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--fg)', padding: '1rem' }}
                />
              )}
            </div>
          ))}
        </div>
        <button className="btn" onClick={() => handleSave(editingItem)} style={{ marginTop: '3rem', width: '100%' }}>
          Save Changes <Save size={18} />
        </button>
      </motion.div>
    );
  };

  return (
    <div className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <h2 className="oversized-text" style={{ fontSize: '4rem' }}>Control <span style={{ color: 'var(--accent)' }}>Center.</span></h2>
          <button className="btn" onClick={() => setEditingItem({})}>Add New <Plus size={18} /></button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'projects', label: 'Projects', icon: <Briefcase size={16} /> },
            { id: 'skills', label: 'Tech Stack', icon: <Code size={16} /> },
            { id: 'experience', label: 'History', icon: <History size={16} /> },
            { id: 'profile', label: 'Profile', icon: <User size={16} /> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
              className="glass-panel"
              style={{ 
                padding: '1rem 2rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.8rem',
                background: activeTab === tab.id ? 'var(--accent)' : 'var(--glass)',
                color: activeTab === tab.id ? '#000' : 'var(--fg)',
                border: 'none',
                borderRadius: '100px',
                fontWeight: 700
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {renderForm()}

        <div style={{ marginTop: '4rem', display: 'grid', gap: '1rem' }}>
          {data[activeTab].map(item => (
            <motion.div 
              layout
              key={item.id} 
              className="glass-panel" 
              style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.title || item.name}</h4>
                <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>{item.company || item.category || item.role}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setEditingItem(item)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
