import fs from 'fs'
import path from 'path'
// import querystring from 'querystring'
const querystring = require('querystring')
import chalk from 'chalk'
import ejs from 'ejs'
import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'

import articleJSON from './data/article.json'

const app = new Koa()
const router = new Router()

app.use(koaBody())

const readFile = path => new Promise((resolve, reject) => {
    fs.readFile(path, (e, data) => {
        if(e) {
            reject(e)
        }else {
            resolve(data.toString())
        }
    })
})

router
.get('/', async(ctx, next) => {
    const str = await readFile('./view/app8.ejs')
    const ret = ejs.render(str, {
        articleJSON
    })
    ctx.body = ret
})
.post('/api/getArticleList', async(ctx, next) => {
    ctx.body = {
        errno: 0,
        essmsg: '',
        data: articleJSON[ctx.request.body.category]
    }
})
.post('/docs/:category/:title', async(ctx, next) => {
    const url = path.resolve(__dirname, 'docs', `${ctx.params.category}/${ctx.params.title}.md`)
    const ret = await readFile(url)
    ctx.body = ret
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
