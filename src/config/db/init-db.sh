#!/bin/bash
set -e

mongo <<EOF
db = db.getSiblingDB('$MONGO_DATABASE');
db.createUser({
	user: '$MONGO_USERNAME',
	pwd: '$MONGO_PASSWORD',
	roles: [
		{
			role: 'readWrite',
			db: '$MONGO_DATABASE',
		},
	],
});
EOF