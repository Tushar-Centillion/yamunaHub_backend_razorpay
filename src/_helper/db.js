import { Client } from 'pg';

const client = new Client({
	user: 'mfurzvvt',
	host: 'rajje.db.elephantsql.com',
	database: 'mfurzvvt',
	password: '77b3YIFJmPhQ6nJmCblikm0mYsweRZot',
	port: 5432,
});
var conn = client.connect();
if (!conn) {
	console.log('Data base not connect');
} else {
	console.log('database connect');
}
export default defaultclient;
