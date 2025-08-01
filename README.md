# Full-Stack Developer Assessment: Clique Loque Application

This repository contains a full-stack application developed as a technical assessment for a selection process. The project serves as a practical demonstration of modern web development principles, featuring a backend built with **Fastify** and **Prisma** architected around **Domain-Driven Design (DDD)** principles, and a responsive frontend powered by **React** and **TypeScript**.

This project's primary goal is to showcase the ability to design, implement, and reflect upon a complex, feature-rich application from the ground up.

## Core Technologies

### Backend

  - **Runtime:** Node.js with `tsx` for live TypeScript execution.
  - **Framework:** Fastify
  - **ORM:** Prisma
  - **Architecture:** Domain-Driven Design (DDD)
  - **Language:** TypeScript

### Frontend

  - **Framework:** React (with Vite)
  - **Language:** TypeScript
  - **Styling:** Styled-components, TailwindCSS, Shadcn
  - **Routing:** React Router DOM
  - **Form Management:** React Hook Form

## Getting Started

To run the application, both the server and the client must be initiated.

1.  **Start the Backend Server:**
    Navigate to the `/server` directory and execute:

    ```bash
    npm run dev
    ```

    The API will be available at `http://localhost:3333`.

2.  **Start the Frontend Application:**
    Navigate to the `/cliqueloque-app` directory and execute:

    ```bash
    npm run dev
    ```

    The client application will be available at `http://localhost:5173`.

Once both services are running, you can interact with the application through the client URL.

-----

## Backend Architecture (API)

The API was designed using Domain-Driven Design (DDD) to ensure a clean separation of concerns and a focus on the core business logic.

### Directory Structure

```text
server
├── prisma/            # Prisma schema and migrations
├── src/
│   ├── application/   # Application logic & Use Cases (Commands)
│   ├── database/      # Prisma client instance
│   ├── domain/        # Core business logic (Entities, Value Objects)
│   ├── infrastructure/# Technical details (Repositories)
│   ├── interfaces/    # External communication (API Controllers)
│   ├── utils/         # Helper functions
│   └── server.ts      # Fastify server setup
└── temp/
    └── uploads/       # Directory for file uploads
```

### Layer-by-Layer Explanation

  - **`domain`**: The heart of the application. It contains the core business logic, rules, and concepts.
      - **Entities**: `Company` and `Contract`, which have a unique identity that persists over time, even as their properties change.
      - **Value Objects**: `ContractInfo` and `ReceiptNote`, which are defined by their attributes and are immutable.
  - **`application`**: Orchestrates the interaction between the domain and infrastructure layers, representing the system's use cases. The `commands` define the concrete actions the API can perform.
  - **`infrastructure`**: Implements the technical details, such as database access. The `repositories` provide a persistence layer using Prisma, making the application agnostic to the data source. Swapping the ORM or database would only require changes in this layer.
  - **`interfaces`**: Defines how the system communicates with the outside world. The `controllers` use Fastify to define and manage REST endpoints.
  - **`temp/uploads`**: Serves as the storage directory for file uploads from the frontend.

### API Endpoints

The following REST endpoints are implemented:

#### Company Routes (`/companies`)

  - `POST /`: Creates a new company.
  - `GET /`: Retrieves all companies.
  - `GET /:id`: Retrieves a single company by its database ID.
  - `GET /cnpj/:cnpj`: Retrieves a single company by its CNPJ.

#### Contract Routes (`/contracts`)

  - `POST /`: Creates a new contract.
  - `GET /:companyId`: Retrieves all contracts for a specific company.
  - `GET /contract/:contractId`: Retrieves a single contract by its ID.

#### Contract Info Routes (`/contract-infos`)

  - `POST /`: Creates detailed information for a contract.
  - `GET /just-contract/:contractId`: Returns only the core info of a contract.
  - `GET /contract-info-plus-receipt-notes/:contractId`: Returns contract info including associated receipt notes.

#### Receipt Note Routes (`/uploads`)

  - `POST /:contractInfoId`: Uploads a receipt note file for a contract.
  - `DELETE /:receiptNoteId`: Deletes a specific receipt note.
  - `GET /download/:receiptNoteId`: Downloads a specific receipt note file.

-----

## Frontend Architecture

