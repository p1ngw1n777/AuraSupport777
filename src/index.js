import { Markup, Telegraf } from 'telegraf';
import { configuration }  from './config.js';
import  { keyboards } from './keyboards.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";
import pkg from 'telegraf-session-local';
const LocalSession = pkg; // Поддержка для импорта CommonJS модуля

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bot = new Telegraf(configuration.telegramToken, {});
console.log('bot listing');
bot.use(new LocalSession({ database: 'session_db.json' }).middleware());

bot.telegram.setMyDescription('Добро пожаловать в бота Aura!\n' +
    'Тут ты сможешь познакомиться с брендом Aura.\n' +
    'Узнать условия для представителей и посмотреть ассортимент.')

let chatIdFromUser = null;
let locationUserInMenu;

bot.telegram.setMyCommands([
    {
      command: 'start', description: 'Начать'
    },
    {
        command: 'help', description: 'Помощь'
    },
    {
        command: 'menu', description: 'тест для страниц'
    }

], chatIdFromUser)


bot.start(async (ctx) => {
    chatIdFromUser = ctx.message.chat.id;
    console.log(`chat_id: ${chatIdFromUser}`);
    const sentMessage = await ctx.reply('Привет! Выберите одну из кнопок ниже:', keyboards.mainOptions);
    ctx.session.messageId = sentMessage.message_id;
    console.log('ID сообщения', ctx.session.messageId)
});

bot.help(async (ctx) => await ctx.reply('Вот список доступных команд:\n/start - Начать \n/help - Помощь\n/menu - Выход в главное меню'));

let idMessage;

bot.command('menu', async (ctx) => {
    idMessage = await ctx.reply('Вы вышли в главное меню', keyboards.mainOptions);
})
bot.command('pages', (ctx) => {
    const chatId = ctx.chat.id;
    userPages[chatId] = 0; // Начинаем с первой страницы

    const { text, keyboard } = getPageContent(userPages[chatId]);
    ctx.reply(text, keyboard);
});


bot.on('message', async (ctx) => {
    const text = ctx.text;
    const chatId = ctx.chat.id;
    const whoIsIt = ctx.from.first_name;
    try {
        if( text === 'Lash квесты') {
            const photoPath = path.resolve(__dirname, '../assets/img/tasks.jpeg');
            locationUserInMenu = 'Lash квесты';
            return ctx.replyWithPhoto(
                {
                    source: photoPath
                },
                {
                    caption: 'Уважаемые клиенты!🩵\n' +
                        '\n' +
                        'Участвуйте в Lash-квестах и получайте щедрые призы 🎁\n' +
                        'Узнать о квестах и получить приз можно по кнопке 👇🏻 \n' +
                        '\n' +
                        'AURA LASH | #INFO |#ВажнаяИнформация',
                    reply_markup: keyboards.tasksOptions.reply_markup
                })
        }
        else if( text === 'Поддержка') {
            // Получаем путь к текущему файлу и к каталогу
            const photoPath = path.resolve(__dirname, '../assets/img/support.jpeg');
            locationUserInMenu = 'Поддержка';
            console.log(whoIsIt)
            return ctx.replyWithPhoto(
                {
                    source: photoPath
                },
                {
                    caption: 'Уважаемые клиенты!🩵\n' +
                        '\n' +
                        'Чтобы связаться с службой заботы AURA LASH, нажмите на кнопку ниже!👇🏻 \n' +
                        '\n' +
                        'AURA LASH | #INFO | #ВажнаяИнформация',
                    reply_markup: keyboards.supportOptions
                }
            ).catch((error) => {
                console.error('Ошибка: ', error)
            })
        }
        else if (text === 'AURA LASH CLUB'){
            await ctx.reply('Перейти в чат AURA LASH CLUB', keyboards.chatOptions.reply_markup)
        }
        else if (text === 'группа'){
            await sendMessageToGroup(chatId, 'Тест успешен');
        }
        else if(text === 'О бренде') {
            const photoPath = path.resolve(__dirname, '../assets/img/brand.jpeg');
            locationUserInMenu = 'О бренде';
            return ctx.replyWithPhoto(
                {
                    source: photoPath
                },
                {
                    caption: 'Уважаемые клиенты!🩵\n' +
                        '\n' +
                        'Мы собрали всю информацию о бренде AURA LASH.\n' +
                        ' \n' +
                        'Познакомься с брендом прямо сейчас👇🏻\n' +
                        '\n' +
                        'AURA LASH | #INFO |\n' +
                        '#ВажнаяИнформация',
                    reply_markup: keyboards.brandOptions
                }
            ).catch((error) => {
                console.error('Ошибка: ', error)
            })
        }
        else if(text === 'Опт и представительство') {
            locationUserInMenu = 'Опт и представительство';

            return ctx.reply( 'У нас самые выгодные условия опта: \n' +
                'От 5 000 до 24 999 руб. - 10%;\n' +
                ' От 25 000 до 49 999 руб. - 20%;\n' +
                ' От 50 000 до 99 999 руб. - 30%;\n' +
                ' От 100 000 до 799 999 - 40%;\n' +
                ' Более 800 000 - 50%.', Markup.keyboard([{text: 'Назад'}]));
        }
        else if(text === 'Назад'){
            await ctx.reply('Ты вышел в главное меню', keyboards.mainOptions)
        }
        else {
           
        }
    }
    catch (error) {
        console.error(error);
    }
});

