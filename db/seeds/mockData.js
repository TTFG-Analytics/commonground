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
    }).then(function () {
      return knex('users').insert({
        name: 'Chris Farley',
        title: "Actor, Comedian",
        age: 33,
        hometown: 'Madison, Wisconsin',
        gender: 1,
        race: 1,
        industry: 10,
        politicalleaning: 3,
        religion: 2,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Betty White',
        title: "Actor",
        age: 95,
        hometown: 'Oak Park, Illinois',
        gender: 2,
        race: 1,
        industry: 10,
        politicalleaning: 3,
        religion: 1,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Kevin Hart',
        title: "Comedian and Actor",
        age: 75,
        hometown: 'Oxford',
        gender: 1,
        race: 2,
        industry: 10,
        politicalleaning: 3,
        religion: 9,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Louis C.K.',
        title: 'Entertainer, Comedian',
        age: 66,
        hometown: 'Cape Girardeau',
        gender: 1,
        race: 1,
        industry: 10,
        politicalleaning: 3,
        religion: 9,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Amy Schumer',
        title: "Comedian",
        age: 53,
        hometown: 'Sandpoint',
        gender: 2,
        race: 1,
        industry: 10,
        politicalleaning: 5,
        religion: 10,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('users').insert({
        name: 'Tina Fey',
        title: "Comedian",
        age: 68,
        hometown: 'Redford',
        gender: 2,
        race: 1,
        industry: 10,
        politicalleaning: 5,
        religion: 10,
        yearlyincome: 7
      });
    }).then(function () {
      return knex('discussion').insert({
        input: "Would you ride as a pasenger in a self-driving car on today's roads and highways?",
        user_id: 1
      });
    }).then(function () {
      return knex('commonground').insert({
        input: "Yes",
        user_id: 1,
        discussion_id: 1
      });
    }).then(function () {
      return knex('commonground').insert({
        input: "No",
        user_id: 1,
        discussion_id: 1
      });
    }).then(function () {
      return knex('comment').insert({
        input: "self-driving cars have come a long way in terms of technological advances in the past few years, however, I would not feel comfortable getting in a self-driving cars on today's roads. The industry and regulators need a few more years to make self-driving cars safe enough for me to ride in one.",
        user_id: 2,
        commonground_id: 2
      });
    }).then(function () {
      return knex('comment').insert({
        input: "I would absolutely ride in a self-driving car on today's roads. Statistics show that you are much safer as a passenger in a self-driving car than as the driver. Here at Ford we are developing the safest and most fuel efficient self-driving cars on the market.",
        user_id: 6,
        commonground_id: 1
      });
    }).then(function () {
      return knex('comment').insert({
        input: "Over the past year there have only been 2 self-driving car fatalities compared to over 4,000 non-self driving car fatalities.",
        user_id: 3,
        commonground_id: 1
      });
    }).then(function () {
      return knex('vote').insert({
        input: false,
        user_id: 5,
        comment_id: 2
      });
    }).then(function () {
      return knex('vote').insert({
        input: true,
        user_id: 4,
        comment_id: 1
      });
    }).then(function () {
      return knex('discussion').insert({
        input: "Climate Change in the Anthropocene: is it man-made or natural?",
        user_id: 7
      });
    }).then(function () {
      return knex('commonground').insert({
        input: "Man-Made",
        user_id: 7,
        discussion_id: 2
      });
    }).then(function () {
      return knex('commonground').insert({
        input: "Natural",
        user_id: 7,
        discussion_id: 2
      });
    }).then(function () {
      return knex('comment').insert({
        input: "I have a theory about global warming and why people think it's real. Go back 30, 40 years when there was much less air conditioning in the country. When you didn't have air conditioning and you left the house, it may in fact have gotten a little cooler out there, because sometimes houses become hot boxes. Especially if you're on the second or third floor of a house in the summer time and all you've got is open windows and maybe a window fan. Or you have some servant standing there fanning you with a piece of paper. When you walked outside, no big deal, it's still hot as hell. Now, 30, 40 years later, all this air conditioning, and it's a huge difference when you go outside. When you go outside now, my golly, is it hot. Oh. Global warming. It's all about the baseline you're using for comparison.",
        user_id: 10,
        commonground_id: 4
      });
    }).then(function () {
      return knex('comment').insert({
        input: "It's not that the world hasn't had more carbon dioxide, it's not the world hasn't been warmer.  The problem is the speed at which things are changing.  We are inducing a sixth mass extinction event kind of by accident and we don't want to be the extinctee, if I may coin this noun.  So, I mean as far as Miss Blackburn, sounded like she had been coached on denial bullet points or talking points.  And I very much enjoy taking those people on, but meanwhile it breaks my heart because we got work to do.  And the fossil fuel industry has really gotten in their ears and it's really troublesome.  We're the world's most technically advanced country, or if the U.S. isn't the most technically advanced it's certainly in the top ten.  I mean you could say Japan, New Zealand are very sophisticated societies.  But the U.S. is where iPhone's are invented, what have you, the Internet; it's still a significant place. And so to have a generation of science students being brought up without awareness of climate change is just a formula for disaster.",
        user_id: 8,
        commonground_id: 3
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 3,
        user_id: 11,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 4,
        user_id: 9,
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 4,
        user_id: 1,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 4,
        user_id: 2,
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 4,
        user_id: 3,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 4,
        user_id: 4,
      });
    }).then(function () {
      return knex('discussion').insert({
        input: "Would you rather fight 50 duck sized horses or 1 horse sized duck",
        user_id: 13
      });
    }).then(function () {
      return knex('commonground').insert({
        input: "50 duck sized horses",
        user_id: 7,
        discussion_id: 2
      });
    }).then(function () {
      return knex('commonground').insert({
        input: "1 horse sized duck",
        user_id: 7,
        discussion_id: 2
      });
    }).then(function () {
      return knex('comment').insert({
        input: "A flying quacking horse sized monstrosity would be terrifying",
        user_id: 15,
        commonground_id: 5
      });
    }).then(function () {
      return knex('comment').insert({
        input: "A small pack of ducks could take me out, no way I'd try my hand at 50 mini horses.",
        user_id: 14,
        commonground_id: 6
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 5,
        user_id: 14,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 6,
        user_id: 7,
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 5,
        user_id: 16,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 6,
        user_id: 17,
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 5,
        user_id: 1,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 6,
        user_id: 2,
      });
    }).then(function () {
      return knex('vote').insert({
        input: 'True',
        comment_id: 5,
        user_id: 3,
      });
    }).then(function () {
      return knex('vote').insert({
        input: "True",
        comment_id: 6,
        user_id: 4,
      });
    })
};







































