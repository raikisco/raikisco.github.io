import React from "react";
import ReactDOM from "react-dom";

export default function PayPalButton(props) {
  let { price, desc } = props;
  console.log("price is", price);
  let client = {
    sandbox:
      "AcvFd-dhb4tHQ8wNAhpWMa7vynAbgkiFqyxlsNwNzi3bb8EWvHI8XZSO7srZRtPl5ewFHlVHkhGUniIZ",
    production:
      "AZN4VoCjvnf6XGMcK-kZ1g3byOD7Gg5eErOCwSxD_7t_lu3giMTS_F99_GUbWya-boOv05INyKqCXWH_"
  };
  let payment = (data, actions) => {
    // Make a call to the REST api to create the payment
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: price, currency: "CAD" }
          }
        ]
      }
    });
  };

  let onAuthorize = (data, actions) => {
    return actions.payment.execute().then(function() {
      props.onPaymentComplete();
      window.alert("Payment Complete - We've reserved your spot!");
    });
  };
  let PayPalButton = paypal.Button.driver("react", { React, ReactDOM });
  return (
    <div className="shoppingCart">
      <PayPalButton
        env="sandbox" //sandbox || production
        client={client}
        payment={payment}
        commit={true}
        onAuthorize={onAuthorize}
      />
    </div>
  );
}
