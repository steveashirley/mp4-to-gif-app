import { useState } from 'react';

// Replace these placeholder URLs with your real Stripe Payment Links.
// Create 4 links in the Stripe Dashboard:
//   - $3, $5, $10 as fixed one-time prices
//   - "other" as a "customer chooses price" link (minimum $0.50)
const PAYMENT_LINKS = {
  3:     'https://buy.stripe.com/REPLACE_WITH_$3_LINK',
  5:     'https://buy.stripe.com/REPLACE_WITH_$5_LINK',
  10:    'https://buy.stripe.com/REPLACE_WITH_$10_LINK',
  other: 'https://buy.stripe.com/REPLACE_WITH_CUSTOM_LINK',
};
const MIN_AMOUNT = 0.50;

export function DonateBanner() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [customAmountError, setCustomAmountError] = useState(null);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmountError(null);
    if (amount !== 'other') setCustomAmount('');
  };

  const isCtaDisabled = () => {
    if (selectedAmount === null) return true;
    if (selectedAmount === 'other') {
      const val = parseFloat(customAmount);
      return !val || val < MIN_AMOUNT;
    }
    return false;
  };

  const handleDonate = () => {
    if (selectedAmount === 'other') {
      const val = parseFloat(customAmount);
      if (!val || val < MIN_AMOUNT) {
        setCustomAmountError(`Minimum amount is $${MIN_AMOUNT.toFixed(2)}`);
        return;
      }
      const cents = Math.round(val * 100);
      window.open(`${PAYMENT_LINKS.other}?prefilled_amount=${cents}`, '_blank', 'noopener');
    } else {
      window.open(PAYMENT_LINKS[selectedAmount], '_blank', 'noopener');
    }
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
            onClick={() => handleSelectAmount(amount)}
          >
            ${amount}
          </button>
        ))}
        <button
          className={`amount-btn${selectedAmount === 'other' ? ' selected' : ''}`}
          onClick={() => handleSelectAmount('other')}
        >
          Other
        </button>
      </div>

      {selectedAmount === 'other' && (
        <>
          <div className="custom-amount-wrapper">
            <span className="custom-amount-prefix">$</span>
            <input
              className="custom-amount-input"
              type="number"
              min={MIN_AMOUNT}
              step="0.01"
              placeholder="0.00"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setCustomAmountError(null);
              }}
              autoFocus
            />
          </div>
          {customAmountError && (
            <p className="custom-amount-error">{customAmountError}</p>
          )}
        </>
      )}

      <button
        className="donate-cta"
        onClick={handleDonate}
        disabled={isCtaDisabled()}
      >
        🙌 Support this project
      </button>
    </div>
  );
}
