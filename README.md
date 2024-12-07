# Laos Angular Project
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/7e3cd8fdfac64f62a59598822b738fed)](https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

This project is an Angular application configured to work with Laos Workers.

## Project Structure

- **src/**: Contains the source code for the Angular application.
  - **app/**: Contains the main application components, modules, and routing.
    - **components/**: Contains the form components and shared components.
    - **services/**: Contains the services for form handling, notifications, persistence, and validation.
    - **models/**: Contains the TypeScript models for form data, questions, and validation.
    - **data/**: Contains the questions data.
    - **contexts/**: Contains the context providers for notifications and progress bar.
    - **assets/**: Contains static assets like images.
  - **environments/**: Contains environment configuration files.
- **index.html**: The main HTML file for the Angular application.
- **styles.css**: Global styles for the Angular application.
- **main.ts**: The main entry point for the Angular application.
- **polyfills.ts**: Polyfills for the Angular application.
- **vite.config.ts**: Vite configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **tsconfig.app.json**: TypeScript configuration file for the Angular application.
- **tsconfig.node.json**: TypeScript configuration file for Node.js.
- **package.json**: Contains the dependencies and scripts for the Angular application.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy the project:
   ```bash
   npm run deploy
   ```

