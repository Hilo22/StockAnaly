/*Những điều nên cải thiện:
-đưa key vào trong file .env

*/






const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const APIKEY = 'A34PJ0XTZR791M72';
const tabs= $$('.tab-item');
const panes = $$('.tab-pane');
const tabActive= $('.tab-item.active');
const line = $('.line');
let chartInstance = null;
// Chỉ chạy code line nếu element tồn tại
if (line) {
    line.style.width=tabActive.offsetWidth + 'px';
    line.style.left= tabActive.offsetLeft + 'px';
}

tabs.forEach((tab,index) => {
    const pane = panes[index];

    tab.onclick =function () {
        console.log(this)
        $('.tab-item.active').classList.remove('active');
        tab.classList.add('active');
        
        // Chỉ chạy code line nếu element tồn tại
        if (line) {
            line.style.width=tab.offsetWidth + 'px';
            line.style.left= tab.offsetLeft + 'px';
        }

        $('.tab-pane.active').classList.remove('active');
        pane.classList.add('active');
    }
});
async function fetchStockData(){
Symbol=document.getElementById('stockSymbol').value;
Symbol=Symbol.toUpperCase();
if(Symbol===''){
    alert("Please enter a stock symbol");
    return;
}
fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Symbol}&apikey=${APIKEY}`)
    .then(response => response.json())
    .then(data => {
        if(data['Error Message']){
            const htmlinfo = document.getElementById('stockInfo');
            htmlinfo.innerHTML = `<div class="alert alert-danger">ERROR: ${data['Error Message']}</div>`;
            return;
        }
        console.log(data);


        chartDraw(data,Symbol);
    })
    .catch(error => {
        console.error("Error fetching stock data:", error);
    });

}







async function chartDraw(data,Symbol){
    const dateLabels=Object.keys(data['Time Series (Daily)']).slice(0,30).reverse();
    const date_close= dateLabels.map(date => parseFloat(data['Time Series (Daily)'][date]['4. close']));
    const data_volume= dateLabels.map(date => parseFloat(data['Time Series (Daily)'][date]['5. volume']));

    const ctx1 = document.getElementById('stockChart').getContext('2d');
    chartInstance = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [{
                label: `Stock Prices close for ${Symbol}`,
                data: date_close,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            },
            plugins:{
                title:{
                    display: true,
                    text: `Stock Prices close for ${Symbol}`
                }

            }
        }
    });
    chartInstance.destroy();
}
    