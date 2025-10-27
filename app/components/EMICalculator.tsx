'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMIInputs, EMIResult, calculateEMI } from '../utils/loanLogic';

// 1. Define the data structure for our form
interface EMIFormValues {
  loanAmount: number;
  annualRate: number;
  tenureMonths: number; // Changed from tenureYears to tenureMonths
}

// 2. Define the props our component will accept
interface LoanCalculatorProps {
  title: string;
  minLoanAmount: number;
  maxTenureMonths: number; // Changed from maxTenureYears to maxTenureMonths
  loanAmountPlaceholder: string;
  tenurePlaceholder: string;
}

// 3. Update the component to accept props
const EMICalculator = ({ 
  title, 
  minLoanAmount, 
  maxTenureMonths, // Changed prop name
  loanAmountPlaceholder,
  tenurePlaceholder
}: LoanCalculatorProps) => {
  // 4. Form state management
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EMIFormValues>();

  // 5. Local state to store the calculation results
  const [result, setResult] = useState<EMIResult | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // 6. Helper function to format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
  };

  // 7. The submit handler - updated for months
  const onSubmit: SubmitHandler<EMIFormValues> = async (data) => {
    try {
      setCalculationError(null);
      
      const calculationInputs: EMIInputs = {
        loanAmount: data.loanAmount,
        annualRate: data.annualRate,
        tenureMonths: data.tenureMonths, // Now passing months directly
      };

      const emiResult = calculateEMI(calculationInputs);
      setResult(emiResult);

      // Auto-scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('emi-results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } catch (error) {
      setCalculationError('An error occurred during calculation. Please check your inputs.');
      console.error('EMI calculation error:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8 
                    hover:shadow-2xl transition-all duration-300 w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Calculate your monthly EMI in seconds
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            id="loanAmount"
            {...register('loanAmount', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: minLoanAmount, message: `Must be at least ${formatCurrency(minLoanAmount)}` },
            })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                       text-gray-900 bg-white placeholder-gray-500"
            placeholder={loanAmountPlaceholder}
          />
          {errors.loanAmount && (
            <span className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="annualRate" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01" 
            id="annualRate"
            {...register('annualRate', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be at least 1%' },
              max: { value: 36, message: 'Cannot exceed 36%' },
            })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                       text-gray-900 bg-white placeholder-gray-500"
            placeholder="e.g., 8.5"
          />
          {errors.annualRate && (
            <span className="text-red-500 text-xs mt-1">{errors.annualRate.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="tenureMonths" className="block text-sm font-medium text-gray-700 mb-2">
            Loan Tenure (Months) {/* Updated label */}
          </label>
          <input
            type="number"
            id="tenureMonths"
            {...register('tenureMonths', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 6, message: 'Must be at least 6 months' }, // Updated min to months
              max: { value: maxTenureMonths, message: `Cannot exceed ${maxTenureMonths} months` }, // Updated max to months
            })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                       text-gray-900 bg-white placeholder-gray-500"
            placeholder={tenurePlaceholder}
          />
          {errors.tenureMonths && (
            <span className="text-red-500 text-xs mt-1">{errors.tenureMonths.message}</span>
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
            'Calculate EMI'
          )}
        </button>
      </form>

      {calculationError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center text-sm">
          {calculationError}
        </div>
      )}

      {result && (
        <div id="emi-results-section" className="mt-6 md:mt-8 border-t pt-6 md:pt-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 md:mb-6">
            Loan Repayment Details
          </h3>

          <div className="mb-4 md:mb-6 text-center">
            <span className="text-gray-600 block text-sm md:text-base">Monthly EMI</span>
            <span className="text-2xl md:text-4xl font-bold text-blue-600">
              {formatCurrency(result.monthlyEMI)}
            </span>
          </div>

          <div className="space-y-2 md:space-y-3 text-sm md:text-base">
            <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
              <span className="text-gray-600">Principal Amount:</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(result.totalPayment - result.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Interest:</span>
              <span className="font-medium text-red-600">
                {formatCurrency(result.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-300">
              <span className="font-bold text-gray-900 text-base md:text-lg">Total Payment:</span>
              <span className="font-bold text-gray-900 text-base md:text-lg">
                {formatCurrency(result.totalPayment)}
              </span>
            </div>
          </div>

          {/* Interest to Principal Ratio */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-blue-800 text-sm">
              <strong>Interest to Principal Ratio:</strong>{' '}
              {((result.totalInterest / (result.totalPayment - result.totalInterest)) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;