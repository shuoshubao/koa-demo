import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import css from 'css'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

const readFile = path => new Promise((resolve, reject) => {
    fs.readFile(path, (e, data) => {
        if(e) {
            reject(e)
        }else {
            resolve(data)
        }
    })
})

router
.get('/', async(ctx, next) => {
    ctx.body = fs.readFileSync('./view/app7.html').toString()
})
.get('/:category/:title', async(ctx, next) => {
    console.log(ctx.params)

    const url = path.resolve(__dirname, 'docs', `${ctx.params.category}/${ctx.params.title}.md`)

    const ret = await readFile(url)

    // ctx.body = ctx.params
    ctx.body = ret.toString()
})
.post('/:category/:title', async(ctx, next) => {
    console.log(ctx.params)

    const url = path.resolve(__dirname, 'docs', `${ctx.params.category}/${ctx.params.title}.md`)

    const ret = await readFile(url)

    // ctx.body = ctx.params
    ctx.body = ret
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
