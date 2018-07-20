import React, { Component} from 'react'
import axios from 'axios'
import '../pinglun.css'
import qs from 'qs'
export class Pinglun extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:[],
		}
	}
	render(){
		return(
			<div className="pinglun">
			   <div className="headerP">
			       <span onClick={()=>{this.back()}}>返回</span>评论页面
			   </div>
			   <div className="sectionP">
			       <ul>
	         	      {
	         	      	this.state.list.map((item,index)=>{
	         	      		return <li 
	         	      		        key={index}
	         	      		        >
	         	      		        {item.content}
	         	      		        </li>
	         	      	})
	         	      }
	         	   </ul>
			   </div>
			   <div className="footerP">
			      <input type="text" ref="inputvalue"/>
			      <button onClick={this.handleClick.bind(this)}>发表评论</button>
			   </div>
			</div>
		)
	}
	
	back(){
		this.props.history.push({
		    pathname:'/content',
		})
	}
	
	handleClick(){
		let id=this.props.location.pathname.split('/')[2]
		let inputValue=this.refs.inputvalue.value;
        let url='http://guoxiao158.top/joke/addpl.php';
        axios.post(url,qs.stringify({uid:id,pinglun:inputValue})).then((res)=>{
        	const list=[...this.state.list,{content:inputValue,uid:id}];
        	console.log(list)
        	this.setState({
			  list:list
		    })
        })
	}
	
	componentWillMount(){
		var id=this.props.location.pathname.split('/')[2]
		console.log(id)
		var url='http://guoxiao158.top/joke/getpl.php?id='+id;
		axios.get(url).then((res)=>{
			this.setState({
				list:res.data.dataList
			})
		})
	}
	
	
}


