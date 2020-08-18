import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HH2wgF00C2Vuh4RFgXZXPDOBMObgzTgnXfxcQ47jVBeGEFu5t3FsMzTiktc0qVAFD1JHILTsbEO2pPHZBiO6MHa00gZI71hPW';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label = 'Pay Now'
            name='CRWN Clothing ltd'
            billingAddress
            shippingAdress
            image='https://sendeyo.com/up/d/f3eb2117da'
            decription={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
