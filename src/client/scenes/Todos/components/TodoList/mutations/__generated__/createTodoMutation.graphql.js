/**
 * @flow
 * @relayHash e696a9ca93a2359db6b35d9b6cf2fb36
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type createTodoMutationVariables = {|
  input: {
    author: string;
    text: string;
    complete: boolean;
    clientMutationId: string;
  };
|};
export type createTodoMutationResponse = {|
  +createTodo: ?{|
    +todoEdge: ?{|
      +cursor: string;
      +node: {|
        +id: string;
        +text: string;
        +complete: boolean;
      |};
    |};
    +clientMutationId: string;
  |};
|};
*/


/*
mutation createTodoMutation(
  $input: CreateTodoInput!
) {
  createTodo(input: $input) {
    todoEdge {
      cursor
      node {
        id
        text
        complete
      }
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
        "type": "CreateTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "createTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreateTodoInput"
          }
        ],
        "concreteType": "TodoPayload",
        "name": "createTodo",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoEdge",
            "name": "todoEdge",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              },
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
  "name": "createTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreateTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "createTodoMutation",
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
            "type": "CreateTodoInput"
          }
        ],
        "concreteType": "TodoPayload",
        "name": "createTodo",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoEdge",
            "name": "todoEdge",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              },
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
  "text": "mutation createTodoMutation(\n  $input: CreateTodoInput!\n) {\n  createTodo(input: $input) {\n    todoEdge {\n      cursor\n      node {\n        id\n        text\n        complete\n      }\n    }\n    clientMutationId\n  }\n}\n"
};

module.exports = batch;
