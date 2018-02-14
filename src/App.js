import React, { Component } from 'react';
import './App.css';
import Rooms from './comp/Rooms';
import mySocket from "socket.io-client";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            myImg:require("./assets/ducko.png"),
            myImg2:require("./assets/pigy.png"),
            allusers:[],
            myid: null,
            showRoom: false
        }
    this.handleImg = this.handleImg.bind(this);
    this.showRoom = this.showRoom.bind(this);
    }
    showRoom(roomString){
        this.setState({
            showRoom:true
        });
        this.socket.emit("joinroom", roomString);
    }
handleImg(evt){
    this.refs["u"+this.state.myid].src = evt.target.src;
        
    }
    componentDidMount(){
        //this.socket = mySocket("https://lab5-sockets.herokuapp.com/");
        this.socket = mySocket("localhost:10000");
        
        this.socket.on("userjoined", (data)=>{
           this.setState({
               allusers:data
           }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myid:data
            });
            
           this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myid === null){
                return false;
            }
            this.refs["u"+this.state.myid].style.left = ev.pageX +"px";
            this.refs["u"+this.state.myid].style.top = ev.pageY +"px";
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myid,
                src:this.refs["u"+this.state.myid].src
            });
        });
    
        });
        
        this.socket.on("newmove", (data)=>{
            console.log(data);
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
    }
        
  render() {
            var allImgs = this.state.allusers.map((obj, i)=>{
          return (
          <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i} />
          )
      });
        var comp = null;
        if(this.state.showRoom === false){
        comp = (
            <Rooms showRoom={ this.showRoom }/>
        )
        } else if(this.state.showRoom === true) {
            comp = (
                <div>
                    <div ref="thedisplay" id="display" style={{backgroundColor:"#ffc3e1", height:"100vh", width:"100vw"}}>
                    {allImgs}
                </div>
    
                <div style={{height:"100px", width:"400px", backgroundColor:"grey", position:"absolute", right:"10px", bottom:"10px"}}>{this.state.myid}
                    <img src={this.state.myImg} height={50} onClick={this.handleImg}/>
                    <img src={this.state.myImg2} height={50} onClick={this.handleImg}/>
                </div>
            </div>
            )
        }
      
    return (
    <div>
        {comp}
    </div>
    );
  }
}

export default App;
