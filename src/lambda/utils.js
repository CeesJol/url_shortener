import { ApolloClient, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';

const URL = 'https://graphql.fauna.com/graphql'

const client = new ApolloClient({
   uri: URL,
   fetch: fetch,
   headers: {
       authorization: `Bearer ${process.env.FAUNA_SECRET}`,
   },
   cache: new InMemoryCache({}),
 })

export default client;