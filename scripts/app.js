(function() {
  'use strict';
  var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container')
  };
  var weekday = new Array(7);
    weekday[0] = "sun";
    weekday[1] = "mon";
    weekday[2] = "tue";
    weekday[3] = "wed";
    weekday[4] = "thu";
    weekday[5] = "fri";
    weekday[6] = "sat";
  var month = new Array(12);
      month[0] = "Jan";
      month[1] = "Feb";
      month[2] = "Mar";
      month[3] = "Apr";
      month[4] = "May";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Aug";
      month[8] = "Sep";
      month[9] = "Oct";
      month[10] = "Nov";
      month[11] = "Dec";
  function selSeats(x,time,day){
    localStorage.setItem("bTitle",x);
    localStorage.setItem("bTime",time);
    localStorage.setItem("bDay",day);
    window.location.href = "../Showtime App/booking.html";
  }
  function getMovies(n){
    var tbl = $('.table');
        if(tbl) {tbl.remove();}
    $.ajax({
           type: "POST",
           dataType: 'json',
           url: dataURL,
           async: true,
           contentType: "application/json; charset=utf-8",
           success: function (data) {
               var movTab ="";
               for (var x = 0; x < 8 ; x++){
                 var mov = "<div id='mov"+x+"' class='table'>";
                 var title = "<ul><li>"+data[x].title+"</li><li> Director:"+data[x].director+"</li></ul>";
                 var showtimings = "<div class='timings'>";
                 for(var i = 0; i < data[x].runningTimes[n].length; i++){
                   var runtime = data[x].runningTimes[n][i];
                   showtimings += "<div class='selSeats' rel='"+data[x].title+","+runtime+","+day+"' style=''> "+runtime+ "</div>";
                 }
                 showtimings += "</div>";
                 mov += title + showtimings+"</div>";
                 movTab +=mov;
               }
               $('#Shows').append(movTab);
               $('#mov5').hide();
               $('#mov6').hide();
               $('#mov7').hide();
               $('.selSeats').click(function() {
                 var cont = $(this).attr('rel');
                 var part=cont.split(",");
                 selSeats(part[0],part[1],selDate);

               });
           }
  });
}
  var dataURL = 'https://college-movies.herokuapp.com/';
  var date = new Date();
  var today = date.getDate();
  var tomorrow = new Date();
  var selDate = "Today";
  tomorrow.setDate(date.getDate()+1);
  var thirdDay = new Date();
  thirdDay.setDate(date.getDate()+2);
  var fourthDay = new Date();
  fourthDay.setDate(date.getDate()+3);

  $("#3day").text(weekday[thirdDay.getDay()]+ ", "+ thirdDay.getDate()+ " "+month[thirdDay.getMonth()]);
  $("#4day").text(weekday[fourthDay.getDay()]+ ", "+ fourthDay.getDate()+ " "+month[fourthDay.getMonth()]);

  var day = weekday[date.getDay()];
  $( document ).ready(function() {
  getMovies(day);
  });

  $('.showMore').click(function(){
    $('#mov5').toggle(500);
    $('#mov6').toggle(500);
    $('#mov7').toggle(500);
    $('.more').toggleClass('hidCss');
    $('.less').toggleClass('hidCss');
});

$('.movDay').on('click',function(){
  var id = $(this).attr('id');
  $('.movDay.selected').removeClass('selected');
  $(this).toggleClass('selected');
  var clicked=$(this).attr('id');
  if(clicked == 'today'){
    day = weekday[date.getDay()];
  }else if(clicked == 'tom'){
    day = weekday[tomorrow.getDay()];
    selDate = "Tomorrow";
  }else if(clicked == '3day'){
    day = weekday[thirdDay.getDay()];
    selDate = $(this).text();
  }else if(clicked == '4day'){
    day = weekday[fourthDay.getDay()];
    selDate = $(this).text();
  }
  getMovies(day);
})
})();
