// components/MyNameComponent.js

import { Component } from "react";

class MyName extends Component{
    render(){
        // 부모 Component 에서 전달한 값(properties) 얻어내기
        const name=this.props.name // name 이라는 이름으로 전달된 properties 

        return (
            <p>
                내 이름은 : <strong>{name}</strong> 입니다.
            </p>
        )
    }
}

export default MyName