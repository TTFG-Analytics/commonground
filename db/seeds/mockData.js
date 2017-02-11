
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
        name: 'Suits',
        age: 'USA Network',
        hometown: 'Drama',
        gender: 3,
        race: true,
        occupation:
        politicalleaning:
        religion:
        yearlyincome:
        createdat:
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Game of Thrones',
        age: 'HBO',
        hometown: 'Fantasy',
        gender: 5,
        race: true,
        occupation:
        politicalleaning:
        religion:
        yearlyincome:
        createdat:
      });
    }).then(function () {
      return knex('users').insert({
        name: 'South Park',
        age: 'Comedy Central',
        hometown: 'Comedy',
        gender: 4,
        race: true,
        occupation:
        politicalleaning:
        religion:
        yearlyincome:
        createdat:
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Mad Men',
        age: 'AMC',
        hometown: 'Drama',
        gender: 3,
        race: fals,
        occupation:
        politicalleaning:
        religion:
        yearlyincome:
        createdat:e
      });
    });
};