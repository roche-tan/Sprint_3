import http from "http"; //module to create hhtp
import url from "url"; //module to analize request urls

const parseTime = (time: Date) => {
  // configures date time to return object with 3 properties
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  };
};

const unixTime = (time: Date) => {
  //configures time to unix time
  return { unixtime: time.getTime() };
};

export const createHttpServer = () => {
  const parseQuery = (urlParsed: url.UrlWithParsedQuery) => {
    //process entry requests
    if (urlParsed.pathname === "/api/parsetime") {
      // if url is /api/parsetime returns parseTime
      return parseTime(new Date(urlParsed.query.iso as string));
    } else if (urlParsed.pathname === "/api/unixtime") {
      //if url is /api/unixtime returns unixTime"
      return unixTime(new Date(urlParsed.query.iso as string));
    } else {
      return "Enter a valid endpoint";
    }
  };

  const server = http.createServer(
    // create server
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method === "GET") {
        const parsedUrl = url.parse(req.url as string, true); //url is a module. parse to get the url of the request as a string. true is used to convert it to object so the values are accessible

        const result = parseQuery(parsedUrl);

        if (typeof result === "string") {
          //if is a string, it is not valid
          res.writeHead(400, { "Content-Type": "application/json" }); //content sent is in jason format
          res.end(JSON.stringify({ error: "Invalid endpoint" }));
        } else {
          //in this case an object (parseTime and unixTime)
          res.writeHead(200, { "Content-Type": "application/json" });//content sent is in jason format
          res.end(JSON.stringify(result));
        }
      } else {
        res.writeHead(400);
        res.end();
      }
    }
  );
  return server;
};
