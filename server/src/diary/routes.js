
import express from 'express';
import getDiariesHandler from './middlewares/getDiariesHandler';

const router = express.Router();

router.get('/list', getDiariesHandler.allDiaries);

router.get('/list/:id', (req,res,next)=>{
    res.send('list/:id\n');
});

//router.post('/new', require('./middlewares/imagesHandler'), ctrl.diariesCreate);

export default router;