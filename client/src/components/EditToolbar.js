import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function currentListNull(){
        //console.log(store.currentList === null);
        return store.currentList === null
    }

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }


    let undoBtnStatus = ""
    let redoBtnStatus = ""
    let closeBtnStatus = ""

    if (!store.hasUndo()){
        undoBtnStatus="-disabled"
    }

    if (!store.hasRedo()){
        redoBtnStatus="-disabled"
    }

    if (store.currentList === null){
        closeBtnStatus="-disabled"
    }
    //console.log(store.isitemEditActive)
    if (store.isItemEditActive || (store.listMarkedForDeletion !== null) || store.isListNameEditActive){
        undoBtnStatus = "-disabled"
        redoBtnStatus = "-disabled"
        closeBtnStatus = "-disabled"
    }


    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button' 
                onClick={handleUndo}
                className={enabledButtonClass + undoBtnStatus}>
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={enabledButtonClass + redoBtnStatus}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={enabledButtonClass + closeBtnStatus}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;