import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [highlightedUser, setHighlightedUser] = useState("");
  const [userRankingData, setUserRankingData] = useState(null);


  useEffect(() => {
    const generateFakeData = () => {
      const data = [];
      const startDate = new Date("January 1, 2023");
      for (let i = 1; i <= 20000; i++) {
        const score = Math.floor(Math.random() * 100);
        const memberSince = new Date(startDate.getTime() + i * 86400000);
        data.push({
          username: `user${i}`,
          score,
          memberSince: memberSince.toLocaleDateString("en-US"),
          userIcon: `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`
        });
        setHighlightedUser(`user${i}`);
      }
      return data;
    };

    const sortedData = generateFakeData().sort((a, b) => b.score - a.score);
    setLeaderboardData(sortedData);
  }, [setHighlightedUser]);

  useEffect(() => {

    const userIndex = leaderboardData.findIndex((data) => data.username === highlightedUser);
    console.log(userIndex)
    if (userIndex !== -1) {
      const highlightedUserPage = Math.ceil((userIndex + 1) / recordsPerPage);
      setUserRankingData({
        rank: userIndex + 1,
        score: leaderboardData[userIndex].score,
        memberSince: leaderboardData[userIndex].memberSince,
        userIcon: leaderboardData[userIndex].userIcon,
        page: highlightedUserPage
      });
    } else {
      setUserRankingData(null);
    }

  }, [highlightedUser, leaderboardData, recordsPerPage]);
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
            <tr key={index} className={data.username === highlightedUser ? "highlighted" : ""}>
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
                <img className="UserIcon" src={data.userIcon} alt={`User ${data.username} icon`} />
                {data.username}
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