import './App.css';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App = () => {

  return (

    <div className="content">
      <HeaderContainer />
      <div className="container">
        <GalleryContainer />
      </div>
    </div>

  );
}

export default App;
