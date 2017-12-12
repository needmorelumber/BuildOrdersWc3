import {
    RECEIVE_BUILDS,
    REQUEST_BUILDS,
    REQUEST_BUILD_ID,
    UPDATE_CURRENT_BUILD,
    SET_VISIBILITY_FILTER,
    BEGIN_BUILD_UPLOAD,
    RESOLVE_BUILD_UPLOAD,
    TOGGLE_EMPTY,
    VisibilityFilters
} from './../actions/actions'
// Reducer for Builds 
// Each case is assesing the 'type' key of the action object. 
// TO-DO: Think about default conditions for having payload/error.  

// Pass initialState as a default argument
const initialStateReference = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    isFetching: false,
    items: []
}
export function builds(state=initialStateReference, action) {
    switch (action.type) {
        case REQUEST_BUILDS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_BUILDS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.payload.items,
                lastUpdated: action.payload.receivedAt
            })
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        default:
            return state
    }

}
const buildStateReference = {
    isFetching: false,
    isEdit: false,
    ordersArray: [],
    item: {
        build: {}
    }
}
export function currentVisibleBuild(state = buildStateReference, action) {
    switch (action.type) {
        case REQUEST_BUILD_ID:
            return Object.assign({}, state, {
                isFetching: true
            })
        case UPDATE_CURRENT_BUILD:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.payload.item
            })
        case TOGGLE_EMPTY:
        console.log('here')
            return Object.assign({}, state, {
                ordersArray: action.payload.build
            })
        default:
            return state
    }
}
const buildFormStateReference = {
  inputs:
    {
        "name": {
            name: "name",
            label: "Name",
            type: "text",
            class: "input"

        },
        "build_type": {
            name: "build_type",
            label: "Build Type",
            type: "text",
            class: "input"

        },
        "description": {
            name: "description",
            label: "Description",
            type: "textarea",
            class: "textarea"

        },
        "analysis": {
            name: "analysis",
            label: "Analysis",
            type: "textarea",
            class: "textarea"

        },
        "vod_link": {
            name: "vod_link",
            label: "Vod Link",
            type: "text",
            class: "input"

        },
        "title_unit": {
            name: "title_unit",
            label: "Title Unit",
            type: "text",
            class: "input"

        },
        "race": {
            name: "race",
            label: "Race",
            type: "select",
            options: [
                "Orc", "Human", "Night Elf", "Undead"
            ],
            class: "select"

        }

    },
    message: "",

}
export function newBuildForm(state = buildFormStateReference, action) {
    switch (action.type) {
        case BEGIN_BUILD_UPLOAD:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RESOLVE_BUILD_UPLOAD:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}


