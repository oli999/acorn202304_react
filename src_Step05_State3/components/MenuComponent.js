// src/components/MenuComponent.js

import { Component } from "react";

class MenuComponent extends Component{
    //상태값
    state={
        selectedList:[] // 선택한 메뉴로 구성된 <li>메뉴</li> jsx 객체를 담을 예정
    }
    //필드 선택한 메뉴 객체(object)를 담을 예정
    selected=[]; 

    //체크박스를 출력할 데이터를 담은 배열 (셈플 데이터)
    menu=[
        {id:1, name:"김밥"},
        {id:2, name:"라면"},
        {id:3, name:"떡복기"},
        {id:4, name:"만두"},
        {id:5, name:"우동"}
    ];

    render(){
        
        // menu 배열에 저장된 내용을 이용해서 jsx 배열을 얻어내기 
        const checkList=this.menu.map((item)=>{
            return (
                <label key={item.id}>
                    <input type="checkbox" onChange={(e)=>{
                        
                        if(e.target.checked){ //만일 체크 되었다면 
                            //체크된 아이템 을 배열에 저장 
                            this.selected.push(item);
                        }else{ //체크가 해제되었다면
                            //체크 해제된 아이템을 배열에서 제거된 배열을 새로 얻어낸다. 
                            this.selected = this.selected.filter(it => it != item); 
                        }
                        //state 를 변화 시켜서 UI 가 update 되도록 한다.
                        const newArray=this.selected.map(item => <li key={item.id}>{item.name}</li>);    
                        this.setState({
                            selectedList:newArray
                        });
                    }}/> {item.name}
                </label>
            );
        });

        return (
            <div>
                <h3>먹고 싶은 메뉴를 체크 하세요</h3>
                {checkList}
                <h3>선택된 메뉴 목록입니다.</h3>
                <ul>
                    {this.state.selectedList}
                </ul>
            </div>
        )
    }
}

export default MenuComponent