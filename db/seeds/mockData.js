exports.seed = function(knex, Promise) {
  return knex('users').del() // Deletes ALL existing entries
    .then(function () {
      return knex('discussion').insert({
        input: 'This is a discussion topic. Make a discussion topic about something that you would like to see multiple different perspectives on. We will use the example of, "What is the best tech-city in the United States"',
        user_id: 1
      });
    }).then(function () {
      return knex('commonground').insert({
        input: 'This is a commonground. Think of this as a social grouping of people with a common idea, opinion, or perspective (there are no limits to what commongrounds can be). An example of a commonground for this discussion would be "San Francisco"',
        user_id: 1,
        discussion_id: 1
      });
    }).then(function () {
      return knex('commonground').insert({
        input: 'Here is an opposing viewpoint to the "San Francisco" commonground. Here we will display a social grouping for people that believe "Austin" is the best tech-city in the United States'
        user_id: 1,
        discussion_id: 1
      });
    }).then(function () {
      return knex('comment').insert({ //comment 1
        input: "The comment at the top is the most representative comment of the commonground. The users decide which is the most representative comment by upvoting and downvoting - 'San Francisco is clearly the best 'tech-city' in the United States, if not the World. It is home to some of the most innovative and cutting-edge companies. That and the city is awesome!'",
        user_id: 1,
        commonground_id: 1,
        delta: 16
      });
    }).then(function () {
      return knex('comment').insert({ //comment 2
        input: "Here is the most representative comment in the Austin commonground - 'Austin is by far the best 'tech-city' in the United States. The cost of living is still reasonable (compared to other 'tech-cities') and the BBQ is great! Also, the night life is incredible!",
        user_id: 2,
        commonground_id: 2,
        delta: 24
      });
    })
};







































