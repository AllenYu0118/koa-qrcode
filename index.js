const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const route = require('koa-route')
const serve = require('koa-static')
const onerror = require('koa-onerror');
var QRCode = require('qrcode')

const app = new Koa()

onerror(app)

const staticPath = serve(path.join(__dirname, 'public'));

// With async/await
const generateQR = async (text, options) => {
    return await QRCode.toDataURL(text, options)
}

const qrcode = async ctx => {
    const query = ctx.query // 查询参数
    if (!query.data) {
        console.log('请传递data数据')
    }

    let { size, margin, scale, dark, light } = query

    return await generateQR(query.data, {
        width: size,
        margin,
        scale,
        color: {
            dark,
            light
        }
    })
}


const logger = async (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next()
}

app.use(logger)
app.use(route.get('/', async (ctx, next) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./public/index.html');
}))

app.use(route.get('/qrcode', async (ctx, next) => {
    let url = await qrcode(ctx)
    ctx.response.type = 'png'
    ctx.response.body = Buffer.from(url.split(',')[1], 'base64')
}))


app.use(staticPath)

app.listen(9527, () => {
    console.log(`服务已开启, 端口 9527, https:localhost:9527`)
})