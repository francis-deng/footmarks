import db from '../db';

module.exports = (req, res) => {
    console.log("go thru db process");

    // let params = {
    //     $title: req.body.title?req.body.title:'',
    //     $author: req.body.author?req.body.author:'',
    //     $content: req.body.content?req.body.content:'',
    //     $ts: req.body.ts?parseInt(req.body.ts):0, 
    //     $weather: req.body.weather?req.body.weather:'',
    //     $location: req.body.location?req.body.location:'',
    //     $deivce: req.body.deivce?req.body.deivce:'',
    //     $wc: req.body.wc?req.body.wc:'', 
    //     $img0: req.body.img0?req.body.img0:'',
    //     $img1: req.body.img1?req.body.img1:'',
    //     $img2: req.body.img2?req.body.img2:'' 
    // };
    let params = [
        req.body.title?req.body.title:"",
        req.body.author?req.body.author:"",
        req.body.content?req.body.content:"",
        req.body.ts?parseInt(req.body.ts):0, 
        req.body.weather?req.body.weather:"",
        req.body.location?req.body.location:"",
        req.body.deivce?req.body.deivce:"",
        req.body.wc?req.body.wc:"", 
        req.body.img0?req.body.img0:"",
        req.body.img1?req.body.img1:"",
        req.body.img2?req.body.img2:"" 
    ];    
    console.log(params);


    // db.run(
    //     'INSERT INTO diaries (title,author,content,ts,weather,location,deivce,wc,img0,img1,img2) VALUES ($title,$author,$content,$ts,$weather,$location,$deivce,$wc,$img0,$img1,$img2)', 
    //     params,
    //     (err) => {
    //         console.log(err);
    //     }
    // );
    db.run(
        'INSERT INTO diaries (title,author,content,ts,weather,location,deivce,wc,img0,img1,img2) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
        params,
        (err) => {
            console.log(err);
        }
    );    

    // console.log("all rows:");
    // db.serialize(() => {
    //     db.all('SELECT * FROM diaries ORDER BY ts DESC', (err, rows) => {
    //         console.log(rows);
    //     });
    // });
}