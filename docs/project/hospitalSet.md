# 医院管理 - 医院设置

- 医院设置

![医院设置](/imgs/project/hospitalSet.png)

- 添加或更新医院

![添加医院](/imgs/project/AddOrUpdateHospitalSet.png)

## 需求介绍

1. 医院设置静态组件
2. 医院列表数据分页展示
3. 根据医院名称和医院编号查询医院列表
4. 清空搜索条件
5. 添加医院
6. 修改医院
7. 删除医院
8. 批量删除医院

## 搭建静态组件

开发流程简述：

1. 先从 `antd` 官网复制基本组件代码，再查看组件上的属性，需要哪个就将对应代码复制过来(页面不能报错，有基本显示效果)。
2. 浏览整个组件，查看组件和组件上面的属性是否明白。
3. 最后对部分内容进行修改。

我们分三部分完成。

### 搭建头部表单和按钮

```tsx
import React from "react";
import { Card, Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./index.less";

function HospitalSet() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
	  */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn">
        添加
      </Button>
      <Button type="primary" danger disabled>
        批量删除
      </Button>
    </Card>
  );
}

export default HospitalSet;
```

### 搭建底部表格

```tsx{2,6,18-103,151-167}
import React from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./index.less";

function HospitalSet() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 数据从接口文档复制一份
  const data = [
    {
      id: 9,
      createTime: "2022-01-18 10:53:14",
      updateTime: "2022-03-27 11:19:48",
      isDeleted: 0,
      param: {},
      hosname: "民航总医院",
      hoscode: "1000_8",
      apiUrl: "http://api.mzyy.cn",
      signKey: "6f8006485dca34cd5849b724981dbe99",
      contactsName: "周全",
      contactsPhone: "15745634567",
      status: 1,
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}

      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
      */}
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
      />
    </Card>
  );
}

export default HospitalSet;
```

### 搭建分页器

```tsx{1,12-14,177-184}
import React, { useState } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./index.less";

function HospitalSet() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 数据从接口文档复制一份
  const data = [
    {
      id: 9,
      createTime: "2022-01-18 10:53:14",
      updateTime: "2022-03-27 11:19:48",
      isDeleted: 0,
      param: {},
      hosname: "民航总医院",
      hoscode: "1000_8",
      apiUrl: "http://api.mzyy.cn",
      signKey: "6f8006485dca34cd5849b724981dbe99",
      contactsName: "周全",
      contactsPhone: "15745634567",
      status: 1,
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}

      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
      */}
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
        }}
      />
    </Card>
  );
}

export default HospitalSet;
```

## 数据分页展示

### 查看 API 文档

> [接口文档地址](http://139.198.34.216:8201/swagger-ui.html)

确定请求相关信息（请求方式、请求地址、请求参数和响应返回值数据结构）

![接口图片](/imgs/project/hospitalSetApi.png)

从图中可知：

- 请求方式：GET
- 请求地址：/admin/hosp/hospitalSet/{page}/{limit}
- 请求参数有四个：
  - page （path 参数）
  - limit（path 参数）
  - hosname（query 参数）
  - hoscode（query 参数）

点击 `Try it out!` 按钮, 可得响应数据结构：

```json
// 只保留需要使用的数据
{
  // 医院列表
  "records": [
    {
      "id": 9,
      "hosname": "民航总医院", // 医院名称
      "hoscode": "1000_8", // 医院编号
      "apiUrl": "http://api.mzyy.cn", // API基础路径
      "signKey": "6f8006485dca34cd5849b724981dbe99", // 签名
      "contactsName": "周全", // 联系人姓名
      "contactsPhone": "15745634567", // 联系人手机
      "status": 1 // 状态：0 锁定 1解锁
    }
  ],
  // 总数
  "total": 9
}
```

### 定义请求函数

```ts
// src/api/hospital/hospitalSet.ts
import { request } from "@/utils/http";

// 获取医院列表
export const reqGetHospitalList = ({ page, limit, hosname, hoscode }) => {
  return request.get(`/admin/hosp/hospitalSet/${page}/${limit}`, {
    params: {
      hosname,
      hoscode,
    },
  });
};
```

此时还没有定义数据类型，ts 是报错状态。

接下来我们定义函数数据类型:

```ts
// src/api/hospital/model/hospitalSetTypes.ts
// 获取医院列表参数类型
export interface reqGetHospitalListParams {
  page: number;
  limit: number;
  hosname?: string;
  hoscode?: string;
}

// 单个医院类型
export interface HospitalItem {
  id: number;
  // 医院名称
  hosname: string;
  // 医院编号
  hoscode: string;
  // API基础路径
  apiUrl: string;
  // 签名
  signKey: string;
  // 联系人姓名
  contactsName: string;
  // 联系人手机
  contactsPhone: string;
  // 状态：0锁定 1解锁
  // status: 0 | 1;
}

// 医院列表类型
export type HospitalList = HospitalItem[];

// 获取医院列表返回值类型
export interface reqGetHospitalListResponse {
  total: number;
  // 数据需要进一步定义，后续需要复用
  records: HospitalList;
}
```

最后给封装的接口函数加上类型:

```ts{3-6,14-15}
// src/api/hospital/hospitalSet.ts
import { request } from "@/utils/http";
import type {
  reqGetHospitalListParams,
  reqGetHospitalListResponse,
} from "./model/hospitalSetTypes";

// 获取医院列表
export const reqGetHospitalList = ({
  page,
  limit,
  hosname,
  hoscode,
}: reqGetHospitalListParams) => {
  return request.get<any, reqGetHospitalListResponse>(
    `/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode,
      },
    }
  );
};
```

### 组件发送请求，获取数据

```tsx{2,20-30}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";

import "./index.less";

