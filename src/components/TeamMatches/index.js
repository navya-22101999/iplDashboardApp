// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    matchesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latest_match_details.id,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        date: fetchedData.latest_match_details.date,
        firstInnings: fetchedData.latest_match_details.first_innings,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        matchStatus: fetchedData.latest_match_details.match_status,
        result: fetchedData.latest_match_details.result,
        secondInnings: fetchedData.latest_match_details.second_innings,
        umpires: fetchedData.latest_match_details.umpires,
        venue: fetchedData.latest_match_details.venue,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatches => ({
        umpires: recentMatches.umpires,
        result: recentMatches.result,
        manOfTheMatch: recentMatches.man_of_the_match,
        id: recentMatches.id,
        date: recentMatches.date,
        venue: recentMatches.date,
        competingTeam: recentMatches.competing_team,
        competingTeamLogo: recentMatches.competing_team_logo,
        firstInnings: recentMatches.first_innings,
        secondInnings: recentMatches.second_innings,
        matchStatus: recentMatches.match_status,
      })),
    }
    this.setState({matchesData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesData
    return (
      <div>
        <img src={teamBannerUrl} alt={latestMatchDetails} />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData
    return (
      <ul>
        {recentMatches.map(eachMatch => (
          <MatchCard matchData={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="BallTriangle" color="blue" width={80} height={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">{this.renderLoader()}</div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}
export default TeamMatches
