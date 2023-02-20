# 发送请求流程

## 查看接口文档

> [戳我查看接口文档](/intro/3.html)

此时我们需要掌握一下内容：

![接口文档](/imgs/project/1.png)

![接口文档](/imgs/project/2.png)

## 对/测试接口

可以使用 postman 对接口进行详细测试。

测试接口的目的：为了确定请求参数有哪些，在哪写，接口功能，接口返回值情况。

## 接口参数说明

- path：说明参数是地址参数

```ts
// 其中1和10就是请求参数
request.get("/user/list/1/10");
```

- query：说明参数是查询字符串参数

```ts
// query参数位于params
request.get("/user/list", { params: { page: 1, limit: 10 } });
```

- body：说明参数是请求体参数

```ts
// 如果是post/put请求:
request.post("/user/login", { username: "admin", password: "111111" });
// 如果是get/delete请求:
request.delete("/user/login", { data: { username: "admin", password: "111111" } });
```

## 定义接口函数

来到 api 目录下定义接口函数

发送请求的函数：request

- 定义接口函数

```ts
import { request } from "@/utils/http";

// 登录
// 请求参数的类型也需要定义
export const reqLogin = (username: string, password: string) => {
  // <any, string>的第一个类型为any即可，实际不会用上
  // 第二个类型是返回值数据中data的类型，根据接口文档填写
  return request.post<any, string>("/user/login", {
    username,
    password,
  });
};

// 查询用户信息
export const reqGetInfo = () => {
  // 返回值类型简单直接写
  // 返回值类型复杂就需要单独定义
  return request.get<any, GetInfoResponse>("/user/info");
};
```

- 定义接口函数返回值数据类型

```ts
export interface GetInfoResponse {
  name: string;
  avatar: string;
  routes: string[];
  buttons: string[];
}
```

## 组件引入使用

```ts
import { reqLogin } from "@api/user/index.ts";
```
