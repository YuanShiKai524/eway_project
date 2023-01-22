import React from 'react';
import Card from './Card';

const Prize = () => {
  const prizes = [
    { id: 'A', content: 'dehumidifier', isTopThree: true, quantity: 'ONE' },
    { id: 'B', content: 'range hood', isTopThree: true, quantity: 'ONE' },
    { id: 'C', content: 'vacuum cleaner', isTopThree: true, quantity: 'ONE' },
    { id: 'D', content: 'toaster', isTopThree: false, quantity: 'ONE' },
    { id: 'E', content: 'scale', isTopThree: false, quantity: 'ONE' },
    {
      id: 'F',
      content: 'straightening iron',
      isTopThree: false,
      quantity: 'ONE',
    },
    { id: 'G', content: 'vacuum cleaner', isTopThree: false, quantity: 'FIVE' },
    { id: 'H', content: 'rice cooker', isTopThree: false, quantity: 'TEN' },
  ];

  return (
    <div className="prize-wrapper">
      <div className="prize-container">
        {prizes.map((prize) => (
          <Card prize={prize} />
        ))}
      </div>
    </div>
  );
};

export default Prize;
