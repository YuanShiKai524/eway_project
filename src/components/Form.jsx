import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = () => {
  const [store, setStore] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consumption, setConsumption] = useState('');
  const [payment, setPayment] = useState('digital payment');

  const [fields, setFields] = useState([
    {
      label: 'store',
      placeholder: 'store2',
      onChange: (event) => setStore(event.target.value),
      list: 'stores',
      options: ['store1', 'store2', 'store3', 'store113', 'store223'],
      errMsg: '',
      invalid: false,
    },
    {
      label: 'name',
      placeholder: 'John Doe',
      onChange: (event) => setName(event.target.value),
      errMsg: '',
      invalid: false,
    },
    {
      label: 'phone',
      placeholder: '0910777888',
      onChange: (event) => setPhone(event.target.value),
      errMsg: '',
      invalid: false,
    },
    {
      label: 'Amount of consumption',
      placeholder: '10000',
      onChange: (event) => setConsumption(event.target.value),
      errMsg: '',
      invalid: false,
    },
    {
      label: 'payment',
      defaultValue: 'digital payment',
      onChange: (event) => setPayment(event.target.value),
      list: 'payments',
      options: ['digital payment', 'ATM'],
      errMsg: '',
      invalid: false,
    },
  ]);

  // 處理提交的函數
  const handleSubmit = (e) => {
    e.preventDefault();
    // 驗證輸入欄錯誤有以下幾種情況: 該填未填required, 各state的wrong format
    const states = [store, name, phone, consumption, payment];
    const newFields = fields.map((field, index) => {
      if (states[index].trim() === '') {
        return { ...field, errMsg: 'required', invalid: true };
      }
      if (states[index].trim() !== '' && field.errMsg !== '') {
        return { ...field, errMsg: '', invalid: false };
      }
      return field;
    });
    setFields(newFields);
  };

  // 此函數用於獲取輸入欄的html元素(包括其props)
  const getElements = (field) => {
    if (field.label === 'store' || field.label === 'payment') {
      return (
        <>
          {field.label === 'store' ? (
            <input
              className={field.invalid ? 'error' : ''}
              list={field.list}
              name={field.label}
              placeholder={field.placeholder}
              onChange={field.onChange}
            />
          ) : (
            <input
              className={field.invalid ? 'error' : ''}
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
        className={field.invalid ? 'error' : ''}
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
            {field.invalid === false ? (
              <div className="caption errMsg" style={{ display: 'none' }}>
                {field.errMsg}
              </div>
            ) : (
              <div className="caption errMsg">{field.errMsg}</div>
            )}
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
