import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core'
import { z } from 'zod'

const PostV1UsersPost_Body = z
  .object({
    key: z.string().min(1),
    user: z
      .object({
        name: z.string().min(1).max(255),
        age: z.number().int().gte(0).lte(9007199254740991),
        email: z
          .string()
          .max(255)
          .regex(
            /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
          )
          .email(),
        createdAt: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
          .datetime({ offset: true })
          .optional(),
        updatedAt: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
          .datetime({ offset: true })
          .optional(),
      })
      .passthrough(),
  })
  .passthrough()
const PatchV1UserIdPatch_Body = z
  .object({
    key: z.string().min(1),
    data: z
      .object({
        name: z.string().min(1).max(255),
        age: z.number().int().gte(0).lte(9007199254740991),
        email: z
          .string()
          .max(255)
          .regex(
            /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
          )
          .email(),
        createdAt: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
          .datetime({ offset: true }),
        updatedAt: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
          .datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
  })
  .passthrough()
const PostV2UsersPost_Body = z
  .object({
    key: z.string().min(1),
    name: z.string().min(1).max(255),
    age: z.number().int().gte(0).lte(9007199254740991),
    email: z
      .string()
      .max(255)
      .regex(
        /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
      )
      .email(),
    createdAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
      .datetime({ offset: true })
      .optional(),
    updatedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
      .datetime({ offset: true })
      .optional(),
  })
  .passthrough()
const PostV2TodosPost_Body = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().optional(),
    completed: z.boolean().optional().default(false),
    createdAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
      .datetime({ offset: true })
      .optional(),
    updatedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z?$/)
      .datetime({ offset: true })
      .optional(),
  })
  .passthrough()

export const schemas = {
  PostV1UsersPost_Body,
  PatchV1UserIdPatch_Body,
  PostV2UsersPost_Body,
  PostV2TodosPost_Body,
}

