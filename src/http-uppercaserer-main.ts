import http from "http";
import map from "through2-map";

export const createUppercaseServer = () => {
  return http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method === "POST") {
        req
          .pipe(
            map((chunk: string) => {
              return chunk.toString().toUpperCase();
            })
          )
          .pipe(res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Método no permitido");
      }
    }
  );
};