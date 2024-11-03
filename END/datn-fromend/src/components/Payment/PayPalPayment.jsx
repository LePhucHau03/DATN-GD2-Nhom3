import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { message } from "antd";
import { callPlaceOrder, callDeleteCart } from "../../services/api.js";

const PayPalPayment = ({ totalAmount, formData, cartItems, userId, clearCartItems }) => {
    const [amountUSD, setAmountUSD] = useState(0);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                const data = await response.json();
                const exchangeRate = data.rates.VND;
                setAmountUSD(Math.round(totalAmount / exchangeRate * 100) / 100);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
            }
        };

        fetchExchangeRate();
    }, [totalAmount]);

    const handlePaymentSuccess = async (details, data) => {
        console.log("Payment details:", details);
        console.log("Payment data:", data);

        const detailOrder = cartItems.map(item => ({
            productName: item.product.name,
            quantity: item.quantity,
            productId: item.product.id,
            price: item.product.price,
        }));

        const orderData = {
            receiverName: formData.recipientName,
            receiverAddress: formData.recipientAddress,
            receiverPhone: formData.recipientPhone,
            paymentMethod: "online",
            totalPrice: totalAmount,
            userId: userId,
            orderDetails: detailOrder,
        };

        try {
            const res = await callPlaceOrder(orderData);
            if (res && res.data) {
                message.success("Order placed successfully!");

                // Call API to delete all cart items
                await callDeleteCart(userId);

                // Optionally clear any local cart state here if needed
                clearCartItems();
            } else {
                message.error("Failed to place order: " + (res.message || "Unknown error"));
            }
        } catch (error) {
            message.error("An error occurred: " + error.message);
        }
    };

    return (
        <div>
            <h2>Pay with PayPal</h2>
            <PayPalButton
                amount={amountUSD}
                onSuccess={handlePaymentSuccess}
                options={{
                    clientId: "AXPtAiVzwdwajXcuJ3K0dM8gqb_6y67vGfuGxnoUGNwryqD8JYGe1J7KpN29iUQy0JbZU5BYajlI8n9k",
                }}
            />
        </div>
    );
};

export default PayPalPayment;
