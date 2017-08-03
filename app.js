import fs from 'fs'
import path from 'path'
import css from 'css'
import Koa from 'koa'
import koaBody from 'koa-body'
import fetch from 'node-fetch'

const app = new Koa()
app.use(koaBody())

/*app.use(ctx => {
    const data = fs.readFileSync('./package.json')
    // ctx.body = 'Hello World'
    // ctx.body = __dirname
    ctx.body = data.toString()
})*/



/*app.use(async (ctx, next) => {
    const data = await fetch('http://shuoshubao.github.io/package.json').then(rs => rs.text())
    ctx.body = data
})*/

app.use(async (ctx, next) => {
    // const url = 'http://shuoshubao.github.io/package.json'
    // const url = 'https://raw.githubusercontent.com/shuoshubao/shuoshubao.github.io/master/webpack/webpack.config.babel.js'
    // const url = 'https://raw.githubusercontent.com/shuoshubao/shuoshubao.github.io/master/webpack/webpack.config.babel.js'
    // const url = 'http://orn2bxyo7.bkt.clouddn.com/app_abc8e.css'
    // const url = 'https://raw.githubusercontent.com/shuoshubao/shuoshubao.github.io/master/build/vendor.9a525b26ca3537f4bf89.js'
    // const url = 'http://www.meituan.com/'
    // console.log(ctx)
    // console.log(Object.keys(ctx))
    // console.log()

    if(ctx.request.method === 'GET') {
        ctx.body = fs.readFileSync('./view/index.html').toString()
    }else {
        const {url} = ctx.request.body
        const data = await fetch(url).then(rs => rs.text())

        const cssText = css.stringify(css.parse(data), {
            indent: '  ',
            column: 4,
            compress: false
        })

        ctx.body = cssText
    }
})

app.listen(3000)
