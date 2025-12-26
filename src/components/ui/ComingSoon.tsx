import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
    title: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
    return (
        <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center px-4 text-center pt-24">
            <div className="w-24 h-24 bg-cacao-900 rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
                <ChefHat className="text-gold-500 w-12 h-12" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900 mb-4">
                {title}
            </h1>

            <div className="w-24 h-1 bg-gold-500 mx-auto mb-8 rounded-full"></div>

            <p className="text-xl text-gray-600 mb-8 max-w-md leading-relaxed">
                Estamos temperando el chocolate y preparando los moldes. <br />
                Esta sección estará lista muy pronto.
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 bg-cacao-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gold-500 transition-colors shadow-lg group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Volver al Inicio
            </Link>
        </div>
    );
};
