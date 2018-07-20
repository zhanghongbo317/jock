import React,{ Component } from 'react'
import '../App.css'
import axios from 'axios'
import {
   Link
} from 'react-router-dom'
export class Main extends Component{
	constructor(props){
	  	super(props);
	  	this.state={
	  		list:[],
	  		page:1,
	  		flag:1,
	  		zanNum:0,
	  		hits:0
	  	}
	  }
	render (){
		return (
			<div className="main">
			    <div className="header">
	         	   <img src="header.png" alt=""/>
	         	</div>
	         	<div className="section">
	         	   <ul>
	         	      {
	         	      	this.state.list.map((item,index)=>{
	         	      		return  (<div key={index} className="item">
	         	      		        <Link
	         	      		         to={`/pinglun/${item.id}`}  
	         	      		         >
		         	      		       <li>
		         	      		          {item.content}
		         	      		          
		         	      		        </li>
		         	      		        
	         	      		        </Link> 
	         	      		        <span onClick={()=>{this.zan(item.id)}} >点赞{item.hits}</span>
	         	      		        </div>)
	         	      	})
	         	      }
	         	   </ul>
	         	</div>
			</div>
		)
	}

	getData(){
		var url='http://guoxiao158.top/joke/getjoke.php?page='+this.state.page
  	    axios.get(url).then((res)=>{
  	    	var list=this.state.list.concat(res.data.dataList)
  	    	console.log(res.data)
	  		this.setState({
	  			list:list,
	  			flag:1
	  		})
  	    })
	}
	zan(id){
		console.log(id)
		var url='http://guoxiao158.top/joke/updata.php?id='+id
  	    axios.get(url).then((res)=>{
  	    	console.log(res)
  	    	var url='http://guoxiao158.top/joke/getjoke.php?page='+this.state.page
	  	    axios.get(url).then((res)=>{
		  		this.setState({
		  			list:res.data.dataList
		  		})
	  	    })
  	    	alert('点赞成功')
	    	this.setState({
	    		hits:res.data.hits
	    	})
  	    })
		
	}
	componentDidMount(){
		var that=this;
		var section=document.getElementsByClassName('section')[0]
		section.addEventListener('scroll',function(){
			var a=section.scrollHeight;
			var b=section.clientHeight;
			var c=section.scrollTop ||  document.body.scrollTop;
			    if(a-b-c<=50 && that.state.flag === 1){
			    	that.setState({
			    		page:++that.state.page,
						flag:0
			    	})
			    	that.getData()
			    }
		})
	}
	componentWillMount(){
  	   this.getData()
  }
}
