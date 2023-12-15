import 'dotenv/config';

export const env = {
    port: process.env.PORT || 3001,
    jwt_word: process.env.JWT_WORD,
    mongo: process.env.MONGO_URI,
    database: process.env.DATABASE_NAME,
}