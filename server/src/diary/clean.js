
module.exports = ()=>{
    require('./db').close(err=>{
        console.log("Getting error when closing table: " + err);
        process.exit(1);
    });
}