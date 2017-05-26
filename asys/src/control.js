import React,{Component} from 'react'
import './jscolor.min'
import marked from 'marked'
import up from './images/up.png'
import down from './images/down.png'
import left from './images/left.png'
import right from './images/right.png'
//逻辑组件
export default  class Control extends Component{
  constructor(props){
    super(props);
    this.state={
      text:'',color:'#f8f2ff',fontcolor:'black',top:10,left:10,show:false
    }  
  }
  //设置文本
 handlechange(e){
   e.preventDefault()
   this.setState({text:e.target.value})
 }
 //设置背景颜色
 handlechangecolor(e){
  e.preventDefault()
  this.setState({color:e.target.value});
  this.refs.markdiv.style.backgroundColor='#'+e.target.value
  
 }
 //设置字体颜色
 handlechangelettercolor(e){
  e.preventDefault()
  this.setState({fontcolor:e.target.value})
   this.refs.markdiv.style.color='#'+e.target.value
 }
//储存数据
 addvalue(){
  this.props.add(this.state)
 }

 changpositionU(e){
  var presentu=this.state.top
  e.preventDefault()
   this.setState({top:presentu+50})
   console.log(this.state.top)
   this.refs.markdiv.style.top=this.state.top
 }
 
 changpositionD(e){
  var presentd=this.state.top
  e.preventDefault()
   this.setState({top:presentd-50})
   this.refs.markdiv.style.top=this.state.top

 }
 changpositionL(e){
  var presentl=this.state.left
  e.preventDefault()
   this.setState({left:presentl+50})
   this.refs.markdiv.style.left=this.state.left
 }
 changpositionR(e){
  var presentr=this.state.left
  e.preventDefault()
   this.setState({left:presentr-50})
   this.refs.markdiv.style.left=this.state.left
 }

  render(){
    const aaa=marked(this.state.text)
    const styles={backgroundColor:this.state.color,color:this.state.fontcolor,top:this.state.top,left:this.state.left}
      return <div className='bgdiv' style={{opacity:this.props.opacity,zIdex:this.props.CzIndex}}>
    <div className='editordiv' >      
        <textarea placeholder="请在这里输入" onChange={this.handlechange.bind(this)}></textarea>
        <span>背景颜色</span><input className='jscolor' onBlur={this.handlechangecolor.bind(this)} />
        <span>字体颜色</span><input className='jscolor' onBlur={this.handlechangelettercolor.bind(this)} />   
        <img src={up} alt=' ' onClick={this.changpositionU.bind(this)} / >
        <img src={down} alt=' 'onClick={this.changpositionD.bind(this)} />
        <img src={left} alt=' ' onClick={this.changpositionL.bind(this)}/>
        <img src={right} alt=' ' onClick={this.changpositionR.bind(this)}/>
        <button onClick={this.addvalue.bind(this)}>add</button>
    </div>
        <div ref='markdiv' className='markdiv' dangerouslySetInnerHTML={{ __html: aaa }} style={styles}></div>
    </div>
    }
}
