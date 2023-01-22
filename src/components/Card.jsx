import React from 'react';

const Card = ({ prize }) => {
  return (
    <div className="card-container">
      {prize.isTopThree ? (
        <>
          <div className="badge">
            <img src="/assets/images/certificateA.svg" alt="Top three prizes" />
            <div className="prize-level">{prize.id}</div>
          </div>
          <div className="caption quantity">{prize.quantity}</div>
          <div className="prize-name">
            <h5>{prize.name}</h5>
          </div>
        </>
      ) : (
        <>
          <div className="badge">
            <img src="/assets/images/certificateD.svg" alt="Top three prizes" />
            <div className="prize-level">{prize.id}</div>
          </div>
          <div className="caption quantity-silver">{prize.quantity}</div>
          <div className="prize-name-silver">
            <h5>{prize.name}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
