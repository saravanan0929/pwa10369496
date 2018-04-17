$(document).ready(function(){
  var mData = {};
  mData = localStorage.getItem("movieData");
  console.log(JSON.parse(mData));
  $('#moviename').text(JSON.parse(mData).bookingTitle);
  $('#movieTime').text(JSON.parse(mData).bookingTime);
  $('#movieDate').text(JSON.parse(mData).bookingDay);
  $('#seatNo').text(JSON.parse(mData).seats);
  $('#tickets').text(JSON.parse(mData).tickets);
  $('#cost').text("EUR "+JSON.parse(mData).cost);



});
function finish(){
  localStorage.setItem("username",$('#name').val());
  window.location.href = "../Showtime App/success.html";
}
