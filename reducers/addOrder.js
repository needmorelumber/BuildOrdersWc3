import { UPDATE_CURRENT_BUILD,
         BEGIN_BUILD_UPDATE,
         RESOLVE_BUILD_UPDATE,
         UPDATE_ADD_ORDER_MESSAGE,
         TOGGLE_ADDING_ORDER } from './../actions/build'
import data from './../MasterData';
const addOrderStateReference = {
    inputs:
    {
        "race_unit": {
            name: "race_unit",
            label: "Unit to Build",
            options: [],
            type: "select",
            list: "raceUnits",
            userType: "textarea",
            class: "select"
        },
        "count": {
            name: "count",
            label: "Que how many to build",
            type: "number",
            userType: "textarea",
            class: "input"

        },
        "notes": {
            name: "notes",
            label: "Notes on this command",
            type: "textarea",
            userType: "textarea",
            class: "textarea"

        }
    },
    message: "",
    isFetching: false,
    isShowing: false

}
export function addOrderForm(state = addOrderStateReference, action) {
    switch (action.type) {
        case (UPDATE_CURRENT_BUILD):
            let namesarray = [];
            if (action.payload.item) {
                const race = action.payload.item.build.race;
                const racearray = Object.entries(data[race]);
                for (let i = 0; i < racearray.length; i++) {
                    namesarray.push(racearray[i][0]);
                }
                namesarray.splice(0, 1);
            }
            return Object.assign({}, state, {
                inputs: {
                    "race_unit": {
                        race: action.payload.item.build.race,
                        name: "race_unit",
                        label: "Unit to Build",
                        options: namesarray,
                        type: "text",
                        userType: "datalist",
                        class: "input",
                        list: "unitsForRace"
                    },
                    "count": {
                        name: "count",
                        label: "Que how many to build",
                        type: "number",
                        userType: "number",
                        class: "input"

                    },
                    "notes": {
                        name: "notes",
                        label: "Notes on this command",
                        type: "textarea",
                        userType: "textarea",
                        class: "textarea"

                    }
                }
            })
        case BEGIN_BUILD_UPDATE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RESOLVE_BUILD_UPDATE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case UPDATE_ADD_ORDER_MESSAGE:
            return Object.assign({}, state, {
                message: action.payload.message
            })
        case TOGGLE_ADDING_ORDER:
            return Object.assign({}, state, {
                isShowing: action.payload.bool
            })
        default:
            return state
    }
}