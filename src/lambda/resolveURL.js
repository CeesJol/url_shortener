import { gql } from "@apollo/client";
import client from "./utils";

export async function handler(event, context) {
  let short_url = event.path.split("/", 5)[4];
  let RESOLVE_URL_QUERY = gql`
     query {
           findURLbyShortURL(short_url:"${short_url}"){
           long_url
       }
     }
   `;
  let results = await client.query({
    query: RESOLVE_URL_QUERY,
  });

  return {
    statusCode: 301,
    // send HTTP redirect headers (Location)
    headers: {
      Location: results.data.findURLbyShortURL.long_url,
    },
    body: results.long_url,
  };
}
