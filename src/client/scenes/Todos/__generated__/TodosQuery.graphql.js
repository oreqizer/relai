/**
 * @flow
 * @relayHash 52ba9d7458e3239a2f84f9d2308021cf
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodosQueryResponse = {| |};
*/


/*
query TodosQuery(
  $user: String!
) {
  ...TodoList_list
}

fragment TodoList_list on Query {
  todos(author: $user, first: 100000) {
    edges {
      node {
        __typename
        id
        ...TodoItem_item
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment TodoItem_item on Todo {
  id
  text
  complete
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "user",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodosQuery",
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "TodoList_list",
        "args": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "TodosQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "user",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "TodosQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "user",
            "type": "String!"
          },
          {
            "kind": "Literal",
            "name": "first",
            "value": 100000,
            "type": "Int"
          }
        ],
        "concreteType": "TodoConnection",
        "name": "todos",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoEdge",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Todo",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "Todo",
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "text",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "complete",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "endCursor",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "user",
            "type": "String!"
          },
          {
            "kind": "Literal",
            "name": "first",
            "value": 100000,
            "type": "Int"
          }
        ],
        "handle": "connection",
        "name": "todos",
        "key": "TodoList_todos",
        "filters": []
      }
    ]
  },
  "text": "query TodosQuery(\n  $user: String!\n) {\n  ...TodoList_list\n}\n\nfragment TodoList_list on Query {\n  todos(author: $user, first: 100000) {\n    edges {\n      node {\n        __typename\n        id\n        ...TodoItem_item\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TodoItem_item on Todo {\n  id\n  text\n  complete\n}\n"
};

module.exports = batch;
