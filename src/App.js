import { actions } from "./actions";
import { connect } from 'react-redux';
import './App.css';
import KelperComp from "./components/KelperComp";

function App(props) {
    console.log("app => ",props)
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img
    //         src={logo}
    //         className={
    //           "App-logo" +
    //           (props.rotateReducer.rotating ? "":" App-logo-paused")
    //         }
    //         alt="logo"
    //         onClick={
    //           props.rotateReducer.rotating ?
    //               props.stopAction : props.startAction
    //         }
    //     />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //     <section>
    //         <KeplerGl
    //             mapboxApiAccessToken={MAPBOX_TOKEN}
    //             id="map"
    //             width="500"
    //             height="500"
    //             getState={props => props.keplerGl}
    //         />
    //     </section>
    // </div>
      <KelperComp />
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  startAction: () => dispatch(actions.startAction),
  stopAction: () => dispatch(actions.stopAction)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
