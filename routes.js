const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<span>It's home page</span>");
    res.write(`
      <form action="/message" method="POST">
        <input type="text" name='message' id="message">
        <button type="submit">Submit</button>
      </form> 
    `);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      fs.writeFileSync("message.txt", message);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.write("<span>It's not home page</span>");
  return res.end();
  //   process.exit(); // This will stop the server
};

module.exports = requestHandler; // Exporting the function
