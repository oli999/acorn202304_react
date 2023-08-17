import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import FriendComponent from './components/FriendComponent';

/*
function App() {
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>

    </div>
  );
}
*/

//함수형 component 에서 클래스형 component 로 변경하기
class App extends Component{

  state = {
    friends:["김구라", "해골", "원숭이"]
  }
  
  //render() 메소드 에서 리턴해주는 jsx 를 활용해서 화면 구성이 된다.
  render(){
    return (
      <div className="container">
        <h1>인덱스 페이지 입니다.</h1>
        {/* friends 라는 props 명으로 Array 전달하기 */}
        <FriendComponent friends={this.state.friends} 
          updateAction={this.updateAction}
          deleteAction={this.deleteAction}/>  {/* updateAction 라는 props 명으로 function 전달하기 */}
      </div>
    )
  }

  deleteAction = (idx)=>{
    /*
      this.state.friends 배열에서 index 에 해당하는 아이템을 삭제한 새로운 배열을 얻어내서
      state 변경하기 
    */
    const newArray=this.state.friends.filter((item, index)=>{
      if(index != idx){
        return true; //true 가 리턴된 item 만 남겨지고 
      }else{
        return false; //false 가 리턴된 item 은 제거된 새로운 배열이 구성된다. 
      }
    });
    //위의 동작을 좀더 간략히 하면 
    const newArray2=this.state.friends.filter((item, index)=> index != idx);

    this.setState({
      friends:newArray2
    })
  }

  //자식 component 가 특정 시점에서 호출하는 함수 
  updateAction = (data)=>{
    //data 는 {index: x, newName: x} 형식의 object 이다. 

    /*
      this.state.friends 배열에서  index 에 해당하는 아이템을 newName 으로 수정된 새로운 배열
      얻어내서  state 변경하기 
    */
    const newArray=this.state.friends.map((item, index)=>{
      //만일 수정할 인덱스라면 
      if(index == data.index){
        //새로운 이름을 리턴하고 
        return data.newName;
      }else{//그렇지 않으면 원래 이름을 리턴한다. 
        return item;
      }
    });

    //위의 동작을 좀더 간략히 하면 
    const newArray2=this.state.friends
      .map((item,index) => index==data.index ? data.newName : item);

    this.setState({
      friends:newArray
    });
  }
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
