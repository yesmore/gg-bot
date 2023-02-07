# 唧唧 bot 小助手

使用 Nodejs 开发的 Telegram 机器人助手，部署在 Vercel

<!-- <table style="border:none">
<tr>
<td align='center'><img src='https://i.postimg.cc/C1zyDBZ8/deploy1.png'/></td>
<td align='center'><img src='https://i.postimg.cc/hjwk0Dx5/deploy2.png'/></td>
</tr>
</table> -->

## 本地调试

```
git clone https://github.com/yesmore/gg-bot.git
pnpm install
pnpm dev
```

## Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyesmore%2Fgg-bot&env=BOT_TOKEN&envDescription=Environment%20variables%20needed%20to%20setup%20notifier&envLink=https%3A%2F%2Fgithub.com%2Fyesmore%2Fgg-bot%23environment-variables&project-name=gg-bot&repo-name=gg-bot)

### 环境变量

将文件 `.env-sample` 重命名为 `.env`

| Name        | Description        | Example                                         |
| ----------- | ------------------ | ----------------------------------------------- |
| `BOT_TOKEN` | Telegram Bot Token | `0123456789:ZBX2mpx9Wjg4iqAs6izMKDXVgVV92dOA0a` |

## 示例机器人

Working here: [@akajs_bot](https://t.me/yesmore_cc)

## 参考资料

- [Telegram Bot Api](https://core.telegram.org/api)
- [telegraf: Telegram Bot Framework for Node.js](https://github.com/telegraf/telegraf)

## 开源许可

gg-bot is open source software licensed as [GPL](/LICENSE).
