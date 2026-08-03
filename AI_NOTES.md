# AI Usage Notes

1. AI-generated vs Self-written

I used ChatGPT as a learning assistant to understand Express.js concepts, REST API design, project structure, middleware, validation, and automated testing.

The final implementation, debugging, integration of controllers, routes, services, file handling, and testing were completed by me with AI guidance.


2. What I validated and changed

I verified all generated code by:

- Testing every endpoint using Postman.
- Writing Jest and Supertest test cases.
- Debugging routing issues.
- Fixing CommonJS and UUID compatibility.
- Improving HTTP status codes.
- Adding validation middleware.
- Refactoring API routes to use query parameters for filtering.


3. AI suggestions I chose not to use

I chose not to convert the project to ES Modules after understanding that CommonJS was simpler and more suitable for this assignment.

I also chose to keep JSON file storage instead of introducing a database because the assignment specifically allowed local file storage.