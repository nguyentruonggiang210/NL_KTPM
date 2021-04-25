// Đóng kết quả khi bấm ra ngoài
$('html').click(function(){
    $('#search_result').css('display','none');
});
$('#search_input').click(function(event){
    event.stopPropagation();
});
//
function removeAllChildNodes() {
    const parent = document.getElementById("search_result");
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}
// Kết quả tìm kiếm
function myFunction(obj) {
if(obj.value != ""){
   
    document.getElementById("search_result").style.display = "block";
    var result = document.getElementById("search_result");
    $.ajax({
        method:'post',
        url:'/handler/search',
        data:{
            data:obj.value,
        },
        success: (data)=>{
            // <li><a href="#">
            //     <div class="search_result_left">
            //         <span class="search_product_name">Iphone</span>
            //         <br>
            //         <span class="search_product_price">Giá: 300000000</span>
            //     </div>
            //     <div class="search_result_left_right">
            //         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/IPhone_12_Pro_Gold.svg/1200px-IPhone_12_Pro_Gold.svg.png" />
            //      </div>
            //   </a></li>
            var obj_arr = data.data;
            var stt = true;
            if(obj_arr.length > 0){
                stt = true;
                removeAllChildNodes();
                obj_arr.forEach(function(o){
                    var span_name = document.createElement("SPAN"); 
                    span_name.innerHTML = o.Ten_DT;
                    span_name.className = "search_product_name";
                    var br = document.createElement("BR"); 
                    var span_price = document.createElement("SPAN"); 
                    span_price.innerHTML = "Giá: "+o.result_array.Giaban_DT;
                    span_price.className = "search_product_price";
                    var div_left = document.createElement("DIV"); 
                    div_left.className = "search_result_left";
                    div_left.appendChild(span_name);
                    div_left.appendChild(br);
                    div_left.appendChild(span_price);
                    var img = document.createElement("IMG");
                    img.src = o.result_array.Hinh_M[0]; 
                    var div_right = document.createElement("DIV"); 
                    div_right.className = "search_result_right";
                    div_right.appendChild(img);
                    var a = document.createElement("A"); 
                    a.href="#";
                    a.appendChild(div_left);
                    a.appendChild(div_right);
                    var li = document.createElement("LI"); 
                    li.appendChild(a);
                    result.appendChild(li);
                });
            }
            else{
                if(stt){
                    removeAllChildNodes();
                    stt = false;
                }
                try{
                    if(document.getElementById("no_result_search").innerHTML == "Không có sản phẩm phù hợp"){
                        return;
                    }
                }
                catch{
                }
                var li = document.createElement("LI"); 
                li.style.textAlign = "center";
                li.style.paddingTop = "10px";
                var span = document.createElement("SPAN"); 
                span.id = "no_result_search";
                span.innerHTML = "Không có sản phẩm phù hợp";
                li.appendChild(span);
                result.appendChild(li);
            }
            
        },
        error : (err) =>{
            console.log(err);
        }
    });
}
else{
    document.getElementById("search_result").style.display = "none";
}
}