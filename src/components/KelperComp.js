import React from "react";
import { actions } from "../actions";
import { connect } from 'react-redux';
import KeplerGl from "kepler.gl";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import './style.css'

class KelperComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            randomCoord: [{lat: 22.7206, long: 75.8472}, {lat: 17.3667, long: 78.4667}, {lat: 13.0825, long: 80.275},
                {lat: 37.8733, long: 112.5425}, {lat: 31.6167, long: 74.85}, {lat: -9.6658, long: -35.735}, {lat: 6.7833, long: -58.1667},
                {lat: 8.6333, long: -70.2167}, {lat: 30.9333, long: 117.7667}, {lat: 41.5933, long: 121.7932}, {lat: -20.3364, long: -40.2936}],
            current: {lat: -1, long: -1}
        }
        this.generate = this.generate.bind(this)
        this.copy2Clipboard = this.copy2Clipboard.bind(this)
        this.runSearch = this.runSearch.bind(this)
    }

    generate() {
        const co_ord = this.state.randomCoord
        this.setState({
            current: co_ord[parseInt(Math.random()*co_ord.length)]
        })
    }

    copy2Clipboard(event) {
        navigator.clipboard.writeText(this.state.current.lat+", "+this.state.current.long)

        // navigator.clipboard.readText().then(clipText =>
        //     console.log("copeid: ", clipText)).catch(err => alert("not copied ", err))
    }

    runSearch() {
        navigator.clipboard.readText()
            .then(text => {
                // `text` contains the text read from the clipboard
                console.log("copied: ", text)
                document.getElementById("hidden-paste-dev").innerText = text
                const toSearch = {
                    lat: parseFloat(text.split(',')[0].trim()),
                    long: parseFloat(text.split(',')[1].trim())
                }
                this.props.updateMap(toSearch)
            })
            .catch(err => {
                // maybe user didn't grant access to read from clipboard
                console.log('Something went wrong', err);
                alert("nothing to copy")
            });
    }

    render() {
        console.log(this.props)
        const MAPBOX_TOKEN = "pk.eyJ1IjoiaGVwb3hlMzI4MiIsImEiOiJja3Azamx3NWcwYnRoMndyMjJxMTdhOG5zIn0.quuawkBkMYeH37fxGAh3XA"
        return (
            <div style={{position: "absolute", width: "100%", height: "100%"}}>
                <div className="header">
                    <button onClick={() => this.runSearch()}>Run</button>
                    <div className="copy" onClick={evt => this.copy2Clipboard(evt)}>{ this.state.current.lat }, { this.state.current.long }</div>
                    <div className="hidden" id="hidden-paste-dev"></div>
                    <button className="refresh-btn" onClick={() => this.generate()}>Refresh</button>
                </div>
                <AutoSizer>
                    {({height, width}) => (
                        <KeplerGl
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            id="map"
                            width={width}
                            height={height}
                            getState={props => props.keplerGl}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    startAction: () => dispatch(actions.startAction),
    stopAction: () => dispatch(actions.stopAction),
    updateMap: toSearch => dispatch({type: actions.updateMap, payload: {latitude: toSearch.lat, longitude: toSearch.long, zoom: 23}})
});

export default connect(mapStateToProps, mapDispatchToProps)(KelperComp);
