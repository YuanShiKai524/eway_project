import React from 'react';

const Card = ({ prize }) => {
  return (
    <div className="card-container">
      <div>{prize.content}</div>
    </div>
  );
};

export default Card;
