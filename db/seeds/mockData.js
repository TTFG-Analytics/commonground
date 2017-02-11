
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
        name: 'Chester',
        age: 32,
        hometown: 'Austin',
        gender: 1,
        race: 2,
        occupation: 4,
        politicalleaning: 3,
        religion: 5,
        yearlyincome: 120000,
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Eugene',
        age: 32,
        hometown: 'Austin',
        gender: 1,
        race: 2,
        occupation: 4,
        politicalleaning: 3,
        religion: 5,
        yearlyincome: 120000,
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Tommy',
        age: 32,
        hometown: 'Austin',
        gender: 1,
        race: 2,
        occupation: 4,
        politicalleaning: 3,
        religion: 5,
        yearlyincome: 120000,
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Gary',
        age: 32,
        hometown: 'Austin',
        gender: 1,
        race: 2,
        occupation: 4,
        politicalleaning: 3,
        religion: 5,
        yearlyincome: 120000,
      });
    });
};