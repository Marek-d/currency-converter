import "./CurrencyInput.css"

const CurrencyInput = ({currencies, selectedCurrency, handleChangeCurrency, amount, handleChangeAmount, title, disabled}) => {
    return (
        <div className="amount-box">
            <label htmlFor="amountFrom">{title}</label>
            <div className="input">
                <input
                    type="text"
                    id="amountFrom"
                    value={amount || ''}
                    onChange={handleChangeAmount}
                    disabled={disabled}
                />
                <select
                    name="currency"
                    value={selectedCurrency}
                    onChange={handleChangeCurrency}
                >
                    {
                        currencies.map(currency => {
                            return <option key={currency.name} value={currency.name}>{currency.name}</option>
                        })
                    }
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    )
}

export default CurrencyInput