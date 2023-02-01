# 鎰威科技實作試題

專案名稱：eway_project


網站已部屬至github pages，請由以下網址前往查看

    https://yuanshikai524.github.io/eway_project/



表單驗證用的顧客資料在data資料夾中，但為了方便查看，以下提供部分顧客數據，
用以快速的輸入資料並測試驗證功能(amount of consumption選項請輸入任意正確格式的值即可)

    store1：
      "name": "Thomas Jimmy",
      "phone": "0967588922",
      "payment": "digital payment"

      "name": "羅志清",
      "phone": "0912445778",
      "payment": "ATM"

    store3：
      "name": "Hughes Mario",
      "phone": "0920555444",
      "payment": "ATM"

      "name": "張三",
      "phone": "0923833755",
      "payment": "digital payment"

    store223：
      "name": "Johnson Wicky",
      "phone": "0973255611",
      "payment": "ATM"

      "name": "林峰",
      "phone": "0999111333",
      "payment": "digital payment"
      

資料夾結構：

    --/src 專案根目錄
    |
    |--/components  存放所有組件之目錄
      |
      |--Card.jsx  各單項獎品/獎項組件
      |--Form.jsx  表單組件
      |--Header.jsx  表單以上之部分
      |--Lighthouse.jsx  燈塔組件
      |--Market.jsx  最下方市場圖片組件
      |--MatchDataAPI.jsx  用以匹配/比對用戶輸入之資料的組件
      |--Paragraph.jsx  展示Header組件中段落(文章)的組件
      |--Prize.jsx  展示所有獎品/獎項組件
    |--App.jsx   包括所有組件之最外層組件
    |--index.js  專案入口文件
    |
    |--.eslintrc.js       設置eslint的檔案(採用Airbnb及主流推薦的eslint設定)
    |--.prettierrc.json   設置prettier的檔案
    |--.stylelintrc.json  檢查css樣式的eslint設定檔


public中資料夾結構：

    --/public  存放html、css、scss、資料數據等之目錄
    |
    |--index.html   專案唯一html檔案
    |--favicon.ico  網站偏愛圖標
    |--/data        存放各商店顧客資料(作為伺服器端或資料庫，給前端發送請求以獲取數據的地方)
    |--/css         存放scss檔案編譯後的css之目錄
    |--/sass        存放所有scss檔案之目錄
      |
      |--/base            存放基本樣式、清除樣式設定之文件的目錄
        |--_general.scss  基本或全局樣式的scss檔案
        |--_reset.scss    用以清除預設樣式的scss檔案
      |--/components      存放各組件單獨使用的樣式之目錄(底下的每個scss檔案皆對應相同檔案名稱之組件)
      |--/helpers         存放mixin、variables之scss目錄
      |--/layout          存放排版架構之scss目錄
        |--_grid.scss     裡面以RWD去控制Header組件、Form組件、Prize組件皆用到的容器寬度(根據螢幕寬度大小不同，調節其可用寬度)
      |--all.scss         引用所有scss檔案並編譯成css的檔案