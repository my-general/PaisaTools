import SIPCalculator from '../components/SIPCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SIP Calculator - Calculate Mutual Fund Returns | PaisaTools',
  description: 'Use our free SIP calculator to easily estimate your mutual fund investment returns, future value, and total investment.',
  keywords: 'SIP calculator, mutual fund calculator, investment returns, systematic investment plan',
};

export default function SIPCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto pt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Main Calculator */}
          <div className="w-full lg:w-2/5">
            <SIPCalculator />
          </div>

          {/* SEO Content */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 
                          hover:shadow-xl transition-shadow duration-300">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 
                             bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  SIP Calculator: Plan Your Investment Journey
                </h1>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      A <strong className="text-green-600">Systematic Investment Plan (SIP)</strong> is a powerful way to build wealth over time. 
                      Our calculator helps you estimate the future value of your investments with just
                      three simple inputs.
                    </p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="text-green-800 font-medium text-sm md:text-base">
                      💡 <strong>Pro Tip:</strong> Start early and stay consistent. Even small monthly investments can grow significantly over time due to compounding.
                    </p>
                  </div>

                  {/* Inputs Explanation */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      Understanding the Inputs
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-blue-700 text-lg mb-3">Monthly Investment</h4>
                        <ul className="space-y-2 text-blue-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Fixed amount you invest every month
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Minimum: ₹500
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Can be increased over time
                          </li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-purple-700 text-lg mb-3">Investment Period</h4>
                        <ul className="space-y-2 text-purple-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Duration in <strong>months</strong>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Minimum: 6 months
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Longer periods = More compounding
                          </li>
                        </ul>
                      </div>

                      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-cyan-700 text-lg mb-3">Expected Return</h4>
                        <ul className="space-y-2 text-cyan-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-cyan-500 mr-2">•</span>
                            Annual rate of return (%)
                          </li>
                          <li className="flex items-start">
                            <span className="text-cyan-500 mr-2">•</span>
                            Equity funds: 10-12%
                          </li>
                          <li className="flex items-start">
                            <span className="text-cyan-500 mr-2">•</span>
                            Debt funds: 6-8%
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 md:p-5">
                        <h4 className="font-bold text-orange-700 text-lg mb-3">Calculation Method</h4>
                        <ul className="space-y-2 text-orange-800 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Uses future value formula
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Accounts for monthly compounding
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Provides estimated returns
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
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">What is the formula for SIP calculation?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Our tool uses the standard future value formula: 
                          <strong> M = P × ( ( (1 + i)^n - 1 ) / i ) × (1 + i)</strong>, 
                          where M is the future value, P is the monthly investment, i is the monthly interest rate, 
                          and n is the number of months.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Is this calculator 100% accurate?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          This calculator provides an <strong>estimate</strong>. Real-world returns are not guaranteed and can 
                          vary based on market performance. This tool is for educational purposes only.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Why use months instead of years?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Using <strong>months</strong> provides more precision since SIPs are monthly investments. 
                          It allows for exact calculation of compounding periods and better accuracy.
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">What is a good SIP amount to start with?</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                          Start with an amount you can consistently invest every month. Even ₹1,000-₹5,000 per month 
                          can grow significantly over 10-15 years through the power of compounding.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Benefits of SIP Investing</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">💰</span>
                        <span>Rupee Cost Averaging</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">📈</span>
                        <span>Power of Compounding</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">⏰</span>
                        <span>Financial Discipline</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">🎯</span>
                        <span>Long-term Wealth Creation</span>
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