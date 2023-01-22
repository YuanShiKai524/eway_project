import React from 'react';
import Card from './Card';

const Prize = () => {
  const prizes = [
    { id: 'A', name: 'dehumidifier', isTopThree: true, quantity: 'ONE' },
    { id: 'B', name: 'range hood', isTopThree: true, quantity: 'ONE' },
    { id: 'C', name: 'vacuum cleaner', isTopThree: true, quantity: 'ONE' },
    { id: 'D', name: 'toaster', isTopThree: false, quantity: 'ONE' },
    { id: 'E', name: 'scale', isTopThree: false, quantity: 'ONE' },
    {
      id: 'F',
      name: 'straightening iron',
      isTopThree: false,
      quantity: 'ONE',
    },
    { id: 'G', name: 'vacuum cleaner', isTopThree: false, quantity: 'FIVE' },
    { id: 'H', name: 'rice cooker', isTopThree: false, quantity: 'TEN' },
  ];

  return (
    <div className="prize-wrapper">
      <div className="prize-container">
        {prizes.map((prize) => (
          <Card key={prize.id} prize={prize} />
        ))}
      </div>
    </div>
  );
};

export default Prize;
