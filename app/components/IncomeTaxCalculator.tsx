'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  TaxInputs,
  TaxResult,
  calculateTaxOldRegime,
  calculateTaxNewRegime,
} from '../utils/taxLogic';

interface FormValues {
  grossIncome: number;
  age: string;
  section80C: number;
  section80D: number;
  homeLoanInterest: number;
}

interface CalculationResults {
  oldRegime: TaxResult;
  newRegime: TaxResult;
}

const IncomeTaxCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      age: '59',
      section80C: 0,
      section80D: 0,
      homeLoanInterest: 0,
    },
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setCalculationError(null);
      
      const ageAsNumber = parseInt(data.age, 10);
      const STANDARD_DEDUCTION = 50000;

      const inputs: TaxInputs = {
        grossIncome: data.grossIncome,
        age: ageAsNumber,
        deductions: {
          standardDeduction: STANDARD_DEDUCTION,
          section80C: Math.min(data.section80C, 150000),
          section80D: Math.min(data.section80D, 100000),
          homeLoanInterest: Math.min(data.homeLoanInterest, 200000),
        },
      };

      const oldRegimeResult = calculateTaxOldRegime(inputs);
      const newRegimeResult = calculateTaxNewRegime(inputs);

      setResults({
        oldRegime: oldRegimeResult,
        newRegime: newRegimeResult,
      });

      // Auto-scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } catch (error) {
      setCalculationError('An error occurred during calculation. Please check your inputs.');
      console.error('Tax calculation error:', error);
    }
  };

  const ResultCard = ({ result, isWinner }: { result: TaxResult; isWinner: boolean }) => (
    <div className={`rounded-2xl p-4 md:p-6 border-2 transition-all duration-300 ${
      isWinner 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="text-center mb-3 md:mb-4">
        <h3 className={`text-lg md:text-xl font-bold ${isWinner ? 'text-green-700' : 'text-gray-700'}`}>
          {result.regime} Regime
        </h3>
        {isWinner && (
          <span className="inline-block bg-green-100 text-green-800 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full mt-1 md:mt-2">
            🎉 Recommended
          </span>
        )}
      </div>
      
      <div className="space-y-2 md:space-y-3 text-sm md:text-base">
        <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
          <span className="text-gray-600 text-xs md:text-sm">Taxable Income:</span>
          <span className="font-semibold text-gray-800 text-xs md:text-sm">{formatCurrency(result.totalTaxableIncome)}</span>
        </div>
        <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
          <span className="text-gray-600 text-xs md:text-sm">Tax before Cess:</span>
          <span className="font-semibold text-gray-800 text-xs md:text-sm">{formatCurrency(result.taxBeforeCess)}</span>
        </div>
        <div className="flex justify-between items-center py-1 md:py-2 border-b border-gray-200">
          <span className="text-gray-600 text-xs md:text-sm">Health & Edu Cess:</span>
          <span className="font-semibold text-gray-800 text-xs md:text-sm">{formatCurrency(result.healthAndEducationCess)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-300">
          <span className="font-bold text-gray-900 text-sm md:text-lg">Total Tax:</span>
          <span className={`font-bold ${isWinner ? 'text-green-600' : 'text-gray-900'} text-sm md:text-xl`}>
            {formatCurrency(result.totalTaxLiability)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8 
                    hover:shadow-2xl transition-all duration-300 w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Compare Tax Regimes
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Enter your details to see which tax regime saves you more money
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="grossIncome" className="block text-sm font-semibold text-gray-700 mb-2">
              Gross Salary Income ₹
            </label>
            <input
              type="number"
              id="grossIncome"
              {...register('grossIncome', {
                required: 'Gross income is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Income cannot be negative' },
                max: { value: 100000000, message: 'Income seems too high' },
              })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                         text-gray-900 bg-white placeholder-gray-500"
              placeholder="e.g., 12,00,000"
            />
            {errors.grossIncome && (
              <span className="text-red-500 text-xs mt-1">{errors.grossIncome.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Age Group
            </label>
            <select
              id="age"
              {...register('age')}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200
                         text-gray-900"
            >
              <option value="59">Below 60 (Regular)</option>
              <option value="60">60 to 79 (Senior Citizen)</option>
              <option value="80">80 & Above (Super Senior)</option>
            </select>
          </div>
        </div>

        <div className="border-t pt-4 md:pt-6 mt-4 md:mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Common Deductions (Mainly for Old Regime)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { id: 'section80C', label: '80C (PPF, ELSS)', max: 150000, placeholder: 'Max 1,50,000' },
              { id: 'section80D', label: '80D (Health Insurance)', max: 100000, placeholder: 'Max 1,00,000' },
              { id: 'homeLoanInterest', label: 'Home Loan Interest', max: 200000, placeholder: 'Max 2,00,000' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type="number"
                  id={field.id}
                  {...register(field.id as keyof FormValues, { 
                    valueAsNumber: true, 
                    max: field.max,
                    min: 0 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                             text-gray-900 bg-white placeholder-gray-500"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
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
            'Compare Tax Regimes'
          )}
        </button>
      </form>

      {calculationError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center text-sm">
          {calculationError}
        </div>
      )}

      {results && (
        <div id="results-section" className="mt-6 md:mt-8 border-t pt-6 md:pt-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 md:mb-6">
            Comparison Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ResultCard 
              result={results.oldRegime} 
              isWinner={results.oldRegime.totalTaxLiability < results.newRegime.totalTaxLiability}
            />
            <ResultCard 
              result={results.newRegime} 
              isWinner={results.newRegime.totalTaxLiability < results.oldRegime.totalTaxLiability}
            />
          </div>

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <p className="text-blue-800 font-medium text-sm md:text-base">
              {results.oldRegime.totalTaxLiability === results.newRegime.totalTaxLiability
                ? 'Both regimes result in the same tax liability.'
                : results.oldRegime.totalTaxLiability < results.newRegime.totalTaxLiability
                ? `Choose Old Regime to save ${formatCurrency(results.newRegime.totalTaxLiability - results.oldRegime.totalTaxLiability)} more`
                : `Choose New Regime to save ${formatCurrency(results.oldRegime.totalTaxLiability - results.newRegime.totalTaxLiability)} more`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeTaxCalculator;