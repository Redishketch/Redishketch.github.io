var pageNo = 1;
var perPage = 48;
var totalPage = 0;
var movieName = '2018';
var Genre = '';


function movieSearch(e) {
    $('#_loading').removeClass('close');
    pageNo =1;
    e.preventDefault();
    movieName = $('#_input').val();
    movieList(movieName);
}

function movieList(movieName) {
    $('#page_no').html('');
    $('#movie-box1').html('');
    $('#_loading').removeClass('close');

    $.ajax({
        url:"https://yts.am/api/v2/list_movies.json?query_term="+movieName+"&limit="+perPage+"&page="+pageNo+"&genre="+Genre,
        type:"get",

        success: function (res) {
            if(res.status === 'ok'){
                console.log(res);
                $('#_loading').addClass('close');
                var list = '';
                var pageSetup = '';
                for (var i = 0; i < res.data.movies.length; i++){
                    var eachMovie = res.data.movies[i];
                    var title = eachMovie.title.length >16 ? eachMovie.title.substr(0,16)+'...' : eachMovie.title;
                    var genre = '';
                    for (var j = 0; j <eachMovie.genres.length; j++){
                        var g = eachMovie.genres[j];
                        if(j < 2){
                            genre += g+' <br>';
                        }
                    }

                    list += `<div class="movie-img-box">
                        <div class="movie-img" style="background-image: url(`+eachMovie.medium_cover_image+`)">
                            <div class="hover-box">
                               <i class="fa fa-star fa-2x" style="color:#A98E18; margin-left: 70px;"></i>
                               <p class="rating-text">`+eachMovie.rating+`/10</p>
                               <p class="genre-text">`+genre+`</p>
                               <a href="page2.html?id=`+eachMovie.id+`" class="button btn">View Detail</a>
                           </div>
                        </div>
                        <div class="text-box">
                            <p class="movie-text">`+title+`</p>
                            <p class="movie-text2">`+eachMovie.year+`</p>
                        </div>
                    </div>`;
                }
                $('#movie-box1').html(list);

                totalPage = res.data.movie_count/perPage;
                totalPage = Math.ceil(totalPage);

                if(pageNo === 1){
                    pageSetup = `<li class="disabled">
                    <a aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>`;
                }else{
                   pageSetup += `<li>
                    <a onclick="prePage()" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>`;
                }

                for(var k =1; k <= totalPage; k++){

                    if(k === pageNo){
                        pageSetup += `<li class="active"><a onclick="pageNoUpdate(`+k+`)">`+k+`</a></li>`;
                    }else{
                        pageSetup +=`<li ><a onclick="pageNoUpdate(`+k+`)">`+k+`</a></li>`;
                    }

                }

                if(pageNo === totalPage){
                    pageSetup +=`<li class="disabled">
                <a aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>`;
                }else{
                    pageSetup +=`<li>
                <a onclick="nextPage()" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>`;
                }
                $('#page_no').html(pageSetup);
            }

        }
    })

}


$(function () {
    movieList(movieName);
});

function prePage() {
    pageNo = pageNo -1;
    movieList(movieName);
}

function pageNoUpdate(k) {
    pageNo = k;
    movieList(movieName);
}

function nextPage() {
    pageNo = pageNo + 1;
    movieList(movieName);
}

function movieListbyGenre(genre) {
    Genre = genre;
    movieList(movieName);
}