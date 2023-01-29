import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import matchData from './MatchDataAPI';

const Form = () => {
  // 所有input輸入框的狀態
  const [inputs, setInputs] = useState({
    store: { value: '', errMsg: '', invalid: false },
    name: { value: '', errMsg: '', invalid: false },
    phone: { value: '', errMsg: '', invalid: false },
    consumption: { value: '', errMsg: '', invalid: false },
    payment: { value: 'digital payment', errMsg: '', invalid: false },
  });

  // 是否已提交表單之狀態
  const [isSubmitted, setIsSubmitted] = useState(false);
  // 是否正在匹配資料中
  const [isMatching, setIsMatching] = useState(false);
  // 是否已返回資料
  const [hasResults, setHasResults] = useState(false);
  // 管理顯示成功或失敗樣式的狀態
  const [isSuccess, setIsSuccess] = useState(false);

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

  // 決定顯示哪種submit按鈕的函數
  const submitBtnDisplayer = () => {
    // 尚未匹配資料前
    if (hasResults === false) {
      return <h5>submit</h5>;
    }
    // 匹配資料並返回結果後
    if (isSuccess) {
      return (
        <>
          <img
            src="./assets/images/successIcon.svg"
            alt="successful submit button"
          />
          <h5>success</h5>
        </>
      );
    }
    return (
      <>
        <img src="./assets/images/failureIcon.svg" alt="failed submit button" />
        <h5>failure</h5>
      </>
    );
  };

  // 用於決定submit按鈕class的函數
  const determineSubmitBtnClass = () => {
    if (hasResults) {
      return isSuccess ? 'success' : 'failure';
    }
    return isSubmitted ? 'pressed' : '';
  };

  // 此函數用於將之前的結果清除 (使submit樣式回到未獲得資料前)
  const submitStyleResetter = () => {
    if (hasResults) {
      setHasResults(false);
      setIsSubmitted(false);
    }
  };

  // 改變isSubmitted值的函數
  const isSubmittedChanger = () => {
    setIsSubmitted(true);
    setIsMatching(true);
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasResults) {
      return;
    }
    // 驗證輸入欄錯誤有以下幾種情況: 該填未填required, 各state的wrong format
    const newInputs = validate(checkEmptyInput());
    const invalidInputObjs = Object.values(newInputs).filter((inputObj) => {
      return inputObj.invalid === true;
    });
    // 如果驗證後的inputs存在驗證不通過的資料，則返回帶有錯誤訊息的inputs，且不submit用戶輸入的資料
    if (invalidInputObjs.length !== 0) {
      setInputs(newInputs);
    } else {
      isSubmittedChanger();
      // 如果驗證後的inputs沒問題，submit用戶輸入的資料，藉由api發送請求，並匹配用戶輸入的資料是否存在，存在則成功，反之則失敗
      const matchedResults = await matchData(newInputs);
      // console.log(matchedResults);
      // 若有返回匹配後的結果，且array中有顧客資料，則顯示成功
      if (matchedResults && matchedResults.length !== 0) {
        setIsSuccess(true);
      } else {
        // 反之，則顯示失敗樣式
        setIsSuccess(false);
      }
      setHasResults(true);
      setIsMatching(false);
      setInputs(newInputs);
    }
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
              onClick={submitStyleResetter}
              inputMode={field.inputMode}
              disabled={isMatching}
              style={{ cursor: isMatching ? 'not-allowed' : 'pointer' }}
            />
          ) : (
            <input
              className={inputs[field.name].invalid ? 'error' : ''}
              list={field.list}
              name={field.label}
              defaultValue={field.defaultValue}
              onChange={field.onChange}
              onClick={submitStyleResetter}
              inputMode={field.inputMode}
              disabled={isMatching}
              style={{ cursor: isMatching ? 'not-allowed' : 'pointer' }}
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
        onClick={submitStyleResetter}
        inputMode={field.inputMode}
        disabled={isMatching}
        style={{ cursor: isMatching ? 'not-allowed' : 'auto' }}
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
      <div className="submitBtnSection">
        <button
          type="submit"
          form="myForm"
          disabled={isMatching}
          style={hasResults ? { cursor: 'auto' } : {}}
          className={determineSubmitBtnClass()}
        >
          {submitBtnDisplayer()}
        </button>
        <div className="failureMsg-container">
          <div
            className="failureMsg"
            style={
              hasResults && isSuccess === false
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            This person does not exist
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
