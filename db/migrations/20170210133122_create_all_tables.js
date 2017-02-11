exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(t) {
      t.increments('id').unsigned().primary();
      t.string('name').notNull();
      t.integer('age').notNull();
      t.string('hometown').nullable();
      t.integer('gender').nullable();
      t.integer('race').nullable();
      t.integer('occupation').nullable();
      t.integer('politicalLeaning').nullable();
      t.integer('religion').nullable();
      t.integer('yearlyIncome').nullable();
      t.dateTime('createdAt').notNull();
    }),

    knex.schema.createTable('discussion', function(t) {
      t.increments('id').unsigned().primary();
      t.string('input').notNull();
      t.dateTime('createdAt').notNull();
      t.integer('user_id').notNull();
      t.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('commonground', function(t) {
      t.increments('id').unsigned().primary();
      t.string('input').notNull();
      t.dateTime('createdAt').notNull();
      t.integer('discussion_id').notNull();
      t.integer('user_id').notNull();
      t.foreign('discussion_id').references('discussion.id');
      t.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('comment', function(t) {
      t.increments('id').unsigned().primary();
      t.string('input').notNull();
      t.integer('upvoteCounter').notNull();
      t.integer('downvoteCounter').notNull();
      t.dateTime('createdAt').notNull();
      t.integer('commonground_id').notNull();
      t.integer('user_id').notNull();
      t.foreign('commonground_id').references('commonground.id');
      t.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('vote', function(t) {
      t.increments('id').unsigned().primary();
      t.binary('input').notNull();
      t.dateTime('createdAt').notNull();
      t.integer('comment_id').notNull();
      t.integer('user_id').notNull();
      t.foreign('comment_id').references('comment.id');
      t.foreign('user_id').references('users.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("vote"),
    knex.schema.dropTable("comment"),
    knex.schema.dropTable("commonground"),
    knex.schema.dropTable("discussion"),
    knex.schema.dropTable("users"),
  ]);
};
