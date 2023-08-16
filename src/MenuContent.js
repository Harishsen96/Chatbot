// import React from 'react';
// import {
// //   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
// //   MailOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import { Menu } from 'antd';

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),
// //   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
// //   ]),
// //   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Option 11', '11'),
//     getItem('Option 12', '12'),
//     // getItem('Submenu')
// //   ]),
// ];
// const MenuItems = () => {
//   return (
//     <div
//       style={{
//         width: 256,
//       }}
//     >
//       <Menu
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1','sub2']}
//         mode="inline"
//         style={{backgroundColor:'#904bbf',color:'white'}}
//         // theme="dark"
//         items={items}
//       />
//     </div>
//   );
// };
// export default MenuItems;

import React from 'react'
import DrawerImage from './Image/drawer.png'
function MenuContent() {
  return (
    <div>
        <img src={DrawerImage} style={{height:'500px'}}></img>
    </div>
  )
}

export default MenuContent