// Import required modules
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Person Schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Required field
    age: Number,
    favoriteFoods: [String] // Array of strings
});

// Create a Person Model
const Person = mongoose.model('Person', personSchema);

// Function to create and save a new person
const createAndSavePerson = (personData, callback) => {
    const person = new Person(personData);
    person.save(callback);
};

// Example usage of createAndSavePerson
createAndSavePerson({ name: 'John Doe', age: 30, favoriteFoods: ['Pizza', 'Burger'] }, (err, person) => {
    if (err) return console.error(err);
    console.log('Person saved:', person);
});

// Function to create multiple people
const createManyPeople = (arrayOfPeople, callback) => {
    Person.create(arrayOfPeople, callback);
};

// Example usage of createManyPeople
const people = [
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Salad'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Pasta', 'Ice Cream'] }
];
createManyPeople(people, (err, people) => {
    if (err) return console.error(err);
    console.log('People created:', people);
});

// Function to find people by name
const findPeopleByName = (personName, callback) => {
    Person.find({ name: personName }, callback);
};

// Example usage of findPeopleByName
findPeopleByName('Alice', (err, people) => {
    if (err) return console.error(err);
    console.log('Found people:', people);
});

// Function to find one person by food
const findOneByFood = (food, callback) => {
    Person.findOne({ favoriteFoods: food }, callback);
};

// Example usage of findOneByFood
findOneByFood('Pizza', (err, person) => {
    if (err) return console.error(err);
    console.log('Found person by food:', person);
});

// Function to find a person by ID
const findPersonById = (personId, callback) => {
    Person.findById(personId, callback);
};

// Example usage of findPersonById
const personId = 'some_person_id_here'; // Replace with an actual ID
findPersonById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Found person by ID:', person);
});

// Function to update a person’s favoriteFoods
const updatePersonFavoriteFoods = (personId, callback) => {
    Person.findById(personId, (err, person) => {
        if (err) return callback(err);
        person.favoriteFoods.push('Hamburger');
        person.save(callback);
    });
};

// Example usage of updatePersonFavoriteFoods
updatePersonFavoriteFoods(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Updated person with new favorite food:', person);
});

// Function to update a person's age by name
const updatePersonAgeByName = (personName, newAge, callback) => {
    Person.findOneAndUpdate({ name: personName }, { age: newAge }, { new: true }, callback);
};

// Example usage of updatePersonAgeByName
updatePersonAgeByName('Alice', 20, (err, person) => {
    if (err) return console.error(err);
    console.log('Updated person age:', person);
});

// Function to delete a person by ID
const deletePersonById = (personId, callback) => {
    Person.findByIdAndRemove(personId, callback);
};

// Example usage of deletePersonById
deletePersonById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Deleted person:', person);
});

// Function to delete many people by name
const deleteManyPeopleByName = (personName, callback) => {
    Person.remove({ name: personName }, callback);
};

// Example usage of deleteManyPeopleByName
deleteManyPeopleByName('Mary', (err, result) => {
    if (err) return console.error(err);
    console.log('Deleted people:', result);
});

// Function to find people who like a specific food, sort by name, limit results, and hide age
const findPeopleByFood = (food, callback) => {
    Person.find({ favoriteFoods: food })
        .sort({ name: 1 })
        .limit(2)
        .select('-age') // Exclude age from results
        .exec(callback);
};

// Example usage of findPeopleByFood
findPeopleByFood('Burritos', (err, people) => {
    if (err) return console.error(err);
    console.log('Found people by food:', people);
});