The frontend is a Single Page Application (SPA) built with React, leveraging modern tools for a robust and maintainable user experience.

  - **Component-Based Architecture**: The UI is built using reusable React components.
  - **Strong Typing**: TypeScript is used throughout the project to reduce runtime errors and improve developer experience.
  - **Hybrid Styling Strategy**: A combination of **TailwindCSS** for utility-first styling, **Styled-components** for encapsulated component styles, and **Shadcn** for a library of unstyled, accessible components.
  - **Client-Side Routing**: Handled by **React Router DOM**.
  - **Advanced Form Management**: Complex forms are managed using **React Hook Form**.

### Key Screens

1.  **Login Screen**: Authenticates users based on a valid and registered company CNPJ. Includes backend validation to check for both the validity and existence of the CNPJ.
2.  **Contracts Dashboard**: Displays all contracts associated with the authenticated company. Provides distinct interactions for active vs. closed contracts.
3.  **Fiscal Data Form**: A detailed form for submitting fiscal information related to a contract. Features custom input formatting (currency, numbers) and controlled components for a refined UX.

-----

## Architectural Decisions & Reflections

This project was an opportunity to not only implement features but also to make pragmatic architectural decisions and reflect on technology choices.

### Backend Reflections

  - **Pragmatic DDD Implementation**: As this was my first deep dive into DDD, I consciously placed some foundational business rules within the **Application Layer** (`commands`) to expedite development within the project's timeframe. I recognize that in a long-term, large-scale system, this logic would be migrated to the **Domain Layer** to maintain strict adherence to DDD principles and centralize all business rules.
  - **Validation Strategy**: Input validation was handled natively with TypeScript at the development stage. While effective for type safety, I acknowledge the necessity of a runtime validation library like **Zod** or **Yup** in a production environment to enforce complex business rules and guard against invalid data. This would be a primary addition in the next iteration.

### Frontend Reflections

  - **Component Granularity**: I observed that some components, like `ModalContractInfo`, grew in complexity, blurring the line between a component and a page. Future refactoring would involve breaking these down into smaller, more specialized components to improve reusability and maintainability.
  - **State Management Strategy**: The `Contracts` page features complex state logic. While managed with `useState`, it's a prime candidate for refactoring with `useReducer` to centralize state transitions or even a global state manager like **Redux Toolkit** to handle shared state across the application and reduce prop drilling.
  - **Styling Trade-offs**: This project provided insight into the trade-offs between styling methodologies. While TailwindCSS and Shadcn offer incredible development speed, the inline class-based approach can reduce readability in very large components. For systems requiring strict design consistency and separation of concerns, **Styled-components** offers a clear advantage, despite a slightly steeper development curve.
  - **Form Library Abstraction**: While **React Hook Form** is a powerful tool, I found that creating highly customized and controlled inputs (like in `InputForm`) required deeper integration with its hooks (`useController`). This highlighted the trade-off between a library's convenience and the flexibility needed for bespoke UI components.

## Future Enhancements

Based on the development process, the following enhancements are proposed:

#### Backend

1.  **Refactor Business Logic**: Migrate all business rules from the Application Layer to the Domain Layer.
2.  **Implement Runtime Validation**: Integrate Zod for robust request schema validation.
3.  **Adopt a Relational Database**: Transition from SQLite (default for Prisma) to a production-grade database like PostgreSQL.
4.  **Containerize with Docker**: Create a Docker image for the backend to ensure consistent environments and simplify deployment.

#### Frontend

1.  **Refactor Core Pages**: Break down the `Contracts` page and `ModalContractInfo` component to reduce complexity.
2.  **Implement Global State Management**: Integrate Redux Toolkit to manage shared state, such as user authentication and contract data.
3.  **Improve Responsiveness**: Enhance CSS to ensure a seamless experience across all device sizes.
4.  **Create a Design System**: Abstract Shadcn components into custom, project-specific components (e.g., `Button`, `Input`) for better control and consistency.
5.  **Containerize with Docker**: Dockerize the frontend for streamlined deployment.

## Final Conclusion

This project serves as a concrete demonstration of my ability to architect and build a full-stack application using modern technologies and design patterns. It showcases not only my technical skills in TypeScript, React, and Fastify but also my capacity for architectural reflection, pragmatic decision-making, and identifying pathways for future improvement.

I am confident in the foundation built here and eager to discuss the technical choices and potential evolution of the application. Thank you for the opportunity.
