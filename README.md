# NEXCART

A web application built with Next.js, TypeScript, and Redux for managing shopping lists. The app features a clean and intuitive UI with components from NextUI and UI Shadcn, and includes integration with Gemini AI for enhanced user interactions.

## Features

- **Add, Delete, Update, and View Items:** Manage your shopping list items with ease.
- **Data Persistence:** Uses IndexedDB, local storage, and session storage to save your data.
- **Dark/Light Theme:** Switch between dark and light themes based on your preference.
- **Sorting Options:** Sort your shopping list by name, time, or other criteria.
- **Currency Format Settings:** Customize the currency format to suit your needs.
- **Undo-Redo Functionality:** Easily correct mistakes with undo and redo actions.
- **Trash Bin:** Deleted items are stored temporarily before permanent deletion.
- **Gemini AI Integration:** Add items to your shopping list based on responses from Gemini AI.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux](https://redux.js.org/)
- **UI Components:** [NextUI](https://nextui.org/), [UI Shadcn](https://ui.shadcn.com/)
- **Data Storage:** IndexedDB, Local Storage, Session Storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yofannnn/nextjs-shopping-list-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nextjs-shopping-list-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to.

   ```bash
   http://localhost:3000
   ```

## Environment Variables

Before running the application, you need to configure the environment variables. Create a `.env.local` file in the root directory and add the following variables:

#### Gemini Ai api key

You can get your Gemini Ai api key in [here](https://ai.google.dev/)

```bash
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

## Contributing

Feel free to fork this repository and submit pull requests for any features or improvements.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [NextUI](https://nextui.org/)
- [UI Shadcn](https://ui.shadcn.com/)
- [Gemini AI](https://ai.google.dev/)
