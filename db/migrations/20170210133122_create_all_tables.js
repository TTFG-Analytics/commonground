exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(t) {
      t.increments('id').unsigned().primary();
      t.integer('facebookid').unique();
      t.string('fullname').notNull();
      t.string('title').nullable();
      t.integer('age').nullable();
      t.string('hometown').nullable();
      t.string('gender').nullable();
      t.integer('race').nullable();
      t.integer('industry').nullable();
      t.integer('politicalleaning').nullable();
      t.integer('religion').nullable();
      t.integer('yearlyincome').nullable();
      t.string('email').nullable();
      t.string('facebookpicture').nullable();
      t.string('locale').nullable();
      t.integer('admin').defaultTo(0);
      t.timestamp('createdat').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('discussion', function(t) {
      t.increments('id').unsigned().primary()
      t.string('input').notNull()
      t.timestamp('createdat').defaultTo(knex.fn.now())
      t.integer('user_id').unsigned()
      t.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('commonground', function(t) {
      t.increments('id').unsigned().primary();
      t.string('input').notNull();
      t.timestamp('createdat').defaultTo(knex.fn.now());
      t.integer('discussion_id')
      t.integer('user_id')
      t.foreign('discussion_id').references('discussion.id');
      t.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('comment', function(t) {
      t.increments('id').unsigned().primary();
      t.string('input', 2000).notNull();
      t.integer('upvotecounter').defaultTo(0);
      t.integer('downvotecounter').defaultTo(0);
      t.integer('delta').defaultTo(0); //HERE
      t.integer('flag').defaultTo(0);
      t.timestamp('createdat').defaultTo(knex.fn.now());
      t.integer('commonground_id')
      t.integer('user_id')
      t.foreign('commonground_id').references('commonground.id');
      t.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable('vote', function(t) {
      t.increments('id').unsigned().primary();
      t.integer('input');
      t.timestamp('createdat').defaultTo(knex.fn.now());
      t.integer('comment_id')
      t.integer('user_id')
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
