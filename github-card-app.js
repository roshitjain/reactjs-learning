class Card extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      profile: props
    }
  }
  render(){
    // console.log(this.state)
    return (
      <div className="github-profile">
        <img src={this.state.profile.avatar_url}></img>
        <div className="info">
        <div className="name">{this.state.profile.name}</div>
        <div className="name">{this.state.profile.company}</div>
        </div>
      </div>
      );
  }
}
const CardList = (props) => (
      <div>
        {props.profiles.map(profile=><Card {...profile}/>)}
      </div>
);
  
class Form extends React.Component{
  state = {
    userName:''
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onNewProfile(resp.data);
    this.setState({ userName:'' });
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Search User"
          value = {this.state.userName}
          onChange={event =>{
            console.log(event.target.value);
            this.setState({userName:event.target.value})
          }}
          required/>
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component{
  state = {
    profiles:[],
  };
  
  addNewProfile = (newProfile)=>{
    this.setState(prevState=>({
      profiles : [...prevState.profiles,newProfile]
    }))
  };

render(){
  return(
    <div>
      <div className="header">{this.state.title}</div>
      <Form onNewProfile={this.addNewProfile}/>
      <CardList profiles={this.state.profiles}/>
    </div>
    );
}
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