bot.hears('Опт и представительство', (ctx) => ctx.reply('Вы вошли в раздел Опт и представительство'));

async function sendMessageToGroup(chatId, message) {
    try {
        await bot.telegram.sendMessage(chatId, message);
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
}


bot.action('support', async (ctx) => {
    const photoPath = path.resolve(__dirname, '../assets/img/support.jpeg');
    locationUserInMenu = 'Поддержка';
    try {
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.replyWithPhoto(
            {
                source: photoPath
            },
            {
                caption: 'Уважаемые клиенты!🩵\n' +
                    '\n' +
                    'Чтобы связаться с службой заботы AURA LASH, нажмите на кнопку ниже!👇🏻 \n' +
                    '\n' +
                    'AURA LASH | #INFO | #ВажнаяИнформация',
                reply_markup: keyboards.supportOptions
            }
        ).catch((error) => {
            console.error('Ошибка: ', error)
        })
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения', ctx.session.messageId)
    }
    catch (error){
        console.error('Ошибка: ', error)
    }
})

bot.action('lash_quest',  async (ctx) => {
    const photoPath = path.resolve(__dirname, '../assets/img/tasks.jpeg');
    locationUserInMenu = 'Lash квесты';
    try {     
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.replyWithPhoto(
            {
                source: photoPath
            },
            {
                caption: 'Уважаемые клиенты!🩵\n' +
                    '\n' +
                    'Участвуйте в Lash-квестах и получайте щедрые призы 🎁\n' +
                    'Узнать о квестах и получить приз можно по кнопке 👇🏻 \n' +
                    '\n' +
                    'AURA LASH | #INFO |#ВажнаяИнформация',
                reply_markup: keyboards.tasksOptions.reply_markup
            }).catch((error) => {
                console.error('Ошибка: ', error)
            })
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения, которое будет удаленно: ', ctx.session.messageId);
    }
    catch (error){
        console.error('Ошибочка: ', error)
    }
})

bot.action('chatAura', async (ctx) => {
    try {
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.reply('Перейти в чат AURA LASH CLUB', keyboards.chatOptions.reply_markup);
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения, которое будет удаленно: ', ctx.session.messageId);
    }
    catch (error){
        console.error('Ошибка: ', error)
    }
})

bot.action('next_page', (ctx) => {
    const chatId = ctx.chat.id;
    const totalPages = Math.ceil(items.length / 3);
    if (userPages[chatId] < totalPages - 1) {
        userPages[chatId] += 1; // Переход на следующую страницу
    }
    const { text, keyboard } = getPageContent(userPages[chatId]);
    ctx.editMessageText(text, keyboard);
});

bot.action('files', async (ctx)=> {
    try { 
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.reply('Выбери одну из кнопок ниже 👇', keyboards.filesOptions)
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения, которое будет удаленно: ', ctx.session.messageId);
    } 
    catch(error){
        console.error('Ошибка: ', error)
    }
})

bot.action('presentation', async (ctx) => {
    const filePath = path.resolve(__dirname, '../assets/files/presentation.pdf');
    try { 
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.replyWithDocument({
            source: filePath
        },
        {
            caption: 'Презентация нашего бренда',
            reply_markup: keyboards.backOptions
        }
        )
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения, которое будет удаленно: ', ctx.session.messageId);
    } 
    catch(error){
        console.error('Ошибка: ', error)
    }
})

bot.action('price', async (ctx) => {
    const filePath = path.resolve(__dirname, '../assets/files/price.xlsx');
    try { 
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.replyWithDocument({
            source: filePath
        },
        {
            caption: 'Прайс',
            reply_markup: keyboards.backOptions
        }
        )
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения, которое будет удаленно: ', ctx.session.messageId);
    } 
    catch(error){
        console.error('Ошибка: ', error)
    }
})

bot.action('opt', async (ctx) => {
    const filePath = path.resolve(__dirname, '../assets/files/opt.pdf');
    try { 
        await ctx.deleteMessage(ctx.session.messageId);
        const sentMessage = await ctx.replyWithDocument({
            source: filePath
        },
        {
            caption: 'Прайс',
            reply_markup: keyboards.backOptions
        }
        )
        ctx.session.messageId = sentMessage.message_id;
        console.log('ID сообщения, которое будет удаленно: ', ctx.session.messageId);
    } 
    catch(error){
        console.error('Ошибка: ', error)
    }
})

bot.action('back', async (ctx) => {
    await ctx.deleteMessage(ctx.session.messageId);
    const sentMessage = await ctx.reply('Вы вышли в главное меню', keyboards.mainOptions)
    ctx.session.messageId = sentMessage.message_id;
    console.log('ID сообщения', ctx.session.messageId)
})

bot.action('test', async (ctx) => {
    await ctx.reply('В разработке', keyboards.mainOptions);
})

bot.action('task', async(ctx) => {
    await ctx.reply('Ты выбрал квест, но они ещё в разработке', keyboards.mainOptions)
})

// Обработчик кнопки "Назад"
bot.action('prev_page', (ctx) => {
    const chatId = ctx.chat.id;
    if (userPages[chatId] > 0) {
        userPages[chatId] -= 1; // Переход на предыдущую страницу
    }
    const { text, keyboard } = getPageContent(userPages[chatId]);
    ctx.editMessageText(text, keyboard);
});

bot.launch()