const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const User = require( '../../models/User' );

const Insta = require('instamojo-nodejs');
const url = require('url');


// /api/bid/pay
router.post( '/pay', ( req, res ) => {
	Insta.setKeys('test_26d6db7fdb9cf8319c5413c8454', 'test_5c2bc0dd788ecd74e17052e5541');

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);

	data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  req.body.buyer_name;
	data.redirect_url =  req.body.redirect_url;
	data.email =  req.body.email;
	data.phone =  req.body.phone;
	data.send_email =  false;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= false;
	data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );

			res.status( 200 ).json( redirectUrl );
		}
	});

} );

/**
 * @route GET api/bid/callback/
 * @desc Call back url for instamojo
 * @access public
 */
router.get( '/callback/', ( req, res ) => {
	let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;

	if ( responseData.payment_id ) {
		let userId = responseData.user_id;

		// Save the info that user has purchased the bid.
		const bidData = {};
		bidData.package = 'Bid100';
		bidData.bidCountInPack = '10';

		User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
			.then( ( user ) => res.json( user ) )
			.catch( ( errors ) => res.json( errors ) );

		// Redirect the user to payment complete page.
		return res.redirect('http://localhost:3000/payment-complete' );
	}

} );

// We export the router so that the server.js file can pick it up
module.exports = router;