import React from 'react'

// React.Component 를 상속받아서 Component 만들기
class Child extends React.Component{

    // render() 함수에서 리턴하는 jsx 로 화면이 구성된다 
    render(){
        return(
            <div className="child">
                자식 컴포넌트 입니다
            </div>
        )
    }
}

// 파일을 import 하는 곳에 위에 정의된 클래스를 default 로 넘겨주기
export default Child