import EMICalculator from '../components/EMICalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator - Calculate Your Monthly Payment | PaisaTools',
  description: 'Free and easy home loan EMI calculator. Find out your monthly payment, total interest, and total repayment for your housing loan in India.',
  keywords: 'home loan EMI calculator, housing loan, monthly payment, loan calculator',
};

export default function HomeLoanEMIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto pt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          <div className="w-full lg:w-2/5">
            <EMICalculator 
              title="Home Loan EMI Calculator"
              minLoanAmount={100000}
              maxTenureMonths={360} // 30 years in months
              loanAmountPlaceholder="e.g., 50,00,000"
              tenurePlaceholder="e.g., 240 (20 years)"
            />
          </div>

          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 
                          hover:shadow-xl transition-shadow duration-300">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 
                             bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Understanding Your Home Loan EMI
                </h1>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      An <strong className="text-blue-600">Equated Monthly Installment (EMI)</strong> is the fixed payment you make to a lender
                      every month on a specific date. This payment includes both a portion of the
                      principal loan amount and the interest.
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-blue-800 font-medium text-sm md:text-base">
                      💡 <strong>Pro Tip:</strong> Use our calculator to find the perfect balance between affordable EMI and total interest cost.
                    </p>
                  </div>

                  {/* How EMI is Calculated */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      How Your EMI is Calculated
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-green-700 text-lg mb-3">Principal Loan Amount</h4>
                        <ul className="space-y-2 text-green-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Total amount borrowed from bank
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Higher amount = Higher EMI
                          </li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-purple-700 text-lg mb-3">Interest Rate</h4>
                        <ul className="space-y-2 text-purple-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Annual interest rate charged
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Lower rate = Lower total cost
                          </li>
                        </ul>
                      </div>

                      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-cyan-700 text-lg mb-3">Loan Tenure (Months)</h4>
                        <ul className="space-y-2 text-cyan-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-cyan-500 mr-2">•</span>
                            Duration in <strong>months</strong>
                          </li>
                          <li className="flex items-start">
                            <span className="text-cyan-500 mr-2">•</span>
                            Longer tenure = Lower EMI
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-orange-700 text-lg mb-3">EMI Formula</h4>
                        <ul className="space-y-2 text-orange-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            P=Principal, R=Monthly Rate, N=Months
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      Frequently Asked Questions
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">What is a floating vs. fixed interest rate?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          A <strong>fixed rate</strong> stays the same for the entire loan tenure. A <strong>floating rate</strong>
                          is linked to the bank's lending rate (like the repo rate) and can change,
                          affecting your EMI or tenure. This calculator assumes a fixed rate.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Can I pay more than my EMI?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Yes, most banks allow you to make "prepayments" or "part-payments." This
                          is an excellent way to reduce your principal amount and save a large
                          amount on total interest over the loan tenure.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Why use months instead of years?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Using <strong>months</strong> provides more precision for EMI calculations since 
                          payments are made monthly. It allows for exact calculation of interest 
                          compounding and better accuracy.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Reference */}
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Common Home Loan Tenures</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                      <div>
                        <div className="font-bold">15 Years</div>
                        <div className="text-xs opacity-90">180 months</div>
                      </div>
                      <div>
                        <div className="font-bold">20 Years</div>
                        <div className="text-xs opacity-90">240 months</div>
                      </div>
                      <div>
                        <div className="font-bold">25 Years</div>
                        <div className="text-xs opacity-90">300 months</div>
                      </div>
                      <div>
                        <div className="font-bold">30 Years</div>
                        <div className="text-xs opacity-90">360 months</div>
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