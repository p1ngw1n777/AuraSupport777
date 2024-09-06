
export const keyboards = {
    tasksOptions: {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Квест 1', callback_data: 'task' }, {text: 'Квест 2', callback_data: 'task' }],
                [{text:  'Квест 3', callback_data: 'task'}],
                [{text: 'Назад', callback_data: 'Назад'}],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    },
    //lol

    mainOptions: {
        reply_markup: {
            keyboard: [
                [{ text: 'Lash квесты' }, { text: 'Поддержка' } ],
                [{ text: 'О бренде' }, { text: 'Опт и представительство' } ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    },
    brandOptions: {
        // inline_keyboard: [
        //     [
        //         {
        //             text: 'Перейти на сайт', callback_data: 'Перейти на сайт', url: 'https://dominilash.ru'
        //         }
        //     ]
        // ],
        inline_keyboard: [
            [{text: 'Ресницы', callback_data: 'test'}, {text: 'Клей', callback_data: 'test'}, {text: 'Препараты', callback_data: 'test'}],
            [{text: 'Перейти на сайт', url: 'https://dominilash.ru'}],
            [{text:  'Назад', callback_data: 'Назад'}]
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
        ]
    },
    backOptions: JSON.stringify({
        keyboard: [
            {
                text: 'Назад',
                callback_data: 'Назад'
            }
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }),
    remove_keyboard: {
        reply_markup: JSON.stringify({
            remove_keyboard: true
        })
    }
}