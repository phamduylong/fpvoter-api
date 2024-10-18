import {Request, Response, Router} from 'express';

const router = Router();

router.get('/:emoji?', (req: Request, res: Response)=>{
    const emoji : string | null = req.params.emoji || "";
    let resultEmoji : string;
    switch (emoji) {
        case "eggplant":
            resultEmoji = "🍆";
            break;
        case "nerd":
            resultEmoji = "🤓";
            break;
        case "poop":
            resultEmoji = "💩";
            break;
        case "ghost":
            resultEmoji = "👻";
            break;
        case "heart":
            resultEmoji = "❤️";
            break;
        case "star":
            resultEmoji = "⭐";
            break;
        default:
            resultEmoji = "🎄";
            break;
    }
    return res.status(200).send(resultEmoji);
});

export default router;