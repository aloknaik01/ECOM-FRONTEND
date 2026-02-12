import { useState } from 'react';
import { Sparkles, Search, X, Loader2 } from 'lucide-react';
import { productAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';

const AISearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const examplePrompts = [
    "Show me affordable tech gadgets under $50",
    "Find me highly rated products for home office",
    "I need gifts for tech enthusiasts",
    "Best products for fitness and wellness",
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a search prompt');
      return;
    }

    setLoading(true);
    setSearchPerformed(true);

    try {
      const data = await productAPI.aiSearch(prompt);
      setResults(data.products || []);
      
      if (!data.products || data.products.length === 0) {
        toast.info('No products found. Try a different search.');
      } else {
        toast.success(`Found ${data.products.length} products!`);
      }
    } catch (error) {
      toast.error(error.message || 'AI search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
  };

  const handleClear = () => {
    setPrompt('');
    setResults([]);
    setSearchPerformed(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
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
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI-Powered Product Search</h2>
                    <p className="text-sm text-purple-100">
                      Describe what you're looking for in natural language
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Search Form */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., 'Show me high-quality wireless headphones under $100 with good reviews'"
                      rows={3}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
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
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Searching with AI...
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Try these examples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleClick(example)}
                          className="text-xs px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="p-6 overflow-y-auto max-h-96">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      AI is searching for the best products...
                    </p>
                  </div>
                )}

                {!loading && searchPerformed && results.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try rephrasing your search or use different keywords
                    </p>
                  </div>
                )}

                {!loading && results.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Found {results.length} products
                      </h3>
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

                {!loading && !searchPerformed && (
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      AI-Powered Search
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Describe what you're looking for using natural language. Our AI will
                      understand your needs and find the perfect products for you.
                    </p>
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