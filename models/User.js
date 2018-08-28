const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

/**
 * Create Schema
 * Create a new instance of User model and set the values of the properties(fields)
 */
const UserSchema = new Schema( {
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
	},
	password: {
		type: String,
		required: true
	},
	package: {
		type: String
	},
	bidCountInPack: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
} );

/**
 * Create a mongoose collection model for a collection name 'users', so that mongoose knows how to store data.
 * model() is used to create a new model, which takes the following args
 * first arg 'user', is the name of the collection
 * We pass the second property as model UserSchema created above,
 * which contains the properties/attributes that the 'user' collection will have.
 */
module.exports = User = mongoose.model( 'users', UserSchema );
