# 实验室预约管理系统

## 前端部分-基于vue实现
```
前端开发工具：vscode
前后端解耦开发，这里实现前端部分
```

### 项目实现功能
```
完成一个允许教师灵活预约课程实验时间的实验室预约系统。
```
## 角色

```
实验室管理员:
实验室管理，添加实验室，实验室编号，机器数量，描述(机器配置等)
教师管理，教师信息的增删该改查

教师:
课程实验管理，添加课程名称，学生数量，学时数
实验室预约
```

## 需求与设计

```
系统需登陆使用。登陆成功，返回token，每次请求携带，路由至主组件。
必须拦截未登录请求，路由至登陆组件。登陆功能可后期添加。
实验时间先占先得。

教师创建若干实验课程，基于课程预约。
加载实验室时，过滤掉数量小于课程学生数实验室。
```

