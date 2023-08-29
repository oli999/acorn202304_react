/*
    index.js 파일은 폴더를 import 해서 안에 들어있는 자원들을
    좀더 편리하게 가져가서 사용할수 있게 해준다.

    - 필요한 곳에서 아래와 같이 import 해서 사용할수 있다.

    import {Home, About, NotFound} from 'index.js 파일이 존재하는 폴더' 
*/

export { default as Home } from './Home';
export { default as About } from './About';
export { default as NotFound } from './NotFound';
