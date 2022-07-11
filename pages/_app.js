import '../styles/globals.css'
import NavBar from './components/navbar';
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar/>
      <Component {...pageProps} />{" "}
    </div>
  );
}

export default MyApp
