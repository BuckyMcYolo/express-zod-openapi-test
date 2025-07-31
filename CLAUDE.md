# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `pnpm dev` - Start development server with nodemon
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run compiled production build
- `pnpm clean` - Remove dist directory

### Database Commands

- `npx drizzle-kit generate` - Generate database migrations
- `npx drizzle-kit migrate` - Run database migrations
- `npx drizzle-kit studio` - Open Drizzle Studio for database management

### OpenAPI Documentation

- `pnpm generate:openapi` - Generate OpenAPI JSON specification
- `pnpm generate:openapi:yaml` - Generate OpenAPI YAML specification

## Architecture Overview

This is an Express.js REST API built with TypeScript, using a modern stack focused on type safety and developer experience.

### Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod for runtime type checking
- **Security**: Helmet for security headers, CORS enabled

### Project Structure

```
src/
├── app.ts          # Main Express application setup
├── db/
│   ├── index.ts    # Database connection and client
│   └── schema.ts   # Drizzle table schemas and Zod validators
├── routes/
│   ├── index.ts    # Route handlers (currently users)
│   └── users/      # User-specific routes (empty directory)
├── middleware/     # Custom middleware (empty)
└── types/          # TypeScript type definitions (empty)
```

### Database Architecture

- Uses Drizzle ORM with PostgreSQL
- Database connection via postgres.js client
- Snake case column naming convention
- Zod schemas auto-generated from Drizzle tables for validation
- Tables include automatic `created_at` and `updated_at` timestamps

### API Design Patterns

- Uses express-zod-api for type-safe API endpoints with automatic validation
- Endpoints defined with input/output schemas using Zod
- Consistent error handling with structured JSON responses
- RESTful endpoints following standard conventions
- Type-safe database operations with Drizzle

### Environment Configuration

- Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Optional `PORT` variable (defaults to 3000)
- Uses dotenv for environment variable loading

## Key Implementation Details

### Express-Zod-API Patterns

The project uses express-zod-api for type-safe endpoint definitions:

- Endpoints defined using `defaultEndpointsFactory.build()` with input/output schemas
- Automatic request validation and type inference
- Routes organized using `DependsOnMethod` for HTTP method routing
- Integrated with existing Express app using `attachRouting()`

### Database Patterns

- Use `db.select().from(table)` for queries
- Use `db.insert(table).values().returning()` for inserts
- Schema definitions export both Drizzle tables and Zod validators
- Insert schemas omit auto-generated fields (timestamps, IDs)

### Error Handling

- Global error middleware catches unhandled errors
- 404 handler for unknown routes
- Database errors logged to console and return 500 responses
