import { createGlobalStyle } from 'styled-components';
// import 'antd/dist/antd.min.css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/dropdown/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/auto-complete/style/css';
import 'antd/lib/spin/style/css';


export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
  }

  #root {
    font-family: helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #222222;
    font-size: 12px;
    line-height: 1.3;
  }


  // Ant Design Overrides //
  li.ant-select-dropdown-menu-item,
  div.ant-select,
  li.ant-dropdown-menu-item,
  div.ant-calendar {
    font-size: 12px;
  }
`