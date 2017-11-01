/**
 * @flow
 * @relayHash 8b40337518be999f07ceb3c13712a7a1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type clearCompleteTodosMutationVariables = {|
  input: {
    userId: string;
    clientMutationId?: ?string;
  };
|};
export type clearCompleteTodosMutationResponse = {|
  +clearCompleteTodos: ?{|
    +deletedTodoIds: $ReadOnlyArray<?string>;
    +user: {|
      +id: string;
      +countTodos: number;
      +countTodosComplete: number;
    |};
    +clientMutationId: ?string;
  |};
|};
*/


/*
mutation clearCompleteTodosMutation(
  $input: ClearCompleteTodosInput!
) {
  clearCompleteTodos(input: $input) {
    deletedTodoIds
    user {
      id
      countTodos
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
        "type": "ClearCompleteTodosInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "clearCompleteTodosMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "ClearCompleteTodosInput!"
          }
        ],
        "concreteType": "ClearCompleteTodosPayload",
        "name": "clearCompleteTodos",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoIds",
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
                "name": "countTodos",
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
  "name": "clearCompleteTodosMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "ClearCompleteTodosInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "clearCompleteTodosMutation",
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
            "type": "ClearCompleteTodosInput!"
          }
        ],
        "concreteType": "ClearCompleteTodosPayload",
        "name": "clearCompleteTodos",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoIds",
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
                "name": "countTodos",
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
  "text": "mutation clearCompleteTodosMutation(\n  $input: ClearCompleteTodosInput!\n) {\n  clearCompleteTodos(input: $input) {\n    deletedTodoIds\n    user {\n      id\n      countTodos\n      countTodosComplete\n    }\n    clientMutationId\n  }\n}\n"
};

module.exports = batch;
