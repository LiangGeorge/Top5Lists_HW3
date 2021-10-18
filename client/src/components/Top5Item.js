import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("")

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function toggleEditActive(){
        //console.log(editActive)
        // console.log(store)
        setText(props.text)
        let newActive = !editActive
        // console.log(newActive)
        if (newActive){
            store.setIsItemEditActive()
        }
        setEditActive(newActive)
        // console.log(store)
    }
    function handleButtonClick(){
        //console.log(editActive)
        toggleEditActive()
        //console.log(editActive)
        
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            
            let index = event.target.id.substring("item-".length);
            index-=1
            // console.log(props.text)
            // console.log(text)
            store.addChangeItemNameTransaction(index, props.text,text);
            toggleEditActive();
        }
    }

    function handleOnBlur(event){
         
        let index = event.target.id.substring("item-".length);
        index-=1
        // console.log(props.text)
        // console.log(text)
        store.addChangeItemNameTransaction(index, props.text,text);
        toggleEditActive();
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let listItemElement =  <div
    id={'item-' + (index + 1)}
    className={itemClass}
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    draggable="true"
>
    <input
        type="button"
        id={"edit-item-" + index + 1}
        className="list-card-button"
        value={"\u270E"}
        onClick={handleButtonClick}
    />
    {props.text}
    </div>

    if (editActive){
        listItemElement = 
        <input
                id={'item-' + (index + 1)}
                className={itemClass}
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                onBlur={handleOnBlur}
                autoFocus={true}
                defaultValue={props.text}
            />
    }

    return (listItemElement)
}

export default Top5Item;