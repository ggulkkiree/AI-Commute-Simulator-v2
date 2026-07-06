import { createContext, useContext, useMemo, useReducer } from 'react';
import { GAME_ACTIONS } from './gameActions.js';
import { gameReducer } from './gameReducer.js';
import { initialGameState } from './initialGameState.js';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const value = useMemo(
    () => ({
      state,
      dispatch,
      goToScreen: (screenId) =>
        dispatch({ type: GAME_ACTIONS.GO_TO_SCREEN, payload: screenId }),
      updateGameState: (nextState) =>
        dispatch({ type: GAME_ACTIONS.UPDATE_GAME_STATE, payload: nextState }),
      resetGame: () => dispatch({ type: GAME_ACTIONS.RESET_GAME }),
    }),
    [state],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used inside GameProvider.');
  }

  return context;
}
