# BoxSelector

## Project Description

BoxSelector is a web application designed to simplify the waste disposal service booking process through an intuitive, guided user interface. The project uses a multi-step wizard approach that guides users through the entire skip (waste container) booking process, from waste type selection to booking confirmation.

### Design and Development Approach

The application was developed following these principles:

1. **Simplified User Experience**: A step-by-step interface that guides users through each phase of the booking process with clear instructions.

2. **Modern Visual Design**: A dark theme with blue accents for a modern and consistent visual experience, with particular attention to accessibility and readability.

3. **Component-Based Architecture**: The application is structured with reusable components, maintaining a clear separation between UI, business logic, and state management.

4. **Visual Feedback**: Interactive graphical representations of waste types and percentages to help users better understand their choices.

5. **Intuitive Sequential Flow**: Sequential popups for specific waste types (heavy waste, plasterboard) help the user provide detailed information incrementally.

## Technologies Used

### Frontend
- **React.js**: UI framework for building the component interface
- **TypeScript**: For static type-checking and code robustness
- **Tailwind CSS**: For responsive and consistent styling
- **Shadcn/UI**: Accessible and customizable UI components
- **React Hook Form**: For form management and validation
- **Zod**: For data validation and runtime type-checking
- **Wouter**: For client-side routing management
- **TanStack Query**: For API request management and caching

### Backend
- **Express.js**: Node.js framework for the API server
- **Drizzle ORM**: For database interaction and query generation
- **JSON Schema**: For input data validation
- **Memory Storage**: For temporary data storage during development

### Tooling and Build
- **Vite**: For rapid development and optimized builds
- **ESBuild**: For rapid backend compilation
- **TypeScript**: For type-checking and code documentation

### Deployment
- **Node.js Runtime**: For server execution
- **Express Static Serving**: For serving the frontend application as static files