import express, {Express, Request, Response} from 'express';
import emojiRouter from './routes/emojiRoutes';
const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Merry Christmas 🎄🎅');
});

app.use('/emojis', emojiRouter);

app.listen(port, ()=> {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});

export default app;