const endpoints = makeApi([
  {
    method: 'delete',
    path: '/v1/user/:id/delete',
    alias: 'DeleteV1UserIdDelete',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({ message: z.string() }),
    }),
    errors: [
      {
        status: 400,
        description: `DELETE /v1/user/:id/delete Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/user/:id/get',
    alias: 'GetV1UserIdGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        user: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          name: z.string(),
          age: z.number(),
          email: z
            .string()
            .regex(
              /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
            )
            .email(),
        }),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `GET /v1/user/:id/get Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'head',
    path: '/v1/user/:id/get',
    alias: 'HeadV1UserIdGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `HEAD /v1/user/:id/get Negative response`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'patch',
    path: '/v1/user/:id/patch',
    alias: 'PatchV1UserIdPatch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `PATCH /v1/user/:id/patch Request body`,
        type: 'Body',
        schema: PatchV1UserIdPatch_Body,
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        user: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          name: z.string(),
          age: z.number(),
          email: z
            .string()
            .regex(
              /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
            )
            .email(),
        }),
        message: z.string(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `PATCH /v1/user/:id/patch Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/users/get',
    alias: 'GetV1UsersGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().gte(1).lte(100).optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().gte(0).optional().default(0),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        users: z.array(
          z.object({
            id: z.number(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            name: z.string(),
            age: z.number(),
            email: z
              .string()
              .regex(
                /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
              )
              .email(),
          }),
        ),
        count: z.number(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `GET /v1/users/get Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'head',
    path: '/v1/users/get',
    alias: 'HeadV1UsersGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().gte(1).lte(100).optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().gte(0).optional().default(0),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `HEAD /v1/users/get Negative response`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/users/post',
    alias: 'PostV1UsersPost',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `POST /v1/users/post Request body`,
        type: 'Body',
        schema: PostV1UsersPost_Body,
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        user: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          name: z.string(),
          age: z.number(),
          email: z
            .string()
            .regex(
              /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
            )
            .email(),
        }),
        message: z.string(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `POST /v1/users/post Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'delete',
    path: '/v2/todo/:id/delete',
    alias: 'DeleteV2TodoIdDelete',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({ message: z.string() }),
    }),
    errors: [
      {
        status: 400,
        description: `DELETE /v2/todo/:id/delete Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'get',
    path: '/v2/todo/:id/get',
    alias: 'GetV2TodoIdGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        todo: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          title: z.string(),
          description: z.union([z.string(), z.null()]),
          completed: z.boolean(),
        }),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `GET /v2/todo/:id/get Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'head',
    path: '/v2/todo/:id/get',
    alias: 'HeadV2TodoIdGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `HEAD /v2/todo/:id/get Negative response`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'put',
    path: '/v2/todo/:id/put',
    alias: 'PutV2TodoIdPut',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `PUT /v2/todo/:id/put Request body`,
        type: 'Body',
        schema: PostV2TodosPost_Body,
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        todo: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          title: z.string(),
          description: z.union([z.string(), z.null()]),
          completed: z.boolean(),
        }),
        message: z.string(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `PUT /v2/todo/:id/put Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'get',
    path: '/v2/todos/get',
    alias: 'GetV2TodosGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().gte(1).lte(100).optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().gte(0).optional().default(0),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        todos: z.array(
          z.object({
            id: z.number(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            title: z.string(),
            description: z.union([z.string(), z.null()]),
            completed: z.boolean(),
          }),
        ),
        count: z.number(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `GET /v2/todos/get Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'head',
    path: '/v2/todos/get',
    alias: 'HeadV2TodosGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().gte(1).lte(100).optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().gte(0).optional().default(0),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `HEAD /v2/todos/get Negative response`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v2/todos/post',
    alias: 'PostV2TodosPost',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `POST /v2/todos/post Request body`,
        type: 'Body',
        schema: PostV2TodosPost_Body,
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        todo: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          title: z.string(),
          description: z.union([z.string(), z.null()]),
          completed: z.boolean(),
        }),
        message: z.string(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `POST /v2/todos/post Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'get',
    path: '/v2/user/:id/get',
    alias: 'GetV2UserIdGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        user: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          name: z.string(),
          age: z.number(),
          email: z
            .string()
            .regex(
              /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
            )
            .email(),
        }),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `GET /v2/user/:id/get Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'head',
    path: '/v2/user/:id/get',
    alias: 'HeadV2UserIdGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.number().int().gt(0).lte(9007199254740991),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `HEAD /v2/user/:id/get Negative response`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v2/users/get',
    alias: 'GetV2UsersGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().gte(1).lte(100).optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().gte(0).optional().default(0),
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        users: z.array(
          z.object({
            id: z.number(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            name: z.string(),
            age: z.number(),
            email: z
              .string()
              .regex(
                /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
              )
              .email(),
          }),
        ),
        count: z.number(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `GET /v2/users/get Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
  {
    method: 'head',
    path: '/v2/users/get',
    alias: 'HeadV2UsersGet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'key',
        type: 'Query',
        schema: z.string().min(1),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().gte(1).lte(100).optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().gte(0).optional().default(0),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `HEAD /v2/users/get Negative response`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v2/users/post',
    alias: 'PostV2UsersPost',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `POST /v2/users/post Request body`,
        type: 'Body',
        schema: PostV2UsersPost_Body,
      },
    ],
    response: z.object({
      status: z.string(),
      data: z.object({
        user: z.object({
          id: z.number(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          name: z.string(),
          age: z.number(),
          email: z
            .string()
            .regex(
              /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
            )
            .email(),
        }),
        message: z.string(),
      }),
    }),
    errors: [
      {
        status: 400,
        description: `POST /v2/users/post Negative response`,
        schema: z.object({
          status: z.string(),
          error: z.object({ message: z.string() }),
        }),
      },
    ],
  },
])

export const api = new Zodios(endpoints)

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options)
}
