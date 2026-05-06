import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Home, Briefcase, CheckCircle, ArrowLeft } from 'lucide-react';
import { addressAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        is_default: false
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const data = await addressAPI.getAll();
            setAddresses(data.addresses);
        } catch (err) {
            toast.error('Failed to load addresses');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await addressAPI.update(editingId, formData);
                toast.success('Address updated');
            } else {
                await addressAPI.add(formData);
                toast.success('Address added');
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({ full_name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', zip: '', country: 'India', is_default: false });
            fetchAddresses();
        } catch (err) {
            toast.error(err.message || 'Operation failed');
        }
    };

    const handleEdit = (addr) => {
        setFormData(addr);
        setEditingId(addr.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            await addressAPI.delete(id);
            toast.success('Address deleted');
            fetchAddresses();
        } catch (err) {
            toast.error('Failed to delete address');
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await addressAPI.setDefault(id);
            toast.success('Default address updated');
            fetchAddresses();
        } catch (err) {
            toast.error('Failed to update default address');
        }
    };

    if (loading && !showForm) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Address Book</h1>
            </div>

            {!showForm ? (
                <div className="space-y-6">
                    <button 
                        onClick={() => setShowForm(true)}
                        className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Address
                    </button>

                    <div className="grid gap-6">
                        {addresses.map((addr) => (
                            <div key={addr.id} className={`p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all ${addr.is_default ? 'border-primary-500' : 'border-gray-100 dark:border-gray-700'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary-500" />
                                        <span className="font-bold text-gray-900 dark:text-white text-lg">{addr.full_name}</span>
                                        {addr.is_default && (
                                            <span className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-bold px-2 py-1 rounded-full uppercase">Default</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(addr)} className="text-gray-500 hover:text-primary-500 p-2">Edit</button>
                                        <button onClick={() => handleDelete(addr.id)} className="text-gray-500 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 space-y-1 ml-7">
                                    <p>{addr.address_line1}</p>
                                    {addr.address_line2 && <p>{addr.address_line2}</p>}
                                    <p>{addr.city}, {addr.state} - {addr.zip}</p>
                                    <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">📞 {addr.phone}</p>
                                </div>
                                {!addr.is_default && (
                                    <button 
                                        onClick={() => handleSetDefault(addr.id)}
                                        className="mt-4 ml-7 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                                    >
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{editingId ? 'Edit Address' : 'Add New Address'}</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                            <input 
                                required
                                value={formData.full_name}
                                onChange={e => setFormData({...formData, full_name: e.target.value})}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input 
                                required
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address Line 1</label>
                            <input 
                                required
                                value={formData.address_line1}
                                onChange={e => setFormData({...formData, address_line1: e.target.value})}
                                placeholder="House no, Street, etc."
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address Line 2 (Optional)</label>
                            <input 
                                value={formData.address_line2}
                                onChange={e => setFormData({...formData, address_line2: e.target.value})}
                                placeholder="Landmark, Area"
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">City</label>
                            <input 
                                required
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">State</label>
                            <input 
                                required
                                value={formData.state}
                                onChange={e => setFormData({...formData, state: e.target.value})}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">ZIP / Pincode</label>
                            <input 
                                required
                                value={formData.zip}
                                onChange={e => setFormData({...formData, zip: e.target.value})}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Country</label>
                            <input 
                                required
                                value={formData.country}
                                onChange={e => setFormData({...formData, country: e.target.value})}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                        <input 
                            type="checkbox" 
                            id="is_default"
                            checked={formData.is_default}
                            onChange={e => setFormData({...formData, is_default: e.target.checked})}
                            className="w-5 h-5 accent-primary-600"
                        />
                        <label htmlFor="is_default" className="text-sm font-medium text-gray-700 dark:text-gray-300">Set as default address</label>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button 
                            type="button"
                            onClick={() => { setShowForm(false); setEditingId(null); }}
                            className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all"
                        >
                            {editingId ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddressBook;
