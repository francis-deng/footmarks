
import app from './app'
const PORT = process.env.PORT || process.env.port;


const server = app.listen(PORT, ()=>{
    console.log('server is running on port,' + server.address().port);
});