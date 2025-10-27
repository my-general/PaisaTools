import IncomeTaxCalculator from '../components/IncomeTaxCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Income Tax Calculator (Old vs New) FY 2024-25 | PaisaTools',
  description: 'Compare your tax liability under the old and new tax regimes for FY 2024-25 (AY 2025-26). Find out which regime saves you more money.',
  keywords: 'income tax calculator, old vs new tax regime, FY 2024-25, tax saving, 80C, 80D',
};

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto pt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Main content: The Calculator */}
          <div className="w-full lg:w-1/2">
            <IncomeTaxCalculator />
          </div>

          {/* SEO Content: The "Spoke" Article */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
              Old vs. New: Which Tax Regime is Better?
            </h1>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  For the Financial Year 2024-25, the <strong className="text-blue-600">New Tax Regime is the default option</strong>. 
                  However, you can still choose to file your taxes under the <strong className="text-green-600">Old Tax Regime</strong> if it saves you more money.
                </p>
              </div>

              <div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Our calculator helps you make this decision. Simply enter your income and your most common deductions.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 font-medium text-sm md:text-base">
                  💡 <strong>Pro Tip:</strong> Use our calculator to compare both regimes instantly and see exact tax savings.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                  Key Differences
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="font-semibold text-green-700 mb-2">New Regime</h3>
                    <p className="text-green-800 text-sm md:text-base">
                      Offers lower tax rates but allows almost no deductions. Only the <strong>Standard Deduction of ₹50,000</strong> is available.
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-700 mb-2">Old Regime</h3>
                    <p className="text-purple-800 text-sm md:text-base">
                      Has higher tax rates but allows you to claim many deductions, including <strong>Section 80C</strong> (up to ₹1.5L), <strong>Section 80D</strong> (health insurance), and <strong>Home Loan Interest</strong> (up to ₹2L).
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                  Who Should Choose Which Regime?
                </h2>
                <div className="space-y-4 md:space-y-5">
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                    <h3 className="font-semibold text-cyan-700 text-lg mb-2">Choose the NEW Regime if:</h3>
                    <p className="text-cyan-800 text-sm md:text-base">
                      You have low or no investments and deductions. The simple, lower-rate structure will almost always be more beneficial.
                    </p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h3 className="font-semibold text-orange-700 text-lg mb-2">Choose the OLD Regime if:</h3>
                    <p className="text-orange-800 text-sm md:text-base">
                      You have significant deductions from sources like a home loan, 80C investments (PPF, ELSS), and high health insurance premiums.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-700 text-lg mb-3">FY 2024-25 Tax Slabs</h3>
                <div className="text-xs md:text-sm text-gray-600 space-y-2">
                  <div>
                    <strong>New Regime:</strong> 
                    <div className="ml-2">0-3L: 0% • 3-7L: 5% • 7-10L: 10% • 10-12L: 15% • 12-15L: 20% • 15L+: 30%</div>
                  </div>
                  <div>
                    <strong>Old Regime:</strong> 
                    <div className="ml-2">0-2.5L: 0% • 2.5-5L: 5% • 5-10L: 20% • 10L+: 30%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}