# CommonGround

This is a social app designed to facilitate comunication between different viewpoints. The goal is to allow users to post questions and 
define the demographics/social groups/camps that they want to hear responses from. Then, the highest upvoted comment arises to the top,
allowing them to see the most representative comment for that group. This can help people get a clearer picture of opposing viewpoints and allow them to see the most widely held viewpoint for a group and not the extreme viewpoints of those on the fringes. Hopefully, that will lead to a better understanding of someone elses' viewpoints and allow them to find a common ground with the other group.

This app also allows users to view graphs displaying de-identified data on the respondents' ages, political leanings, industry, race, religion and income bracket so that the users can get a better idea of what types of people hold certain beliefs. 

# starting the application

Open two instances of the terminal and navigate to the directory for this application on one terminal window. Run the following

- webpack

Then, on the other terminal window, use 'cd ./server' to get into the server directory. Run the following command

- nodemon index.js

In your browser, navigate to http://localhost:4040.

# starting database on Mac OS

if services not running, put the following in Command Line

- brew services restart postgresql

Once services have started

- psql -d <db-name>

Run knex seed file

- knex seed:run --env development

To Run Test

-cd to db

-mocha -R nyan ../test/*.js

-Dont forget to rollback, remigrate, and reseed after testing!

On Deployment

-fix Facebook Integration redirect


Gender Index
1 - Male
2 - Female
3 - Other

Race Index according to http://www.census.gov/topics/population/race/about.html
1 - White Hispanic
2 - White Non-Hispanic
3 - Black or African American
4 - American Indian or Alaska Native
5 - Asian
6 - Native Hawaiian or Other Pacific Islander
7 - Other

Industry Index according to http://www.pwc.com/gx/en/industries.html
1 - Aerospace, defence & security
2 - Asset & wealth management
3 - Automotive
4 - Banking & capital markets
5 - Capital projects & infrastructure
6 - Chemicals
7 - Communications
8 - Energy, utilities & mining
9 - Engineering & construction
10 - Entertainment & media
11 - Financial services
12 - Forest, paper & packaging
13 - Government & public services
14 - Healthcare
15 - Hospitality & leisure
16 - Industrial manufacturing
17 - Insurance
18 - Metals
19 - Pharmaceuticals & life sciences
20 - Private equity
21 - Retail & consumer
22 - Sovereign investment funds
23 - Technology
24 - Transportation & logistics
25 - Other

Political Affiliation with Nolan Chart Index https://en.wikipedia.org/wiki/Nolan_Chart
1 - Conservative
2 - Authoritarian
3 - Centrist
4 - Libertarian
5 - Progressive

Religion Index
1 - Protestant
2 - Catholic
3 - Mormon
4 - Other Christian
5 - Judaism
6 - Islam
7 - Buddhism
8 - Hinduism
9 - Agnostic
10 - Atheist
11 - Other

Yearly Income Bracket Index
1 - Under $35,000 / year
2 - $35,000 - $50,000
3 - $50,000 - $65,000
4 - $65,000 - $80,000
5 - $80,000 - $95,000
6 - $95,000 - $120,000
7 - Over $120,000




