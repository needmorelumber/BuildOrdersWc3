import {UPDATE_CURRENT_BUILD } from './../actions/actions'
import data from './../MasterData';
const addOrderStateReference = {
    inputs:
    {
        "second": {
            name: "second",
            label: "Second in Game to build",
            type: "number",
            userType: "textarea", 
            class: "input"
        },
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

}
export function addOrderForm(state=addOrderStateReference, action) {
  switch(action.type){
    case(UPDATE_CURRENT_BUILD):
    let namesarray = [];
    if(action.payload.item){
     const race = action.payload.item.build.race;
     const racearray = Object.entries(data[race]);
     for(let i=0; i<racearray.length; i++){
         namesarray.push(racearray[i][0]);
     }
     namesarray.splice(0, 1);
    } 
    return Object.assign({}, state, {
        inputs: {
            "second": {
                name: "second",
                label: "Second in Game to build",
                type: "number",
                userType: "number",
                class: "input"
            },
            "race_unit": {
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
    default:
      return state
  }
}