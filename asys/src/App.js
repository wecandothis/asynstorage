import React, { Component } from 'react';
import './App.css';
import Card from './card'
import Control from './control'
import close from './images/close.png'
import {foolishIn,foolishOut} from 'react-magic'
import {StyleSheet,css} from 'aphrodite'
import elephant from './images/Elephant.png' 

const styles=StyleSheet.create({
     In:{
      animationName:foolishIn,
      animationDuration:'1s'
     },
     Out:{
      animationName:foolishOut,
      animationDuration:"0.5s"
     }

})
const hellodata=require('./data.json')
class App extends Component {
constructor(props){
  super(props);
  this.state={
     cards:[
     {id:'1',text:"## 我的缘分 * 在那遥远的布达拉宫* ",color:"#f5e5a3",fontcolor:'#c9d5a5',top:50,left:150},
     {id:'2',text:"world ",color:"#f5e5a3",fontcolor:'#c9d5a5',top:150,left:150},
     {id:'3',text:"HI ",color:"#f5e5a3",fontcolor:'#c9d5a5',top:350,left:150},
     ],
     animation:true,
     opacitydata:0.6,
     editordata:false,
     zIndex:99
    
  }
}
//组件渲染完成后,提取本地数据
componentDidMount(){
     var data=JSON.parse(localStorage.getItem('stordata'));
     if(data){
        this.setState({cards:data})
     }
     
}
//组件更新后，返回更新后的本地数据
componentDidUpdate(){
  var stordata=JSON.stringify(this.state.cards);
  localStorage.setItem('stordata',stordata)
 

}
ondelete(v){
    var newcards=this.state.cards.filter((_v)=>_v.id!==v.id);
    this.setState({cards:newcards})

}
addstatevalue(data){
    var cardsnew=this.state.cards.slice();
   cardsnew.unshift({id:Date.now(),text:data.text,color:'#'+data.color,fontcolor:data.fontcolor,left:data.left,top:data.top});
   this.setState({cards:cardsnew})
}
exchanganimation(){
  this.setState({
    animation:false
  });
  setTimeout(()=>{this.setState({opacitydata:0,zIndex:-1})},500);
  console.log("123")
}
changeeditor(e){
  this.setState({editordata:!this.state.editordata}) ;
  this.exchanganimation()

}



  render() {
    var show=this.state.editordata?"close":"add";
    var CzIndex=this.state.editordata?-1:99;
    var opacityControl=this.state.editordata?1:0;
 var CompCard=this.state.cards.map(card=>{
      return <Card key={card.id} color={card.color} text={card.text} top={card.top} left={card.left} fontcolor={card.fontcolor} ondelete={this.ondelete.bind(this)} information={card}/>
    })
    var animationdata=this.state.animation?css(styles.In):css(styles.Out);
    
    return <div>
    <div className={`greetingDiv ${animationdata}`} style={{opacity:this.state.opacitydata,zIndex:this.state.zIndex}}>   
         <ul>
         <li>{hellodata.greeting}</li>
         <li>{hellodata.first}</li>
         <li>{hellodata.second}</li>
         <img src={close} onClick={this.exchanganimation.bind(this)} alt='' />
       </ul>
       
    </div>
  <div className="topdiv">
   <img src={elephant} alt='' />
   <span>do you want to say</span>
   <input type="button" onClick={this.changeeditor.bind(this)} ref='button' value={show}/>

     </div>
    
   <Control add={this.addstatevalue.bind(this)}  opacity={opacityControl} CzIndex={CzIndex}/>
  
   <div className="contain">
    {CompCard}
   </div>
    </div>   
  }
}





export default App;
