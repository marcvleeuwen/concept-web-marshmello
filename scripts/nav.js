pages = ['happier', 'biba', 'everyday', 'alone'];

function init() {
    window.scroll(0, 0);
}

function navClicked(pos) {
    document.getElementById('btn-next').toggleAttribute('disabled');
    document.getElementById('btn-prev').toggleAttribute('disabled');
    const activePage = document.getElementsByClassName('page-active')[0].id;
    let activeIndex = this.pages.indexOf(activePage.substring(5, activePage.length));

    document.getElementById(`page-${pages[activeIndex]}`).classList.toggle('page-active');

    move(activeIndex, activePage, pos === 'b' ? 'back' : 'forward');

    window.setTimeout(function () {
        document.getElementById('btn-next').toggleAttribute('disabled');
        document.getElementById('btn-prev').toggleAttribute('disabled');
    }, 250);
}

function move(activeIndex, activePage, direction) {
    let nextPage = '';
    let prevPage = '';
    if (activeIndex === pages.indexOf('alone')) {
        nextPage = pages[0];
        prevPage = pages[pages.indexOf(activePage) - 1];
        if (direction === 'back' && prevPage) {
            window.scrollBy(-(window.innerWidth * .7), 0);
            document.getElementById(`page-${prevPage}`).classList.toggle('page-active');
        } else if (direction === 'forward' && nextPage) {
            window.scroll(0, 0);
            document.getElementById(`page-${nextPage}`).classList.toggle('page-active');
        }
    } else if (activeIndex === 0) {
        nextPage = pages[activeIndex + 1];
        prevPage = pages[pages.length - 1];
        if (direction === 'back' && prevPage) {
            window.scroll(((window.innerWidth * .7) * pages.length) - (window.innerWidth * .7), 0);
            document.getElementById(`page-${prevPage}`).classList.toggle('page-active');
        } else if (direction === 'forward' && nextPage) {
            window.scrollBy(window.innerWidth * .7, 0);
            document.getElementById(`page-${nextPage}`).classList.toggle('page-active');
        }
    } else {
        nextPage = pages[activeIndex + 1];
        prevPage = pages[activeIndex - 1];
        if (direction === 'back' && prevPage) {
            window.scrollBy(-(window.innerWidth * .7), 0);
            document.getElementById(`page-${prevPage}`).classList.toggle('page-active');
        } else if (direction === 'forward' && nextPage) {
            window.scrollBy(window.innerWidth * .7, 0);
            document.getElementById(`page-${nextPage}`).classList.toggle('page-active');
        }
    }
}
