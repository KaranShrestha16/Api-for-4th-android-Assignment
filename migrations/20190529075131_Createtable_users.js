exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('userId');
        table.string('userFname').notNullable();
        table.string('userLname').notNullable();
        table.string('userName').notNullable();
        table.string('password').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
