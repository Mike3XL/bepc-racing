# Task: Maven Multi-Module Project Scaffold

## Description
Create the Maven multi-module project structure for bepc-racing. This establishes the build system and module layout that all subsequent tasks build on.

## Background
The project has 4 modules: core (Java library), cli (command-line tool), api (Lambda functions), infra (CDK). Web is a static site and doesn't need a Maven module.

## Technical Requirements
1. Root `pom.xml` defining parent and modules: core, cli, api, infra
2. Each module has its own `pom.xml` with appropriate dependencies
3. Java 17, Maven 3.x
4. `core` module: no AWS dependencies
5. `cli` module: depends on `core`
6. `api` module: depends on `core`, includes AWS Lambda SDK
7. `infra` module: AWS CDK (TypeScript or Java — prefer Java for consistency)
8. Standard Maven directory layout in each module (`src/main/java`, `src/test/java`)

## Dependencies
- Java 17
- Maven 3.x
- Jackson (JSON): `com.fasterxml.jackson.core:jackson-databind`
- JUnit 5 for tests
- AWS Lambda SDK (api module): `com.amazonaws:aws-lambda-java-core`
- AWS CDK (infra module)

## Implementation Approach
1. Create root pom.xml with `<modules>` and shared dependency management
2. Create each module directory and pom.xml
3. Add placeholder `App.java` or `package-info.java` in each module to confirm build works
4. Verify `mvn compile` succeeds from root

## Acceptance Criteria

1. **Build succeeds**
   - Given the project root
   - When `mvn compile` is run
   - Then all modules compile without errors

2. **Module structure correct**
   - Given the project root
   - When listing directories
   - Then core/, cli/, api/, infra/ exist each with src/main/java and src/test/java

3. **Dependencies resolve**
   - Given the pom files
   - When `mvn dependency:resolve` is run
   - Then all dependencies download without errors

## Metadata
- **Complexity**: Low
- **Labels**: scaffold, maven, java
- **Required Skills**: Java, Maven
