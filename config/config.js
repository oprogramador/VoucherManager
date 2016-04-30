var config = {};
config.db = {};
config.db.user = process.env['voucher_manager_db_user'];
config.db.password = process.env['voucher_manager_db_password'];
config.db.domain = 'ds011732.mlab.com';
config.db.port = '11732';
config.db.dbName = 'voucher-manager';

module.exports = config;
