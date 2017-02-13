
// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       return Promise.all([
//         // Inserts seed entries
//         knex('table_name').insert({id: 1, colName: 'rowValue1'}),
//         knex('table_name').insert({id: 2, colName: 'rowValue2'}),
//         knex('table_name').insert({id: 3, colName: 'rowValue3'})
//       ]);
//     });
// };



exports.seed = function(knex, Promise) {
  return knex('users').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('users').insert({
        name: "Elon Musk",
        title: "CEO and CTO of SpaceX, CEO and product architect of Tesla Inc.",
        age: 45,
        hometown: "Los Angeles, California",
        gender: 1,
        race: 2,
        industry: 1,
        politicalleaning: 3,
        religion: 11,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: "Tim Cook",
        title: "CEO of Apple Inc.",
        age: 56,
        hometown: "Palo Alto, California",
        gender: 1,
        race: 2,
        industry: 23,
        politicalleaning: 5,
        religion: 1,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: "Jeff Bezos",
        title: "Founder, Chairman, and CEO of Amazon.com",
        age: 53,
        hometown: "Seattle, Washington",
        gender: 1,
        race: 2,
        industry: 23,
        politicalleaning: 3,
        religion: 4,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: "Bill Gates",
        title: "Technology Advisor of Microsoft",
        age: 61,
        hometown: "Medina, Washington",
        gender: 1,
        race: 2,
        industry: 23,
        politicalleaning: 3,
        religion: 2,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: "Mary Barra",
        title: "Chairman & CEO of General Motors Company",
        age: 55,
        hometown: "Royal Oak, Michigan",
        gender: 2,
        race: 2,
        industry: 3,
        politicalleaning: 3,
        religion: 2,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: "Mark Fields",
        title: "President and CEO of Ford Motor Company",
        age: 56,
        hometown: "Dearborn, Michigan",
        gender: 1,
        race: 2,
        industry: 3,
        politicalleaning: 1,
        religion: 1,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Niel Degrasse Tyson',
        title: "Astrophysicist, Cosmologist, Author, and Science Communicator",
        age: 58,
        hometown: 'Manhattan',
        gender: 1,
        race: 2,
        industry: 25,
        politicalleaning: 3,
        religion: 10,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Bill Nye',
        title: "The Science Guy",
        age: 61,
        hometown: 'Washington D.C.',
        gender: 1,
        race: 1,
        industry: 25,
        politicalleaning: 3,
        religion: 10,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Steven Hawking',
        title: "Theoretical Physicist, Cosmologist",
        age: 75,
        hometown: 'Oxford',
        gender: 1,
        race: 1,
        industry: 25,
        politicalleaning: 3,
        religion: 10,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Rush Limbaugh',
        title: 'Entertainer, Radio Talk Show Host, and Conservative Political Commentator',
        age: 66,
        hometown: 'Cape Girardeau',
        gender: 1,
        race: 1,
        industry: 10,
        politicalleaning: 1,
        religion: 1,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Sarah Palin',
        title: "American Politician, Commentator, and Author",
        age: 53,
        hometown: 'Sandpoint',
        gender: 2,
        race: 1,
        industry: 13,
        politicalleaning: 1,
        religion: 1,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Ted Nugent',
        title: "Musician and Political Activist",
        age: 68,
        hometown: 'Redford',
        gender: 1,
        race: 1,
        industry: 10,
        politicalleaning: 1,
        religion: 1,
        yearlyincome: 7
      });
    });
};