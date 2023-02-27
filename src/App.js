//import logo from './logo.svg';
import './App.css';
import './test';
//import Test from './test'
import Header from './COMPONENT/header';
import Footer from './COMPONENT/footer';
import Mytable from './COMPONENT/table';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function App() {
return (
  <>
    <Header />
    {/* <FormInput handleChange={handleChange} handleSubmit={handleSubmit} formInputData={formInputData}/> */}
    <Mytable/>
    <Footer />

    
  </>

);
  
}

export default App;
