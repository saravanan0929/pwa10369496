$(document).ready(function(){
  var n = localStorage.getItem("bTitle");
  var time = localStorage.getItem("bTime");
  var day = localStorage.getItem("bDay");
  var dataURL = 'https://college-movies.herokuapp.com/';
  $('#bookingTitle').text(n);
  $("#bookingTime").text(time);
  $("#bookingDay").text(day);
});
var seatCounts = 0;
$(function(){
  $('.seat').on('click', function(){
    if($(this).hasClass("selecteds")){
      $(this).toggleClass("selecteds");
      seatCounts--;
    }else
    if(!$(this).hasClass("reserved")){
      var selectedSeats = localStorage.getItem("noofseats");
      if(seatCounts < selectedSeats){
        seatCounts++;
        $(this).toggleClass("selecteds");
      }
      var countSelected = $('.seat.selecteds').length;
    }

  });
})
var seat = 0;
$('.NoOfSeats').change(function(){
  seat = $('#seatcount').val();
  if(seat != 'Default'){
    $('.bookingSeats').show(500);
  }else{
    $('.bookingSeats').hide(300);
  }
  localStorage.setItem("noofseats",seat);
  var total = seat*20;
  $('#total').text(total);
})
$('#comboList').click(function(){
  var total = seat*20;
  $("input[type=checkbox]:checked").each(function() {
        total = parseInt(total)+parseInt($(this).val());
        $('#total').text(total);
  });
})

function getUserDetails(){
  var seatArr = [];
  $('.seat.selecteds').each(function(index,element){
    seatArr[index] = $(this).text();
  });
  var movData = {
    bookingTitle: $('#bookingTitle').text(),
    bookingTime: $('#bookingTime').text(),
    tickets: $('#seatcount').val(),
    cost: $("#total").text(),
    bookingDay: $('#bookingDay').text(),
    seats: seatArr
  }
  console.log(JSON.stringify(movData));
  if(seatArr.length > 0){
    localStorage.setItem("movieData",JSON.stringify(movData));
    console.log(localStorage.getItem("movieData"));
    window.location.href = "../Showtime App/userDetails.html";
  }else{
    alert("Please select seats");
  }
}
