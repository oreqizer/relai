/**
 * @flow
 * @relayHash 5a31c389181f4b474ec34b2d6362a96f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodosQueryResponse = {|
  +todos: ?{| |};
|};
*/


/*
query TodosQuery(
  $user: String!
) {
  todos(author: $user) {
    ...TodoList_list
  }
}

fragment TodoList_list on TodoConnection {
  edges {
    node {
      ...TodoItem_item
      id
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
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "user",
            "type": "String!"
          }
        ],
        "concreteType": "TodoConnection",
        "name": "todos",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TodoList_list",
            "args": null
          }
        ],
        "storageKey": null
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
                    "name": "id",
                    "storageKey": null
                  },
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
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query TodosQuery(\n  $user: String!\n) {\n  todos(author: $user) {\n    ...TodoList_list\n  }\n}\n\nfragment TodoList_list on TodoConnection {\n  edges {\n    node {\n      ...TodoItem_item\n      id\n    }\n  }\n}\n\nfragment TodoItem_item on Todo {\n  id\n  text\n  complete\n}\n"
};

module.exports = batch;
