import { callbackQuery } from "telegraf/filters";

export function getNavigationButtons(index, total) {
    if (index === 0) {
        // Первая фотография - показываем только кнопку "Вперёд"
        return {
            inline_keyboard: [
                [ { text: '➡️', callback_data: 'next_photo' }],
                [ { text: 'Оформить заказ 🛍', url: 'https://dominilash.ru/catalog/resnitsy/chernye/4107/?oid=7412'} ],
                [ { text: 'Назад', callback_data: 'brand'} ]
                
            ]
        };
    } else if (index === total - 1) {
        // Последняя фотография - показываем только кнопку "Назад"
        return {
            inline_keyboard: [
                [{ text: '⬅️', callback_data: 'back_photo' }],
                [ { text: 'Оформить заказ 🛍', url: 'https://dominilash.ru/catalog/resnitsy/chernye/4107/?oid=7412'} ],
                [ { text: 'Назад', callback_data: 'brand'} ]
            ]
        };
    } else {
        // На всех других фотографиях показываем обе кнопки
        return {
            inline_keyboard: [
                [
                    { text: '⬅️', callback_data: 'back_photo' },
                    { text: '➡️', callback_data: 'next_photo' }
                ],
                [ { text: 'Оформить заказ 🛍', url: 'https://dominilash.ru/catalog/resnitsy/chernye/4107/?oid=7412'} ],
                [ { text: 'Назад', callback_data: 'brand'} ]
            ]
        };
    }
}

export const keyboards = {
    tasksOptions: {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Начать выполнять квесты 💌', url: 'https://t.me/auraquest' }],
                [{ text: 'Назад', callback_data: 'back'}]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    },
    navigationOptions : {
        inline_keyboard: [
            [ { text: '⬅️', callback_data: 'back_photo'}, { text: '➡️', callback_data: 'next_photo'} ],
            [ { text: 'Оформить заказ 🛍', url: 'https://dominilash.ru/catalog/resnitsy/chernye/4107/?oid=7412'} ],
            [ { text: 'Назад', callback_data: 'brand'} ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    },
    chatOptions: {
        reply_markup: { 
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Чат AURA LASH CLUB', url: 'https://t.me/auralashru' }],
                    [{ text: 'Назад', callback_data: 'back'}]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
        }
    }
    },
    mainOptions: {
        reply_markup: {
            inline_keyboard: [
                [ {text: 'Lash квесты' , callback_data: 'lash_quest'}, { text: 'Поддержка', callback_data: 'support'} ],
                [ {text: 'AURA LASH CLUB', callback_data: 'chatAura'} ],
                [ {text: 'О бренде', callback_data: 'brand'} ]
                //[{ text: 'О бренде' }, { text: 'Опт и представительство' } ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    },
    brandOptions: {
        inline_keyboard: [
            [{text: 'Ресницы', callback_data: 'lashes'}, {text: 'Клей', callback_data: 'glue'}, {text: 'Препараты', callback_data: 'test'}],
            [{text: 'Перейти на сайт', url: 'https://dominilash.ru'}],
            [{text:  'Назад', callback_data: 'back'}]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
    saitOptions: {
        inline_keyboard: [
            [
                {
                    text: 'Перейти в поддержку',
                    url: 'https://dominilash.ru'
                }
            ]
        ]
    },
    supportOptions: {
        inline_keyboard: [
            [
                {
                    text: 'Перейти в поддержку',
                    url: 'https://t.me/aurahelp'
                }
            ],
            [{ text: 'Назад', callback_data: 'back'}]
        ]
    },
    backOptions: {
        inline_keyboard: [
            [{text:  'Назад', callback_data: 'back'}]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
    remove_keyboard: {
        reply_markup: JSON.stringify({
            remove_keyboard: true
        })
    }
}
