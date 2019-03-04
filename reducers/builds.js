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
  FAILED_LOADING_BUILDS,
  ADD_MINUTE,
  REMOVE_MINUTE,
  SET_SEARCH_QUERY,
  UPDATE_CURRENT_ORDER,
  BEGIN_DELETE_BUILD,
  RESOLVE_DELETE_BUILD,
  SET_SORT_TYPE,
  UPDATE_ONE_BUILD,
  VisibilityFilters,

} from '../actions/build';
// Reducer for Builds
// Each case is assesing the 'type' key of the action object.
// TO-DO: Think about default conditions for having payload/error.

// Pass initialState as a default argument
const buildsStateReference = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  sortType: null,
  isFetching: false,
  totalBuilds: 11,
  page: 1,
  items: [],
  currentOrder: null,
  visible_items: [],
};
const buildFormStateReference = {
  inputs:
  {
    name: {
      name: 'name',
      label: 'Name',
      type: 'text',
      userType: 'text',
      class: 'input',

    },
    race: {
      name: 'race',
      label: 'Race',
      type: 'select',
      userType: 'select',
      options: [
        'Orc', 'Human', 'Night Elf', 'Undead',
      ],
      class: 'select',

    },
    opposing_race: {
      name: 'opposing_race',
      label: 'Opposing Race',
      type: 'select',
      userType: 'select',
      options: [
        'Orc', 'Human', 'Night Elf', 'Undead',
      ],
      class: 'select',

    },
    build_type: {
      name: 'build_type',
      label: 'Build Type',
      type: 'radio',
      userType: 'radio',
      class: 'radio',
      options: [
        'All in', 'Economic', 'co-op', 'Timing Attack',
      ],

    },
    description: {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      userType: 'textarea',
      class: 'textarea',

    },
    analysis: {
      name: 'analysis',
      label: 'Analysis',
      type: 'textarea',
      userType: 'textarea',
      class: 'textarea',

    },
    vod_link: {
      name: 'vod_link',
      label: 'Vod Link',
      type: 'text',
      userType: 'text',
      class: 'input',

    },
    title_unit: {
      name: 'title_unit',
      label: 'Title Unit',
      type: 'text',
      userType: 'text',
      class: 'input',

    },

  },
  isFetching: false,

};
const buildStateReference = {
  isFetching: false,
  isEdit: false,
  isAddingOrder: false,
  isToggledOrders: false,
  mostRecentBuild: false,
  failedToLoad: false,
  item: {
    build: null,
  },
};
const toggleEmptyLogic = timeline => {
  const item = [];
  for (let i = 0; i < timeline.length; i++) {
    const { order } = timeline[i];
    if (order && order.race_unit) {
      item.push(timeline[i]);
    }
  }
  return item;
};

const findWithAttr = (array, attr, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};
export function builds(state = buildsStateReference, action) {
  switch (action.type) {
    case REQUEST_BUILDS:
      return Object.assign({}, state, {
        isFetching: true,
        page: action.payload.page,
      });
    case RECEIVE_BUILDS:
      return Object.assign({}, state, {
        isFetching: false,
        page: state.page,
        items: action.payload.items,
        totalBuilds: action.payload.items.length,
        lastUpdated: action.payload.receivedAt,
      });
    case FAILED_LOADING_BUILDS:
      return Object.assign({}, state, {
        failedToLoad: true,
        isFetching: false,
      });
    case UPDATE_ONE_BUILD:
      state.items.splice(findWithAttr(state.items, '_id', action.payload.item._id), 1, action.payload.item);
      return Object.assign({}, state, {
        items: state.items,
      });
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.payload,
      });
    case SET_SEARCH_QUERY:
      return Object.assign({}, state, {
        searchQuery: action.payload,
      });
    case SET_SORT_TYPE:
      return Object.assign({}, state, {
        sortType: action.payload,
      });
    default:
      return state;
  }
}

export function currentVisibleBuild(state = buildStateReference, action) {
  switch (action.type) {
    case REQUEST_BUILD_ID:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case UPDATE_CURRENT_BUILD:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.payload.item,
      });
    case TOGGLE_EMPTY:
      const newItemToggle = Object.assign({}, state.item, {
        build: Object.assign({}, state.item.build, { build_list: toggleEmptyLogic(state.item.build.build_list) }),
      });
      return Object.assign({}, state, {
        isToggledOrders: action.payload.isToggledOrders,
        mostRecentBuild: state.item,
        item: newItemToggle,
      });
    case ADD_MINUTE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case REMOVE_MINUTE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RESTORE_BUILD:
      return Object.assign({}, state, {
        isToggledOrders: action.payload.isToggledOrders,
        item: state.mostRecentBuild,
      });
    case RESOLVE_BUILD_UPDATE:
      const newItemResolve = Object.assign({}, state.item, {
        build: Object.assign({}, state.item.build, { build_list: action.payload.item.data }),
      });
      return Object.assign({}, state, {
        item: newItemResolve,
        isFetching: false,
      });
    case UPDATE_CURRENT_ORDER:
      return Object.assign({}, state, {
        currentOrder: action.payload,
      });
    case BEGIN_DELETE_BUILD:
      return { ...state,
        isFetching: true };
    case RESOLVE_DELETE_BUILD:
      return { ...state,
        isFetching: false };
    default:
      return state;
  }
}

export function newBuildForm(state = buildFormStateReference, action) {
  switch (action.type) {
    case BEGIN_BUILD_UPLOAD:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RESOLVE_BUILD_UPLOAD:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