function HospitalSet() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // useEffect中不能接受async函数，所以需要单独定义
  useEffect(() => {
    async function getHospitalList() {
      // 还有两个参数hosname、hoscode，放在后面功能处理
      const res = await reqGetHospitalList({ page: current, limit: pageSize });
      // 控制台打印查看结果
      console.log(res);
    }
    // 调用后，才会发送请求，相当于componentDidMount
    getHospitalList();
  }, []);

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 数据从接口文档复制一份
  const data = [
    {
      id: 9,
      createTime: "2022-01-18 10:53:14",
      updateTime: "2022-03-27 11:19:48",
      isDeleted: 0,
      param: {},
      hosname: "民航总医院",
      hoscode: "1000_8",
      apiUrl: "http://api.mzyy.cn",
      signKey: "6f8006485dca34cd5849b724981dbe99",
      contactsName: "周全",
      contactsPhone: "15745634567",
      status: 1,
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
      */}
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
        }}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 数据动态展示

```tsx{10,16,30-32,111-128,194}
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // useEffect中不能接受async函数，所以需要单独定义
  useEffect(() => {
    async function getHospitalList() {
      // 还有两个参数hosname、hoscode，放在后面功能处理
      const res = await reqGetHospitalList({
        page: current,
        limit: pageSize,
      });
      // console.log(res); // 打印只为了查看数据有没有，没问题就去掉
      setTotal(res.total);
      setHospitalList(res.records);
    }
    // 调用后，才会发送请求，相当于componentDidMount
    getHospitalList();
  }, []);

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 数据从接口文档复制一份
  // 数据已经请求回来了，不用死数据了
  // const data = [
  //   {
  //     id: 9,
  //     createTime: "2022-01-18 10:53:14",
  //     updateTime: "2022-03-27 11:19:48",
  //     isDeleted: 0,
  //     param: {},
  //     hosname: "民航总医院",
  //     hoscode: "1000_8",
  //     apiUrl: "http://api.mzyy.cn",
  //     signKey: "6f8006485dca34cd5849b724981dbe99",
  //     contactsName: "周全",
  //     contactsPhone: "15745634567",
  //     status: 1,
  //   },
  // ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
        }}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 添加 Loading 效果

```tsx{15-16,27-28,37-38,212}
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // useEffect中不能接受async函数，所以需要单独定义
  useEffect(() => {
    async function getHospitalList() {
      // 发送请求开启loading
      setLoading(true);
      // 还有两个参数hosname、hoscode，放在后面功能处理
      const res = await reqGetHospitalList({
        page: current,
        limit: pageSize,
      });
      // console.log(res); // 打印只为了查看数据有没有，没问题就去掉
      setTotal(res.total);
      setHospitalList(res.records);
      // 请求完成结束loading
      setLoading(false);
    }
    // 调用后，才会发送请求，相当于componentDidMount
    getHospitalList();
  }, []);

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 数据从接口文档复制一份
  // 数据已经请求回来了，不用死数据了
  // const data = [
  //   {
  //     id: 9,
  //     createTime: "2022-01-18 10:53:14",
  //     updateTime: "2022-03-27 11:19:48",
  //     isDeleted: 0,
  //     param: {},
  //     hosname: "民航总医院",
  //     hoscode: "1000_8",
  //     apiUrl: "http://api.mzyy.cn",
  //     signKey: "6f8006485dca34cd5849b724981dbe99",
  //     contactsName: "周全",
  //     contactsPhone: "15745634567",
  //     status: 1,
  //   },
  // ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 封装公共请求函数，完成分页功能

将来分页器点击时也需要发送请求，请求不同的医院列表，所以我们封装一个公共的方法，用来发送请求。

```tsx{24-47,200-201}
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  // 只指定两个参数，因为分页器回调函数会传递两个参数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 还有两个参数hosname、hoscode，放在后面功能处理
    const res = await reqGetHospitalList({ page, limit });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

## 查询医院列表

### 修改表单内容

```tsx{139-142,147-150}
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  // 只指定两个参数，因为分页器回调函数会传递两个参数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 还有两个参数hosname、hoscode，放在后面功能处理
    const res = await reqGetHospitalList({ page, limit });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 完成查询功能

```tsx{29-32,51-54}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize)
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

## 清空搜索条件

```tsx{57-63,175}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    // 发送请求，获取最新数据展示
    getHospitalList(current, pageSize)
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb">
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

## 添加医院

### 新建路由组件

```tsx
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React from "react";

function AddOrUpdateHospital() {
  return <div>AddOrUpdateHospital</div>;
}

export default AddOrUpdateHospital;
```

### 进行路由配置

