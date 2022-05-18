const username = ["ben", "fen", "zen", "ren", "glen", "ben"];
const reactions = ["dislike", "like"];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () =>
  `${getRandomArrItem(username)} ${getRandomArrItem(username)}`;

const getRandomReaction = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionName: getRandomArrItem(reactions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

module.exports = { getRandomUsername, getRandomReaction };
