import { useState } from 'react';
import { Sparkles, Search, X, Loader2, Globe } from 'lucide-react';
import { productAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';

const AISearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filtersDetected, setFiltersDetected] = useState({});
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const examplePrompts = [
    { text: '15000 ke andar mobile phone dikhao', lang: '🇮🇳 Hinglish' },
    { text: 'सबसे अच्छे wireless headphones', lang: '🇮🇳 Hindi' },
    { text: 'Laptops under ₹40000 for students', lang: '🇬🇧 English' },
    { text: 'Best rated cameras above 20000', lang: '🇬🇧 English' },
    { text: 'Saste earphones jo acche ho', lang: '🇮🇳 Hinglish' },
    { text: '₹500 se kam ke products dikhao', lang: '🇮🇳 Hinglish' },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error('Please enter a search prompt');
      return;
    }

    setLoading(true);
    setSearchPerformed(true);
    setResults([]);
    setFiltersDetected({});
    setDetectedLanguage('');

    try {
      const data = await productAPI.aiSearch(prompt);
      setResults(data.products || []);
      setFiltersDetected(data.filtersDetected || {});
      setDetectedLanguage(data.detectedLanguage || '');

      if (!data.products || data.products.length === 0) {
        toast('No products found. Try rephrasing your search. 🔍');
      } else {
        toast.success(`Found ${data.products.length} products!`);
      }
    } catch (error) {
      toast.error(error.message || 'AI search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setPrompt(example.text);
  };

  const handleClear = () => {
    setPrompt('');
    setResults([]);
    setFiltersDetected({});
    setDetectedLanguage('');
    setSearchPerformed(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        id="ai-search-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <Sparkles className="w-5 h-5" />
        <span className="font-semibold">AI Search</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">

              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI-Powered Product Search</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Globe className="w-3.5 h-3.5 text-purple-200" />
                      <p className="text-xs text-purple-100 font-medium">
                        Supports Hindi · Hinglish · English · and more
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  id="ai-search-close"
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Search Form */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <textarea
                      id="ai-search-input"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={'Type in any language…\n e.g. "15000 ke andar mobile dikhao" or "सबसे सस्ते headphones" or "Best laptops under 40000"'}
                      rows={3}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSearch(e);
                        }
                      }}
                    />
                    {prompt && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>

                  <button
                    id="ai-search-submit"
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        AI is understanding your query…
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Search with AI
                      </>
                    )}
                  </button>
                </form>

                {/* Example Prompts */}
                {!searchPerformed && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">
                      Try these examples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleClick(example)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border border-purple-100 dark:border-purple-800"
                        >
                          <span>{example.text}</span>
                          <span className="text-purple-400 dark:text-purple-500 text-[10px]">
                            {example.lang}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="p-6 overflow-y-auto flex-1">

                {/* Loading */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Understanding your query and searching…
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      AI is translating your intent and filtering products
                    </p>
                  </div>
                )}

                {/* No results */}
                {!loading && searchPerformed && results.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Try rephrasing your search or use different keywords
                    </p>
                  </div>
                )}

                {/* Results grid */}
                {!loading && results.length > 0 && (
                  <div>
                    {/* Result header with filters */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        Found {results.length} products
                      </h3>

                      {/* Language detected badge */}
                      {detectedLanguage && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                          <Globe className="w-3 h-3" />
                          {detectedLanguage}
                        </span>
                      )}

                      {/* Filters detected */}
                      {Object.entries(filtersDetected)
                        .filter(([key]) => key !== 'Language')
                        .map(([key, val]) => (
                          <span
                            key={key}
                            className="text-[10px] font-bold uppercase tracking-widest bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800"
                          >
                            {key}: {val}
                          </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Initial state */}
                {!loading && !searchPerformed && (
                  <div className="text-center py-12">
                    <div className="relative inline-block mb-4">
                      <Sparkles className="w-16 h-16 text-purple-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Search in Your Language
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                      Type your query in <span className="font-semibold text-purple-600">Hindi</span>,{' '}
                      <span className="font-semibold text-purple-600">Hinglish</span>, or{' '}
                      <span className="font-semibold text-purple-600">English</span>.
                      Our AI understands price limits, categories, and quality preferences
                      in any language.
                    </p>
                    <div className="mt-4 flex justify-center gap-3 flex-wrap text-xs text-gray-400 dark:text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">🇮🇳 Hindi</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">🇮🇳 Hinglish</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">🇬🇧 English</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">+ more</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AISearch;
