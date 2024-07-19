document.addEventListener('DOMContentLoaded', async () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');
    const conversionResult = document.getElementById('conversionResult');

    let rates = {
        "ARS": 0.018,
        "EUR": 0.85,
        "USD": 1.0,
        "JPY": 110.0
    };

    // Función para llenar las opciones de las monedas
    function populateCurrencyOptions() {
        const currencies = ['ARS', 'EUR', 'USD', 'JPY'];
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;

            const option2 = option1.cloneNode(true);

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
    }

    // Función para convertir la moneda
    function convertCurrency() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = parseFloat(amount.value);

        if (isNaN(amountValue) || !from || !to) {
            conversionResult.textContent = 'Por favor, ingrese una cantidad válida y seleccione las monedas.';
            return;
        }

        const usdAmount = amountValue / rates[from];
        const result = usdAmount * rates[to];
        conversionResult.textContent = `Resultado: ${result.toFixed(2)} ${to}`;
    }

    populateCurrencyOptions();

    convertButton.addEventListener('click', convertCurrency);
});
