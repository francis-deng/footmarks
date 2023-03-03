const path = require('path');
const { NormalModuleReplacementPlugin } = require("webpack");

module.exports = {
    entry: './index.js', 
    mode: 'development',
    target: 'node',
    output:{
        filename:'footmarks.js',
        path:path.resolve(__dirname,'dist')
    },
    // 
    module:{
        rules:[
            {
                test: /\.js$/, // 
                loader: 'babel-loader',
                //include: __dirname,
                //exclude: /node_modules/                
            },
        ]
    },
    externals: {
        'sqlite3':'commonjs sqlite3' // const sqlite3 = require('fs-extra');
    }
    // plugins: [
    //     // Ignore knex runtime drivers that we don't use
    //     new NormalModuleReplacementPlugin(
    //       /mssql?|oracle(db)?|sqlite3|pg-(native|query)|pg|mysql/,
    //       "noop2"
    //     )
    // ],
};