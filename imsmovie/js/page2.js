$(function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("id");
    console.log(c);


    $.ajax({
        url:"https://yts.am/api/v2/movie_details.json?movie_id="+c,
        type:"get",

        success: function (res) {
            if(res.status === 'ok'){
                console.log(res);
                var html = '';
                var selectedMovie = res.data.movie;
                var genre = '';
                for(var j = 0; j< selectedMovie.genres.length; j++)
                {
                    var g = selectedMovie.genres[j];
                    genre += g+ '&nbsp';
                }
                var torrent = '';
                for(var m = 0; m< selectedMovie.torrents.length; m++)
                {
                    var q = selectedMovie.torrents[m];
                    torrent += '<a class="button btn btn-md upperCase"  href="magnet:?xt=urn:btih:'+q.hash+'&tr='+q.url+'">'+q.quality+'</a>&nbsp;';
                }

                html = `<div class="col-sm-5">
                                  <div class="big-img-box">
                                    <div class="img1" style="background-image: url(`+selectedMovie.large_cover_image+`)"> </div>
                                  </div>  
                                </div>  
                              <div class="col-sm-6 col-sm-offset-1">
                                  <div class="movie-name">
                                    <p class="movie-text">`+selectedMovie.title+`</p>
                                    <p class="movie-text1">`+selectedMovie.year+`</p>
                                    <p class="movie-text1">`+genre+`</p>
                                    <p class="movie-text2">Available In</p>
                                    `+torrent+`
                                    <p class="movie-text3">Synopsis</p>
                                    <p class="movie-text4">`+selectedMovie.description_full+`</p>
                               </div>
                             </div>`;
                console.log(html);
                $('#page2').html(html);

            }
        }


    })

});