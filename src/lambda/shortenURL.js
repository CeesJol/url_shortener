import { gql } from "@apollo/client";
import client from "./utils";

export async function handler(event, context) {
  if (event.httpMethod === "POST") {
    // get data from POST request
    console.log(event);
    let long_url = JSON.parse(event.body).long_url;

    let SHORTEN_URL_QUERY = gql`
           mutation {
             createURL( data:{short_url: "${Math.random()
               .toString(36)
               .substring(7)}", long_url:"${long_url}"})
                       {
                           short_url
                           long_url
                       }
           }`;
    let results = await client.mutate({
      mutation: SHORTEN_URL_QUERY,
    });

    console.log(results.data.createURL.short_url);
    return {
      statusCode: 200,
      body: JSON.stringify({
        short_url: results.data.createURL.short_url,
      }),
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }
}
