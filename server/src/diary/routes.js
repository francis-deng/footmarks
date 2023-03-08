
import express from 'express';
import getDiariesHandler from './middlewares/getDiariesHandler';
import addDiaryHandler from './middlewares/addDiaryHandler';
import imagesHandler from './middlewares/imagesHandler';
import printBodyHandler from './middlewares/printBodyHandler';

const router = express.Router();

router.get('/list', getDiariesHandler.allDiaries);

router.get('/list/:id', (req,res,next)=>{
    res.send('list/:id\n');
});

//router.post('/new', require('./middlewares/imagesHandler'), ctrl.diariesCreate);
//router.post('/new', addDiaryHandler);
router.post('/new', imagesHandler,addDiaryHandler);

export default router;