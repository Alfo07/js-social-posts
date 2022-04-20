//Creiamo un array di oggetti contentente, id del post, numero progressivo da 1 a n, nome autore, foto autore, data in formato americano (mm-gg-yyyy), testo del post, immagine (non tutti i post devono avere una immagine), numero di likes.
//Creare una funzione che stampa i post
//Creare una funzione per cambiare il colore del tasto like al click e per incrementare il numero di like
//Creare una funzione per salvare in un array secondario gli id dei post a cui abbiamo messo mi piace
//BONUS ---> Formattare le date in formato italiano (gg/mm/aaaa), gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF), al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

//Array contenente i dati dei post
const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

//Secondo array contenente gli id dei post a cui abbiamo messo mi piace
const like = [];

//Funzione per creare il post
function postGrid(post) {
  const grid = `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                ${
                  post.author.image
                    ? `<img class="profile-pic" src="${post.author.image}" alt="${post.author.name}"> `
                    : `<div class="profile-pic-default"><span>${post.author.name}</span></div>`
                }                   
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${new Date(
                      post.created
                    ).toLocaleDateString()}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        <div class="post__image">
            <img src="${post.media}" alt="img">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${
                      post.id
                    }">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${
                      post.id
                    }" class="js-likes-counter">${post.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;
  return grid;
}

//Funzione per stampare il post
function printCard() {
  let container = document.getElementById("container");
  let print = "";
  posts.forEach((post) => {
    const card = postGrid(post);
    print += card;
  });
  container.innerHTML += print;
}
printCard();

//Funzioni per la modifica del tasto like e del counter
function likeIt(checkLike, postid) {
  const likeCounter = document.getElementById(`like-counter-${postid}`);
  let likeValue = parseInt(likeCounter.innerText);
  if (checkLike) {
    like.push(postid);
    likeCounter.innerText = likeValue + 1;
  } else {
    const index = like.indexOf(postid);
    if (index !== -1) like.splice(index, 1);
    likeCounter.innerText = likeValue - 1;
  }
}

function likeButton() {
  const button = document.querySelectorAll("[data-postid]");
  button.forEach((buttonLike) => {
    buttonLike.addEventListener("click", function (event) {
      event.preventDefault();
      this.classList.toggle("like-button--liked");
      const check = this.classList.contains("like-button--liked");
      likeIt(check, this.dataset.postid);
    });
  });
}

likeButton();
