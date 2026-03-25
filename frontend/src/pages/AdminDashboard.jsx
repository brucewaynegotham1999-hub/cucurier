import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FiPackage, FiUsers, FiTruck,
  FiPlus, FiEdit2, FiTrash2, FiX, FiCheck,
  FiMapPin, FiBarChart2, FiLogOut, FiUser, FiClock, FiPlusCircle, FiMenu
} from 'react-icons/fi';

const API_BASE = `https://oceanicdeliverydumbbackend.vercel.app/api/admin-api`;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({ packages: [], senders: [], receivers: [] });
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modal, setModal] = useState({ show: false, type: null, item: null });
  const [timelineModal, setTimelineModal] = useState({ show: false, pkg: null, events: [] });
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  useEffect(() => {
    if (!adminToken) {
      navigate('/kirikuadminman/login');
      return;
    }
    fetchData();
  }, [activeTab, adminToken]);

  const getHeaders = () => ({
    headers: { Authorization: `Token ${adminToken}` }
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = ['packages', 'senders', 'receivers'];
      const results = await Promise.all(
        endpoints.map(e => axios.get(`${API_BASE}/${e}/`, getHeaders()))
      );
      setData({
        packages: results[0].data,
        senders: results[1].data,
        receivers: results[2].data
      });
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      }
      console.error("Error fetching admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeline = async (pkg) => {
    try {
      const res = await axios.get(`${API_BASE}/timeline/`, getHeaders());
      const filtered = res.data.filter(t => t.package === pkg.id);
      setTimelineModal({ show: true, pkg, events: filtered });
    } catch (err) {
      alert("Error fetching timeline");
    }
  };

  const handleAddTimeline = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      package: timelineModal.pkg.id
    };
    try {
      await axios.post(`${API_BASE}/timeline/`, payload, getHeaders());
      fetchTimeline(timelineModal.pkg);
      e.target.reset();
    } catch (err) {
      alert("Error adding event");
    }
  };

  const handleDeleteTimeline = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`${API_BASE}/timeline/${id}/`, getHeaders());
      fetchTimeline(timelineModal.pkg);
    } catch (err) {
      alert("Error deleting event");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout/`, {}, getHeaders());
    } catch (e) { }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleDelete = async (endpoint, id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      await axios.delete(`${API_BASE}/${endpoint}/${id}/`, getHeaders());
      fetchData();
    } catch (err) {
      alert("Error deleting item");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (modal.item) {
        await axios.patch(`${API_BASE}/${modal.type}/${modal.item.id}/`, payload, getHeaders());
      } else {
        await axios.post(`${API_BASE}/${modal.type}/`, payload, getHeaders());
      }
      setModal({ show: false, type: null, item: null });
      fetchData();
    } catch (err) {
      alert("Error saving: " + (err.response?.data ? JSON.stringify(err.response.data) : "Check fields"));
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[
        { label: 'Total Shipments', val: data.packages.length, icon: <FiPackage />, color: 'blue' },
        { label: 'Active Senders', val: data.senders.length, icon: <FiUsers />, color: 'purple' },
        { label: 'Receivers', val: data.receivers.length, icon: <FiTruck />, color: 'emerald' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 md:gap-6">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-xl md:text-2xl shrink-0`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-slate-500 text-xs md:text-sm font-medium">{stat.label}</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">{stat.val}</h3>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTable = (type, items, columns) => (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-900 capitalize">{type}</h2>
        <button
          onClick={() => setModal({ show: true, type, item: null })}
          className="w-full sm:w-auto bg-primary-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-500 transition-all font-bold shadow-lg shadow-primary-500/20"
        >
          <FiPlus /> Add {type.slice(0, -1)}
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                {columns.map(c => <th key={c.key} className="px-6 py-4 font-semibold">{c.label}</th>)}
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map(c => (
                    <td key={c.key} className="px-6 py-4 text-sm text-slate-600">
                      {c.render ? c.render(item) : item[c.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex gap-2">
                    {type === 'packages' && (
                      <button onClick={() => fetchTimeline(item)} className="p-2 text-slate-400 hover:text-primary-600 transition-colors" title="Manage Timeline"><FiClock /></button>
                    )}
                    <button onClick={() => setModal({ show: true, type, item })} className="p-2 text-slate-400 hover:text-primary-600 transition-colors"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(type, item.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {columns[0].render ? columns[0].render(item) : item[columns[0].key]}
                </h3>
                {columns.slice(1).map(c => (
                  <div key={c.key} className="mt-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-0.5">{c.label}</span>
                    <div className="text-sm text-slate-600">
                      {c.render ? c.render(item) : item[c.key]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {type === 'packages' && (
                  <button
                    onClick={() => fetchTimeline(item)}
                    className="flex-1 px-4 py-2.5 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
                  >
                    <FiClock /> Timeline
                  </button>
                )}
                <button
                  onClick={() => setModal({ show: true, type, item })}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <FiEdit2 /> Edit
                </button>
              </div>
              <button
                onClick={() => handleDelete(type, item.id)}
                className="p-2.5 text-red-400 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 border-dashed">
          <p className="text-slate-400">No {type} found.</p>
        </div>
      )}
    </div>
  );

  const SidebarContent = () => (
    <>
      <div className="p-6 md:p-8 border-b border-white/5">
        <h1 className="text-2xl font-heading font-bold text-primary-500">Oceanic<span className="text-white"> Admin</span></h1>
        <div className="mt-4 flex items-center gap-3 text-slate-400 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
            <FiUser />
          </div>
          <span className="truncate">{adminUser}</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {[
          { id: 'overview', icon: <FiBarChart2 />, label: 'Overview' },
          { id: 'packages', icon: <FiPackage />, label: 'Packages' },
          { id: 'senders', icon: <FiUsers />, label: 'Senders' },
          { id: 'receivers', icon: <FiTruck />, label: 'Receivers' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>
      <div className="p-6 md:p-8 border-t border-white/5">
        <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors w-full">
          <FiLogOut /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div className="md:hidden bg-slate-900 p-4 flex justify-between items-center sticky top-0 z-[60]">
        <h1 className="text-xl font-heading font-bold text-primary-500">Oceanic<span className="text-white"> Admin</span></h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2 text-2xl"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55]"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-auto md:h-screen
      `}>
        <SidebarContent />
      </aside>

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        <header className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 capitalize">Management Portal: {activeTab}</h2>
            <p className="text-slate-500 mt-1 md:mt-2 text-sm md:text-base">Manage your logistics ecosystem efficiently.</p>
          </div>
          <a href="/" target="_blank" className="text-primary-600 font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
            View Live Site ↗
          </a>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'packages' && renderTable('packages', data.packages, [
              { key: 'tracking_number', label: 'Tracking #' },
              {
                key: 'current_status_display', label: 'Status', render: p => (
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${p.current_status.includes('hold') || p.current_status.includes('seized') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {p.current_status_display}
                  </span>
                )
              },
              { key: 'origin', label: 'Route', render: p => <span className="text-xs md:text-sm">{p.origin} → {p.destination}</span> }
            ])}
            {activeTab === 'senders' && renderTable('senders', data.senders, [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'city', label: 'Location', render: s => <span className="text-xs md:text-sm">{s.city}, {s.country}</span> }
            ])}
            {activeTab === 'receivers' && renderTable('receivers', data.receivers, [
              { key: 'name', label: 'Name' },
              { key: 'city', label: 'Location', render: r => <span className="text-xs md:text-sm">{r.city}, {r.country}</span> }
            ])}
          </>
        )}
      </main>

      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setModal({ show: false, type: null, item: null })}></div>
          <div className="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full max-w-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">{modal.item ? 'Edit' : 'Add'} {modal.type.slice(0, -1)}</h3>
              <button onClick={() => setModal({ show: false, type: null, item: null })} className="p-2 bg-slate-100 rounded-full"><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 md:p-8 space-y-4 md:space-y-6 max-h-[70vh] overflow-y-auto">
              {modal.type === 'packages' && (
                <>
                  <input name="tracking_number" defaultValue={modal.item?.tracking_number} placeholder="Tracking Number" className="w-full p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" required />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="origin" defaultValue={modal.item?.origin} placeholder="Origin" className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" required />
                    <input name="destination" defaultValue={modal.item?.destination} placeholder="Destination" className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" required />
                  </div>
                  <textarea name="description" defaultValue={modal.item?.description} placeholder="Package Description" className="w-full p-4 bg-slate-50 rounded-xl border-none h-24 text-sm md:text-base" required></textarea>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="weight" type="number" step="0.01" defaultValue={modal.item?.weight} placeholder="Weight (kg)" className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" required />
                    <select name="current_status" defaultValue={modal.item?.current_status} className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base">
                      <option value="order_placed">Order Placed</option>
                      <option value="left_warehouse">Left Warehouse</option>
                      <option value="in_transit">In Transit</option>
                      <option value="on_hold">On Hold</option>
                      <option value="seized">Seized</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select name="sender" defaultValue={modal.item?.sender} className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base">
                      <option value="">Select Sender</option>
                      {data.senders.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <select name="receiver" defaultValue={modal.item?.receiver} className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base">
                      <option value="">Select Receiver</option>
                      {data.receivers.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                </>
              )}
              {['senders', 'receivers'].includes(modal.type) && (
                <>
                  <input name="name" defaultValue={modal.item?.name} placeholder="Name" className="w-full p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" required />
                  <input name="email" defaultValue={modal.item?.email} placeholder="Email" className="w-full p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" />
                  <input name="phone" defaultValue={modal.item?.phone} placeholder="Phone" className="w-full p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" />
                  <input name="address" defaultValue={modal.item?.address} placeholder="Address" className="w-full p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="city" defaultValue={modal.item?.city} placeholder="City" className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" />
                    <input name="country" defaultValue={modal.item?.country} placeholder="Country" className="p-4 bg-slate-50 rounded-xl border-none text-sm md:text-base" />
                  </div>
                </>
              )}
              <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 text-base">
                <FiCheck /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {timelineModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setTimelineModal({ show: false, pkg: null, events: [] })}></div>
          <div className="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full max-w-4xl overflow-hidden animate-fade-in-up flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh]">
            <div className="w-full md:w-80 bg-slate-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 overflow-y-auto">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2"><FiPlusCircle className="text-primary-600" /> New Update</h3>
              <form onSubmit={handleAddTimeline} className="space-y-3 md:space-y-4">
                <select name="status" className="w-full p-3 bg-white rounded-xl border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-500/20">
                  <option value="order_placed">Order Placed</option>
                  <option value="left_warehouse">Left Warehouse</option>
                  <option value="in_transit">In Transit</option>
                  <option value="on_hold">On Hold</option>
                  <option value="seized">Seized</option>
                  <option value="delivered">Delivered</option>
                </select>
                <input name="location" placeholder="Location (e.g. New York Hub)" className="w-full p-3 bg-white rounded-xl border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-500/20" required />
                <div className="grid grid-cols-2 gap-2">
                  <input name="latitude" placeholder="Lat" type="number" step="any" className="p-3 bg-white rounded-xl border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-500/20" />
                  <input name="longitude" placeholder="Lng" type="number" step="any" className="p-3 bg-white rounded-xl border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-500/20" />
                </div>
                <input name="timestamp" type="datetime-local" className="w-full p-3 bg-white rounded-xl border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary-500/20" required />
                <textarea name="notes" placeholder="Notes (Optional)" className="w-full p-3 bg-white rounded-xl border-slate-200 text-sm h-20 md:h-24 outline-none focus:ring-2 focus:ring-primary-500/20"></textarea>
                <button type="submit" className="w-full bg-primary-600 text-white p-3 rounded-xl font-bold text-sm hover:bg-primary-500 transition-colors">Add Event</button>
              </form>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 truncate">Timeline</h3>
                  <p className="text-slate-500 text-xs md:text-sm font-mono truncate">{timelineModal.pkg.tracking_number}</p>
                </div>
                <button onClick={() => setTimelineModal({ show: false, pkg: null, events: [] })} className="p-2 bg-slate-100 rounded-full shrink-0 ml-4"><FiX /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {timelineModal.events.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                    <FiClock className="text-4xl mb-4 opacity-20" />
                    <p>No history yet for this shipment.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {timelineModal.events.map((ev, i) => (
                      <div key={ev.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start group relative">
                        <div className="sm:w-32 sm:text-right pt-1 shrink-0">
                          <p className="text-sm font-bold text-slate-900">{new Date(ev.timestamp).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-400">{new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="w-full relative bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                          <button
                            onClick={() => handleDeleteTimeline(ev.id)}
                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiTrash2 />
                          </button>
                          <h4 className="font-bold text-primary-600 text-[10px] md:text-xs mb-1 uppercase tracking-widest">{ev.status_display}</h4>
                          <p className="text-slate-900 font-bold text-sm md:text-base mb-1">{ev.location}</p>
                          {ev.notes && <p className="text-slate-500 text-xs md:text-sm italic">"{ev.notes}"</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
