import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import cors from 'koa-cors'
import ejs from 'ejs'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import articleJSON from './data/article.json'

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors({
  origin: '*'
}))

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
    const str = await readFile('./view/app9.ejs')
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
.post('/api/getArticle', async(ctx, next) => {
    const url = path.resolve(__dirname, 'docs', `${ctx.request.body.category}/${ctx.request.body.title}.md`)
    const ret = await readFile(url)
    ctx.body = {
        errno: 0,
        essmsg: '',
        data: ret
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
