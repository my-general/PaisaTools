'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// 1. Define the data structure for our form
interface SIPFormValues {
  monthlyInvestment: number;
  investmentPeriod: number;
  expectedReturnRate: number;
}

// 2. Define the data structure for our results
interface SIPResult {
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
}

const SIPCalculator = () => {
  // 3. Form state management
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SIPFormValues>();

  // 4. Local state to store the calculation results
  const [result, setResult] = useState<SIPResult | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // 5. The core calculation logic
  const calculateSIP: SubmitHandler<SIPFormValues> = async (data) => {
    try {
      setCalculationError(null);
      
      const P = data.monthlyInvestment;
      const i = data.expectedReturnRate / 100 / 12; // Monthly rate of return
      const n = data.investmentPeriod; // Number of months (direct input)

      // Future Value (M) calculation
      const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

      const totalInvested = P * n;
      const estimatedReturns = M - totalInvested;

      setResult({
        totalInvested: totalInvested,
        estimatedReturns: estimatedReturns,
        futureValue: M,
      });

      // Auto-scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('sip-results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } catch (error) {
      setCalculationError('An error occurred during calculation. Please check your inputs.');
      console.error('SIP calculation error:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8 
                    hover:shadow-2xl transition-all duration-300 w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          SIP Calculator
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Calculate your mutual fund investment returns
        </p>
      </div>

      <form onSubmit={handleSubmit(calculateSIP)} className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="monthlyInvestment" className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Investment (₹)
          </label>
          <input
            type="number"
            id="monthlyInvestment"
            {...register('monthlyInvestment', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 500, message: 'Must be at least ₹500' },
              max: { value: 1000000, message: 'Cannot exceed ₹10,00,000' },
            })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                       text-gray-900 bg-white placeholder-gray-500"
            placeholder="e.g., 5000"
          />
          {errors.monthlyInvestment && (
            <span className="text-red-500 text-xs mt-1">{errors.monthlyInvestment.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="investmentPeriod" className="block text-sm font-medium text-gray-700 mb-2">
            Investment Period (Months)
          </label>
          <input
            type="number"
            id="investmentPeriod"
            {...register('investmentPeriod', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 6, message: 'Must be at least 6 months' },
              max: { value: 600, message: 'Cannot exceed 600 months (50 years)' },
            })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                       text-gray-900 bg-white placeholder-gray-500"
            placeholder="e.g., 120 (10 years)"
          />
          {errors.investmentPeriod && (
            <span className="text-red-500 text-xs mt-1">{errors.investmentPeriod.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="expectedReturnRate" className="block text-sm font-medium text-gray-700 mb-2">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            step="0.1"
            id="expectedReturnRate"
            {...register('expectedReturnRate', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be at least 1%' },
              max: { value: 50, message: 'Cannot exceed 50%' },
            })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                       text-gray-900 bg-white placeholder-gray-500"
            placeholder="e.g., 12"
          />
          {errors.expectedReturnRate && (
            <span className="text-red-500 text-xs mt-1">{errors.expectedReturnRate.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 md:py-4 px-4 
                     rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transform hover:-translate-y-0.5 transition-all duration-200 
                     focus:ring-4 focus:ring-blue-500/20"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Calculating...
            </span>
          ) : (
            'Calculate SIP Returns'
          )}
        </button>
      </form>

      {calculationError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center text-sm">
          {calculationError}
        </div>
      )}

      {result && (
        <div id="sip-results-section" className="mt-6 md:mt-8 border-t pt-6 md:pt-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 md:mb-6">
            Investment Results
          </h3>

          <div className="mb-4 md:mb-6 text-center">
            <span className="text-gray-600 block text-sm md:text-base">Future Value</span>
            <span className="text-2xl md:text-4xl font-bold text-green-600">
              {formatCurrency(result.futureValue)}
            </span>
          </div>

          <div className="space-y-2 md:space-y-3 text-sm md:text-base">
            <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Invested:</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(result.totalInvested)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
              <span className="text-gray-600">Estimated Returns:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(result.estimatedReturns)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-300">
              <span className="font-bold text-gray-900 text-base md:text-lg">Total Value:</span>
              <span className="font-bold text-gray-900 text-base md:text-lg">
                {formatCurrency(result.futureValue)}
              </span>
            </div>
          </div>

          {/* Returns Percentage */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-blue-800 text-sm">
              <strong>Returns Percentage:</strong>{' '}
              {((result.estimatedReturns / result.totalInvested) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;