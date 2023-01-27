import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = () => {
  // 所有input輸入框的狀態
  const [inputs, setInputs] = useState({
    store: { value: '', errMsg: '', invalid: false },
    name: { value: '', errMsg: '', invalid: false },
    phone: { value: '', errMsg: '', invalid: false },
    consumption: { value: '', errMsg: '', invalid: false },
    payment: { value: 'digital payment', errMsg: '', invalid: false },
  });

  // 定義store欄位及payment欄位的options，便於使用
  const storeOptions = ['store1', 'store2', 'store3', 'store113', 'store223'];
  const paymentOptions = ['digital payment', 'ATM'];

  // 欄位驗證格式
  const namePattern =
    /(^[\u4e00-\u9fa5]{2,4}$|^[a-zA-Z]+$|^[a-zA-Z]+[\s]{1}[a-zA-Z]+$)/;
  const phonePattern = /^09[0-9]{8}$/;
  const consumptionPattern = /^[0]{1}$|^[1-9]+[0-9]*$/;

  // (在onChange事件中)檢查store中用戶的輸入值，並返回過濾結果
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
        [type]: { value: event.target.value, errMsg: '', invalid: false },
      });
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
              invalid: true,
            },
          });
        }
        if (results.length !== 0) {
          setInputs({
            ...inputs,
            [type]: {
              value: event.target.value,
              errMsg: '',
              invalid: false,
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
            invalid: false,
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
      inputMode: 'text',
    },
    {
      label: 'name',
      name: 'name',
      placeholder: 'John Doe',
      onChange: (event) => handleChange('name', event),
      inputMode: 'text',
    },
    {
      label: 'phone',
      name: 'phone',
      placeholder: '0910777888',
      onChange: (event) => handleChange('phone', event),
      inputMode: 'tel',
    },
    {
      label: 'Amount of consumption',
      name: 'consumption',
      placeholder: '10000',
      onChange: (event) => handleChange('consumption', event),
      inputMode: 'numeric',
    },
    {
      label: 'payment',
      name: 'payment',
      defaultValue: 'digital payment',
      onChange: (event) => handleChange('payment', event),
      list: 'payments',
      options: paymentOptions,
      inputMode: 'text',
    },
  ];

  // 用於提交後，檢查是否欄位為空值的函數
  const checkEmptyInput = () => {
    const newInputs = {};
    for (const [key, valObj] of Object.entries(inputs)) {
      if (valObj.value === '') {
        newInputs[key] = { ...valObj, errMsg: 'required', invalid: true };
      }
      if (valObj.value !== '') {
        newInputs[key] = valObj;
      }
    }
    return newInputs;
  };

  // 提交後，驗證各欄位格式是否正確
  const validate = (inputsObj) => {
    // 將各欄位之值，取出並賦予至變數
    const store = inputsObj.store.value;
    const name = inputsObj.name.value;
    const phone = inputsObj.phone.value;
    const consumption = inputsObj.consumption.value;
    const payment = inputsObj.payment.value;
    // 創建一個用於遍歷的array
    const dataArr = [
      {
        type: 'store',
        value: store,
        pattern: storeOptions,
        errMsg: 'no result',
      },
      {
        type: 'name',
        value: name,
        pattern: namePattern,
        errMsg: 'wrong format',
      },
      {
        type: 'phone',
        value: phone,
        pattern: phonePattern,
        errMsg: 'wrong format',
      },
      {
        type: 'consumption',
        value: consumption,
        pattern: consumptionPattern,
        errMsg: 'wrong format',
      },
      {
        type: 'payment',
        value: payment,
        pattern: paymentOptions,
        errMsg: 'wrong format',
      },
    ];
    // 創建用於更新inputs的object
    const newInputsObj = {};
    // 用forEach方法進行循環操作
    dataArr.forEach((dataObj) => {
      const { type, value, pattern, errMsg } = dataObj;
      if (value !== '') {
        if (type === 'store' || type === 'payment') {
          const results = pattern.filter((p) => {
            return p === value;
          });
          if (results.length === 0) {
            newInputsObj[type] = {
              value,
              errMsg,
              invalid: true,
            };
          } else {
            newInputsObj[type] = { ...inputsObj[type] };
          }
        } else {
          const result = pattern.test(value);
          if (!result) {
            newInputsObj[type] = {
              value,
              errMsg,
              invalid: true,
            };
          } else {
            newInputsObj[type] = { ...inputsObj[type] };
          }
        }
      } else {
        newInputsObj[type] = { ...inputsObj[type] };
      }
    });
    // 最後返回最終結果的object
    return newInputsObj;
  };

  // 處理提交的函數
  const handleSubmit = (e) => {
    e.preventDefault();
    // 驗證輸入欄錯誤有以下幾種情況: 該填未填required, 各state的wrong format
    const newInputs = validate(checkEmptyInput());
    setInputs(newInputs);
  };

  // 此函數用於獲取輸入欄的html元素(包括其props)去遍歷，並渲染至頁面上
  const getElements = (field) => {
    if (field.label === 'store' || field.label === 'payment') {
      return (
        <>
          {field.label === 'store' ? (
            <input
              className={inputs[field.name].invalid ? 'error' : ''}
              list={field.list}
              name={field.label}
              placeholder={field.placeholder}
              onChange={field.onChange}
              inputMode={field.inputMode}
            />
          ) : (
            <input
              className={inputs[field.name].invalid ? 'error' : ''}
              list={field.list}
              name={field.label}
              defaultValue={field.defaultValue}
              onChange={field.onChange}
              inputMode={field.inputMode}
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
        className={inputs[field.name].invalid ? 'error' : ''}
        name={field.label}
        placeholder={field.placeholder}
        onChange={field.onChange}
        inputMode={field.inputMode}
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
          <img src="./assets/images/turtle.svg" alt="turtle" />
        </div>
        {fields.map((field) => (
          <label htmlFor={field.label} key={field.label}>
            <div>
              {field.label}&nbsp;
              <span>&#042;</span>
            </div>
            {getElements(field)}
            {inputs[field.name].invalid === false ? (
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
        <img src="./assets/images/submit.svg" alt="submit button" />
      </button>
    </div>
  );
};

export default Form;
