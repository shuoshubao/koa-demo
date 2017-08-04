import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import css from 'css'
import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import onerror from 'koa-onerror'
import fetch from 'node-fetch'

const app = new Koa()
const router = new Router()

onerror(app, {
    // all: '',
    text: 'text',
    json: 'json',
    html: 'html',
    redirect: 'https://www.npmjs.com/package/koa-onerror'
})

app.use(koaBody())

const delayTime = () => new Promise((resolve, reject) => {
    const t1 = Date.now()
    setTimeout(() => {
        const t2 = Date.now()
        resolve(t2 - t1)
    }, 5e3)
})

router
.get('/', async(ctx, next) => {
    ctx.body = fs.readFileSync('./view/index.html').toString()
})
.post('/:category/:title', async(ctx, next) => {
    console.log(ctx.params)
    ctx.body = ctx.params
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
