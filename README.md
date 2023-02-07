# 唧唧 bot

使用 Nodejs 开发的 Telegram 机器人助手，部署在 Vercel

## 本地调试

```
git clone https://github.com/yesmore/gg-bot.git
pnpm install
pnpm dev
```

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyesmore%2Fgg-bot&env=BOT_TOKEN&envDescription=Environment%20variables%20needed%20to%20setup%20notifier&envLink=https%3A%2F%2Fgithub.com%2Fyesmore%2Fgg-bot%23environment-variables&project-name=gg-bot&repo-name=gg-bot)

### Environment variables 环境变量

将文件 `.env-sample` 重命名为 `.env`

| Name        | Description        | Example                                         |
| ----------- | ------------------ | ----------------------------------------------- |
| `BOT_TOKEN` | Telegram Bot Token | `0123456789:ZBX2mpx9Wjg4iqAs6izMKDXVgVV92dOA0a` |

## Demo

Working here: [@akajs_bot](https://t.me/yesmore_cc)

## LICENSE

gg-bot is open source software licensed as [GPL](/LICENSE).