```tsx{17-19,76-82}
// src/routes/index.tsx
import React, { lazy, Suspense, FC } from "react";
import { useRoutes } from "react-router-dom";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";
import type { XRoutes } from "./types";

import { Layout, EmptyLayout, CompLayout } from "../layouts";
import Loading from "@comps/Loading";
import Redirect from "@comps/Redirect";

const Login = lazy(() => import("@pages/login"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/404"));

// 引入路由组件
const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet"));
const AddOrUpdateHospital = lazy(
  () => import("@pages/hospital/hospitalSet/components/AddOrUpdateHospital")
);
const HospitalList = lazy(() => import("@pages/hospital/hospitalList"));

const load = (Comp: FC) => {
  return (
    // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
    // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
    // 当组件渲染完成时，fallback就失效了
    <Suspense fallback={<Loading />}>
      {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
      <Comp />
    </Suspense>
  );
};

const routes: XRoutes = [
  {
    path: "/",
    element: <EmptyLayout />,
    children: [
      {
        path: "login",
        element: load(Login),
      },
    ],
  },
  {
    path: "/syt",
    element: <Layout />,
    children: [
      {
        path: "/syt/dashboard",
        meta: { icon: <HomeOutlined />, title: "首页" },
        element: load(Dashboard),
      },
      // 路由配置
      {
        // 路由访问路径
        path: "/syt/hospital",
        // 将来左侧菜单会根据meta内容生成
        meta: {
          // 菜单图标
          icon: <ShopOutlined />,
          // 菜单标题
          title: "医院管理",
        },
        // element代表要渲染的组件
        // 而父级菜单并不会加载真正的内容，所以渲染的其实就一个Outlet
        // Outlet组件就是渲染子路由组件：也就是医院设置、医院列表组件
        element: <CompLayout />,
        // 子路由配置
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            meta: { title: "医院设置" },
            element: load(HospitalSet),
          },
          {
            path: "/syt/hospital/hospitalSet/add",
            meta: { title: "添加医院" },
            element: load(AddOrUpdateHospital),
            // 不会生成左侧菜单
            hidden: true,
          },
          {
            path: "/syt/hospital/hospitalList",
            meta: { title: "医院列表" },
            element: load(HospitalList),
          },
        ],
      },
    ],
  },

  {
    path: "/404",
    element: load(NotFound),
  },
  {
    path: "*",
    element: <Redirect to="/404" />,
  },
];

// 渲染路由
// 注意：首字母必须大写
export const RenderRoutes = () => {
  // react-router-dom的新增语法。不用自己遍历了，它帮我们遍历生成
  return useRoutes(routes);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = routes.findIndex((route) => route.path === "/syt");
  return routes[currentIndex].children as XRoutes;
};

export default routes;
```

### 点击跳转路由

```tsx{9,135-142,189}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    // 发送请求，获取最新数据展示
    getHospitalList(current, pageSize)
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Button
              className="hospitalSet-btn"
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 功能代码尽量放一起
  const navigate = useNavigate()

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate('/syt/hospital/hospitalSet/add') // push
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="hospitalSet-btn mb" onClick={goAddHospital}>
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 搭建静态组件

```tsx
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React from "react";
import { Card, Form, Input, Button } from "antd";

