const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '565809761:AAHCp3VK2hQ41TvjJFKYWUtboMxCfWCsB_c';

const _ = require('lodash');
const fs = require('fs');

const bot = new TelegramBot(TOKEN, {
    polling: true
});

const BT = {
    cat_pic: 'Выбрать картинку',
    cat_cute: 'Котик',
    car: 'Машинка',
    back: 'Cancel'
}

const PicsSRC = {
        [BT.car]: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg'
        ],

        [BT.cat_cute]: [
            'cat1.jpg',
            'cat2.jpg',
            'cat3.jpg',
            'cat4.jpg',
            'cat5.jpg'
        ],    
}

bot.onText(/\/start/, msg => {    
    const text = `Приветствую ${msg.from.first_name}\n Что вы хотите сделать?`;

    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: [
                [BT.cat_pic]
            ]
        }
    })
});

bot.on('message', msg => {
    switch (msg.text) {
        case BT.cat_pic:
            SendPictureScreen(msg.chat.id);
        break;

        case BT.cat_cute:
        case BT.car:
            SendPictureByName(msg.chat.id, msg.text);
        break;

        case BT.back:
        bot.sendMessage(msg.chat.id, `Что вы хотите сделать?`, {
            reply_markup: {
                keyboard: [
                    [BT.cat_pic]
                ]
            }
        })
        break;
    }
});

function SendPictureScreen(chatID) {
    bot.sendMessage(chatID, 'Выберите картинку', {
        reply_markup: {
            keyboard: [
                [BT.cat_cute, BT.car],
                [BT.back]
            ]
        }
    })
}

function SendPictureByName(chatID, picName) {
    const srcs = PicsSRC[picName];
    const src = srcs[_.random(0, srcs.length - 1)];
    bot.sendMessage(chatID, `Загружаю...`);
    fs.readFile(`${__dirname}/pics/${src}`, (error,picture) => {
        if (error) throw new Error(error);
        bot.sendPhoto(chatID, picture);
    })
}