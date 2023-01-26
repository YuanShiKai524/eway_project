import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = () => {
  // 所有input輸入框的狀態
  const [inputs, setInputs] = useState({
    store: { value: '', errMsg: '', invaild: false },
    name: { value: '', errMsg: '', invaild: false },
    phone: { value: '', errMsg: '', invaild: false },
    consumption: { value: '', errMsg: '', invaild: false },
    payment: { value: 'digital payment', errMsg: '', invaild: false },
  });

  // 定義store欄位及payment欄位的options，便於使用
  const storeOptions = ['store1', 'store2', 'store3', 'store113', 'store223'];
  const paymentOptions = ['digital payment', 'ATM'];

  // 檢查store中用戶的輸入值，返回過濾結果
  const checkStore = (event) => {
    const results = storeOptions.filter((option) => {
      return option.indexOf(event.target.value) !== -1;
    });
    return results;
  };

  // 此函數(onChange事件函數)用於更改inputs狀態
  const handleChange = (type, event) => {
    if (event.target.value === '') {
      setInputs({
        ...inputs,
        [type]: { value: event.target.value, errMsg: '', invaild: false },
      });
      // if (type === 'store') {
      //   setInputs({
      //     ...inputs,
      //     [type]: { value: event.target.value, errMsg: '', invaild: false },
      //   });
      // }
      // if (type !== 'store') {
      //   setInputs({
      //     ...inputs,
      //     [type]: { ...inputs[type], value: event.target.value },
      //   });
      // }
    }
    if (event.target.value !== '') {
      // 若store欄位中有輸入值，則檢查輸入的值是否有在options中
      if (type === 'store') {
        const results = checkStore(event);
        if (results.length === 0) {
          setInputs({
            ...inputs,
            [type]: {
              value: event.target.value,
              errMsg: 'no result',
              invaild: true,
            },
          });
        }
        if (results.length !== 0) {
          setInputs({
            ...inputs,
            [type]: {
              value: event.target.value,
              errMsg: '',
              invaild: false,
            },
          });
        }
      }
      if (type !== 'store') {
        setInputs({
          ...inputs,
          [type]: {
            value: event.target.value,
            errMsg: '',
            invaild: false,
          },
        });
      }
    }
  };

  // 各輸入欄位的資料及其props的值 (為了方便遍歷，統整成一個array)
  const fields = [
    {
      label: 'store',
      name: 'store',
      placeholder: 'store2',
      onChange: (event) => handleChange('store', event),
      list: 'stores',
      options: storeOptions,
    },
    {
      label: 'name',
      name: 'name',
      placeholder: 'John Doe',
      onChange: (event) => handleChange('name', event),
    },
    {
      label: 'phone',
      name: 'phone',
      placeholder: '0910777888',
      onChange: (event) => handleChange('phone', event),
    },
    {
      label: 'Amount of consumption',
      name: 'consumption',
      placeholder: '10000',
      onChange: (event) => handleChange('consumption', event),
    },
    {
      label: 'payment',
      name: 'payment',
      defaultValue: 'digital payment',
      onChange: (event) => handleChange('payment', event),
      list: 'payments',
      options: paymentOptions,
    },
  ];

  // 用於提交後，檢查是否欄位為空值的函數
  const checkEmptyInput = () => {
    const newInputs = {};
    for (const [key, valObj] of Object.entries(inputs)) {
      if (valObj.value === '') {
        newInputs[key] = { ...valObj, errMsg: 'required', invaild: true };
      }
      if (valObj.value !== '') {
        newInputs[key] = valObj;
      }
    }
    return newInputs;
  };

  // 提交後，驗證name格式
  const checkName = (inputsObj) => {
    const name = inputsObj.name.value;
    if (name !== '') {
      const result =
        /(^[\u4e00-\u9fa5]{2,4}$|^[a-zA-Z]+$|^[a-zA-Z]+[\s]{1}[a-zA-Z]+$)/.test(
          name
        );
      if (!result) {
        return {
          ...inputsObj,
          name: { ...inputsObj.name, errMsg: 'wrong format', invaild: true },
        };
      }
    }
    return inputsObj;
  };

  // 處理提交的函數
  const handleSubmit = (e) => {
    e.preventDefault();
    // 驗證輸入欄錯誤有以下幾種情況: 該填未填required, 各state的wrong format
    let newInputs = checkEmptyInput();
    newInputs = checkName(newInputs);
    setInputs(newInputs);
  };

  // 此函數用於獲取輸入欄的html元素(包括其props)去遍歷，並渲染至頁面上
  const getElements = (field) => {
    if (field.label === 'store' || field.label === 'payment') {
      return (
        <>
          {field.label === 'store' ? (
            <input
              className={inputs[field.name].invaild ? 'error' : ''}
              list={field.list}
              name={field.label}
              placeholder={field.placeholder}
              onChange={field.onChange}
            />
          ) : (
            <input
              className={inputs[field.name].invaild ? 'error' : ''}
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
        className={inputs[field.name].invaild ? 'error' : ''}
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
        autoComplete="off"
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
            {inputs[field.name].invaild === false ? (
              <div className="caption errMsg" style={{ display: 'none' }}>
                {inputs[field.name].errMsg}
              </div>
            ) : (
              <div className="caption errMsg">{inputs[field.name].errMsg}</div>
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