function AddOrUpdateHospital() {
  const [form] = Form.useForm();

  const onFinish = () => {};

  return (
    <Card>
      {/*
        labelCol 左侧label文字容器宽度
        wrapperCol 右侧区域容器宽度
        这里采用了栅格布局，整行分为24份。
      */}
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
      >
        <Form.Item
          label="医院名称"
          // 查看添加医院接口文档
          // 将字段改为请求参数要求的字段
          name="hosname"
        >
          <Input />
        </Form.Item>
        <Form.Item label="医院编号" name="hoscode">
          <Input />
        </Form.Item>
        <Form.Item label="api基础路径" name="apiUrl">
          <Input />
        </Form.Item>
        <Form.Item label="联系人姓名" name="contactsName">
          <Input />
        </Form.Item>
        <Form.Item label="联系人手机" name="contactsPhone">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="hospital-btn">
            保存
          </Button>
          <Button>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddOrUpdateHospital;
```

### 定义公共样式

如果发现有公共的样式就提取出来复用。

```css
/* src/styles/index.css */
.hospital-btn {
  margin-right: 10px;
}
```

还需要将之前组件的类名 `hospitalSet-btn` 改为 `hospital-btn`

使用 `VSCode` 全局搜索

![全局搜索](/imgs/project/hospitalSetSearch.png)

### 定义表单校验规则

```tsx{28-34,41,48,55,62-68}
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React from "react";
import { Card, Form, Input, Button } from "antd";

function AddOrUpdateHospital() {
  const [form] = Form.useForm();

  const onFinish = () => {};

  return (
    <Card>
      {/*
        labelCol 左侧label文字容器宽度
        wrapperCol 右侧区域容器宽度
        这里采用了栅格布局，整行分为24份。
      */}
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
      >
        <Form.Item
          label="医院名称"
          // 查看添加医院接口文档
          // 将字段改为请求参数要求的字段
          name="hosname"
          // 详细规则文档：https://ant.design/components/form-cn/#Rule
          rules={[
            {
              required: true, // 必填项
              message: "请输入医院名称", // 校验失败的错误信息
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: "请输入医院编号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人姓名"
          name="contactsName"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人手机"
          name="contactsPhone"
          rules={[
            {
              required: true,
              message: "请输入合法的联系人手机",
              pattern: /^1[3-9][0-9]{9}$/, // 正则表达式
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="hospital-btn">
            保存
          </Button>
          <Button>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddOrUpdateHospital;
```

### 定义接口函数&类型

- 接口函数类型

```ts{39-46}
// src/api/hospital/model/hospitalSetTypes.ts
// 获取医院列表参数类型
export interface reqGetHospitalListParams {
  page: number;
  limit: number;
  hosname?: string;
  hoscode?: string;
}

// 单个医院类型
export interface HospitalItem {
  id: number;
  // 医院名称
  hosname: string;
  // 医院编号
  hoscode: string;
  // API基础路径
  apiUrl: string;
  // 签名
  signKey: string;
  // 联系人姓名
  contactsName: string;
  // 联系人手机
  contactsPhone: string;
  // 状态：0锁定 1解锁
  // status: 0 | 1;
}

// 医院列表类型
export type HospitalList = HospitalItem[];

// 获取医院列表返回值类型
export interface reqGetHospitalListResponse {
  total: number;
  // 数据需要进一步定义，后续需要复用
  records: HospitalList;
}

// 添加医院参数类型
export interface reqAddHospitalParams {
  apiUrl: string;
  contactsName: string;
  contactsPhone: string;
  hoscode: string;
  hosname: string;
}
```

- 接口函数

```ts{6,28-32}
// src/api/hospital/hospitalSet.ts
import { request } from "@/utils/http";
import type {
  reqGetHospitalListParams,
  reqGetHospitalListResponse,
  reqAddHospitalParams,
} from "./model/hospitalSetTypes";

// 获取医院列表
export const reqGetHospitalList = ({
  page,
  limit,
  hosname,
  hoscode,
}: reqGetHospitalListParams) => {
  // 查询才会有返回值
  return request.get<any, reqGetHospitalListResponse>(
    `/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode,
      },
    }
  );
};

// 添加医院
export const reqAddHospital = (data: reqAddHospitalParams) => {
  // 添加/更新/删除都没有返回值，返回值null
  return request.post<any, null>(`/admin/hosp/hospitalSet/save`, data);
};
```

### 完成添加医院

```tsx{3-7,12-18}
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

import { reqAddHospital } from "@api/hospital/hospitalSet";
import { reqAddHospitalParams } from "@api/hospital/model/hospitalSetTypes";

function AddOrUpdateHospital() {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values: reqAddHospitalParams) => {
    await reqAddHospital(values);
    message.success("添加医院成功");
    navigate("/syt/hospital/hospitalSet");
  };

  return (
    <Card>
      {/*
        labelCol 左侧label文字容器宽度
        wrapperCol 右侧区域容器宽度
        这里采用了栅格布局，整行分为24份。
      */}
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
      >
        <Form.Item
          label="医院名称"
          // 查看添加医院接口文档
          // 将字段改为请求参数要求的字段
          name="hosname"
          // 详细规则文档：https://ant.design/components/form-cn/#Rule
          rules={[
            {
              required: true, // 必填项
              message: "请输入医院名称", // 校验失败的错误信息
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: "请输入医院编号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人姓名"
          name="contactsName"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人手机"
          name="contactsPhone"
          rules={[
            {
              required: true,
              message: "请输入合法的联系人手机",
              pattern: /^1[3-9][0-9]{9}$/, // 正则表达式
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="hospital-btn">
            保存
          </Button>
          <Button>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddOrUpdateHospital;
```

### 完成返回

```tsx{18,21-25,93}
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

import { reqAddHospital } from "@api/hospital/hospitalSet";
import { reqAddHospitalParams } from "@api/hospital/model/hospitalSetTypes";

function AddOrUpdateHospital() {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // 确定
  const onFinish = async (values: reqAddHospitalParams) => {
    await reqAddHospital(values);
    message.success("添加医院成功");
    goBack();
  };

  // 返回
  const goBack = () => {
    // navigate(-1); // 返回到上个浏览历史记录
    navigate("/syt/hospital/hospitalSet");
  };

  return (
    <Card>
      {/*
        labelCol 左侧label文字容器宽度
        wrapperCol 右侧区域容器宽度
        这里采用了栅格布局，整行分为24份。
      */}
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
      >
        <Form.Item
          label="医院名称"
          // 查看添加医院接口文档
          // 将字段改为请求参数要求的字段
          name="hosname"
          // 详细规则文档：https://ant.design/components/form-cn/#Rule
          rules={[
            {
              required: true, // 必填项
              message: "请输入医院名称", // 校验失败的错误信息
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: "请输入医院编号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人姓名"
          name="contactsName"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人手机"
          name="contactsPhone"
          rules={[
            {
              required: true,
              message: "请输入合法的联系人手机",
              pattern: /^1[3-9][0-9]{9}$/, // 正则表达式
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="hospital-btn">
            保存
          </Button>
          <Button onClick={goBack}>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddOrUpdateHospital;
```

## 修改医院

### 搭建路由

```tsx{83-88}
// src/routes/index.tsx
import React, { lazy, Suspense, FC } from "react";
import { useRoutes } from "react-router-dom";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";
import type { XRoutes } from "./types";

import { Layout, EmptyLayout, CompLayout } from "../layouts";
import Loading from "@comps/Loading";
import Redirect from "@comps/Redirect";

const Login = lazy(() => import("@pages/login"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/404"));

// 引入路由组件
const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet"));
const AddOrUpdateHospital = lazy(
  () => import("@pages/hospital/hospitalSet/components/AddOrUpdateHospital")
);
const HospitalList = lazy(() => import("@pages/hospital/hospitalList"));

const load = (Comp: FC) => {
  return (
    // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
    // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
    // 当组件渲染完成时，fallback就失效了
    <Suspense fallback={<Loading />}>
      {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
      <Comp />
    </Suspense>
  );
};

const routes: XRoutes = [
  {
    path: "/",
    element: <EmptyLayout />,
    children: [
      {
        path: "login",
        element: load(Login),
      },
    ],
  },
  {
    path: "/syt",
    element: <Layout />,
    children: [
      {
        path: "/syt/dashboard",
        meta: { icon: <HomeOutlined />, title: "首页" },
        element: load(Dashboard),
      },
      // 路由配置
      {
        // 路由访问路径
        path: "/syt/hospital",
        // 将来左侧菜单会根据meta内容生成
        meta: {
          // 菜单图标
          icon: <ShopOutlined />,
          // 菜单标题
          title: "医院管理",
        },
        // element代表要渲染的组件
        // 而父级菜单并不会加载真正的内容，所以渲染的其实就一个Outlet
        // Outlet组件就是渲染子路由组件：也就是医院设置、医院列表组件
        element: <CompLayout />,
        // 子路由配置
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            meta: { title: "医院设置" },
            element: load(HospitalSet),
          },
          {
            path: "/syt/hospital/hospitalSet/add",
            meta: { title: "添加医院" },
            element: load(AddOrUpdateHospital),
            // 不会生成左侧菜单
            hidden: true,
          },
          {
            path: "/syt/hospital/hospitalSet/edit/:id",
            meta: { title: "修改医院" },
            element: load(AddOrUpdateHospital), // 使用同一个组件
            hidden: true,
          },
          {
            path: "/syt/hospital/hospitalList",
            meta: { title: "医院列表" },
            element: load(HospitalList),
          },
        ],
      },
    ],
  },

  {
    path: "/404",
    element: load(NotFound),
  },
  {
    path: "*",
    element: <Redirect to="/404" />,
  },
];

// 渲染路由
// 注意：首字母必须大写
export const RenderRoutes = () => {
  // react-router-dom的新增语法。不用自己遍历了，它帮我们遍历生成
  return useRoutes(routes);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = routes.findIndex((route) => route.path === "/syt");
  return routes[currentIndex].children as XRoutes;
};

export default routes;
```

### 修改按钮

```tsx{3,117-123}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table, Tooltip } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type { HospitalList } from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型将来考虑，先为any
      render: (row: any) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 点击跳转路由

```tsx{14,117,125,149-155}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table, Tooltip } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type {
  HospitalList,
  HospitalItem,
} from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型为单个医院数据
      render: (row: HospitalItem) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
                onClick={goUpdateHospital(row.id)}
              />
            </Tooltip>
            <Button
              className="hospitalSet-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    },
  ];

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  // 跳转到修改医院组件
  // 需要传参就得用高阶函数形式
  const goUpdateHospital = (id: number) => {
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 定义接口函数&类型

此时我们需要根据 id 获取到要修改的医院数据，最后进行修改，一共两个接口。

- 接口类型

```ts{47-51}
// 获取医院列表参数类型
export interface reqGetHospitalListParams{
  page: number;
  limit: number;
  hosname?: string;
  hoscode?: string;
}

// 单个医院类型
export interface HospitalItem {
  id: number;
  // 医院名称
  hosname: string;
  // 医院编号
  hoscode: string;
  // API基础路径
  apiUrl: string;
  // 签名
  signKey: string;
  // 联系人姓名
  contactsName: string;
  // 联系人手机
  contactsPhone: string;
  // 状态：0 锁定 1 解锁
  // status: 0 | 1;
}

// 医院列表类型
export type HospitalList = HospitalItem[];

// 获取医院列表返回值类型
export interface reqGetHospitalListResponse {
  total: number;
  // 数据需要进一步定义，后续需要复用
  records: HospitalList;
}

// 添加医院参数类型
export interface reqAddHospitalParams {
  apiUrl: string;
  contactsName: string;
  contactsPhone: string;
  hoscode: string;
  hosname: string;
}

// 定义类型时能复用一定要复用！
// 修改医院参数类型
export interface reqUpdateHospitalParams extends reqAddHospitalParams {
  id: number;
}
```

- 接口函数

```ts{7-8,36-44}
// src/api/hospital/hospitalSet.ts
import { request } from "@/utils/http";
import type {
  reqGetHospitalListParams,
  reqGetHospitalListResponse,
  reqAddHospitalParams,
  reqUpdateHospitalParams,
  HospitalItem,
} from "./model/hospitalSetTypes";

// 获取医院列表
export const reqGetHospitalList = ({
  page,
  limit,
  hosname,
  hoscode,
}: reqGetHospitalListParams) => {
  // 查询才会有返回值
  return request.get<any, reqGetHospitalListResponse>(
    `/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode,
      },
    }
  );
};

// 添加医院
export const reqAddHospital = (data: reqAddHospitalParams) => {
  // 添加/更新/删除都没有返回值，返回值null
  return request.post<any, null>(`/admin/hosp/hospitalSet/save`, data);
};

// 修改医院
export const reqUpdateHospital = (data: reqUpdateHospitalParams) => {
  return request.put<any, null>(`/admin/hosp/hospitalSet/update`, data);
};

// 获取某个医院数据
export const reqGetHospital = (id: number) => {
  return request.get<any, HospitalItem>(`/admin/hosp/hospitalSet/get/${id}`);
};
```

### 组件发送请求, 获取数据

```tsx{4,6,12-28}
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React, { useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { reqAddHospital, reqGetHospital } from "@api/hospital/hospitalSet";
import { reqAddHospitalParams } from "@api/hospital/model/hospitalSetTypes";

function AddOrUpdateHospital() {
  const [form] = Form.useForm();

  const params = useParams();

  useEffect(() => {
    const getHospital = async () => {
      const { id } = params;
      // 添加和更新都会来到当前组件
      // 而添加没有id，不需要发送请求
      if (id) {
        // params中的参数类型是string，要将其转化为number
        const hospital = await reqGetHospital(+id);
        // 将获取到的数据设置到表单中
        form.setFieldsValue(hospital);
      }
    };

    getHospital();
  }, [params, form]);

  // 确定
  const onFinish = async (values: reqAddHospitalParams) => {
    await reqAddHospital(values);
    message.success("添加医院成功");
    goBack();
  };

  const navigate = useNavigate();

  // 返回
  const goBack = () => {
    // navigate(-1); // 返回到上个浏览历史记录
    navigate("/syt/hospital/hospitalSet");
  };

  return (
    <Card>
      {/*
        labelCol 左侧label文字容器宽度
        wrapperCol 右侧区域容器宽度
        这里采用了栅格布局，整行分为24份。
      */}
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
      >
        <Form.Item
          label="医院名称"
          // 查看添加医院接口文档
          // 将字段改为请求参数要求的字段
          name="hosname"
          // 详细规则文档：https://ant.design/components/form-cn/#Rule
          rules={[
            {
              required: true, // 必填项
              message: "请输入医院名称", // 校验失败的错误信息
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: "请输入医院编号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人姓名"
          name="contactsName"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人手机"
          name="contactsPhone"
          rules={[
            {
              required: true,
              message: "请输入合法的联系人手机",
              pattern: /^1[3-9][0-9]{9}$/, // 正则表达式
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="hospital-btn">
            保存
          </Button>
          <Button onClick={goBack}>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddOrUpdateHospital;
```

### 完成修改医院

```tsx{6,30-43}
// src/pages/hospital/hospitalSet/components/AddOrUpdateHospital.tsx
import React, { useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { reqAddHospital, reqGetHospital, reqUpdateHospital } from "@api/hospital/hospitalSet";
import { reqAddHospitalParams } from "@api/hospital/model/hospitalSetTypes";

function AddOrUpdateHospital() {
  const [form] = Form.useForm();

  const params = useParams();

  useEffect(() => {
    const getHospital = async () => {
      const { id } = params;
      // 添加和更新都会来到当前组件
      // 而添加没有id，不需要发送请求
      if (id) {
        // params中的参数类型是string，要将其转化为number
        const hospital = await reqGetHospital(+id);
        // 将获取到的数据设置到表单中
        form.setFieldsValue(hospital);
      }
    };

    getHospital();
  }, [params, form]);

  // 确定
  const onFinish = async (values: reqAddHospitalParams) => {
    const { id } = params;

    if (id) {
      // 更新
      await reqUpdateHospital({
        ...values,
        id: +id, // params中的参数类型是string，要将其转化为number
      });
    } else {
      // 添加
      await reqAddHospital(values);
    }

    message.success(`${id ? "更新" : "添加"}医院成功`);
    goBack();
  };

  const navigate = useNavigate();

  // 返回
  const goBack = () => {
    // navigate(-1); // 返回到上个浏览历史记录
    navigate("/syt/hospital/hospitalSet");
  };

  return (
    <Card>
      {/*
        labelCol 左侧label文字容器宽度
        wrapperCol 右侧区域容器宽度
        这里采用了栅格布局，整行分为24份。
      */}
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
      >
        <Form.Item
          label="医院名称"
          // 查看添加医院接口文档
          // 将字段改为请求参数要求的字段
          name="hosname"
          // 详细规则文档：https://ant.design/components/form-cn/#Rule
          rules={[
            {
              required: true, // 必填项
              message: "请输入医院名称", // 校验失败的错误信息
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: "请输入医院编号" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人姓名"
          name="contactsName"
          rules={[{ required: true, message: "请输入api基础路径" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系人手机"
          name="contactsPhone"
          rules={[
            {
              required: true,
              message: "请输入合法的联系人手机",
              pattern: /^1[3-9][0-9]{9}$/, // 正则表达式
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="hospital-btn">
            保存
          </Button>
          <Button onClick={goBack}>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddOrUpdateHospital;
```

## 删除医院

### 删除按钮

```tsx{128-135}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table, Tooltip } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList } from "@api/hospital/hospitalSet";
import type {
  HospitalList,
  HospitalItem,
} from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型为单个医院数据
      render: (row: HospitalItem) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
                onClick={goUpdateHospital(row.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除医院">
              <Button
                className="hospital-btn"
                type="primary"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  // 跳转到修改医院组件
  // 需要传参就得用高阶函数形式
  const goUpdateHospital = (id: number) => {
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 定义接口函数

```ts{46-49}
// src/api/hospital/hospitalSet.ts
import { request } from "@/utils/http";
import type {
  reqGetHospitalListParams,
  reqGetHospitalListResponse,
  reqAddHospitalParams,
  reqUpdateHospitalParams,
  HospitalItem,
} from "./model/hospitalSetTypes";

// 获取医院列表
export const reqGetHospitalList = ({
  page,
  limit,
  hosname,
  hoscode,
}: reqGetHospitalListParams) => {
  // 查询才会有返回值
  return request.get<any, reqGetHospitalListResponse>(
    `/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode,
      },
    }
  );
};

// 添加医院
export const reqAddHospital = (data: reqAddHospitalParams) => {
  // 添加/更新/删除都没有返回值，返回值null
  return request.post<any, null>(`/admin/hosp/hospitalSet/save`, data);
};

// 修改医院
export const reqUpdateHospital = (data: reqUpdateHospitalParams) => {
  return request.put<any, null>(`/admin/hosp/hospitalSet/update`, data);
};

// 获取某个医院数据
export const reqGetHospital = (id: number) => {
  return request.get<any, HospitalItem>(`/admin/hosp/hospitalSet/get/${id}`);
};

// 删除医院
export const reqRemoveHospital = (id: number) => {
  return request.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`);
};
```

### 完成删除

```tsx{3,11,134,143-152}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Table, Tooltip, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList, reqRemoveHospital } from "@api/hospital/hospitalSet";
import type {
  HospitalList,
  HospitalItem,
} from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型为单个医院数据
      render: (row: HospitalItem) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
                onClick={goUpdateHospital(row.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除医院">
              <Button
                className="hospital-btn"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={removeHospital(row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  // 删除医院
  const removeHospital = (id: number) => {
    return async () => {
      // 发送请求，只会删除服务器数据，客户端数据没变
      await reqRemoveHospital(id);
      message.success("删除医院成功");
      // 重新获取最新医院列表即可
      getHospitalList(current, pageSize);
    };
  };

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  // 跳转到修改医院组件
  // 需要传参就得用高阶函数形式
  const goUpdateHospital = (id: number) => {
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
      />
    </Card>
  );
}

export default HospitalSet;
```

## 批量删除医院

### 添加复选框

```tsx{2,171-187,280}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect, Key } from "react";
import { Card, Form, Input, Button, Table, Tooltip, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList, reqRemoveHospital } from "@api/hospital/hospitalSet";
import type {
  HospitalList,
  HospitalItem,
} from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型为单个医院数据
      render: (row: HospitalItem) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
                onClick={goUpdateHospital(row.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除医院">
              <Button
                className="hospital-btn"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={removeHospital(row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  // 删除医院
  const removeHospital = (id: number) => {
    return async () => {
      // 发送请求，只会删除服务器数据，客户端数据没变
      await reqRemoveHospital(id);
      message.success("删除医院成功");
      // 重新获取最新医院列表即可
      getHospitalList(current, pageSize);
    };
  };

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  // 跳转到修改医院组件
  // 需要传参就得用高阶函数形式
  const goUpdateHospital = (id: number) => {
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  // 复选框触发的事件
  const rowSelection = {
    // 全选&单选
    onChange: (selectedRowKeys: Key[], selectedRows: HospitalList) => {
      // selectedRowKeys 选中的当前元素key的值组成的数组（我们之前设置rowKey为id，所以实际获取的是当前元素的id）
      // selectedRows 选中的当前元素组成的数组
      console.log(selectedRowKeys, selectedRows);
    },
    // 单选
    // onSelect: (record: any, selected: any, selectedRows: any) => {
    //   console.log(record, selected, selectedRows);
    // },
    // 全选
    // onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      <Button disabled>批量删除</Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
          rowSelection 复选框
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
        rowSelection={rowSelection}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 按钮的禁用效果

```tsx{171-195,249-255}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect, Key } from "react";
import { Card, Form, Input, Button, Table, Tooltip, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { reqGetHospitalList, reqRemoveHospital } from "@api/hospital/hospitalSet";
import type {
  HospitalList,
  HospitalItem,
} from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    /// 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型为单个医院数据
      render: (row: HospitalItem) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
                onClick={goUpdateHospital(row.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除医院">
              <Button
                className="hospital-btn"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={removeHospital(row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  // 删除医院
  const removeHospital = (id: number) => {
    return async () => {
      // 发送请求，只会删除服务器数据，客户端数据没变
      await reqRemoveHospital(id);
      message.success("删除医院成功");
      // 重新获取最新医院列表即可
      getHospitalList(current, pageSize);
    };
  };

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  // 跳转到修改医院组件
  // 需要传参就得用高阶函数形式
  const goUpdateHospital = (id: number) => {
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  // 选中的医院id列表数据
  const [selectedHospitalIds, setSelectedHospitalIds] = useState<Key[]>([]);

  // 复选框触发的事件
  const rowSelection = {
    // 全选&单选
    onChange: (
      selectedRowKeys: Key[],
      // selectedRows: HospitalList
    ) => {
      // selectedRowKeys 选中的当前元素key的值组成的数组（我们之前设置rowKey为id，所以实际获取的是当前元素的id）
      // selectedRows 选中的当前元素组成的数组

      // 设置选中的医院id列表
      setSelectedHospitalIds(selectedRowKeys);
    },
    // 单选
    // onSelect: (record: any, selected: any, selectedRows: any) => {
    //   console.log(record, selected, selectedRows);
    // },
    // 全选
    // onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      {/*
        selectedHospitalIds.length 如果为0，代表没有选中，就要禁用
        selectedHospitalIds.length 如果为1,2,3，代表有选中，就要不禁用
      */}
      <Button type="primary" danger disabled={!selectedHospitalIds.length}>
        批量删除
      </Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
          rowSelection 复选框
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
        rowSelection={rowSelection}
      />
    </Card>
  );
}

export default HospitalSet;
```

### 定义接口函数

```ts{3,52-59}
// src/api/hospital/hospitalSet.ts
import { request } from "@/utils/http";
import type { Key } from "react";
import type {
  reqGetHospitalListParams,
  reqGetHospitalListResponse,
  reqAddHospitalParams,
  reqUpdateHospitalParams,
  HospitalItem,
} from "./model/hospitalSetTypes";

// 获取医院列表
export const reqGetHospitalList = ({
  page,
  limit,
  hosname,
  hoscode,
}: reqGetHospitalListParams) => {
  // 查询才会有返回值
  return request.get<any, reqGetHospitalListResponse>(
    `/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode,
      },
    }
  );
};

// 添加医院
export const reqAddHospital = (data: reqAddHospitalParams) => {
  // 添加/更新/删除都没有返回值，返回值null
  return request.post<any, null>(`/admin/hosp/hospitalSet/save`, data);
};

// 修改医院
export const reqUpdateHospital = (data: reqUpdateHospitalParams) => {
  return request.put<any, null>(`/admin/hosp/hospitalSet/update`, data);
};

// 获取某个医院数据
export const reqGetHospital = (id: number) => {
  return request.get<any, HospitalItem>(`/admin/hosp/hospitalSet/get/${id}`);
};

// 删除医院
export const reqRemoveHospital = (id: number) => {
  return request.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`);
};

// 批量删除医院
export const reqBatchRemoveHospitalList = (idList: Key[]) => {
  return request.delete<any, null>(`/admin/hosp/hospitalSet/batchRemove`, {
    // 注意请求参数
    // 如果是post/put可以直接写参数，但是get/delete要携带body参数必须这样写
    data: idList,
  });
};
```

### 完成批量删除

```tsx{14,201-207,269}
// src/pages/hospital/hospitalSet/index.tsx
import React, { useState, useEffect, Key } from "react";
import { Card, Form, Input, Button, Table, Tooltip, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import {
  reqGetHospitalList,
  reqRemoveHospital,
  reqBatchRemoveHospitalList
} from "@api/hospital/hospitalSet";
import type {
  HospitalList,
  HospitalItem,
} from "@api/hospital/model/hospitalSetTypes";

import "./index.less";

function HospitalSet() {
  // loading
  const [loading, setLoading] = useState(false);
  // 定义医院列表数据和类型
  const [hospitalList, setHospitalList] = useState<HospitalList>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  // 封装公共请求函数
  const getHospitalList = async (page: number, limit: number) => {
    // 发送请求开启loading
    setLoading(true);
    // 读取表单数据
    const { hosname, hoscode } = form.getFieldsValue();
    // 发送请求携带上另外的参数
    const res = await reqGetHospitalList({ page, limit, hosname, hoscode });
    // 更新页码
    setCurrent(page);
    setPageSize(limit);
    // 更新总数
    setTotal(res.total);
    // 更新数据
    setHospitalList(res.records);
    // 请求完成结束loading
    setLoading(false);
  };

  // 一上来发送请求
  useEffect(() => {
    getHospitalList(current, pageSize);
    // 注意：依赖数组中不能有current, pageSize
    // 因为会导致请求发送两次
  }, []);

  // 点击查询按钮，触发的回调函数
  const onFinish = () => {
    getHospitalList(current, pageSize);
  };

  // 清空表单
  const reset = () => {
    // 清空表单内容
    form.resetFields([]);
    // 重新获取数据展示
    getHospitalList(1, 5);
  };

  // 列
  const columns = [
    {
      // 标题
      title: "序号",
      width: 70,
      align: "center" as "center",
      // 渲染什么数据
      // dataIndex写啥？看接口文档返回数据的格式，数据返回叫啥就写啥
      // 接口文档没有的就自己定义，保证唯一即可
      // dataIndex: "index",
      render: (_x: any, _y: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人手机",
      // 纯数据渲染直接dataIndex
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      // 固定在右侧
      // fixed: 'right', // 报错，会自动将类型推论为string
      fixed: "right" as "right", // 将类型断言为 'right' 字符串字面量类型就好
      width: 120,
      // 写了dataIndex就只能得到某个数据
      // 不写dataIndex，render方法就能接收到整行数据
      // 类型为单个医院数据
      render: (row: HospitalItem) => {
        return (
          <>
            <Tooltip placement="top" title="修改医院">
              <Button
                className="hospital-btn"
                type="primary"
                icon={<EditOutlined />}
                onClick={goUpdateHospital(row.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除医院">
              <Button
                className="hospital-btn"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={removeHospital(row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  // 删除医院
  const removeHospital = (id: number) => {
    return async () => {
      // 发送请求，只会删除服务器数据，客户端数据没变
      await reqRemoveHospital(id);
      message.success("删除医院成功");
      // 重新获取最新医院列表即可
      getHospitalList(current, pageSize);
    };
  };

  // 功能代码尽量放一起
  const navigate = useNavigate();

  // 跳转到添加医院组件
  const goAddHospital = () => {
    // navigate('/syt/hospital/hospitalSet/add', { replace: true }) // replace
    navigate("/syt/hospital/hospitalSet/add"); // push
  };

  // 跳转到修改医院组件
  // 需要传参就得用高阶函数形式
  const goUpdateHospital = (id: number) => {
    return () => {
      navigate(`/syt/hospital/hospitalSet/edit/${id}`);
    };
  };

  // 选中的医院id列表数据
  const [selectedHospitalIds, setSelectedHospitalIds] = useState<Key[]>([]);

  // 复选框触发的事件
  const rowSelection = {
    // 全选&单选
    onChange: (
      selectedRowKeys: Key[],
      // selectedRows: HospitalList
    ) => {
      // selectedRowKeys 选中的当前元素key的值组成的数组（我们之前设置rowKey为id，所以实际获取的是当前元素的id）
      // selectedRows 选中的当前元素组成的数组

      // 设置选中的医院id列表
      setSelectedHospitalIds(selectedRowKeys);
    },
    // 单选
    // onSelect: (record: any, selected: any, selectedRows: any) => {
    //   console.log(record, selected, selectedRows);
    // },
    // 全选
    // onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  };

  // 批量删除
  const batchRemoveHospitalList = async () => {
    await reqBatchRemoveHospitalList(selectedHospitalIds);
    message.success("批量删除成功");
    // 重新获取最新医院列表即可
    getHospitalList(current, pageSize);
  };

  return (
    <Card>
      {/* 头部表单和按钮组件 */}
      {/*
        Form 表单组件
          form={form} 通过Form.useForm()得到，最终可以操作Form实例对象，从而完成表单校验、清空等操作
          layout="inline" 表单项布局方式，内联（水平）布局
          onFinish={onFinish} 当按钮设置htmlType="submit"时，点击这个按钮就会触发onFinish，此时会对整个表单进行校验，通过了，才会执行onFinish函数

        Form.Item 单个表单项组件
          name 表单项名称，也是将来收集的表单数据名称
          rules 表单校验规则
            required 必填
          message 校验失败的错误信息
      */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hosname"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item
          // 将表单字段更新为请求参数对应的字段
          name="hoscode"
          // 不需要表单校验功能
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="hospitalSet-btn mb"
          >
            查询
          </Button>
          <Button onClick={reset}>清空</Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        className="hospitalSet-btn mb"
        onClick={goAddHospital}
      >
        添加
      </Button>
      {/*
        selectedHospitalIds.length 如果为0，代表没有选中，就要禁用
        selectedHospitalIds.length 如果为1,2,3，代表有选中，就要不禁用
      */}
      <Button
        type="primary"
        danger
        disabled={!selectedHospitalIds.length}
        onClick={batchRemoveHospitalList}
      >
        批量删除
      </Button>

      {/* 底部表格和分页器 */}
      {/*
        Table 表格组件
          columns 决定表格渲染几列
          dataSource 决定表格每一行渲染什么数据
          bordered 带边框
          scroll 滚动条
          rowKey="id" 遍历的key属性的值用id
          pagination 分页器设置
            current 当前页码
            pageSize 每页条数
            total 总数
            showQuickJumper 是否显示快速跳转
            showSizeChanger 是否显示每页条数
            showTotal 显示总数
            onChange 当前页码发送变化触发的事件
            onShowSizeChange 每页条数发送变化触发的事件
          loading 加载中
          rowSelection 复选框
      */}
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: getHospitalList,
          onShowSizeChange: getHospitalList,
        }}
        loading={loading}
        rowSelection={rowSelection}
      />
    </Card>
  );
}

export default HospitalSet;
```
