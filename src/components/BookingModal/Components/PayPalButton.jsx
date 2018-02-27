import React from "react";
import ReactDOM from 'react-dom';

export default function PayPalButton() {
  let client = {
    sandbox:
      "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    production: "<insert production client id>"
  };
  let payment = (data, actions) => {
    // Make a call to the REST api to create the payment
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: "0.01", currency: "USD" }
          }
        ]
      }
    });
  };

  let onAuthorize = (data, actions) => {
    return actions.payment.execute().then(function() {
      window.alert("Payment Complete!");
    });
  };
  let PayPalButton = paypal.Button.driver("react", { React, ReactDOM });
  return (
    <div className="shoppingCart">
      <PayPalButton
        env='sandbox'
        client={client}
        payment={payment}
        commit={true}
        onAuthorize={onAuthorize}
      />
    </div>
  );
}
