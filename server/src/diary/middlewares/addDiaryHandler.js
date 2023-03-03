import db from '../db';

module.exports = (req, res) => {
    console.log(req.body);

    db.run(
        'INSERT INTO results (title,author,content,ts,weather,location,deivce,wc,img1,img2,img3) VALUES ($title,$author,$content,$ts,$weather,$location,$deivce,$wc,$img1,$img2,$img3)', {
            $title: req.body.title,
            $author: req.body.author,
            $content: req.body.content,
            $ts: req.body.ts, 
            $weather: req.body.weather,
            $location: req.body.location,
            $deivce: req.body.deivce,
            $wc: req.body.wc, 
            $img1: req.body.img1,
            $img2: req.body.img2,
            $img3: req.body.img3
        },
        (err) => {
            if (err) {
                res.redirect('/tournamentManagement');
            } else {
                res.redirect('/tournamentManagement');
            }
        }
    );
}