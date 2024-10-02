# PracticalTest

This project technical practice that can be executed using the `start.sh` script.

## Running the Projects

To run the projects, follow these steps:

1. Ensure you have nodejs v20 or above installed on your machine.
2. Open a git bash terminal in the root directory of the project.
3. Execute the following command:

```bash
bash start.sh 
```

This script will start all the required components of the project.

Open the project in the  http://localhost:5473/ when finished

## Potential Improvements

### Data Persistence
- Implement a SQL or NoSQL database for data persistence instead of in-memory storage.

### API Architecture
- Implement middlewares for cross-cutting concerns such as logging, error handling, and authentication.
- Develop controllers to handle request/response logic and route management.
- Create services to encapsulate business logic.
- Implement repositories for data access abstraction.

### SOLID Principles
- Apply SOLID principles, particularly the Dependency Inversion Principle, to create more modular and extensible code.
- Use dependency injection to decouple high-level modules from low-level modules.

### Testing
- Implement unit tests, integration tests, and end-to-end tests to ensure code quality and prevent regressions.

### Documentation
- Enhance API documentation using tools like Swagger/OpenAPI.
- Provide clear code comments and maintain up-to-date documentation for each component.

### Containerization
- Consider using Docker to containerize the application, ensuring consistency across different environments.
