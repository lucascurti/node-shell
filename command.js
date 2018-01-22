var fs = require("fs")

module.exports = {
    pwd:function () {
        process.stdout.write(process.env.PWD) 
    },
    date:function () {
        process.stdout.write(Date())
    },
    ls: function () {
        var files = fs.readdirSync('.')
        files.forEach(function(file) {
        process.stdout.write(file.toString()+"\t");
        })
    },
    echo: function(argumento){
        process.stdout.write(argumento)
    }
}




