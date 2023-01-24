import React from 'react';
import { nanoid } from 'nanoid';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="formComponent-container">
      <form
        id="myForm"
        method="post"
        className="container"
        onSubmit={handleSubmit}
      >
        <div className="formTitle-container">
          <div>
            <h5>ＦＯＲＭ</h5>
          </div>
          <img src="/assets/images/turtle.svg" alt="turtle" />
        </div>
        <label htmlFor="store">
          <div>
            store&nbsp;
            <span>&#042;</span>
          </div>
          <input
            list="stores"
            name="store"
            placeholder="store2"
            onChange={handleChange}
          />
        </label>
        <datalist id="stores">
          {[1, 2, 3, 113, 223].map((num) => (
            <option
              key={nanoid()}
              aria-label={`store${num}`}
              value={`store${num}`}
            />
          ))}
        </datalist>
        <label htmlFor="name">
          <div>
            name&nbsp;
            <span>&#042;</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone">
          <div>
            phone&nbsp;
            <span>&#042;</span>
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="0910777888"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="consumption">
          <div>
            Amount of consumption&nbsp;
            <span>&#042;</span>
          </div>
          <input
            type="text"
            name="consumption"
            placeholder="10000"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="payment">
          <div>
            payment&nbsp;
            <span>&#042;</span>
          </div>
          <input
            list="payments"
            name="payment"
            defaultValue="digital payment"
            onChange={handleChange}
          />
        </label>
        <datalist id="payments">
          <option aria-label="digital payment" value="digital payment" />
          <option aria-label="ATM" value="ATM" />
        </datalist>
      </form>
      <button type="submit" form="myForm">
        <img src="/assets/images/submit.svg" alt="submit button" />
      </button>
    </div>
  );
};

export default Form;
