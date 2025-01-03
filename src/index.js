const Parser = require('rss-parser');
const tg = require('./controller/telegram');
const parser = new Parser();
const url = 'https://en.cryptonomist.ch/feed/';
let init = 0

async function read (url){
    try {
        const feed = await parser.parseURL(url);
        return {
            length: feed.items.length,
            title: feed.title,
            items: feed.items
        }
    } catch (error) {
        console.error(`Errore nella lettura del feed: ${error.message}`);
    }
}

const currentTitles = Array();
function start(lenght = 0) {
    setTimeout(async() => {
        if(init === 0){
            init = 1
            start()
        } else {
            const dataFeeds = await read(url);
            start(dataFeeds.items[0]);
            dataFeeds.items.forEach((item, index) => {
            if (currentTitles.includes(item.title)) {
                return;
            }  else {
                currentTitles.push(item.title);
                tg.sendMessage(process.env.TELEGRAM_CHAT_ID, `
<b>${item.title}</b>\n
${item.content}\n
<a href="${item.link}">${item.link}</a>\n
                    `, item.link);

            }
        })
        }
    }, 10000);
}

start();