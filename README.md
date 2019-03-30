# koa-qrcode
一个基于 `koa` 和 [`qrcode`](https://github.com/soldair/node-qrcode) 库实现的二维码生成工具, 可以简单的通过链接和参数,就能控制二维码的尺寸、边距、背景颜色以及二维码颜色

## 启动方式
- `npm i` 安装依赖包
- `npm run start` 启动服务
- 在浏览器中打开: [http://localhost:9527](http://localhost:9527)

## API
- `data` 二维码内容, 必传递参数, 不传会报错
    - 使用案例: http://localhost:9527?data=koa-qrcode
- `size` 二维码大小, 非必传参数, 不传递会根据内容自动生成合适大小的二维码
    - 使用案例: http://localhost:9527?data=koa-qrcode&size=120
- `margin` 二维码边距, 非必传参数, 默认为 `4`
    - 使用案例: http://localhost:9527?data=koa-qrcode&size=120&margin=1
- `dark` 二维码颜色设置, 非必传项, 默认值为: `#0000ff`
    - 使用案例: http://localhost:9527?data=koa-qrcode&size=120&margin=1&dark=ff6000
    - 注意: 颜色值传递的时候不需要加上 `#`
- `light` 二维码背景设置, 非必传项, 默认值为: `#FFFFFF`
    - 使用案例: http://localhost:9527?data=koa-qrcode&size=120&margin=1&dark=ff6000&light=ff9999
    - 注意: 颜色值需要比 `dark` 的值要更高才会有作用
