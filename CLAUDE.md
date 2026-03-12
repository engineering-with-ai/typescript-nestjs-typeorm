## Methodologies
### Implementation Methodology
When presented with a request YOU MUST:
1. Use context7 mcp server or websearch tool to get the latest related documentation. Understand the API deeply and all of its nuances and options
2. Use TDD Approach: Figure out how to validate that the task is complete and working as expected. Whether using a CLI tool like curl, or ssh command or writing unit/integration test
3. Start with the simplest happy path test. The test should fail on `unimplemented!()|raise NotImplemented| throw Error("Not Implmented")`. Scaffold out all functions (including full signature) with this body 
4. See the test fail with not implemented error.
5. Make the smallest change possible
6. Take time to think through the most optimal order of operations for implementation
7. Check if tests and `(npm |cargo cmd | uv run) checks` passes
8. Repeat step 5-6 until the test passes
9. You MUST NOT move on until tests pass

### Debugging Methodology

#### Phase I: Information Gathering

1. Understand the error
2. Read the relevant source code: try local `.venv`, `node_modules` or `$HOME/.cargo/registry/src/`
3. Look at any relevant github issues for the library

#### Phase II: Testing Hypothesis
4. Develop a hypothesis that resolves the root cause of the problem. Must only chase root cause possible solutions.  Think hard to decide if its root cause or NOT.
5. Add debug logs to determine hypothesis
6. If not successful, YOU MUST clean up any artifact or code attempts in this debug cycle. Then repeat steps 1-5

#### Phase III: Weigh Tradeoffs
7. If successful and fix is straightforward. Apply fix
8. If not straightforward, weigh the tradeoffs and provide a recommendation



## 🧱 Code Structure & Modularity
- **Follow SOLID Principles***
- **Never Break Up nested Values:** When working with a value that is part of a larger
  structure or has a parent object, always import or pass the entire parent structure
  as an argument. Never extract or isolate the nested value from its parent context.
- **Write Elegant Code** Write the most minimal code to get the job done
- **Get to root of the problem** Never write hacky workarounds. You are done when the tests pass 
- **Never create a file longer than 200 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Use cfg.yml file for config variable. You MUST NOT add config vars to env files.**
- **Use template-secrets.env file to keep track of the list of secrets:**
- **Use environment variables for secrets** Do NOT conflate secrets with config variables
- **Keep it generic class/type names: TimeseriesClient instead of TimeScaleClient**
- **Use Generics Judiciously:** Remember, while generics are powerful, they can also make code more complex if
  overused. Always consider readability and maintainability when deciding whether to
  use generics. If the use of generics doesn't provide a clear benefit in terms of
  code reuse, type safety, or API design, it might be better to use concrete types
  instead.

### 🧪 Testing & Reliability
- **Fail fast, fail early**: Detect errors as early as possible and halt execution. Rely on the runtime or system to handle the error and provide a stack trace.  You MUST NOT write random error handling for no good reason.
- **Unit Tests should be colocated in `src/`**
- **Integration Tests** should be located in `tests/`
- **Use AAA (Arrange, Act, Assert) pattern for tests**:
  - **Arrange**: Set up the necessary context and inputs.
  - **Act**: Execute the code under test.
  - **Assert**: Verify the outcome matches expectations.
- **Use testcontainers for integration tests** — spin up real databases/services in Docker, session-scoped for performance

## 💅 Style
- **Constants in code:** Write top level declarations in SCREAMING_SNAKE_CASE.

### 📚 Documentation & Explainability
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `Reason:` comment** explaining the why, not just the what.
- **Write concise document comments for primarily for an LLM to consume, secondarily for a document generator to consume**


## TypeScript Anti-Bias Guidelines 🌊

### TypeScript-Specific Anti-Bias Rules

- **No `any`:** The `any` type is NEVER ALLOWED. Use `unknown` for truly unknown types and narrow with type guards.
- **No implicit `any`:** All function parameters and return types MUST be explicitly typed
  - NOT: `function process(data) { ... }`
  - CORRECT: `function process(data: UnprocessedData): ProcessedItem[] { ... }`
- **No type assertions to bypass safety:** Avoid `as` casts unless absolutely necessary
- **Prefer interfaces/types over inline object shapes** for reusable structured data

### TypeScript Testing Guidelines
- **Use actual/expected semantics:** `assert.strictEqual(actual, expected)`

### TypeScript Patterns
- **Prefer pattern matching:** Use ts-pattern library for structural matching
- **Prefer validated types:** Use Zod, nestjs-zod, or Yup for runtime validation
- **Prefer functional programming:** Use map/filter/reduce for transforming arrays
- **Use template literals** for string formatting
- **Use const assertions** for immutable data: `as const`

### Advanced Types
- **Const enums for compile-time constants:**: 
   ```typescript
      const enum Status { PENDING, SUCCESS, ERROR }
   ```

- **Readonly and const assertions**: Use readonly and as const to make data immutable:
   ```typescript
   const config = {
     apiUrl: 'https://api.example.com',
     timeout: 5000,
   } as const;
   ```

- **Never type for exhaustive checking**: 

   ```typescript
   function assertNever(x: never): never {
     throw new Error("Unexpected object: " + x);
   }
   ```

- **Write concise JSDoc comments for an llm to consume:**

  ```typescript
  /**
   * Calculates basic statistics for numeric data.
   * @param data Array of numbers to analyze
   * @returns Stats object with statistical metrics
   * @throws Error if array is empty or contains no valid numbers
   * @example calculateStats([1, 2, 3]) // {mean: 2, median: 2, ...}
   */
  export function calculateStats(data: number[]): Stats {
  ```


## NestJS Project Guidelines 😺

### Example Resource
- **Use the `example/` resource** as a reference when creating new resources. It demonstrates the module-controller-service pattern.

### Validation & Documentation
- **Use nestjs-zod for validation** and automatic OpenAPI generation
- **Document with OpenAPI decorators** - `@ApiTags()`, `@ApiOperation()`, `@ApiResponse()`
- **Generate JSON schemas from Zod schemas** for consistent validation
- **Set up Swagger documentation** in main.ts bootstrap

### Testing Patterns
- **Use `.test.ts` suffix** instead of `.spec.ts` for test files
- **Test with NestJS Testing utilities:** `Test.createTestingModule()`
- **Use supertest for integration tests** in separate test files






