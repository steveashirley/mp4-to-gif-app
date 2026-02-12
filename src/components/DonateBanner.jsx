import { useState } from 'react';

// Replace these placeholder URLs with your real Stripe Payment Links.
// Create 3 links in the Stripe Dashboard as fixed one-time prices: $3, $5, $10.
const PAYMENT_LINKS = {
  3:  'https://buy.stripe.com/fZuaEWcj9eg04yH0Kj73G01',
  5:  'https://buy.stripe.com/dRm6oG2Iz8VGc198cL73G02',
  10: 'https://buy.stripe.com/3cIaEW3MDc7S7KT3Wv73G00',
};

export function DonateBanner() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleDonate = () => {
    window.open(PAYMENT_LINKS[selectedAmount], '_blank', 'noopener');
  };

  return (
    <div className="donate-banner">
      <p className="donate-body">
        Hi — I&apos;m Steve from Atlanta. I built this as a small experiment.
        Tips help cover hosting and future improvements ❤️
      </p>

      <div className="amount-selector">
        {[3, 5, 10].map((amount) => (
          <button
            key={amount}
            className={`amount-btn${selectedAmount === amount ? ' selected' : ''}`}
            onClick={() => setSelectedAmount(amount)}
          >
            ${amount}
          </button>
        ))}
      </div>

      <button
        className="donate-cta"
        onClick={handleDonate}
        disabled={selectedAmount === null}
      >
        🙌 Support this project
      </button>
    </div>
  );
}
