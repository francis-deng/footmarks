
import db from '../db';

module.exports.allDiaries = (req, res) => {
    db.serialize(() => {
        db.all('SELECT * FROM diaries ORDER BY ts DESC', (err, rows) => {
            console.log(rows);
            res.send(rows);
        });
    });
}