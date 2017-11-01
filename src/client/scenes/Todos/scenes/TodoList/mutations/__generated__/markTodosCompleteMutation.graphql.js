/**
 * @flow
 * @relayHash d161dca5e77ee5a64bb8d1cf74945c78
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type markTodosCompleteMutationVariables = {|
  input: {
    userId: string;
    complete: boolean;
    clientMutationId?: ?string;
  };
|};
export type markTodosCompleteMutationResponse = {|
  +markTodosComplete: ?{|
    +updatedTodos: $ReadOnlyArray<?{|
      +id: string;
      +complete: boolean;
    |}>;
    +user: {|
      +id: string;
      +countTodosComplete: number;
    |};
    +clientMutationId: ?string;
  |};
|};
*/


/*
mutation markTodosCompleteMutation(
  $input: MarkTodosCompleteInput!
) {
  markTodosComplete(input: $input) {
    updatedTodos {
      id
      complete
    }
    user {
      id
      countTodosComplete
    }
    clientMutationId
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkTodosCompleteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "markTodosCompleteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkTodosCompleteInput!"
          }
        ],
        "concreteType": "MarkTodosCompletePayload",
        "name": "markTodosComplete",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "updatedTodos",
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
                "name": "complete",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
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
                "name": "countTodosComplete",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "clientMutationId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "markTodosCompleteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkTodosCompleteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "markTodosCompleteMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkTodosCompleteInput!"
          }
        ],
        "concreteType": "MarkTodosCompletePayload",
        "name": "markTodosComplete",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "updatedTodos",
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
                "name": "complete",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
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
                "name": "countTodosComplete",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "clientMutationId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation markTodosCompleteMutation(\n  $input: MarkTodosCompleteInput!\n) {\n  markTodosComplete(input: $input) {\n    updatedTodos {\n      id\n      complete\n    }\n    user {\n      id\n      countTodosComplete\n    }\n    clientMutationId\n  }\n}\n"
};

module.exports = batch;
