
import diary_router from './src/diary/routes'
import tryit_router from './src/tryit/routes'




export default (app) => {
    const MOD = process.env.MODULE;

    console.log('loading module: ',MOD);
    if (MOD=='diary') {
        app.use('/diary', diary_router);
        // process.on('SIGINT', ()=>{
        //     require('./src/diary/clean')();
        //     console.log('Got SIGINT. Press Control-D/Control-C to exit.');
        // });
    } else if (MOD=='tryit') {
        app.use('/tryit', tryit_router);
    } else {
        app.use('*', (req,res)=>{
            res.status(400).end();
        });
    }
};