function qtyDec(){
    var d=document.querySelector(".qty");
    if(d.value!=1){
        d.value=Number(d.value)-1;
        var p=document.querySelector(".price").innerHTML
        p=p-11999;
        document.querySelector(".price").innerHTML=p;
        let l=document.querySelectorAll(".total");
        for(let i=0;i<l.length;i++){
            l[i].innerHTML=`&#8377 ${p}`;
        }
    }
    }
function qtyInc(){
    var i=document.querySelector(".qty");
    i.value=Number(i.value)+1;
    var p=11999*(i.value);
    document.querySelector(".price").innerHTML=p;
    let l=document.querySelectorAll(".total");
        for(let i=0;i<l.length;i++){
            l[i].innerHTML=`&#8377 ${p}`;
        }
}