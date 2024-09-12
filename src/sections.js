import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sections = {
    section1: [
        path.resolve(__dirname, '../assets/img/lashes/lashes1.jpeg'),
        path.resolve(__dirname, '../assets/img/lashes/lashes2.jpeg'),
        path.resolve(__dirname, '../assets/img/lashes/lashes3.jpeg'),
        path.resolve(__dirname, '../assets/img/lashes/lashes4.jpeg'),
        path.resolve(__dirname, '../assets/img/lashes/lashes5.jpeg'),
        path.resolve(__dirname, '../assets/img/lashes/lashes6.jpeg'),
    ],
    section2: [
        path.resolve(__dirname, '../assets/img/glues/allGlues.jpeg'),
        path.resolve(__dirname, '../assets/img/glues/glueA.jpeg'),
        path.resolve(__dirname, '../assets/img/glues/glueU.jpeg'),
    ],
    section3: [
        path.resolve(__dirname, '../assets/img/preparations/booster/booster.jpeg'),
        path.resolve(__dirname, '../assets/img/preparations/booster/boosterAndCleaner.jpeg'),
        path.resolve(__dirname, '../assets/img/preparations/remover/remover1.jpeg'),
        path.resolve(__dirname, '../assets/img/preparations/remover/remover2.jpeg'),
        path.resolve(__dirname, '../assets/img/preparations/cleaner/boosterAndCleaner.jpeg'),
        path.resolve(__dirname, '../assets/img/preparations/cleaner/cleaner.jpeg'),
    ]
};
