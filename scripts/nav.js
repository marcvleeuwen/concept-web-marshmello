// slides object array to allow for the dynamic page rendering - this could be retrieved from an API
slideDetails = [
    {
        index: 0,
        id: 'page-happier',
        title: 'Happier',
        subtitle: 'Mershmello X bastille',
        bgImageUrl: 'assets/bg-happier.jpg',
        bgImageAlt: 'Happier slide background',
        ytUrl: 'https://www.youtube.com/embed/QGtPHnCBH3w',
        customClasses: ['page-happier']
    }, {
        index: 1,
        id: 'page-biba',
        title: 'Biba',
        subtitle: 'Marshmello x Pritam',
        bgImageUrl: 'assets/bg-biba.jpg',
        bgImageAlt: 'Biba slide background',
        ytUrl: 'https://www.youtube.com/embed/7gfhI2FQ55s',
        customClasses: ['page-biba']
    }, {
        index: 2,
        id: 'page-everyday',
        title: 'Everyday',
        subtitle: 'Marshmello x Logic',
        bgImageUrl: 'assets/bg-everyday.jpg',
        bgImageAlt: 'Everyday slide background',
        ytUrl: 'https://www.youtube.com/embed/UCdMwyIy3ks',
        customClasses: ['page-everyday']
    }, {
        index: 3,
        id: 'page-alone',
        title: 'Alone',
        subtitle: 'Marshmello',
        bgImageUrl: 'assets/bg-alone.jpg',
        bgImageAlt: 'Alone slide background',
        ytUrl: 'https://www.youtube.com/embed/ALZHF5UqnU4',
        customClasses: ['page-alone']
    }
];

slideObjects = [];

prevIndex = slideDetails.length - 1;
activeIndex = 0;
nextIndex = 1;
hiddenIndex = 2;

function init() {
    //  load all slides into memory - this could be a problem when the there are a lot of slides
    slideDetails.forEach(slide =>
        slideObjects.push({
            index: slide.index,
            el: createSlide(
                slide.id,
                slide.title,
                slide.subtitle,
                slide.bgImageUrl,
                slide.bgImageAlt,
                slide.ytUrl,
                slide.customClasses)
        })
    );
    //  set the prev slide
    document.getElementById('page-container').innerHTML = slideObjects[slideObjects.length - 1].el;
    //  set the active slide
    document.getElementById('page-container').innerHTML += slideObjects[0].el;
    //  set the next slide
    document.getElementById('page-container').innerHTML += slideObjects[1].el;
    //  set the hidden slide to allow the animation to play
    document.getElementById('page-container').innerHTML += slideObjects[2].el;
    //  set active slide
    document.getElementById(slideDetails[activeIndex].id).classList.toggle('page-active');
    //  set scroll position to active page - this allows us to animate for activePage → prevPage navigate
    window.scroll(window.innerWidth * .7, 0);
}

function goNextSlide() {
    // prevent double click until everything is loaded
    document.getElementById('btn-next').toggleAttribute('disabled');
    document.getElementById('btn-prev').toggleAttribute('disabled');
    // remove active class from current slide
    document.getElementById(slideDetails[activeIndex].id).classList.toggle('page-active');
    // add active class to next slide
    document.getElementById(slideDetails[nextIndex].id).classList.toggle('page-active');

    let tempSlide;
    if (hiddenIndex === slideDetails.length - 1) {
        tempSlide = slideObjects[0];
    } else {
        tempSlide = slideObjects[hiddenIndex + 1];
    }

    document.getElementById('page-container').classList.toggle('moveNext');
    window.setTimeout(function () {
        // only process this once the animation is complete
        const el = document.getElementById(slideDetails[prevIndex].id);
        el.parentNode.removeChild(el);

        // insert the the new 'hiddenSlide' to the end of the parent
        document.getElementById('page-container').innerHTML += tempSlide.el;

        // reassign the relative indexes
        prevIndex = activeIndex;
        activeIndex = nextIndex;
        nextIndex = hiddenIndex;
        hiddenIndex = tempSlide.index;

        // remove class so that we can animate this in the future
        document.getElementById('page-container').classList.toggle('moveNext');

        document.getElementById('btn-next').toggleAttribute('disabled');
        document.getElementById('btn-prev').toggleAttribute('disabled');
    }, 750);
}

function goPrevSlide() {
    // prevent double click until everything is loaded
    document.getElementById('btn-next').toggleAttribute('disabled');
    document.getElementById('btn-prev').toggleAttribute('disabled');
    // remove active class from current slide
    document.getElementById(slideDetails[activeIndex].id).classList.toggle('page-active');
    // add active class to next slide
    document.getElementById(slideDetails[prevIndex].id).classList.toggle('page-active');

    let tempSlide;
    if (prevIndex === 0) {
        tempSlide = slideObjects[slideDetails.length - 1];
    } else {
        tempSlide = slideObjects[prevIndex - 1];
    }

    document.getElementById('page-container').classList.toggle('movePrev');
    window.setTimeout(function () {
        // only process this once the animation is complete
        const el = document.getElementById(slideDetails[hiddenIndex].id);
        el.parentNode.removeChild(el);

        // insert the new 'prevSlide' at the beginning of the parent
        const newSlide = document.createElement("section");
        newSlide.innerHTML = tempSlide.el;
        document.getElementById("page-container").insertAdjacentHTML("afterbegin", tempSlide.el);

        // reassign the relative indexes
        hiddenIndex = nextIndex;
        nextIndex = activeIndex;
        activeIndex = prevIndex;
        prevIndex = tempSlide.index;

        // remove class so that we can animate this in the future
        document.getElementById('page-container').classList.toggle('movePrev');

        document.getElementById('btn-next').toggleAttribute('disabled');
        document.getElementById('btn-prev').toggleAttribute('disabled');
        console.log('activeIndex', activeIndex);
    }, 750);
}


function createSlide(id, title, subtitle, bgImageUrl, bgImageAlt, ytUrl, customClasses) {
    return `<section class="page ${customClasses} px-3 py-3" id="${id}">
        <img alt="${bgImageAlt}" src="${bgImageUrl}">
        <div class="video-section">
            <div class="video">
                <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                        frameborder="0" height="315"
                        src="${ytUrl}"
                        width="560"></iframe>
            </div>
            <div class="video-details text-uppercase">
                <h1 class="title">${title}</h1>
                <h3 class="subtitle">${subtitle}</h3>
                <button class="btn btn-listen">listen now</button>
            </div>
        </div>
    </section>`;
}
