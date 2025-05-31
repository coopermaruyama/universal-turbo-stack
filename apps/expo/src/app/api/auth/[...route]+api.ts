import { auth } from "~/lib/auth"; // import Better Auth handler
 
export const GET = (request: Request) => {
  console.log("GET request to auth handler");
  console.log("Request headers:", request.headers);
  console.log("Request URL:", request.url);
  console.log("Request method:", request.method);
	return auth.handler(request);
};

export const POST = (request: Request) => {
  console.log("POST request to auth handler");
  console.log("Request headers:", request.headers);
  console.log("Request URL:", request.url);
  console.log("Request method:", request.method);
	return auth.handler(request);
};