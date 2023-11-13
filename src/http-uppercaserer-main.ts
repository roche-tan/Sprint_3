import http from "http";
import map from "through2-map"; // provides a simple API to transform data in streams. Used to modify data chunks that flow through a stream.

export const createUppercaseServer = () => {
  return http.createServer(//creates a http server with http.createServer method
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method === "POST") { //check if it is POST request
        req
          .pipe(//pipe method. Takes the incoming request stream and pipe it from a stream to another
            map((chunk: string) => {
              return chunk.toString().toUpperCase(); //each chunk is converted to string and changed to uppercase
            })
          )
          .pipe(res); // res sent back to the client though pipe
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Método no permitido");
      }
    }
  );
};
