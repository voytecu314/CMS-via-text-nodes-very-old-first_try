function isTextNode (node) {

    //is text node
    if (node.nodeType !== 3) {
        return false;   
    }

    //is first char enter and any other is not enter or space
    if (node.textContent.charCodeAt(0) === 10) {
        for(let i=1; i<node.textContent.length;i++){
            if(node.textContent.charCodeAt(i) !==10 && node.textContent.charCodeAt(i) !==32 ){
                return true;
            }
        }    
        return false;    
    }

    //is first char space and any other is not enter or space
    if (node.textContent.charCodeAt(0) === 32) {
        for(let i=1; i<node.textContent.length;i++){
            if(node.textContent.charCodeAt(i) !==10 && node.textContent.charCodeAt(i) !==32 ){
                return true;
            }
        }    
        return false;    
    }

    return true;

}

function detectTextContent (element) {
    
    const nodes = element.childNodes;

    let parentIsSet = false;

    for(let node of nodes) {

        if( (!parentIsSet) && isTextNode(node) ) { 

            node.parentElement.classList.add('admin-edit');
            node.parentElement.addEventListener('click', editText);

            parentIsSet=true;

        }

        if(node.nodeType === 1) {
            detectTextContent(node);
        } 
    }
}

let HTMLfromPreviousField, previousField;

function editText (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    if(event.target.tagName==='I' || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
    const textArray = [];
    const loop = event.target.childNodes.length;
    for(let i=0;i<loop;i++){
        textArray.push(event.target.childNodes[i].textContent);
    }; 
    previousHTML = event.target.innerHTML;

    if(previousField) previousField.innerHTML=HTMLfromPreviousField;
    HTMLfromPreviousField = event.target.innerHTML;
    previousField = event.target;

    event.target.innerHTML = '';
    for(let i = 0; i < loop; i++) {
        const id = 'id'+crypto.randomUUID();
        if (textArray[i].length) {
            event.target.innerHTML += textArray[i].length > 50 ? 
            `<textarea cols='25' rows='5' placeholder='${textArray[i]}' id='${id}' style='all: revert' />`
            :`<input type='text' value='${textArray[i]}' id='${id}' style='all: revert' />`;
            document.querySelector(`#${id}`).select();}
    };
}

detectTextContent(document.body, 'load');
