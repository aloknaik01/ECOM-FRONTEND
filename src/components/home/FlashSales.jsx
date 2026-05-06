import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, Zap } from 'lucide-react';
import { flashSaleAPI } from '../../utils/api';
import ProductCard from '../products/ProductCard';

const FlashSales = () => {
    const [sales, setSales] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const data = await flashSaleAPI.getActive();
                setSales(data.flashSales || []);
            } catch (err) {
                console.error('Flash sale fetch failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    useEffect(() => {
        if (sales.length === 0) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const firstEnd = new Date(sales[0].end_time).getTime();
            const distance = firstEnd - now;

            if (distance < 0) {
                setTimeLeft({ expired: true });
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [sales]);

    if (loading || sales.length === 0 || timeLeft.expired) return null;

    return (
        <section className="py-2 sm:py-12">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">Flash Deals</h2>
                            <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">Limited time offers, act fast!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 bg-red-50 dark:bg-red-900/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-red-100 dark:border-red-900/30">
                        <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                            <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
                            Ends In:
                        </span>
                        <div className="flex gap-1.5 sm:gap-2">
                            {[
                                { val: timeLeft.hours, label: 'h' },
                                { val: timeLeft.minutes, label: 'm' },
                                { val: timeLeft.seconds, label: 's' }
                            ].map((unit, i) => (
                                <div key={i} className="flex items-baseline gap-0.5 sm:gap-1">
                                    <span className="text-lg sm:text-2xl font-black text-red-600 dark:text-red-400 tabular-nums">
                                        {unit.val?.toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-bold text-red-400 dark:text-red-500 uppercase">{unit.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                    {sales.map((sale) => (
                        <div key={sale.id} className="relative group">
                            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                                -{Math.round(sale.discount_percent)}% OFF
                            </div>
                            <ProductCard product={{
                                ...sale,
                                price: sale.sale_price,
                                original_price: sale.price
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSales;
