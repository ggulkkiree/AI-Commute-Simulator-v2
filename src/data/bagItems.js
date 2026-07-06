export const bagItemEmoji = {
  교통카드: '🚌',
  스마트폰: '📱',
  물병: '💧',
  우산: '☂️',
  손선풍기: '🌀',
  겉옷: '🧥',
  게임기: '🎮',
  과자: '🍪',
};

export const bagDistractorItems = ['게임기', '과자'];

export function createBagItemOptions(requiredItems = []) {
  return [...new Set([...requiredItems, ...bagDistractorItems])];
}
