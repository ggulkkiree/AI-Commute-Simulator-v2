import AppShell from './components/AppShell.jsx';
import ScreenRouter from './components/ScreenRouter.jsx';
import { GameProvider } from './context/GameContext.jsx';

export default function App() {
  return (
    <GameProvider>
      <AppShell>
        <ScreenRouter />
      </AppShell>
    </GameProvider>
  );
}
