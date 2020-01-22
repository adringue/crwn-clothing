import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;  // price is given in cent
    const publishableKey='pk_test_UlDmqqourqfZLmzO3IsyNlBu00eeEdqr97';

   const  onToken=token=>{   // we will pass the token to the backend and create the charge
        console.log(token);
        alert('Payment Successful'); // as long we are processing the payment yet
    }

    return (
        <StripeCheckout
         label='Pay Now'
         name='CRWN Clothing Ltd.'
         billingAddress
         shippingAddress
         image='https://svgshare.com/i/CUz.svg'
         description={`Your total is $${price}`}
         amount={priceForStripe}
         panelLabel='Pay Now'
         token={onToken}
         stripeKey={publishableKey}
        />
    );

};


export default StripeCheckoutButton;
