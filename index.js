const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

http.createServer((req , res) => {
    const myUrl = new URL('http://localhost:5000' + req.url)
    console.log(req.url)

    switch (myUrl.pathname) {        
        case "api/assests":
            let data = require("./storage/books.json")
            switch(req.method){
                case 'GET':
                    res.writeHead(200 , 'application/json')
                    res.end(JSON.stringify(data))
                    break;
                case 'POST':
                    let addedData = {}
                    myUrl.searchParams.forEach((value , key) => {
                        addedData[key] = value
                    })
                    data = [...data , addedData]
                    fs.writeFileSync("storage/books.json", JSON.stringify(data))
                    res.writeHead(200 , 'application/json')
                    res.end('Added Succefuly')
                break;
                default:
                    res.end('Request Method Not Support')
            }
            res.end()
        break;
        default:
            
            // Build file path
            let filepath = path.join(
                __dirname ,
                "public",
                myUrl.pathname === "/" ? "index.html" : myUrl.pathname
            )

            // Extension of a file
            let extname = path.extname(filepath)
            
            // Intial content type
            let contentType  = "text/html" //+ extname.slice(2)

            // Check for content type
            switch (extname) {
                case ".css":
                    contentType = "text/css"
                    break;
                case ".js":
                    contentType = "text/javascript"
                    break;
                case ".json":
                    contentType = "application/json"
                    break;
                case ".png":
                    contentType = "image/png"
                    break;
                case ".jpg":
                    contentType = "imgae/jpg"
                    break;
                case ".jpeg":
                    contentType = "image/jpeg"
                    break;
                case ".svg":
                    contentType = "imgae/svg+xml" // image/svg is wrong no affichage !! Important
                    break;
                    case ".pdf":
                        contentType = "application/pdf"
                        break;
            }

            // Check if contentType is text/html but no .html file extension
            if(contentType == "text/html" && extname == "") filepath += ".html"

            fs.readFile(filepath , (err, content) => {
                if(err) {
                    if(err.code == "ENOENT"){
                        // Page not found 
                        fs.readFile(path.join(__dirname , "public" , "404.html") , (err , content) => {
                            if(err) throw err
                            console.log('request for page : 404.html')
                            res.writeHead(404 , {'Content-Type' : 'text/html'})
                            res.end(content , "utf8")
                    })
                }else
                {
                    // Some server error
                    res.writeHead(500)
                    res.end(`Server Error : ${err.code}`)
                }
            }
            else{
                // Success
                res.writeHead(200 , { "Content-Type" : contentType})
                res.end(content , "utf8")
            }
        })
        break;
    }


}).listen(5000, () => console.log("Object Runnig at port 5000"))