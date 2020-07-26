let stickerNum = 0;
//--------------------- Go to Top Button ---------------------
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//--------------------- 

window.addEventListener("DOMContentLoaded", () => {
  
  fetch(`https://rickandmortyapi.com/api/character/`)
    .then(res => res.json())
    .then(data => {

      let characters = data.results;
      
      const totalPages = data.info.pages;

      if (totalPages > 1) {
        for (i = 2; i <= totalPages; i++) {
          let page = i;
          fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
            .then(res => res.json())
            .then(data => {
              characters = characters.concat(data.results);

              if (page === totalPages) {
                stickerNum = 0;
                render(characters);
              }
            })
        }
      } else {
        stickerNum = 0;
        render(characters);
      }
    })
  
 //-----------------------Search ---------------------
  const search = document.querySelector('#instant-search'),
  charactersOutput = document.querySelector('.characters');

  let searchTerm = '',
  output = '';

  search.addEventListener('keyup', debounce(() => {

    charactersOutput.innerHTML = '';

    output = '';

    searchTerm = search.value.replace(' ', '+');

    fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
      .then(res => res.json())
      .then(data => {

        let characters = data.results;
        
        const totalPages = data.info.pages;

        if (totalPages > 1) {
          for (i = 2; i <= totalPages; i++) {
            let page = i;
            fetch(`https://rickandmortyapi.com/api/character/?page=${i}&name=${searchTerm}`)
              .then(res => res.json())
              .then(data => {
                characters = characters.concat(data.results);

                if (page === totalPages) {
                  stickerNum = 0;
                  render(characters);
                }
              })
          }
        } else {
          stickerNum = 0;
          render(characters);
        }
      })
      .catch(err => {
        charactersOutput.innerHTML = `<p class="no-results">No Results Found</p>`;
      })
  }));
  //-------------------------------------------------------------------------------

  //----------------------------- Display -----------------------------------------
  function displayCharacters(character) {

    //characters.forEach(character => {

      var oldArr = character.episode;
      var oldArr = oldArr.join('');
      var str = oldArr.replace(/https:\/+/g, '');
      str = str.replace(/rickandmortyapi.com\//g, '');
      str = str.replace(/api\//g, '');
      str = str.replace(/episode\//g, ' ');
    
      output +=
      `<article class="sticker">
        <button type="button" onclick="this.parentNode.style.display = 'none';"  id="delete" class="btn">Delete</button>
        <div class="title">${character.name}</div>
        <img class="image" src="${character.image}" alt="${character.name}"/>
        <div class="info">
          <div class="info_item">Id: ${character.id}</div>
          <div class="info_item">Gender: ${character.gender}</div>
          <div class="info_item">Species: ${character.species}</div>
          <div class="info_item">Last location: ${character.location.name}</div>
          <div class="info_item">Created at: ${character.created}</div>
          <div class="info_item">Episodes: ${str} </div>
        </div>
      </article>`
    //});
    //sortPosts();
    charactersOutput.innerHTML = output;    
  }
  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  function debounce(func, wait = 800, immediate) {

    let timeout;

    return () => {

      const context = this,
        args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        timeout = null;
        if (!immediate) func.apply(context, args);

      }, wait);

      if (immediate && !timeout) func.apply(context, args);
    };
  }
  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  function render(array) {
    let numPerPage = 10;
    for ( let i = stickerNum; i < stickerNum + numPerPage; i++) {
          displayCharacters(array[i]);
        }
        
    stickerNum += numPerPage;
    window.onscroll = function() { 
      scrollFunction(array);
      scrollButtonFunction();
    };
  }
   
  function scrollFunction(array) {
      
    let maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let currentScroll = window.pageYOffset // || doc.scrollTop;
    if ( currentScroll  ==  maxScroll ) {  
        render(array);
    }
  }
  //-------------------------------------------------------------------------------

  //--------------------- Go to Top Button ---------------------
  topButton = document.getElementById("topBtn");

  function scrollButtonFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }

 
  //--------------------- 

});

// function sortPosts() {
//   const sortBy = window.localStorage.getItem('sortBy') ? window.localStorage.getItem('sortBy') : 'date';

//   if (sortBy == 'date') {
//     posts.sort(sortByDate);
//   } else {
//     posts.sort(sortByTags);
//   }
// }


