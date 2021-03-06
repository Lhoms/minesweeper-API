const difficultyEnum = new Map([
  ['easy', { height: 8, width: 8, mines: 10 }],
  ['medium', { height: 16, width: 16, mines: 40 }],
  ['hard', { height: 16, width: 25, mines: 99 }],
]);

module.exports.getDifficulty = ({
  difficulty, height, width, mines,
}) => {
  if (difficulty === 'custom') {
    return { height, width, mines };
  }

  return difficultyEnum.get(difficulty) || {};
};
