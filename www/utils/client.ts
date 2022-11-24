import { ExchangeIO, createClient } from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { withUrqlClient } from "next-urql";

import {
  ExchangeInput,
  defaultExchanges,
  subscriptionExchange,
} from "@urql/core";
import { headers } from "./constants";

const isSSR = typeof window === "undefined";
const connectParams = () =>
  isSSR
    ? {
        headers: {
          [headers.HASURA_SECRET]: process.env.HASURA_ADMIN_SECRET as string,
        },
      }
    : {};

const wsClient = () =>
  createWSClient({
    url: (process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string).replace(
      "http",
      "ws"
    ),
    connectionParams: connectParams,
  });

const noopExchange =
  ({ forward }: ExchangeInput): ExchangeIO =>
  (operations$) =>
    forward(operations$);

const subscribeOrNoopExchange = () =>
  isSSR
    ? noopExchange
    : subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient().subscribe(operation, sink),
          }),
        }),
      });

const clientConfig = {
  url: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
  fetchOptions: connectParams,
  exchanges: [...defaultExchanges, subscribeOrNoopExchange()],
};

export const client = createClient(clientConfig);

export default withUrqlClient((ssrExchange) => ({
  ...clientConfig,
  ssrExchange,
}));
