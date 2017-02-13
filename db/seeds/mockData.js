
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
        name: 'Elon Musk',
        title: "CEO, and CTO of SpaceX and Tesla Inc."
        age: ,
        hometown: 'Austin',
        gender: ,
        race: ,
        industry: ,
        politicalleaning: ,
        religion: ,
        yearlyincome: ,
      });
    }).then(function () {
      return knex('users').insert({
        name: '',
        title: ""
        age: ,
        hometown: ,
        gender: ,
        race: ,
        industry: ,
        politicalleaning: ,
        religion: ,
        yearlyincome: ,
      });
    }).then(function () {
      return knex('users').insert({
        name: '',
        title: ""
        age: ,
        hometown: ,
        gender: ,
        race: ,
        industry: ,
        politicalleaning: ,
        religion: ,
        yearlyincome: ,
      });
    }).then(function () {
      return knex('users').insert({
        name: '',
        title: ""
        age: ,
        hometown: ,
        gender: ,
        race: ,
        industry: ,
        politicalleaning: ,
        religion: ,
        yearlyincome: ,
      });
    });
};