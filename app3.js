import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import css from 'css'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
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

app.use(bodyParser())

router.get('/', async(ctx, next) => {
    ctx.body = fs.readFileSync('./view/index.html').toString()
})

router.post('/', async(ctx, next) => {
    const {url} = ctx.request.body
    const data = await fetch(url).then(rs => rs.text())

    let responseText

    try{
        responseText = css.stringify(css.parse(data), {
            indent: '  ',
            column: 4,
            compress: false
        })
    }catch(e) {
        // console.log(chalk.red(e))
        // console.log(typeof e)
        // responseText = e
        responseText = {
            '行': e.line,
            '列': e.column,
            '原因': e.reason
        }
        responseText = [
            `行: ${e.line}`,
            `列: ${e.column}`,
            `原因: ${e.reason}`,
        ].join('\n')
        /*responseText = {
            name:
        }*/
    }


    ctx.body = responseText
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
