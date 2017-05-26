import React,{Component} from 'react'
import marked from 'marked'
import close from './images/close.png'
//单个卡片的组件
export default class Card extends Component{
  deletecard(){
    this.props.ondelete(this.props.information);
    
  }
   render(){
    var style={
      backgroundColor:this.props.color,
      color:this.props.fontcolor,
      top:this.props.top,
      left:this.props.left
    }
    var changedata=marked(this.props.text);
    
   return <div className="card" style={style}>
     <img src={close} alt="" onClick={this.deletecard.bind(this)}/>
     <div ref='markdiv' dangerouslySetInnerHTML={{ __html: changedata }} ></div>

     </div>
   }
}