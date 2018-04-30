(function(){
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
'use strict';

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
  window.location.href = "../Trail/booking.html";
}
function getMovies(n){
  $('.loader-div').show()
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
               var title = "<div class='movieContent'><span class='mtitle'>"+data[x].title+"</span> </br> <span class='mDirector'>Director:"+data[x].director+"</span></div>";
               var showtimings = "<div class='timings'><div class='noshw' style='display:none'> No Shows </div>";
               for(var i = 0; i < data[x].runningTimes[n].length; i++){
                 var runtime = data[x].runningTimes[n][i];
                 if(runtime == "14:3"){
                   runtime = "14:30";
                 }
                 var allTimes = runtime.split(":");
                 var part = allTimes[0];
                 var timeClass = "all";
                 if(parseInt(part) > 0){
                   if(parseInt(part) < 12 ){
                     timeClass = 'mor';
                   }else
                   if(parseInt(part) > 12 &&  parseInt(part) <= 16 ){
                     timeClass = 'aft';
                   }else
                   if(parseInt(part) > 16 && parseInt(part) <= 20 ){
                     timeClass = 'evng';
                   }else
                   if(parseInt(part) > 20 && parseInt(part) <= 24 ){
                     timeClass = 'nit';
                   }else
                   {
                     timeClass = 'all';
                   }
                 }
                 showtimings += "<div class='selSeats "+timeClass+"' rel='"+data[x].title+","+runtime+","+day+"' style=''> "+runtime+ "</div>";
               }
               showtimings += "</div>";
               mov += title + showtimings+"</div>";
               movTab +=mov;
             }
             $('.loader-div').hide()
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
var day = weekday[date.getDay()];
$(document).ready(function(){
  tomorrow.setDate(date.getDate()+1);
  var thirdDay = new Date();
  thirdDay.setDate(date.getDate()+2);
  var fourthDay = new Date();
  fourthDay.setDate(date.getDate()+3);
  $("#3day").text(weekday[thirdDay.getDay()]+ ", "+ thirdDay.getDate()+ " "+month[thirdDay.getMonth()]);
  $("#4day").text(weekday[fourthDay.getDay()]+ ", "+ fourthDay.getDate()+ " "+month[fourthDay.getMonth()]);

  getMovies(day);
  $('.showMore').click(function(){
    $('#mov5').toggle(500);
    $('#mov6').toggle(500);
    $('#mov7').toggle(500);
    $('.more').toggleClass('hidCss');
    $('.less').toggleClass('hidCss');
  });

  $('.movDay').on('click',function(){
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
  $('.stretch2').on('click',function(){
    var id = $(this).attr('id');
    $('.noshw').hide();
    $('.selSeats').hide();
    if(id =='alltime'){
      $('.selSeats').show();
    }else if(id =='morning'){
      if($('.selSeats').hasClass("mor")){
        $('.mor').show();
      }else{
        $('.noshw').show();
      }
    }else if(id =='afternoon'){
      if($('.selSeats').hasClass("aft")){
        $('.aft').show();
      }else{
        $('.noshw').show();
    }
    }else
    if(id =='evening'){
      if($('.selSeats').hasClass("evng")){
        $('.evng').show();
      }else{
        $('.noshw').show();
    }
    }else
    if(id =='night'){
      if($('.selSeats').hasClass("nit")){
        $('.nit').show();
      }else{
        $('.noshw').show();
    }
    }else{
      $('.selSeats').show();
    }
  });

});


})();
