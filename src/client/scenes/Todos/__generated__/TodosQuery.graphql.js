/**
 * @flow
 * @relayHash 923fcd5c1d723bd8057287fa8cf5b773
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodosQueryResponse = {|
  +todos: $ReadOnlyArray<?{| |}>;
|};
*/


/*
query TodosQuery(
  $user: String!
) {
  todos(author: $user) {
    ...TodoItem_item
    id
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
        "concreteType": "Todo",
        "name": "todos",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TodoItem_item",
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
        "concreteType": "Todo",
        "name": "todos",
        "plural": true,
        "selections": [
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
      }
    ]
  },
  "text": "query TodosQuery(\n  $user: String!\n) {\n  todos(author: $user) {\n    ...TodoItem_item\n    id\n  }\n}\n\nfragment TodoItem_item on Todo {\n  id\n  text\n  complete\n}\n"
};

module.exports = batch;
