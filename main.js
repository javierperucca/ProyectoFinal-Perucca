document.addEventListener('DOMContentLoaded', async () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');
    const conversionResult = document.getElementById('conversionResult');
    const rateChart = document.getElementById('rateChart').getContext('2d');

    let rates = {};
    let chart;

    // Tasas de cambio solo para USD, EUR, JPY
    const allowedCurrencies = ['USD', 'EUR', 'JPY'];

    // Función para obtener tasas de cambio desde un JSON local o una API externa
    async function fetchRates() {
        try {
            const response = await fetch('rates.json');
            const data = await response.json();
            // Filtrar solo las tasas permitidas
            Object.keys(data.rates)
                  .filter(currency => allowedCurrencies.includes(currency))
                  .forEach(currency => {
                      rates[currency] = data.rates[currency];
                  });
            await populateCurrencyOptions();
            await initializeRateChart();
        } catch (error) {
            console.error('Error fetching rates:', error);
        }
    }

    // Función para llenar las opciones de las monedas
    async function populateCurrencyOptions() {
        const currencyOptions = Object.keys(rates);
        currencyOptions.forEach(currency => {
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

    // Función para inicializar el gráfico de tasas de cambio
    async function initializeRateChart() {
        chart = new Chart(rateChart, {
            type: 'bar',
            data: {
                labels: Object.keys(rates),
                datasets: [{
                    label: 'Tasas de Cambio',
                    data: Object.values(rates),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    convertButton.addEventListener('click', convertCurrency);

    // Cargar las tasas de cambio al cargar la página
    await fetchRates();
});
