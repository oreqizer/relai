/**
 * @flow
 * @relayHash 1a2fe5d525711f13534126f5aedb92b4
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RootQueryResponse = {|
  +getTodos: $ReadOnlyArray<?{|
    +id: string;
    +text: string;
    +complete: boolean;
  |}>;
|};
*/


/*
query RootQuery(
  $author: String!
) {
  getTodos(author: $author) {
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
        "name": "author",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "author",
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
  "name": "RootQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "author",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "RootQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "author",
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
  "text": "query RootQuery(\n  $author: String!\n) {\n  getTodos(author: $author) {\n    id\n    text\n    complete\n  }\n}\n"
};

module.exports = batch;
