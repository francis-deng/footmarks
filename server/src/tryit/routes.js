
import express from 'express'
import filesValidator from './middlewares/filesValidator'

const router = express.Router();

// multiple files upload form(MFUF)
router.get("/mfuf", (req, res) => {
    let up = 'http://localhost:30000/tryit/mfuf/upload';
    let mfuf = `
    <html>

    <head>
    <title>multiple files upload form</title>
    </head>
    
    <body>
    <form method="POST" action="${up}" enctype="multipart/form-data" target="frameName">
        <input type="text" name="myId" value="9911911" /><p/>
        <input type="file" name="myFile" /><p/>
        <input type="file" name="myPicture" /><p/>
        <input type="file" name="myVideo" /><p/>
        <input type="submit" />
      </form>
      <iframe src="" frameborder="0" name="frameName"></iframe>
    </body>
    
    </html>`;

    res.send(mfuf);
  });

router.post('/mfuf/upload', 
    filesValidator(),
    (req,res,next) => {
        console.log(req.body.myId);
        //console.log(req.files);
        //console.log(req.files.myFile);
        //console.log(req.files.myPicture);
        //console.log(req.files.myVideo);

        let fields = Object.keys(req.files);
        let imgPath = process.env.IMAGES_PATH;
        for (const field of fields) {
            console.log(req.files[field]);
            let files = req.files;
            let path = imgPath+'/'+files[field].name;

            files[field].mv(path,(err)=>{
                if (err) {
                    return res.status(500).send(err);
                }

                console.log({ status: "success", path: path });
            })
        }

        res.end();
});

export default router;