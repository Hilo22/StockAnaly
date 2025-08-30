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

   const ctx = document.getElementById('stockChart').getContext('2d');
   const chart = new Chart(ctx, {
       type: 'line',
       data: {
           labels: dateLabels,
           datasets: [{
               label: `Stock Prices for ${Symbol}`,
               data: date_close,
               borderColor: 'rgba(75, 192, 192, 1)',
               borderWidth: 2,
               fill: false
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   type: 'time',
                   time: {
                       unit: 'day'
                   }
               },
               y: {
                   beginAtZero: true
               }
           }
       }
   });
}