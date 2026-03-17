import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, FileText, Landmark, Upload, Info } from 'lucide-react';
import { vendorAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const VendorRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        store_name: '',
        store_description: '',
        business_email: '',
        business_phone: '',
        business_address: '',
        tax_id: '',
        bank_account_number: '',
        bank_name: ''
    });

    const [storeLogo, setStoreLogo] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Logo must be less than 2MB');
            return;
        }

        setStoreLogo(file);
        const reader = new FileReader();
        reader.onload = () => setLogoPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleDocsChange = (e) => {
        const files = Array.from(e.target.files);
        const validDocs = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} is larger than 5MB max size.`);
                return false;
            }
            return true;
        });

        setDocuments(prev => [...prev, ...validDocs]);
    };

    const removeDocument = (index) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        if (storeLogo) {
            data.append('store_logo', storeLogo);
        }

        documents.forEach(doc => {
            data.append('verification_documents', doc);
        });

        try {
            await vendorAPI.register(data);
            toast.success('Registration submitted! Awaiting admin approval.');
            navigate('/profile');
        } catch (error) {
            toast.error(error.message || 'Failed to submit registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-primary-600 px-8 py-10 text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Sell with Us</h1>
                    <p className="text-primary-100 max-w-2xl mx-auto">
                        Join our marketplace and reach millions of customers. Fill out the application below to become a verified vendor.
                    </p>
                </div>

                {/* Form Container */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Store Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-primary-500" />
                                Store Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Store Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="store_name"
                                        required
                                        value={formData.store_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="e.g. Acme Corporation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Business Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="business_email"
                                        required
                                        value={formData.business_email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="contact@store.com"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Store Description
                                    </label>
                                    <textarea
                                        name="store_description"
                                        rows="3"
                                        value={formData.store_description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
                                        placeholder="Tell customers what you sell..."
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        {/* Contact Details */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-500" />
                                Contact Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Business Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="business_phone"
                                        value={formData.business_phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Physical Business Address
                                    </label>
                                    <input
                                        type="text"
                                        name="business_address"
                                        value={formData.business_address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="123 Commerce St, Suite 100, City, State, ZIP"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        {/* Financial & Legal */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Landmark className="w-5 h-5 text-primary-500" />
                                Financial Information
                            </h2>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start gap-3 mb-6">
                                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    This information is secure and only used for your commission payouts and tax reporting.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tax ID / EIN
                                    </label>
                                    <input
                                        type="text"
                                        name="tax_id"
                                        value={formData.tax_id}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        name="bank_name"
                                        value={formData.bank_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bank Account Number / IBAN
                                    </label>
                                    <input
                                        type="text"
                                        name="bank_account_number"
                                        value={formData.bank_account_number}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        {/* Document Uploads */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <br />
                                Verification & Media
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Store Logo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Store Logo
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 className="w-8 h-8 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-block">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose custom logo</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                                            </label>
                                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (Max 2MB). Ideal size 500x500px.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Verification Documents */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Verification Documents
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <input
                                            type="file"
                                            multiple
                                            id="documentsFile"
                                            className="hidden"
                                            onChange={handleDocsChange}
                                        />
                                        <label htmlFor="documentsFile" className="cursor-pointer flex flex-col items-center">
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm font-semibold text-primary-600">Click to upload documents</span>
                                            <span className="text-xs text-gray-500 mt-1">Business License, ID, etc. PDF or Images (Max 5MB)</span>
                                        </label>
                                    </div>

                                    {documents.length > 0 && (
                                        <ul className="mt-4 space-y-2">
                                            {documents.map((doc, idx) => (
                                                <li key={idx} className="flex items-center justify-between text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                    <span className="flex items-center gap-2 truncate flex-1">
                                                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span className="truncate">{doc.name}</span>
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDocument(idx)}
                                                        className="text-red-500 hover:text-red-700 ml-4 font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting Application...
                                    </span>
                                ) : (
                                    'Submit Vendor Application'
                                )}
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                By submitting, you agree to our Vendor Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VendorRegistration;
