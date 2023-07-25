// Write your code here
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      teamImageUrl: eachData.team_image_url,
    }))
    this.setState({teamsData: updatedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsData} = this.state
    return (
      <ul>
        {teamsData.map(team => (
          <TeamCard key={team.id} teamData={team} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <div>
          <div data-testid="loader">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1>IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="Rings" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            this.renderTeamsList()
          )}
        </div>
      </div>
    )
  }
}
export default Home
