import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        if (store.idNamePairs !== null){
            listCard = store.idNamePairs.map((pair) => (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />
            ))
        }
    }

    function handleAddNewList(){
        //console.log("Pressed");
        store.addNewList();

    }

    let addBtnStatus = "";
    if (store.isListNameEditActive || store.listMarkedForDeletion !== null){
        addBtnStatus="-disabled";
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    className={"top5-button" + addBtnStatus}
                    value="+" 
                    onClick={handleAddNewList}
                    disabled={addBtnStatus}
                />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default ListSelector;