
exports.up = function (knex, Promise) {
    return knex.schema.createTable('items', function (table) {
        table.increments('itemId');
        table.string('itemName').notNullable();
        table.float('itemPrice').notNullable();
        table.string('itemImageName').notNullable();
        table.string('itemDescription').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('items');
};
