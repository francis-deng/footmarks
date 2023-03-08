
import express from 'express'
import filesValidator from './middlewares/filesValidator'

const router = express.Router();

// multiple files upload form(MFUF)
router.get("/mfuf", (req, res) => {
    let up = 'http://localhost:30001/tryit/mfuf/upload';
    let mfuf = `
    <html>

    <head>
        <title>multiple files upload form</title>
        <script>
            var files;

            var handleFileChange = (e)=>{
                console.log(e.files);
                files = e.files;
            }

            var uploadFiles = ()=>{
                if (!files) {
                    return;
                }

                var data = new FormData();
                data.append("myId", 911911);
                /*
                files.forEach((file,index)=>{
                    data.append("img"+index,file,file.name);
                });
                */
                for (var index=0;index<files.length;index++){
                    data.append("img"+index,files[index],files[index].name);
                }

                fetch("${up}", {
                    method: "POST",
                    body: data,
                })
                .then((data) => console.log(data))
                .catch((err)=>{
                  console.log("err: ",err)  
                });
            }
        </script>
    </head>
    
    <body>
        <div>
            <div>upload files:</div>
            <button id="bInput" onclick="uploadFiles()">upload files</button><p/>
            <input id="fInput" type="file" onchange="handleFileChange(this)" accept=”.png, .jpg, .jpeg” multiple/>
        </div>
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

                console.log({ status: "move success", path: path });
            })
        }

        res.end();
});

export default router;