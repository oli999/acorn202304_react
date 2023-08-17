// src/components/FriendComponent.js

import { Component } from "react";

class FriendComponent extends Component{
    render(){
        //부모 component 에서 전달된 props 얻어내서 사용하기 
        const friends=this.props.friends;
        //배열에 저장된 아이템을 이용해서 <li></li> 요소가 여러개 들어간 jsx 배열을 얻어낸다.
        /*
            [<li>김구라</li>, <li>해골</li>, <li>원숭이</li> ]
        */
        const jsxList = friends.map((item, index)=>{
            return (
                <li key={index}>
                    {item}
                    <button onClick={()=>{
                        const newName=prompt(`${item} 의 새로운 이름을 입력하세요!`);
                        //부모 component 로 부터 전달받은 함수 호출하면서 object 전달하기
                        this.props.updateAction({index, newName});
                    }}>수정</button>
                    <button onClick={()=>{
                        //부모 component 로 부터 전달받은 함수 호출하면서 number 전달하기 
                        this.props.deleteAction(index);
                    }}>삭제</button>
                </li>
            )
        });

        //얻어낸 jsx 배열을 ul 의 자식요소에 추가해서 리턴한다.
        return (
            <ul>
                {jsxList}
            </ul>
        )
    }
}

export default FriendComponent