'use client';
import { useState } from 'react';
import styles from './TaxCalculator.module.css';

const TaxCalculator = () => {
  const [grossIncome, setGrossIncome] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [deductions80C, setDeductions80C] = useState('');
  const [deductions80D, setDeductions80D] = useState('');
  const [hraExemption, setHraExemption] = useState('');
  const [age, setAge] = useState('0-60');

  const [oldTax, setOldTax] = useState(0);
  const [newTax, setNewTax] = useState(0);
  const [recommendation, setRecommendation] = useState('');

  const calculateTax = () => {
    const totalIncome = (Number(grossIncome) || 0) + (Number(otherIncome) || 0);

    // --- Old Regime Calculation ---
    const taxableIncomeOld = Math.max(0, (Number(grossIncome) || 0) + (Number(otherIncome) || 0) - (Number(deductions80C) || 0) - (Number(deductions80D) || 0) - (Number(hraExemption) || 0));
    let taxOld = 0;

    if (age === '0-60') {
      if (taxableIncomeOld > 1000000) {
        taxOld = 112500 + (taxableIncomeOld - 1000000) * 0.3;
      } else if (taxableIncomeOld > 500000) {
        taxOld = 12500 + (taxableIncomeOld - 500000) * 0.2;
      } else if (taxableIncomeOld > 250000) {
        taxOld = (taxableIncomeOld - 250000) * 0.05;
      }
    } else if (age === '60-80') {
      if (taxableIncomeOld > 1000000) {
        taxOld = 110000 + (taxableIncomeOld - 1000000) * 0.3;
      } else if (taxableIncomeOld > 500000) {
        taxOld = 10000 + (taxableIncomeOld - 500000) * 0.2;
      } else if (taxableIncomeOld > 300000) {
        taxOld = (taxableIncomeOld - 300000) * 0.05;
      }
    } else if (age === '80+') {
      if (taxableIncomeOld > 1000000) {
        taxOld = 100000 + (taxableIncomeOld - 1000000) * 0.3;
      } else if (taxableIncomeOld > 500000) {
        taxOld = (taxableIncomeOld - 500000) * 0.2;
      }
    }

    // Correct Rebate Logic for Old Regime
    const rebateOld = taxableIncomeOld <= 500000 ? taxOld : 0;
    taxOld = taxOld - rebateOld;

    const cessOld = taxOld * 0.04;
    const totalOldTax = taxOld + cessOld;
    setOldTax(totalOldTax);


    // --- New Regime Calculation (FY 2024-25 / AY 2025-26) ---
    const taxableIncomeNew = Math.max(0, (Number(grossIncome) || 0) + (Number(otherIncome) || 0));
    let taxNew = 0;
    if (taxableIncomeNew > 1500000) {
        taxNew = 150000 + (taxableIncomeNew - 1500000) * 0.30;
    } else if (taxableIncomeNew > 1200000) {
        taxNew = 90000 + (taxableIncomeNew - 1200000) * 0.20;
    } else if (taxableIncomeNew > 900000) {
        taxNew = 45000 + (taxableIncomeNew - 900000) * 0.15;
    } else if (taxableIncomeNew > 600000) {
        taxNew = 15000 + (taxableIncomeNew - 600000) * 0.10;
    } else if (taxableIncomeNew > 300000) {
        taxNew = (taxableIncomeNew - 300000) * 0.05;
    }

    // Correct Rebate Logic for New Regime
    const rebateNew = taxableIncomeNew <= 700000 ? taxNew : 0;
    taxNew = taxNew - rebateNew;

    const cessNew = taxNew * 0.04;
    const totalNewTax = taxNew + cessNew;
    setNewTax(totalNewTax);

    // --- Recommendation ---
    if (totalOldTax < totalNewTax) {
      setRecommendation(`The Old Regime is better. You save ₹${(totalNewTax - totalOldTax).toFixed(2)}.`);
    } else if (totalNewTax < totalOldTax) {
      setRecommendation(`The New Regime is better. You save ₹${(totalOldTax - totalNewTax).toFixed(2)}.`);
    } else {
      setRecommendation('Your tax is 0 in both regimes');
    }
  };


  return (
    <div className={styles.calculatorContainer}>
      <h1 className={styles.header}>Income Tax Calculator</h1>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Gross Salary Income</label>
          <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} placeholder="e.g., 1200000" />
        </div>
        <div className={styles.inputGroup}>
          <label>Income from Other Sources</label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} placeholder="e.g., 50000" />
        </div>
        <div className={styles.inputGroup}>
          <label>Deductions under Section 80C</label>
          <input type="number" value={deductions80C} onChange={(e) => setDeductions80C(e.target.value)} placeholder="e.g., 150000" />
        </div>
        <div className={styles.inputGroup}>
          <label>Deductions under Section 80D (Medical)</label>
          <input type="number" value={deductions80D} onChange={(e) => setDeductions80D(e.target.value)} placeholder="e.g., 25000" />
        </div>
        <div className={styles.inputGroup}>
          <label>HRA Exemption</label>
          <input type="number"value={hraExemption} onChange={(e) => setHraExemption(e.target.value)} placeholder="e.g., 100000" />
        </div>
        <div className={styles.inputGroup}>
            <label>Your Age</label>
            <select value={age} onChange={(e) => setAge(e.target.value)}>
                <option value="0-60">Below 60</option>
                <option value="60-80">60-80</option>
                <option value="80+">Above 80</option>
            </select>
        </div>

        <button className={styles.calculateButton} onClick={calculateTax}>Calculate Tax</button>
      </div>
      
      {recommendation && (
        <div className={styles.results}>
          <h2>Tax Calculation Summary</h2>
          <div className={styles.resultBox}>
            <h3>Old Regime</h3>
            <p>₹{oldTax.toLocaleString('en-IN')}</p>
          </div>
          <div className={styles.resultBox}>
            <h3>New Regime</h3>
            <p>₹{newTax.toLocaleString('en-IN')}</p>
          </div>
          <div className={styles.recommendation}>
            <h3>Recommendation</h3>
            <p>{recommendation}</p>
          </div>
          {(oldTax > 0 || newTax > 0) && (
            <a
              href="https://eportal.incometax.gov.in/iec/foservices/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fileTaxButton}
            >
              File Tax
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;