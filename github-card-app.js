// const testData = [
// 			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
//       {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
//   		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// 	];

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
  // constructor(props){
  //   super(props)
  // }
  // userNameInput = React.createRef()
  state = {
    userName:''
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onNewProfile(resp.data);
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Search User"
          value = {this.state.userName}
          onChange={event =>{
            // console.log(event.target.value)
            this.setState({userName:event.target.value})
          }}
          required/>
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     title:props.title,
  //     profiles:testData,
  //   }
  // }
  
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
