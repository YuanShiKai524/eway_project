import React from 'react';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="formComponent-container">
      <form id="myForm" method="post" onSubmit={handleSubmit}>
        <label htmlFor="store">
          <div>
            store&nbsp;
            <span>&#042;</span>
          </div>
          <input
            list="stores"
            name="store"
            placeholder="store7"
            onChange={handleChange}
          />
          {/* <img src="/assets/images/drop down.svg" alt="drop down" /> */}
        </label>
        <datalist id="stores">
          <option aria-label="store1" value="store1" />
          <option aria-label="store2" value="store2" />
          <option aria-label="store3" value="store3" />
          <option aria-label="store4" value="store4" />
          <option aria-label="store5" value="store5" />
          <option aria-label="store6" value="store6" />
          <option aria-label="store7" value="store7" />
          <option aria-label="store8" value="store8" />
          <option aria-label="store9" value="store9" />
          <option aria-label="store10" value="store10" />
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
          {/* <img src="/assets/images/drop down.svg" alt="drop down" /> */}
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
