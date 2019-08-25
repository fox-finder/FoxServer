
## API Document

语法释义：

```ts
Get '/path/:id' ({ param? }): <ResultDataType>
```

- `Get` method, 请求类型
- `'/path/:id'` route param, 路由及路由参数
- `({ param? })` query params | body, 请求参数或提交数据体，两者互斥
- `<ResultDataType>` result data type, 请求返回的数据类型

---

#### Root
  ```ts
  Get (): <APP_INFO>
  ```
