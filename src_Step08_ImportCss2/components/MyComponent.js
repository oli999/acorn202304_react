// src/components/MyComponent.js

import "../css/custom.css";
// classnames import
import cn from "classnames";

//bootstrap 모듈 css 를 import 
import boot from "../css/bootstrap.module.css";
//모듈화된 css 를 좀더 편하게 사용하기 위해서 classnames 를 boot 에 바인딩(연결) 하기
import classBinder from "classnames/bind";

import { useState } from "react";

// bootstrap css 가 바인딩된 함수 얻어내기 
const cx = classBinder.bind(boot);

export default function MyComponent(){
    //폼 유효성을 관리할 useState() 
    const [state, setState] = useState({
        isIdValid:false,
        isIdDirty:false,
        isPwdValid:false,
        isPwdDirty:false,
        isFormValid:false
    });

    return (
        <div>
            <h3>My Component</h3>
            <p className={cn("text-red", "bg-green")}>p1</p>
            <p className={cn({"text-red":true, "bg-green":true})}>p2</p>
            <p className={cn(["text-red", "bg-green"])}>p3</p>
            <button className={cn([boot["btn"], boot["btn-primary"]])}>버튼</button>
            <button className={cx(["btn", "btn-primary"])}>버튼2</button>
            <h3>폼 validation</h3>
            <form action="insert" onSubmit={(e)=>{
                e.preventDefault();
                alert("전송합니다!");
            }}>
                <div>
                    <label className={cx("form-label")} htmlFor="id">아이디</label>
                    <input type="text" 
                        className={cx("form-control", {
                            "is-invalid":!state.isIdValid && state.isIdDirty,
                            "is-valid":state.isIdValid
                        })} 
                        onChange={(e)=>{
                            
                            //아이디 유효성 여부를 얻어내서 
                            const isIdValid=e.target.value.length >= 3;
                            //상태값을 바꿔준다. 
                            setState({
                                ...state,
                                isIdDirty:true,
                                isIdValid,
                                isFormValid:isIdValid && state.isPwdDirty
                            });
                        }}
                        id="id" />
                    <div className={cx("invalid-feedback")}>3글자 이상 입력하세요</div>
                </div>
                <div>
                    <label className={cx("form-label")}  htmlFor="pwd">비밀번호</label>
                    <input type="password" 
                        className={cx("form-control", {
                            "is-valid": state.isPwdValid,
                            "is-invalid": !state.isPwdValid && state.isPwdDirty
                        })}
                        onChange={(e)=>{
                            //특수문자가 포함되었는지 여부를 테스트할 정규표현식 
                            const reg=/[\W]/;
                            //입력한 비밀번호가 정규표현식을 통과하는지 여부 알아내기 
                            const isPwdValid = reg.test(e.target.value);
                            setState({
                                ...state,
                                isPwdDirty:true,
                                isPwdValid,
                                isFormValid:isPwdValid && state.isIdDirty
                            })
                            
                        }} 
                        id="pwd"/>
                    <div className={cx("invalid-feedback")}>특수문자를 1개 이상 조합하세요</div>
                </div>
                <button disabled={!state.isFormValid} className={cx("btn", "btn-primary")} type="submit">가입</button>
            </form>
        </div>
    );
}