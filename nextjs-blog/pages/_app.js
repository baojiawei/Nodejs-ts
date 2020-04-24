import '../styles/global.css'
import 'antd/dist/antd.css'
export const App = ({Component, pageProps}) => {
  return ( 
    <Component {...pageProps}/>
   );
}
 
export default App;