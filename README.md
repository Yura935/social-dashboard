# Social Media Dashboard

A responsive Social Media Dashboard built for the Mine Marketing front-end assignment. It displays social media accounts with followers, engagement rate, and recent posts; supports add, edit, and delete with real-time UI updates; and uses a mock API for data.

**Stack:** React 19, TypeScript, Vite, Redux Toolkit, MUI, Formik + Yup, Bootstrap 5 (CDN), Tailwind CSS.

This README includes: **instructions for setting up the project**, **technical decisions and rationale**, **folder structure**, and **external packages and their purpose**.

---

## Instructions for Setting Up the Project

### Prerequisites

- **Node.js** 18+ (or 20+ recommended)
- **Yarn** or **npm**

### Install dependencies

```bash
yarn install
```

Or with npm:

```bash
npm install
```

### Run in development

```bash
yarn dev
```

Or:

```bash
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

### Build for production

```bash
yarn build
```

Or:

```bash
npm run build
```

Output is in the `dist/` folder.

### Preview production build locally

```bash
yarn preview
```

Or:

```bash
npm run preview
```

### Run tests

```bash
yarn test
```

Or:

```bash
npm test
```

Run tests once (CI-style):

```bash
yarn test:run
```

Run tests with coverage:

```bash
yarn test:coverage
```

### Lint

```bash
yarn lint
```

---

## Technical Decisions and Why

| Decision | Rationale |
|----------|-----------|
| **Vite** | Fast dev server and builds, native ESM, minimal config. Fits the requirement for “fast build times and development experience.” |
| **TypeScript** | Optional in the brief but used for type safety, better editor support, and fewer runtime bugs. |
| **Redux Toolkit** | Required state management. RTK gives a single store, `createSlice` for reducers/actions, and `createAsyncThunk` for loading accounts from the mock API. Typed hooks (`useAppDispatch`, `useAppSelector`) keep usage type-safe. |

| **MUI for UI components** | Buttons, cards, modals, inputs, and dialogs come from MUI for a consistent look. MUI works alongside Bootstrap (layout) and Tailwind (extra utilities). |
| **Tailwind CSS** | Used for utility classes and custom styles (e.g. in `index.css`). Complements Bootstrap and MUI without overlapping their roles. |
| **Formik + Yup** | Form state and validation for the Add/Edit Account modal. Yup schema gives required fields, min/max for numbers, and clear error messages. |
| **Single async thunk for fetch** | `loadAccounts` is the only async entry point. Add/Edit/Delete are synchronous Redux actions and update the UI immediately, matching “real-time UI updates.” |
| **Component-per-folder** | Each major UI piece (e.g. `AccountCard`, `AccountModal`, `DeleteConfirmationModal`) lives in its own folder with component, tests, and `index.ts` for clean imports. |
| **Jest + React Testing Library** | Unit tests for critical components and the Dashboard page; coverage thresholds (70%) keep important paths tested. |
| **Mock API returns deep copy** | `fetchAccounts()` returns `JSON.parse(JSON.stringify(data))` so the Redux store never mutates the mock data; reload/retry behaves predictably. |
| **Bootstrap 5 CDN only** | No `bootstrap` npm package; layout uses only the Bootstrap 5 CSS link in `index.html` per assignment. |

---

## Folder Structure

```
social-dashboard/
├── public/                 # Static assets (e.g. vite.svg)
├── src/
│   ├── api/                # API layer
│   │   └── socialApi.ts    # Mock API: fetchAccounts()
│   ├── assets/             # Images, etc.
│   ├── components/        # Reusable UI components
│   │   ├── AccountCard/           # Card for one account + metrics + posts
│   │   ├── AccountModal/          # Add/Edit account form (Formik + Yup)
│   │   ├── CardSkeleton/          # Loading skeleton for account cards
│   │   ├── DeleteConfirmationModal/  # Confirm before delete
│   │   ├── MetricItem/            # Single metric (e.g. followers, engagement)
│   │   ├── OverviewStatsSkeleton/ # Loading skeleton for stats bar
│   │   ├── PostItem/              # Single post row in a card
│   │   └── index.ts               # Re-exports
│   ├── pages/
│   │   └── Dashboard/     # Main dashboard: list, search, overview, modals
│   ├── store/              # Redux
│   │   ├── index.ts        # configureStore, RootState, AppDispatch
│   │   ├── hooks.ts        # useAppDispatch, useAppSelector
│   │   └── socialSlice.ts  # accounts slice + loadAccounts thunk
│   ├── test/               # Test setup
│   │   ├── setup.ts        # Jest setup (e.g. @testing-library/jest-dom)
│   │   ├── test-utils.tsx  # Custom render with Redux/theme
│   │   └── AllTheProviders.tsx
│   ├── App.tsx             # Root: fetches accounts, layout, <Dashboard />
│   ├── main.tsx            # Entry: React, Redux Provider, MUI CssBaseline
│   ├── index.css           # Tailwind + global styles
│   ├── constants.ts        # App constants (e.g. SKELETON_CARD_COUNT)
│   ├── types.ts            # Post, SocialAccount
│   └── utils.ts            # formatNumber, formatDate, getRandomUUID, getPlatformStyle, etc.
├── index.html              # HTML shell, Bootstrap 5 CSS CDN
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json, tsconfig.app.json, tsconfig.jest.json, tsconfig.node.json
├── jest.config.js
└── eslint.config.js
```

- **`api/`** – All server/mock access; rest of app uses Redux.
- **`components/`** – Presentational and modal components; each folder can have `.test.tsx`.
- **`pages/Dashboard/`** – Main screen: reads from Redux, handles search, open modal, delete flow.
- **`store/`** – Single Redux store; `socialSlice` holds account list, loading, error, and thunk.

---

## External Packages

### Dependencies (runtime)

| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI library and DOM rendering. |
| `@reduxjs/toolkit` | Redux store, slices, and `createAsyncThunk` for async data. |
| `react-redux` | Connecting components to Redux (`Provider`, `useDispatch`, `useSelector`). |
| `@mui/material` | Buttons, cards, modals, inputs, dialogs, typography, layout. |
| `@emotion/react`, `@emotion/styled` | Required by MUI for styling. |
| `@mui/icons-material` | Icons (e.g. Search, Add, Delete). |
| `formik` | Form state and submission for Add/Edit Account modal. |
| `yup` | Validation schema (required fields, min/max) and error messages. |

### DevDependencies (build, type-check, test, lint)

| Package | Purpose |
|---------|---------|
| `vite` | Build tool and dev server. |
| `@vitejs/plugin-react` | React support (e.g. Fast Refresh) in Vite. |
| `typescript` | Type checking and TS language support. |
| `@types/react`, `@types/react-dom`, `@types/node` | TypeScript types for React and Node. |
| `tailwindcss`, `postcss`, `autoprefixer` | Tailwind CSS and PostCSS pipeline. |
| `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | Linting and React-specific rules. |
| `globals` | Used by ESLint for env globals. |
| `jest` | Test runner. |
| `ts-jest` | Compile TypeScript in Jest. |
| `jest-environment-jsdom` | DOM environment for component tests. |
| `jsdom` | DOM implementation for Jest. |
| `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/user-event` | Component testing and DOM assertions. |
| `@types/jest` | TypeScript types for Jest. |

---

## Features Checklist (Assignment)

- **Responsive layout** – Bootstrap grid (`row`, `col-*`) and MUI breakpoints; mobile-friendly.
- **Bootstrap 5 CDN** – Used for layout and utilities (see `index.html`).
- **Tailwind CSS** – Utilities and custom styles in `index.css`.
- **MUI** – Buttons, cards, modals, inputs, dialogs.
- **Redux state** – Account list, loading, error; actions: add, edit, delete; thunk: load from mock API.
- **Mock API** – `src/api/socialApi.ts`; async handling via `loadAccounts` thunk and `useEffect`.
- **Social Media Overview** – Dashboard with follower count, posts, engagement; optional search and overview stats.
- **Add/Edit Account modal** – Form with name, followers, engagement (and posts); Formik + Yup validation.
- **Delete confirmation** – Modal before removing an account.
- **Form validation** – Yup schema with clear error messages and visual feedback.
- **Real-time UI** – Add/Edit/Delete update Redux and re-render without full page reload.
- **TypeScript** – Used throughout.
- **Unit tests** – Jest + React Testing Library for critical components and Dashboard.

---

## License

Private / assignment project.
