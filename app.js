const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/home") {
    res.write("<html>\n");
    res.write("<head><title>Welcome Home</title></head>\n");
    res.write(`<body>
    <h1>Welcome Home</h1>
  </body>`);
    res.write("</html>");
    return res.end();
  } else if (url === "/about") {
    res.write("<html>\n");
    res.write("<head><title>Welcome</title></head>\n");
    res.write(`<body>
    <h1>Welcome to About Us page</h1>
  </body>`);
    res.write("</html>");
    return res.end();
  } else if (url === "/node") {
    res.write("<html>\n");
    res.write("<head><title>Welcome</title></head>\n");
    res.write(`<body>
    <h1>Welcome to my Node Js project
    </h1>
  </body>`);
    res.write("</html>");
    return res.end();
  }
  console.log(req.url, req.method, req.headers);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html>\n");
  res.write("<head><title>Hello World</title></head>\n");
  res.write("<body><h1>Hello from my Node.js</h1></body>\n");
  res.write("</html>\n");
  res.end();
});

server.listen(3000);
