import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [highlightedUser, setHighlightedUser] = useState("");
  const [userRankingData, setUserRankingData] = useState(null);
  const [userIndex, setUserIndex] = useState(-1);
 
  useEffect(() => {
    const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;
    var fakeData = `
    [{"user":"Ogheneochuko801@purdu.edu","score":991,"memberSince":"11-21-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Tisloh252@purdu.edu","score":990,"memberSince":"5-12-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Mathuyan764@purdu.edu","score":982,"memberSince":"1-13-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Odynn501@purdu.edu","score":981,"memberSince":"5-1-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Marc-Anthony525@purdu.edu","score":959,"memberSince":"4-28-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Millar456@purdu.edu","score":940,"memberSince":"10-22-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Dalton313@purdu.edu","score":926,"memberSince":"6-7-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kenzie853@purdu.edu","score":925,"memberSince":"3-18-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Vincenzo406@purdu.edu","score":906,"memberSince":"8-6-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Stephen335@purdu.edu","score":899,"memberSince":"3-17-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Tai836@purdu.edu","score":886,"memberSince":"1-11-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ayman928@purdu.edu","score":882,"memberSince":"10-24-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Arved446@purdu.edu","score":880,"memberSince":"7-22-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ruairidh822@purdu.edu","score":880,"memberSince":"7-2-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Bruce938@purdu.edu","score":878,"memberSince":"2-3-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Aled394@purdu.edu","score":869,"memberSince":"1-14-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Arthur520@purdu.edu","score":868,"memberSince":"6-9-2019","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Parker421@purdu.edu","score":861,"memberSince":"8-14-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Nadeem103@purdu.edu","score":860,"memberSince":"3-17-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ross401@purdu.edu","score":849,"memberSince":"1-4-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Spencer774@purdu.edu","score":847,"memberSince":"2-15-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Alfie624@purdu.edu","score":847,"memberSince":"3-28-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Faheem116@purdu.edu","score":841,"memberSince":"1-8-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Luic664@purdu.edu","score":838,"memberSince":"6-10-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Tommi-Lee106@purdu.edu","score":834,"memberSince":"12-17-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Levon586@purdu.edu","score":832,"memberSince":"6-23-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jakey100@purdu.edu","score":828,"memberSince":"5-2-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Cohen540@purdu.edu","score":816,"memberSince":"3-7-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kiegan154@purdu.edu","score":814,"memberSince":"4-10-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jayden-Thomas198@purdu.edu","score":812,"memberSince":"6-28-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ramanas913@purdu.edu","score":801,"memberSince":"8-8-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Armen122@purdu.edu","score":798,"memberSince":"2-25-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ajayraj864@purdu.edu","score":794,"memberSince":"3-10-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Cullen421@purdu.edu","score":793,"memberSince":"6-2-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jad161@purdu.edu","score":791,"memberSince":"4-5-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Faisal600@purdu.edu","score":784,"memberSince":"10-21-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Majid229@purdu.edu","score":781,"memberSince":"3-2-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Yuanyu361@purdu.edu","score":772,"memberSince":"5-26-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Reeve259@purdu.edu","score":771,"memberSince":"6-22-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kenyon396@purdu.edu","score":768,"memberSince":"4-16-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ray866@purdu.edu","score":762,"memberSince":"9-19-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Caelan257@purdu.edu","score":736,"memberSince":"7-9-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Alessio719@purdu.edu","score":735,"memberSince":"5-7-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Arann745@purdu.edu","score":726,"memberSince":"5-19-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ediomi583@purdu.edu","score":724,"memberSince":"8-5-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Cale937@purdu.edu","score":718,"memberSince":"8-13-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Babur850@purdu.edu","score":705,"memberSince":"12-20-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Lennon194@purdu.edu","score":702,"memberSince":"11-2-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Gene440@purdu.edu","score":702,"memberSince":"1-6-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Aziz632@purdu.edu","score":697,"memberSince":"4-22-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kain447@purdu.edu","score":689,"memberSince":"12-27-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Radmiras206@purdu.edu","score":680,"memberSince":"8-17-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Asif791@purdu.edu","score":674,"memberSince":"8-11-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Brynmor357@purdu.edu","score":669,"memberSince":"11-2-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Buddy481@purdu.edu","score":664,"memberSince":"1-16-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Cullen171@purdu.edu","score":648,"memberSince":"4-28-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Basher618@purdu.edu","score":645,"memberSince":"5-26-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Dexter701@purdu.edu","score":636,"memberSince":"11-19-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Pranav838@purdu.edu","score":633,"memberSince":"9-24-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Bryden915@purdu.edu","score":626,"memberSince":"10-4-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Eren454@purdu.edu","score":616,"memberSince":"9-2-2019","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jordyn746@purdu.edu","score":616,"memberSince":"2-9-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Nikhil424@purdu.edu","score":615,"memberSince":"7-15-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kohen455@purdu.edu","score":612,"memberSince":"9-28-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Madison121@purdu.edu","score":610,"memberSince":"9-12-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Chintu418@purdu.edu","score":610,"memberSince":"3-16-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Juan744@purdu.edu","score":609,"memberSince":"9-17-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Diarmaid204@purdu.edu","score":598,"memberSince":"11-13-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kelvin124@purdu.edu","score":596,"memberSince":"2-23-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ardeshir504@purdu.edu","score":589,"memberSince":"5-19-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Tiernan801@purdu.edu","score":573,"memberSince":"2-23-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Richie455@purdu.edu","score":558,"memberSince":"1-12-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Silas340@purdu.edu","score":554,"memberSince":"6-1-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Hishaam630@purdu.edu","score":546,"memberSince":"12-11-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Argyll256@purdu.edu","score":541,"memberSince":"5-7-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Muir585@purdu.edu","score":537,"memberSince":"1-13-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kelvin113@purdu.edu","score":535,"memberSince":"1-26-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Basher435@purdu.edu","score":533,"memberSince":"7-27-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Saim710@purdu.edu","score":531,"memberSince":"12-9-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Arian753@purdu.edu","score":531,"memberSince":"1-15-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Cobie660@purdu.edu","score":523,"memberSince":"4-1-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Torin978@purdu.edu","score":509,"memberSince":"5-5-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jordy776@purdu.edu","score":503,"memberSince":"1-1-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Alexx140@purdu.edu","score":502,"memberSince":"6-5-2019","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Teos214@purdu.edu","score":489,"memberSince":"4-15-2019","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Oscar795@purdu.edu","score":488,"memberSince":"11-7-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Bertie422@purdu.edu","score":483,"memberSince":"5-21-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Daanyaal183@purdu.edu","score":482,"memberSince":"3-14-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Malik692@purdu.edu","score":468,"memberSince":"8-14-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Raheem512@purdu.edu","score":437,"memberSince":"12-2-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"McKade132@purdu.edu","score":420,"memberSince":"5-12-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Munmair697@purdu.edu","score":419,"memberSince":"9-4-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Dhavid537@purdu.edu","score":407,"memberSince":"10-4-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Rafal382@purdu.edu","score":406,"memberSince":"12-14-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jedidiah664@purdu.edu","score":404,"memberSince":"2-16-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Teos187@purdu.edu","score":395,"memberSince":"2-9-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Aonghus621@purdu.edu","score":394,"memberSince":"11-2-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kaidan752@purdu.edu","score":394,"memberSince":"2-14-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Harry292@purdu.edu","score":391,"memberSince":"3-8-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kieryn646@purdu.edu","score":380,"memberSince":"7-6-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Devrin756@purdu.edu","score":358,"memberSince":"7-21-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Lloyd517@purdu.edu","score":351,"memberSince":"8-18-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kierin228@purdu.edu","score":351,"memberSince":"1-16-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Reiss651@purdu.edu","score":338,"memberSince":"12-27-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Conor699@purdu.edu","score":335,"memberSince":"6-5-2019","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Azedine347@purdu.edu","score":332,"memberSince":"10-9-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jackie299@purdu.edu","score":329,"memberSince":"4-25-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Harjyot728@purdu.edu","score":311,"memberSince":"12-18-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Aldred716@purdu.edu","score":308,"memberSince":"12-2-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kedrick235@purdu.edu","score":308,"memberSince":"10-14-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Jaydn935@purdu.edu","score":297,"memberSince":"7-9-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Manolo156@purdu.edu","score":290,"memberSince":"10-1-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Codey740@purdu.edu","score":273,"memberSince":"2-7-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Fynn552@purdu.edu","score":253,"memberSince":"4-15-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Szymon613@purdu.edu","score":250,"memberSince":"6-15-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"CJ705@purdu.edu","score":235,"memberSince":"5-1-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Yuri922@purdu.edu","score":231,"memberSince":"10-2-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Conor808@purdu.edu","score":220,"memberSince":"2-10-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kyie881@purdu.edu","score":216,"memberSince":"8-26-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Harjeevan875@purdu.edu","score":212,"memberSince":"2-23-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ajay362@purdu.edu","score":209,"memberSince":"9-10-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Alfee529@purdu.edu","score":207,"memberSince":"11-9-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Fletcher285@purdu.edu","score":197,"memberSince":"10-10-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Abir568@purdu.edu","score":195,"memberSince":"8-7-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Nihal519@purdu.edu","score":188,"memberSince":"7-13-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Regan352@purdu.edu","score":183,"memberSince":"11-27-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Darius271@purdu.edu","score":177,"memberSince":"8-25-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Vinnie959@purdu.edu","score":169,"memberSince":"3-6-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Rafi516@purdu.edu","score":160,"memberSince":"6-2-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Cohen843@purdu.edu","score":159,"memberSince":"12-28-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Sahbian756@purdu.edu","score":150,"memberSince":"9-26-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Saifaddine956@purdu.edu","score":134,"memberSince":"8-17-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Maddison885@purdu.edu","score":130,"memberSince":"2-10-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kaelin254@purdu.edu","score":109,"memberSince":"5-3-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Raza791@purdu.edu","score":91,"memberSince":"4-8-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Guy738@purdu.edu","score":76,"memberSince":"2-12-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Crombie206@purdu.edu","score":68,"memberSince":"4-12-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Myles735@purdu.edu","score":67,"memberSince":"11-23-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Hope370@purdu.edu","score":49,"memberSince":"1-18-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Abdul-Aziz593@purdu.edu","score":48,"memberSince":"2-9-2010","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Nadeem820@purdu.edu","score":42,"memberSince":"8-21-2018","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Aazaan906@purdu.edu","score":34,"memberSince":"12-6-2014","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Loui914@purdu.edu","score":34,"memberSince":"3-10-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ayren758@purdu.edu","score":30,"memberSince":"1-9-2013","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Nidhish225@purdu.edu","score":25,"memberSince":"10-15-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Ata827@purdu.edu","score":24,"memberSince":"1-20-2011","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Brannan885@purdu.edu","score":22,"memberSince":"4-7-2017","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Morris241@purdu.edu","score":22,"memberSince":"12-27-2015","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Roy418@purdu.edu","score":6,"memberSince":"4-24-2012","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"},{"user":"Kal-el522@purdu.edu","score":2,"memberSince":"7-21-2016","profilePicture":"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}]
    `
    fakeData = JSON.parse(fakeData)
    const fetchLeaderboardData = async () => {
      const response = await axios.get(BACKEND_ENDPOINT+"/user/getLeaderBoardScores");
      var scores = response.data.scores;
      scores = scores.concat(fakeData);
      scores = scores.filter((entry) => entry.score !== -1);
      scores.sort((a, b) => b.score - a.score);
      setLeaderboardData(scores);
      const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
      const username = userCredentials.result.email;   
      
      const foundUserIndex = scores.findIndex((entry) => entry.user === username);   
      setUserIndex(foundUserIndex);
      setHighlightedUser(username);
    };
    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    if (userIndex !== -1) {
      const highlightedUserPage = Math.ceil((userIndex + 1) / recordsPerPage);
      setUserRankingData({
        rank: userIndex + 1,
        score: leaderboardData[userIndex].score,
        memberSince: leaderboardData[userIndex].memberSince,
        userIcon: leaderboardData[userIndex].profilePicture,
        page: highlightedUserPage
      });
      if (highlightedUserPage === 1){
        setUserRankingData(null)
      }
    } else {
      setUserRankingData(null);
    }

  }, [highlightedUser, leaderboardData, recordsPerPage, userIndex]);
  


  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = leaderboardData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(leaderboardData.length / recordsPerPage);
  let pageButtonRangeStart = 1;
  let pageButtonRangeEnd = totalPages;
  if (totalPages > 5) {
    if (currentPage <= 3) {
      pageButtonRangeEnd = 5;
    } else if (currentPage >= totalPages - 2) {
      pageButtonRangeStart = totalPages - 4;
    } else {
      pageButtonRangeStart = currentPage - 2;
      pageButtonRangeEnd = currentPage + 2;
    }
  }
  return (
    <div className="Leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>User</th>
            <th>Points</th>
            <th>Member Since</th>
          </tr>
        </thead>
        <tbody>
          {userRankingData && (
            <tr className="highlighted">
              <td>{userRankingData.rank}</td>
              <td className="UserRow">
                <img className="UserIcon" src={userRankingData.userIcon} alt={`User ${highlightedUser} icon`} />
                {highlightedUser}
                <button className="JumpButton" onClick={() => { setCurrentPage(userRankingData.page) }}>
                  Jump!
                </button>
              </td>
              <td>{userRankingData.score}</td>
              <td>{userRankingData.memberSince}</td>
            </tr>
          )}
          {currentRecords.map((data, index) => (
            <tr key={index} className={data.user === highlightedUser ? "highlighted" : ""}>
              <td className="RankRow">
                {index === 0 && currentPage === 1 ? (
                  <div>
                    <img className="RankIcon" src={require("./assets/gold.png")} alt="Gold icon" />
                    <text>1</text>
                  </div>
                ) : index === 1 && currentPage === 1 ? (
                  <div>
                    <img className="RankIcon" src={require("./assets/silver.png")} alt="Silver icon" />
                    <text>2</text>
                  </div>
                ) : index === 2 && currentPage === 1 ? (
                  <div>
                    <img className="RankIcon" src={require("./assets/bronze.png")} alt="Bronze icon" />
                    <text>3</text>
                  </div>
                ) : (
                  indexOfFirstRecord + index + 1
                )}
              </td>
              <td className="UserRow">
                <img className="UserIcon" src={data.profilePicture} alt="profile" />
                {data.user}
              </td>
              <td>{data.score}</td>
              <td>{data.memberSince}</td>
            </tr>
          ))}


        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((pageNum) => pageNum >= pageButtonRangeStart && pageNum <= pageButtonRangeEnd)
          .map((pageNum) => (
            <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={pageNum === currentPage ? "active" : ""}>{pageNum}</button>
          ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 5)}>...</button>
      </div>

    </div>
  );
}
export default Leaderboard;