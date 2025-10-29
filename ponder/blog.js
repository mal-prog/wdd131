
const articles = [
    {
      id: 1,
      title: 'Septimus Heap Book One: Magyk',
      date: 'July 5, 2022',
      description:
        'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magykcover2.jpg',
      imgAlt: 'Book cover for Septimus Heap 1',
      ages: '10–14',
      genre: 'Fantasy',
      stars: '★★★★☆'
    },
    {
      id: 2,
      title: 'Magnus Chase Book One: Sword of Summer',
      date: 'December 12, 2021',
      description:
        'The anticipated new novel by Rick Riordan. After Greek, Roman, and Egyptian myth series, he tries Norse—and it works.',
      imgSrc: 'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
      imgAlt: 'Book cover for Magnus Chase 1',
      ages: '12–16',
      genre: 'Fantasy',
      stars: '★★★★☆'
    },
    {
      id: 3,
      title: 'Belgariad Book One: Pawn of Prophecy',
      date: 'Feb 12, 2022',
      description:
        "A stolen Orb, clashing gods, and a boy named Garion set out with 'Aunt Pol' and the mysterious Wolf on a world-spanning quest.",
      imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
      imgAlt: 'Book cover for Pawn of Prophecy',
      ages: '12–16',
      genre: 'Fantasy',
      stars: '★★★★★'
    }
  ];
  
  function renderArticles(listEl, items) {
    // Clear any static sample article so everything is dynamic
    listEl.innerHTML = '';
  
    items.forEach((a, i) => {
      const starCount = (a.stars.match(/★/g) || []).length;
      const html = `
        <article class="post" role="group" aria-labelledby="post-title-${i}">
          <aside class="post__rail">
            <em class="post__date">${a.date}</em>
            <p class="post__age">${a.ages}</p>
            <p class="post__genre">${a.genre}</p>
            <p class="stars" aria-label="${starCount} out of 5 stars" role="img">${a.stars}</p>
          </aside>
  
          <section class="post__content">
            <h2 id="post-title-${i}">${a.title}</h2>
            <img src="${a.imgSrc}" alt="${a.imgAlt}">
            <p>${a.description}</p>
          </section>
        </article>
      `;
      listEl.insertAdjacentHTML('beforeend', html);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#blog-articles');
    if (!container) {
      console.warn('Missing #blog-articles container');
      return;
    }
    renderArticles(container, articles);
  });
  
