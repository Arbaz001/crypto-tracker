# Crypto Price Tracker  `https://crypto-tracker-ebon.vercel.app/`

A real-time cryptocurrency price tracking application built with React, Redux Toolkit, and Material-UI.

## Features

- Real-time price and volume updates
- Responsive table layout
- Color-coded price changes
- 7-day price charts
- Simulated WebSocket updates
- Redux state management

## Tech Stack

- React + TypeScript
- Redux Toolkit for state management
- Material-UI for components
- Recharts for price charts
- Vite for build tooling

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `https://crypto-tracker-ebon.vercel.app/`

## Project Structure

```
src/
├── components/
│   └── CryptoTable.tsx
├── services/
│   └── WebSocketSimulator.ts
├── store/
│   ├── store.ts
│   └── cryptoSlice.ts
├── types/
│   └── crypto.ts
└── App.tsx
```
## Demo Video Link with thought process
- https://drive.google.com/file/d/18lWfp_x33LXxeg3-9mmWyj1Uw-Vl-lOc/view?usp=sharing

## Architecture

- **Redux Store**: Manages the global state for crypto assets
- **WebSocket Simulator**: Simulates real-time price and volume updates
- **Components**: Modular React components with Material-UI styling
- **TypeScript**: Type safety and better developer experience

## Future Improvements

- [ ] Add sorting functionality
- [ ] Implement filters for top gainers/losers
- [ ] Add real WebSocket integration
- [ ] Implement localStorage for persistence
- [ ] Add unit tests
- [ ] Add more cryptocurrencies
- [ ] Implement search functionality
