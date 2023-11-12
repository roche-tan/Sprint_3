import http from "http";
import url from "url";

const parseTime = (time: Date) => {
  return {
    //returns an object with 3 properties
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  };
};

const unixTime = (time: Date) => {
  return { unixtime: time.getTime() };
};

export const createHttpServer = () => {
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
        const parsedUrl = url.parse(req.url as string, true);

        const result = parseQuery(parsedUrl);

        if (typeof result === "string") {
          // Ruta no válida
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid endpoint" }));
        } else {
          // Ruta válida
          res.writeHead(200, { "Content-Type": "application/json" });
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
