// app/utils/taxLogic.ts

/**
 * This file contains the core logic for income tax calculation
 * for the Financial Year 2024-25 (Assessment Year 2025-26).
 */

// 1. Define the inputs we expect from the user form
export interface TaxInputs {
  grossIncome: number;
  age: number; // For old regime calculation
  deductions: {
    standardDeduction: number;
    section80C: number;
    section80D: number; // Health Insurance
    homeLoanInterest: number;
    // ... add more deductions as needed
  };
}

// 2. Define the structure of the results we will return
export interface TaxResult {
  regime: 'Old' | 'New';
  totalTaxableIncome: number;
  taxBeforeCess: number;
  healthAndEducationCess: number;
  totalTaxLiability: number;
}

const HEALTH_EDUCATION_CESS_RATE = 0.04;

/**
 * Calculates tax based on the OLD regime.
 * Takes age into account for different slabs.
 */
export const calculateTaxOldRegime = (inputs: TaxInputs): TaxResult => {
  const { grossIncome, age, deductions } = inputs;

  // 1. Calculate taxable income
  const totalDeductions =
    deductions.standardDeduction +
    deductions.section80C +
    deductions.section80D +
    deductions.homeLoanInterest;

  let taxableIncome = grossIncome - totalDeductions;
  if (taxableIncome < 0) taxableIncome = 0;

  // 2. Determine exemption limit based on age
  let exemptionLimit = 250000; // Below 60 years
  if (age >= 60 && age < 80) {
    exemptionLimit = 300000; // Senior Citizen
  } else if (age >= 80) {
    exemptionLimit = 500000; // Super Senior Citizen
  }

  // 3. Apply tax slabs
  let tax = 0;
  if (taxableIncome > exemptionLimit) {
    if (taxableIncome <= 500000) {
      tax = (taxableIncome - exemptionLimit) * 0.05;
    } else if (taxableIncome <= 1000000) {
      if (age >= 80) { // Super Senior Citizen slab
        tax = (500000 - exemptionLimit) * 0.05 + (taxableIncome - 500000) * 0.20;
      } else { // Regular and Senior Citizen slab
        tax = (500000 - exemptionLimit) * 0.05 + (taxableIncome - 500000) * 0.20;
      }
    } else { // > 10 Lakhs
      if (age >= 80) { // Super Senior Citizen slab
        tax = (500000 - exemptionLimit) * 0.05 + (1000000 - 500000) * 0.20 + (taxableIncome - 1000000) * 0.30;
      } else if (age >= 60 && age < 80) { // Senior Citizen slab
        tax = (500000 - exemptionLimit) * 0.05 + (1000000 - 500000) * 0.20 + (taxableIncome - 1000000) * 0.30;
      } else { // Regular slab
        tax = (500000 - exemptionLimit) * 0.05 + (1000000 - 500000) * 0.20 + (taxableIncome - 1000000) * 0.30;
      }
    }
  }

  // 4. Apply Rebate u/s 87A
  if (taxableIncome <= 500000) {
    tax = 0; // Tax rebate makes it zero
  }

  // 5. Calculate final tax
  const cess = tax > 0 ? tax * HEALTH_EDUCATION_CESS_RATE : 0;
  const totalTax = tax + cess;

  return {
    regime: 'Old',
    totalTaxableIncome: taxableIncome,
    taxBeforeCess: tax,
    healthAndEducationCess: cess,
    totalTaxLiability: totalTax,
  };
};

/**
 * Calculates tax based on the NEW regime (Default).
 * Slabs are the same for all ages.
 */
export const calculateTaxNewRegime = (inputs: TaxInputs): TaxResult => {
  const { grossIncome, deductions } = inputs;

  // 1. Calculate taxable income. Only Standard Deduction is allowed.
  let taxableIncome = grossIncome - deductions.standardDeduction;
  if (taxableIncome < 0) taxableIncome = 0;

  // 2. Apply tax slabs (FY 2024-25)
  let tax = 0;
  if (taxableIncome > 300000) {
    if (taxableIncome <= 700000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 20000 + (taxableIncome - 700000) * 0.10; // 5% of 4L = 20k
    } else if (taxableIncome <= 1200000) {
      tax = 20000 + 30000 + (taxableIncome - 1000000) * 0.15; // 10% of 3L = 30k
    } else if (taxableIncome <= 1500000) {
      tax = 20000 + 30000 + 30000 + (taxableIncome - 1200000) * 0.20; // 15% of 2L = 30k
    } else { // > 15 Lakhs
      tax = 20000 + 30000 + 30000 + 60000 + (taxableIncome - 1500000) * 0.30; // 20% of 3L = 60k
    }
  }

  // 3. Apply Rebate u/s 87A
  if (taxableIncome <= 700000) {
    tax = 0; // Tax rebate makes it zero
  }

  // 4. Calculate final tax
  const cess = tax > 0 ? tax * HEALTH_EDUCATION_CESS_RATE : 0;
  const totalTax = tax + cess;

  return {
    regime: 'New',
    totalTaxableIncome: taxableIncome,
    taxBeforeCess: tax,
    healthAndEducationCess: cess,
    totalTaxLiability: totalTax,
  };
};