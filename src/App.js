import React, { Component } from 'react'
import Food from './components/Food'
import Snack from './components/Snack'
  const random=()=>{
    const a = Math.floor(Math.random()*98)
          if(a%4===0) {
            return a
         }else{
             return random()
         }
  }
  // const random =()=>{
  //   let max=98;
  //   let min=1;
  //   let x =Math.floor((Math.random()*max+min)/2)*4
  // }
  const initState ={
     direction:'right',
    food:[random(),random()],
    snackDots:[[0,0],[4,0]],
    speed:300
  }
class App extends Component {
 
  state=initState;
  

  componentDidMount(){
    setInterval(this.moveSnack,this.state.speed)
 
    document.onkeydown=this.KeyDone;
  }

  componentDidUpdate(){
    this.cheakBorder();
    this.checkSelf();
    this.eatFood();
  }

  KeyDone=(e)=>{
    console.log(e.keyCode)
      switch(e.keyCode){
        case 38:this.setState({direction:'top'});
        break;
        case 40:this.setState({direction:'down'});
        break;
        case 37:this.setState({direction:'left'});
        break;
        case 39:this.setState({direction:'right'});
        break;
        default:this.setState({direction:'right'});
      }
  }
  moveSnack=()=>{
    let dots = [...this.state.snackDots];
    let head = dots[dots.length-1];
    switch (this.state.direction) {
      case 'right':
        head=[head[0]+4,head[1]]
        break;
      case 'left':
        head=[head[0]-4,head[1]]
        break;
      case 'down':
        head=[head[0],head[1]+4]
        break;
      case 'top':
        head=[head[0],head[1]-4]
        break;
  
      default:
        break;
    }
    console.log(head)
   
    dots.push(head);
    dots.shift()
    this.setState({
      snackDots:dots
    })

  }


  cheakBorder=()=>{
    let dots = [...this.state.snackDots];
    let head = dots[dots.length-1];
  
    if(head[0]>96){
      head[0]=0;
    }else if(head[0]<0){
      head[0]=96;
    }
    if(head[1]>96){
      head[1]=0
    }else if(head[1]<0){
      head[1]=96
    }
  }

  checkSelf=()=>{
    let dots = [...this.state.snackDots];
    let head = dots[dots.length-1];
    dots.pop();
    dots.forEach((item,index)=>{
      if(head[0]===item[0]&&head[1]===item[1]){
      this.onGameOver();
    }
    })
  
    
  }

  onGameOver=()=>{
    alert(`游戏结束 分数：${this.state.snackDots.length}`)
    this.setState(initState)
  }

  eatFood=()=>{
    let dots = [...this.state.snackDots];
    let head = dots[dots.length-1];
    let food=this.state.food
    if(head[0]===food[0]&&head[1]===food[1]){
      this.setState({
        food:[random(),random()]
      })
        this.largeSnack();
    }
    dots.unshift();
    dots.forEach(item=>{
      if(food[0]===item[0]&&food[1]===item[1]){
        this.setState({
          food:[random(),random()]
        })
      }
    })
  }
  largeSnack=()=>{
    let dots = [...this.state.snackDots];
    dots.unshift([]);
    this.setState({
      snackDots:dots,
    })
  }
  render() {
    return (
      <div className='game-area'>
          
      <Snack snackDots={this.state.snackDots}></Snack>
        <Food food={this.state.food}></Food>
      </div>
    )
  }
}
export default App