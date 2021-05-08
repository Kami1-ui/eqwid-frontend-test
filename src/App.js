import './App.css';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App = () => {

  return (
    <>
      <HeaderContainer />
      <div className="container">
        <GalleryContainer />
      </div>
    </>
  );
}

export default App;
