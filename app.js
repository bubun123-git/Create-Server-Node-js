const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/home") {
    fs.readFile("message.txt", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<html>\n");
        res.write("<head><title>Welcome Home</title></head>\n");
        res.write(`<body>
          <form action ="/message" method="POST"><input type = "text" name= "msg">
          <h1>${data}</h1>
          <button type="submit">Submit</button></form>
        </body>`);
        res.write("</html>");
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<html>\n");
        res.write("<head><title>Welcome Home</title></head>\n");
        res.write(`<body>
        <h1>${data}</h1>
          <form action ="/message" method="POST"><input type = "text" name= "msg">
          <button type="submit">Submit</button></form>
        </body>`);
        res.write("</html>");
        return res.end();
      }
    });
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      let msg = Buffer.concat(body).toString();
      msg = msg.split("=")[1];
      fs.writeFile("message.txt", msg, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      console.log(msg);
    });
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/home");
    return res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html>\n");
    res.write("<head><title>Welcome</title></head>\n");
    res.write(`<body>
      <h1>Welcome to About Us page</h1>
    </body>`);
    res.write("</html>");
    return res.end();
  } else if (url === "/node") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html>\n");
    res.write("<head><title>Welcome</title></head>\n");
    res.write(`<body>
      <h1>Welcome to my Node Js project</h1>
    </body>`);
    res.write("</html>");
    return res.end();
  } else {
    console.log(req.url, req.method, req.headers);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html>\n");
    res.write("<head><title>Hello World</title></head>\n");
    res.write("<body><h1>Hello from my Node.js</h1></body>\n");
    res.write("</html>\n");
    return res.end();
  }
});

server.listen(3000);
