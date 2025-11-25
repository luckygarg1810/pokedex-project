# Pokedex Frontend (React + Vite)

This is the frontend of the Pokedex Search App, built using React + Vite. It allows users to:

- Search Pokémon by name
- Display Pokémon details (image, stats, abilities, types, etc.)
- Show loading/errors

## Installation

Clone the repository (monorepo):

```bash
git clone https://github.com/your-username/pokedex-project.git
cd pokedex-project/frontend
```

Install dependencies:

```bash
npm install
```

## Running the Project

Start the Vite development server:

```bash
npm run dev
```

It will run on:
- 👉 `http://localhost:3000` 
- 
## 🔧 Changing the Frontend Port (Optional)

You can set a custom dev server port by editing `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000,
  },
});
```

## Backend Connection

The frontend communicates with the Spring Boot backend:

```
GET http://localhost:8080/api/pokemon/{name}
```

Update the base URL in your frontend API file (if needed):

```javascript
export const BASE_URL = "http://localhost:8080/api/pokemon";
```

## Backend Requirements

Make sure the Spring Boot backend is running before starting the frontend:

```bash
# In the backend directory
cd ../backend
mvn spring-boot:run
```

The backend should be accessible at `http://localhost:8080`


**Built with ⚛️ React and ⚡ Vite**
