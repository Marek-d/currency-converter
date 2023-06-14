import { useEffect, useState } from "react"
import "./CurrencyConverter.css"
import { BsArrowLeftRight } from "react-icons/bs";
import CurrencyInput from "./CurrencyInput";

const URL = "https://api.financie.online/v2/app/vymennekurzy/"

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([])
    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("EUR")
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("USD")
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [isSwitched, setIsSwitched] = useState(false)

    let toAmount, fromAmount, rate
    if (amountInFromCurrency) {
        fromAmount = amount

        if (selectedCurrencyFrom !== "EUR" && selectedCurrencyTo !== "EUR") {
            const currencyObject = currencies.filter(currency => {
                return currency.name === selectedCurrencyFrom
            })

            const currencyObject2 = currencies.filter(currency => {
                return currency.name === selectedCurrencyTo
            })

            if (currencyObject[0] !== undefined && currencyObject2[0] !== undefined) {
                const res = amount / currencyObject[0].rate * currencyObject2[0].rate
                toAmount = res

                // rate = currencyObject2[0].rate
            }
        } else {
            // on one side there is not EUR currency
            let currencyObject

            if (selectedCurrencyFrom !== "EUR") {
                currencyObject = currencies.filter(currency => {
                    return currency.name === selectedCurrencyFrom
                })
            } else {
                currencyObject = currencies.filter(currency => {
                    return currency.name === selectedCurrencyTo
                })
            }

            if (currencyObject[0] !== undefined) {
                if (isSwitched) {
                    toAmount = amount / currencyObject[0].rate
                } else {
                    toAmount = amount * currencyObject[0].rate
                }

                rate = currencyObject[0].rate
            }
        }
    } else {
        toAmount = amount

        if (selectedCurrencyFrom !== "EUR" && selectedCurrencyTo !== "EUR") {
            const currencyObject = currencies.filter(currency => {
                return currency.name === selectedCurrencyFrom
            })

            const currencyObject2 = currencies.filter(currency => {
                return currency.name === selectedCurrencyTo
            })

            // reversed order
            if (currencyObject[0] !== undefined && currencyObject2[0] !== undefined) {
                const res = amount / currencyObject2[0].rate * currencyObject[0].rate
                fromAmount = res

                // rate = currencyObject2[0].rate
            }
        } else {
            let currencyObject

            if (selectedCurrencyFrom !== "EUR") {
                currencyObject = currencies.filter(currency => {
                    return currency.name === selectedCurrencyFrom
                })
            } else {
                currencyObject = currencies.filter(currency => {
                    return currency.name === selectedCurrencyTo
                })
            }

            if (currencyObject[0] !== undefined) {
                if (isSwitched) {
                    fromAmount = amount * currencyObject[0].rate
                } else {
                    fromAmount = amount / currencyObject[0].rate
                }

                rate = currencyObject[0].rate
            }
        }
    }

    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setCurrencies(data.rates)
        })
    }, [])

    const handleSwitchCurrencies = () => {
        let currencyFrom = selectedCurrencyFrom
        setSelectedCurrencyFrom(selectedCurrencyTo)
        setSelectedCurrencyTo(currencyFrom)
        setIsSwitched(!isSwitched)
    }

    const handleFromAmount = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    const handleToAmount = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    return (
        <div className="container">
            <h1>Menová kalkulačka</h1>
            <div className="converter-wrapper">
                <div className="converter">
                    <CurrencyInput
                        currencies={currencies}
                        selectedCurrency={selectedCurrencyFrom}
                        handleChangeCurrency={e => setSelectedCurrencyFrom(e.target.value)}
                        amount={fromAmount}
                        handleChangeAmount={handleFromAmount}
                        title="Suma"
                    />
                    <BsArrowLeftRight className="switch-icon" onClick={handleSwitchCurrencies} />
                    <CurrencyInput
                        currencies={currencies} 
                        selectedCurrency={selectedCurrencyTo}
                        handleChangeCurrency={e => setSelectedCurrencyTo(e.target.value)}
                        amount={toAmount}
                        handleChangeAmount={handleToAmount}
                        title="Prepočet"
                        // disabled="disabled"
                    />        
                </div>

                <div className="result">
                    <p>1,00000 {selectedCurrencyFrom} = <span>{rate}</span> {selectedCurrencyTo}</p>
                    <button>Prepočítať</button>
                </div>
            </div>
        </div>
    )
}

export default CurrencyConverter