const connection = require('../config/connection');
const { Thoughts, Users } = require('../models');
// Import functions for seed data
const { getRandomColor, getRandomPost, genRandomIndex } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await Thoughts.deleteMany({});
  await Users.deleteMany({});

  // Empty arrays for randomly generated Thoughts and Users
  const tsers = [];
  const thoughts = [];

  // Function to make a Thought object and push it into the Thoughts array
  const makeThoughts = (text) => {
    thoughts.push({
      published: Math.random() < 0.5,
      text,
      users: [users[genRandomIndex(users)]._id],
    });
  };

  // Create 20 random users and push them into the users array
  for (let i = 0; i < 20; i++) {
    const tagname = getRandomColor();

    users.push({
      tagname,
      color: tagname,
    });
  }

  // Wait for the users to be inserted into the database
  await Users.collection.insertMany(users);

  // For each of the users that exist, make a random thought of length 50
  users.forEach(() => makeThoughts(getRandomThoughts(50)));

  // Wait for the Thoughts array to be inserted into the database
  await Thoughts.collection.insertMany(thoughts);

  // Log out a pretty table for users and Thoughts, excluding the excessively long text property
  console.table(users);
  console.table(thoughts, ['published', 'users', '_id']);
  console.timeEnd('seeding');
  process.exit(0);
});
