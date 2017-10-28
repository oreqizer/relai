/**
 * @flow
 * @relayHash 3e6d8f39a3af48377d5067a56a5ed682
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodosQueryResponse = {|
  +getTodos: $ReadOnlyArray<?{|
    +id: string;
    +text: string;
    +complete: boolean;
  |}>;
|};
*/


/*
query TodosQuery(
  $user: String!
) {
  getTodos(author: $user) {
    id
    text
    complete
  }
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
        "name": "getTodos",
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
        "name": "getTodos",
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
    ]
  },
  "text": "query TodosQuery(\n  $user: String!\n) {\n  getTodos(author: $user) {\n    id\n    text\n    complete\n  }\n}\n"
};

module.exports = batch;
