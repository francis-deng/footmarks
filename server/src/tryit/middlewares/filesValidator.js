
export default () => {
    return (req,res,next) => {
        if (req.files) {
            next();
        } else {
            res.status(400).send('');
        }
    }
}