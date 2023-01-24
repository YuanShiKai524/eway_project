import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const [fields] = useState([
    {
      label: 'store',
      placeholder: 'store2',
      onChange: handleChange,
      list: 'stores',
      options: ['store1', 'store2', 'store3', 'store113', 'store223'],
      errMsg: '',
    },
    {
      label: 'name',
      placeholder: 'John Doe',
      onChange: handleChange,
      errMsg: '',
    },
    {
      label: 'phone',
      placeholder: '0910777888',
      onChange: handleChange,
      errMsg: '',
    },
    {
      label: 'Amount of consumption',
      placeholder: '10000',
      onChange: handleChange,
      errMsg: '',
    },
    {
      label: 'payment',
      defaultValue: 'digital payment',
      onChange: handleChange,
      list: 'payments',
      options: ['digital payment', 'ATM'],
      errMsg: '',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 此函式用於獲取輸入欄的html元素(包括其props)
  const getElements = (field) => {
    if (field.label === 'store' || field.label === 'payment') {
      return (
        <>
          {field.label === 'store' ? (
            <input
              list={field.list}
              name={field.label}
              placeholder={field.placeholder}
              onChange={field.onChange}
            />
          ) : (
            <input
              list={field.list}
              name={field.label}
              defaultValue={field.defaultValue}
              onChange={field.onChange}
            />
          )}
          <datalist id={field.list}>
            {field.options.map((option) => {
              return (
                <option key={nanoid()} aria-label={option} value={option} />
              );
            })}
          </datalist>
        </>
      );
    }
    return (
      <input
        name={field.label}
        placeholder={field.placeholder}
        onChange={field.onChange}
      />
    );
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
        {fields.map((field) => (
          <label htmlFor={field.label} key={field.label}>
            <div>
              {field.label}&nbsp;
              <span>&#042;</span>
            </div>
            {getElements(field)}
            <div className="caption errMsg">{field.errMsg}</div>
          </label>
        ))}
      </form>
      <button type="submit" form="myForm">
        <img src="/assets/images/submit.svg" alt="submit button" />
      </button>
    </div>
  );
};

export default Form;
