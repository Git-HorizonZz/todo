const SAVE_KEY_LIST = 'horizonzz_list';

$(document).on('keyup', function(e) 
{
    if(e.which === 27)
    	$(".popbox").css("display", "none");
});

function spawnButtonText()
{
    spawnButton(document.getElementById("inputbox").value,3)
}

function spawnButton(textval,num)
{
    let text = textval;
    let ul = document.getElementById("tdl");
    let li = document.createElement("li");
    let spanput = document.createElement("input");
    let button = document.createElement("button");
        spanput.setAttribute("id","inputlabel");
        spanput.setAttribute("name","inputlabelname")
        spanput.setAttribute("onclick","$(this).attr('contentEditable',true);")
        if (num==1 || num==2)
            spanput.setAttribute("placeholder","Example Item "+num);
        else if (num==3)
            spanput.setAttribute("placeholder","Example");
        spanput.setAttribute("value",text);
    li.appendChild(spanput);
        button.className = "liButton";
        button.setAttribute("onclick","this.parentNode.remove(this)");
        button.setAttribute("type","button");
        button.appendChild(document.createTextNode("🗑️"));
    li.appendChild(button);
        button = document.createElement("button");
        button.className = "liButton";
        button.setAttribute("onclick","before=$(this.parentNode).prev();$(this.parentNode).insertBefore(before);");
        button.setAttribute("type","button");
        button.appendChild(document.createTextNode("⬆️"));
    li.appendChild(button);
        button = document.createElement("button");
        button.className = "liButton";
        button.setAttribute("onclick","after=$(this.parentNode).next();$(this.parentNode).insertAfter(after);");
        button.setAttribute("type","button");
        button.appendChild(document.createTextNode("⬇️"));
    li.appendChild(button);
    ul.appendChild(li);
    document.getElementById("inputbox").value = "";
}

function exportList() 
{
    let listVals = document.getElementsByName("inputlabelname");
    let valString = "";
    for (let i=0; i<listVals.length; i++)
    {
        if (listVals[i].value != "")
            valString = valString+listVals[i].value+"\t\t";
    }
    valString = valString.slice(0,-2);
    let filename = "tdl_list.txt";
    download(filename, valString);
}

function download(newFile, list) 
{
    let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(list));
        element.setAttribute('download', newFile);
        element.style.display = 'none';
    document.body.appendChild(element);
        element.click();
    document.body.removeChild(element);
}

function importList()
{
    $(tdl).empty();
    try
    {
        let impFile = document.getElementById("fbn").files[0];
        let fr = new FileReader();
        let impFileLoad;
        fr.onload = function(fileLoadedEvent){
            impFileLoad = fileLoadedEvent.target.result;
            let listArray = impFileLoad.split("\t\t");
            for (let i=0; i<listArray.length; i++)
                spawnButton(listArray[i],3);
        };
        fr.readAsText(impFile, "UTF-8");
        $(".popbox").css("display", "none");
    }
    catch (err)
    {
        spawnButton("no file",3);
        $(".popbox").css("display", "none");
    }
    try 
    {
        document.getElementById("fbn").value = null;
    }
    catch(err) 
    {
        $('#fbn').replaceWith($('#fbn').clone());
    }
}

function saveLis()
{
    let listVals = document.getElementsByName("inputlabelname");
    let valString = "";
    for (let i=0; i<listVals.length; i++)
    {
        if (listVals[i].value != "")
            valString = valString+listVals[i].value+"\t\t";
    }
    valString = valString.slice(0,-2);
    localStorage.setItem(SAVE_KEY_LIST, valString);
}

function loadLis()
{
    $(tdl).empty();
    let list_to_load = localStorage.getItem(SAVE_KEY_LIST);
    let listArray = list_to_load.split("\t\t");
    for (let i=0; i<listArray.length; i++)
        spawnButton(listArray[i],3);
}
 
