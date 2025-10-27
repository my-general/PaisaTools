import EMICalculator from '../components/EMICalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator - Calculate Your Monthly Payment | PaisaTools',
  description: 'Free personal loan EMI calculator. Estimate your monthly payments, interest, and total cost for any personal loan in India.',
  keywords: 'personal loan EMI calculator, unsecured loan, monthly payment, loan calculator',
};

export default function PersonalLoanEMIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto pt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Main Calculator */}
          <div className="w-full lg:w-2/5">
            <EMICalculator 
              title="Personal Loan EMI Calculator"
              minLoanAmount={25000}
              maxTenureMonths={84} // 7 years in months
              loanAmountPlaceholder="e.g., 5,00,000"
              tenurePlaceholder="e.g., 60 (5 years)"
            />
          </div>

          {/* SEO Content */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 
                          hover:shadow-xl transition-shadow duration-300">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 
                             bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Understanding Personal Loan EMIs
                </h1>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      A <strong className="text-purple-600">personal loan</strong> is an unsecured loan, meaning it does not require collateral. 
                      Because of this, interest rates are typically higher than for home loans. 
                      Our EMI calculator can help you see what your monthly payment will be.
                    </p>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <p className="text-purple-800 font-medium text-sm md:text-base">
                      💡 <strong>Pro Tip:</strong> Always check your credit score before applying for a personal loan. 
                      A good score can get you significantly lower interest rates.
                    </p>
                  </div>

                  {/* Key Factors */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                      Key Factors Affecting Your Personal Loan
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-pink-700 text-lg mb-3">Interest Rate</h4>
                        <ul className="space-y-2 text-pink-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-pink-500 mr-2">•</span>
                            Most critical factor for EMI
                          </li>
                          <li className="flex items-start">
                            <span className="text-pink-500 mr-2">•</span>
                            Depends on CIBIL score
                          </li>
                          <li className="flex items-start">
                            <span className="text-pink-500 mr-2">•</span>
                            Range: 10% to 24% typically
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-blue-700 text-lg mb-3">Loan Tenure (Months)</h4>
                        <ul className="space-y-2 text-blue-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Duration in <strong>months</strong>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Shorter tenure = Less interest
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Max: 84 months (7 years)
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-green-700 text-lg mb-3">Loan Amount</h4>
                        <ul className="space-y-2 text-green-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Minimum: ₹25,000
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Maximum: Varies by lender
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Based on income eligibility
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-orange-700 text-lg mb-3">Processing Fee</h4>
                        <ul className="space-y-2 text-orange-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            One-time charge: 1-3%
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Deducted from loan amount
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Not included in EMI calculation
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Credit Score Impact */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      How Credit Score Affects Your Loan
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4">
                        <div className="text-red-600 font-bold text-lg mb-1">300-599</div>
                        <div className="text-red-700 text-xs md:text-sm">Poor</div>
                        <div className="text-red-600 text-xs">Rate: 18-24%</div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 md:p-4">
                        <div className="text-yellow-600 font-bold text-lg mb-1">600-749</div>
                        <div className="text-yellow-700 text-xs md:text-sm">Fair</div>
                        <div className="text-yellow-600 text-xs">Rate: 14-18%</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4">
                        <div className="text-blue-600 font-bold text-lg mb-1">750-799</div>
                        <div className="text-blue-700 text-xs md:text-sm">Good</div>
                        <div className="text-blue-600 text-xs">Rate: 12-15%</div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 md:p-4">
                        <div className="text-green-600 font-bold text-lg mb-1">800-900</div>
                        <div className="text-green-700 text-xs md:text-sm">Excellent</div>
                        <div className="text-green-600 text-xs">Rate: 10-12%</div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></span>
                      Frequently Asked Questions
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">What documents are needed for a personal loan?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Typically you need: <strong>KYC documents</strong> (Aadhaar, PAN), <strong>income proof</strong> (salary slips, bank statements), 
                          and <strong>employment proof</strong>. Self-employed individuals need business proof and IT returns.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Can I prepay my personal loan?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Yes, most banks allow prepayment after 6-12 months, but may charge a <strong>prepayment penalty</strong> 
                          of 2-5% on the outstanding principal. Some banks offer penalty-free prepayment.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">What happens if I miss an EMI?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Missing EMIs results in <strong>late payment fees</strong> and negatively impacts your credit score. 
                          Continuous defaults can lead to legal action and asset seizure through debt recovery tribunals.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Why are personal loan rates higher than home loans?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Personal loans are <strong>unsecured</strong> (no collateral), making them riskier for lenders. 
                          Home loans are secured against property, allowing banks to offer lower interest rates.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Common Uses */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Common Personal Loan Uses</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                      <div>
                        <div className="text-lg mb-1">🏠</div>
                        <div>Home Renovation</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">💒</div>
                        <div>Wedding</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">🎓</div>
                        <div>Education</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">🏥</div>
                        <div>Medical</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">✈️</div>
                        <div>Travel</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">🚗</div>
                        <div>Vehicle</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">💳</div>
                        <div>Debt Consolidation</div>
                      </div>
                      <div>
                        <div className="text-lg mb-1">📱</div>
                        <div>Gadgets</div>
                      </div>
                    </div>
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