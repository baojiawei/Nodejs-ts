import '../styles/global.css'
export const App = ({Component, pageProps}) => {
  return ( 
    <Component {...pageProps}/>
   );
}
 
export default App;