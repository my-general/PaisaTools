'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define tool data with error boundaries
interface Tool {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

const tools: Tool[] = [
  {
    title: "Income Tax Calculator",
    description: "Compare Old vs. New tax regimes for FY 2024-25 and see which saves you more.",
    href: "/income-tax-calculator",
    icon: "💰"
  },
  {
    title: "SIP Calculator",
    description: "Estimate the future value of your monthly mutual fund investments (SIP).",
    href: "/sip-calculator",
    icon: "📈"
  },
  {
    title: "Home Loan EMI Calculator",
    description: "Calculate your monthly EMI, total interest, and total payment for your home loan.",
    href: "/home-loan-emi-calculator",
    icon: "🏠"
  },
  {
    title: "Personal Loan EMI Calculator",
    description: "Estimate your monthly payments for a personal loan, ideal for any amount and tenure.",
    href: "/personal-loan-emi-calculator",
    icon: "💳"
  }
];

// Error Boundary Component for individual cards
const ToolCardErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600 font-medium">Tool temporarily unavailable</p>
        <p className="text-red-500 text-sm mt-1">Please try again later</p>
      </div>
    );
  }

  return <>{children}</>;
};

// Skeleton Loader
const ToolCardSkeleton = () => (
  <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
);

// Enhanced ToolCard Component
const ToolCard = ({ title, description, href, icon }: Tool) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if there's an issue with the link
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
  };

  return (
    <ToolCardErrorBoundary>
      <Link 
        href={href}
        onClick={handleClick}
        className="block group relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100 
                   hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 
                   transition-all duration-300 ease-out
                   focus:outline-none focus:ring-4 focus:ring-blue-500/20
                   overflow-hidden"
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="flex items-center mb-4">
            {icon && (
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                {icon}
              </span>
            )}
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
            {description}
          </p>

          {/* CTA Arrow */}
          <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
            Calculate now
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </ToolCardErrorBoundary>
  );
};

// Main Home Component
export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Skeleton */}
          <div className="text-center bg-white rounded-2xl shadow-sm p-12 mb-12 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((_, index) => (
              <ToolCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Enhanced Hero Section */}
        {/* <section className="text-center bg-white rounded-2xl shadow-sm p-12 mb-16 
                          border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 
                         bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              PaisaTools
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Your free, fast, and simple resource for 
              <span className="font-semibold text-gray-800"> smart financial decisions</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                No Signup Required
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                100% Free Forever
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Privacy First
              </span>
            </div>
          </div>
        </section> */}

        {/* Enhanced Tools Grid */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Financial Calculators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of powerful calculators to make informed financial decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.href}
                title={tool.title}
                description={tool.description}
                href={tool.href}
                icon={tool.icon}
              />
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for better financial planning • 
            <span className="text-green-600 font-medium ml-1">Always Free</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
