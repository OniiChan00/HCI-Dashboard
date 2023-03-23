import React from 'react'
import { AppstoreOutlined, ExpandOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const items = [
  {
    label: 'Home Work',
    key: '/',
    icon: <ExpandOutlined />,
  },
  {
    label: 'project',
    key: '/project',
    icon: <AppstoreOutlined />,
  },
];

export default function Nav_Bar() {
    let navigation = useNavigate();
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
      navigation(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}
