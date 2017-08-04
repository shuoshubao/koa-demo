import fs from 'fs'
import path from 'path'
import css from 'css'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import fetch from 'node-fetch'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/', async(ctx, next) => {
    ctx.body = fs.readFileSync('./view/index.html').toString()
})

router.post('/', async(ctx, next) => {
    const {url} = ctx.request.body
    const data = await fetch(url).then(rs => rs.text())

    const cssText = css.stringify(css.parse(data), {
        indent: '  ',
        column: 4,
        compress: false
    })

    ctx.body = cssText
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
