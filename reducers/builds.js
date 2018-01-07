import {
  RECEIVE_BUILDS,
  REQUEST_BUILDS,
  REQUEST_BUILD_ID,
  UPDATE_CURRENT_BUILD,
  SET_VISIBILITY_FILTER,
  BEGIN_BUILD_UPLOAD,
  RESOLVE_BUILD_UPLOAD,
  TOGGLE_EMPTY,
  RESTORE_BUILD,
  RESOLVE_BUILD_UPDATE,
  VisibilityFilters
} from './../actions/build'
// Reducer for Builds 
// Each case is assesing the 'type' key of the action object. 
// TO-DO: Think about default conditions for having payload/error.  

// Pass initialState as a default argument
const initialStateReference = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  isFetching: false,
  items: []
}
const buildFormStateReference = {
  inputs:
  {
    "name": {
      name: "name",
      label: "Name",
      type: "text",
      userType: "text",
      class: "input"

    },
    "build_type": {
      name: "build_type",
      label: "Build Type",
      type: "text",
      userType: "text",
      class: "input"

    },
    "description": {
      name: "description",
      label: "Description",
      type: "textarea",
      userType: "textarea",
      class: "textarea"

    },
    "analysis": {
      name: "analysis",
      label: "Analysis",
      type: "textarea",
      userType: "textarea",
      class: "textarea"

    },
    "vod_link": {
      name: "vod_link",
      label: "Vod Link",
      type: "text",
      userType: "text",
      class: "input"

    },
    "title_unit": {
      name: "title_unit",
      label: "Title Unit",
      type: "text",
      userType: "text",
      class: "input"

    },
    "race": {
      name: "race",
      label: "Race",
      type: "select",
      userType: "select",
      options: [
        "Orc", "Human", "Night Elf", "Undead"
      ],
      class: "select"

    }

  },
  isFetching: false

}
const buildStateReference = {
  isFetching: false,
  isEdit: false,
  isToggledOrders: false,
  mostRecentBuild: false,
  item: {
    build: null
  }
}
 const toggleEmptyLogic = (timeline) => {
    let item =[]
          for (let i = 0; i < timeline.length; i++) {
              let order = timeline[i].order;
              if(order){
                item.push(timeline[i])
              }
          }
    return item;
  };
export function builds(state = initialStateReference, action) {
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
      let newItemToggle = Object.assign({}, state.item, {
        build: Object.assign({},state.item.build,{build_list: toggleEmptyLogic(state.item.build.build_list)})
      });
      return Object.assign({}, state, {
        isToggledOrders: action.payload.isToggledOrders,
        mostRecentBuild: state.item,
        item: newItemToggle
      })
    case RESTORE_BUILD:
      return Object.assign({}, state, {
        isToggledOrders: action.payload.isToggledOrders,
        item: state.mostRecentBuild
      })
    case RESOLVE_BUILD_UPDATE:
      let newItemResolve = Object.assign({}, state.item, {
        build: Object.assign({},state.item.build,{build_list: action.payload.item.data})
      });
     return Object.assign({}, state, {
       item: newItemResolve
     })
    default:
      return state
  }
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


