const startAction = {
    type: "rotate",
    payload: true
};

const stopAction = {
    type: "rotate",
    payload: false
};

const updateMap = "updateMap"

export const actions = {
    startAction: startAction,
    stopAction: stopAction,
    updateMap: updateMap
}