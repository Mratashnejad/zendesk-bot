'use client';  // Add this line at the top of the file

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [price, setPrice] = useState<number | string>('');
  const [bonus, setBonus] = useState<number | string>(0);

  const handleBonusCalculation = (percentage: number) => {
    const priceValue = Number(price);
    if (!isNaN(priceValue)) {
      setBonus(priceValue * (percentage / 100));
    }
  };

  return (
    <div className="calculator">
      <h3>Bonus Calculator</h3>
      <input
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="input"
      />
      <div className="buttons">
        <button onClick={() => handleBonusCalculation(10)}>10%</button>
        <button onClick={() => handleBonusCalculation(15)}>15%</button>
        <button onClick={() => handleBonusCalculation(5)}>5%</button>
        <button onClick={() => handleBonusCalculation(20)}>20%</button>
        <button onClick={() => handleBonusCalculation(7)}>7%</button>
      </div>
      <p>Bonus: {bonus}</p>
    </div>
  );
};

export default Calculator;
