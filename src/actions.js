import { captions } from './captions.js';
import { sections } from './sections.js';
import  { getNavigationButtons } from './keyboards.js'

export async function sendInfoAboutProducts(ctx, sectionPromise) {
    try {
        await ctx.deleteMessage(ctx.session.messageId);
        ctx.session.photoIndex = 0;
        ctx.session.section = sectionPromise;
        const section = ctx.session.section;
        const caption = captions[section];
        const sentMessage = await ctx.replyWithPhoto(
            { source: sections[ctx.session.section][ctx.session.photoIndex]} ,
            { 
                caption: caption,
                reply_markup: getNavigationButtons(ctx.session.photoIndex, sections[ctx.session.section].length)
            }
        );
        ctx.session.messageId = sentMessage.message_id;
    }
    catch (error){
        console.error('ОшибОЧКА: ', error)
    }
}