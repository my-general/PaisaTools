// app/utils/loanLogic.ts

/**
 * This file contains the core logic for EMI calculation.
 */

// 1. Define the inputs we expect
export interface EMIInputs {
  loanAmount: number;
  annualRate: number; // e.g., 8.5
  tenureMonths: number; // Changed from tenureYears to tenureMonths
}

// 2. Define the results we will return
export interface EMIResult {
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number; // Principal + Interest
}

/**
 * Calculates the Equated Monthly Installment (EMI).
 */
export const calculateEMI = (inputs: EMIInputs): EMIResult => {
  const { loanAmount, annualRate, tenureMonths } = inputs;

  // 1. Convert inputs to monthly values
  const P = loanAmount;
  const r = annualRate / 100 / 12; // Monthly interest rate
  const n = tenureMonths; // Total number of months (direct input)

  // 2. Handle edge case (0% interest)
  if (r === 0) {
    const emi = P / n;
    return {
      monthlyEMI: Math.round(emi),
      totalInterest: 0,
      totalPayment: P,
    };
  }

  // 3. Handle edge case (0 months tenure)
  if (n === 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayment: P,
    };
  }

  // 4. Calculate EMI using the formula
  // EMI = P * r * ( (1+r)^n / ((1+r)^n - 1) )
  const emi = P * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  return {
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
};

/**
 * Helper function to format currency for display
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
};

/**
 * Helper function to calculate interest to principal ratio
 */
export const calculateInterestRatio = (totalInterest: number, principal: number): number => {
  if (principal === 0) return 0;
  return (totalInterest / principal) * 100;
};

/**
 * Helper function to get year-month breakdown from months
 */
export const getYearMonthBreakdown = (totalMonths: number): { years: number; months: number } => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months };
};

/**
 * Helper function to validate EMI inputs
 */
export const validateEMIInputs = (inputs: EMIInputs): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (inputs.annualRate < 0) {
    errors.push('Interest rate cannot be negative');
  }

  if (inputs.annualRate > 100) {
    errors.push('Interest rate seems too high');
  }

  if (inputs.tenureMonths <= 0) {
    errors.push('Loan tenure must be greater than 0 months');
  }

  if (inputs.tenureMonths > 600) { // 50 years
    errors.push('Loan tenure seems too long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};