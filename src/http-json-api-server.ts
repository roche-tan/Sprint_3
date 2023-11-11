import http from "http";
import url from "url";

const port = process.argv[2];

const parseTime = (time: Date) => {
  return { //returns an object with 3 properties
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  };
};

const unixTime = (time: Date) => {
  return { unixtime: time.getTime() };
};

const parseQuery = (urlParsed: url.UrlWithParsedQuery) => {
  if (urlParsed.pathname === "/api/parsetime") {
    return parseTime(new Date(urlParsed.query.iso as string));
  } else if (urlParsed.pathname === "/api/unixtime") {
    return unixTime(new Date(urlParsed.query.iso as string));
  } else {
    return "Enter a valid endpoint";
  }
};

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === "GET") {
      const parsedUrl = url.parse(req.url as string, true); //true makes analise the chain and it transforms it in an object. If the second argument is mited, the data would be sent raw ie "name=John&age=30" instead of 'John', age: '30'.It makes it easier to access the values

      const result = parseQuery(parsedUrl);

      res.writeHead(200, { "Content-Type": "application/json" }); // applies code 200 (ok) and a indicates that the content of the response is of type JSON.
      res.end(JSON.stringify(result)); //converts it to a JSON string adn sends it as a response
    } else {
      res.writeHead(400);
      res.end();
    }
  }
);

server.listen(port);
