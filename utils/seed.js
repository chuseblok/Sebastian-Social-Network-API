const connection = require("../config/connection");
const { Course, Student } = require("../models");
const {
  getRandomName,
  getRandomAssignments,
  getRandomReaction,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await thoughts.deleteMany({});

  await username.deleteMany({});

  const username = [];

  for (let i = 0; i < 20; i++) {
    const reaction = getRandomReaction(20);

    const userandemail = getRandomUsername();
    const username = userandemail.split(" ")[0];
    const email = userandemail.split(" ")[1];
    const friends = `${username}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;

    username.push({
      username,
      email,
      thoughts,
      friends,
      reaction,
    });
  }

  await username.collection.insertMany(username);

  await thoughts.collection.insertOne({
    thoughtsName: "thoughts",
    inPerson: false,
    students: [...username],
  });

  console.table(username);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
