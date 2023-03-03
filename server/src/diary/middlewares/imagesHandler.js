
export default () => {
    return (req,res,next) => {
        if (req.files) {
            let fields = Object.keys(req.files);
            let imgPath = process.env.IMAGES_PATH;

            let imgPostfix = 1;
            for (const field of fields) {
                console.log(req.files[field]);
                let files = req.files;
                let img = files[field];
                let path = imgPath+'/'+img.name;
    
                img.mv(path,(err)=>{
                    if (err) {
                        return res.status(500).send(err);
                    }
    
                    console.log({ status: "success", path: path });
                });
                req.body['img'+imgPostfix] = img.name;
                imgPostfix++;
            }            

            next();
        } else {
            res.status(400).send('');
        }
    }
}

