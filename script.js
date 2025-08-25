
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs= $$('.tab-item');
const panes = $$('.tab-pane');
const tabActive= $('.tab-item.active');
const line = $('.line');

line.style.width=tabActive.offsetWidth + 'px';
line.style.left= tabActive.offsetLeft + 'px';


tabs.forEach((tab,index) => {
    const pane = panes[index];

    tab.onclick =function () {
        $('.tab-item.active').classList.remove('active');
        tab.classList.add('active');
        line.style.width=tab.offsetWidth + 'px';
        line.style.left= tab.offsetLeft + 'px';

        $('.tab-pane.active').classList.remove('active');
        pane.classList.add('active');
    }
});

