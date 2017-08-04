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

router.get('/', async(ctx, next) => {
    ctx.body = fs.readFileSync('./view/index.html').toString()
})

router.post('/', async(ctx, next) => {
    const time = await delayTime()

    console.log(chalk.green(`耗时 = ${time} ms`))

    ctx.body = {
        '耗时': time
    }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
