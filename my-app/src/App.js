import React, { Component } from 'react';
import alert from './attention.png';
import './App.css';
import fork from './fork.svg';
import star from './star.svg';



class App extends Component {
    
    constructor(props) {
    super(props);
    
    this.state={users:[],
    isLoading:true,clicked:false}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({clicked: true});
 
    }

  
  componentWillMount() {
  fetch('https://api.github.com/search/repositories?q=TEST')
    .then(response => response.json())
    .then(data => this.setState({ users:data,isLoading:false }));
    
}


render() {
   var value = this.state;
   let start;
   let result_class = this.state.clicked ? "ShowResults" : "HideResults";
  if(!this.state.isLoading){
   
start=(<div className={result_class}>
 {value.users.items.map((value,index) =>{
    return <CardComponent key={index} name={value.name} imgsrc={value.owner.avatar_url} ele={value.description} score={Math.floor(value.score)} fork={value.forks_count} op_issues={value.open_issues_count} link={value.html_url}/>})}</div>)

   }
 
  

  return ( 
    <div className="App">
   
      <div className="SearchField">
     <div className="SearchHeading">Git Repo Search Filter</div> 
      <input type="text" value="TEST"></input>
      <button onClick={this.handleClick} >Search</button>
      </div>
      <div className="App-intro">
   <div className="Title">Repo Search Result</div>
    {start}
    </div>
    </div>
  );

}

};

class CardComponent extends Component {
  constructor(props) {
    super(props);
    
  
  }

render(){
 
   

  return(
  <div className="Card">
   <img src={this.props.imgsrc} alt="logo" />  
  <div className="Name">{this.props.name}</div>
 <div className="IconContainer">
  <span><img className="icons" src={star}></img>{this.props.score}</span>
 
 <span><img  className="icons" src={fork}></img>Fork :{this.props.fork}</span>
 
 <span><img className="icons"src={alert}></img> Open Issues :{this.props.op_issues}</span>
 </div>
  <div className="description">{this.props.ele}</div>
  
 
  <a  className="LinkButton" href={this.props.link}>VIEW PROFILE</a> 

  </div>
  );}
}

export default App;
