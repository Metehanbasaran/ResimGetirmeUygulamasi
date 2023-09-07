// ------------ Resim Bulma Serach Uygulaması ---------------

const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");//tamamlandı
const searchinput = document.querySelector("#searchinput");//tamamlandı
const buttonWrapper = document.querySelector(".button-wrapper");//tamamlandı
const searchbutton = document.querySelector("#searchButton");//tamamlandı
const clearbutton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");


runEventListeners();


//Bu fonksiyon calıştırma fonksiyonumuzdur
function runEventListeners(){
    form.addEventListener("submit",search);
    clearbutton.addEventListener("click",clear);
}

//Bu function clear temizle butonu icin yazılmıştır
function clear(){
    searchinput.value="";
    Array.from(imageListWrapper.children).forEach((child)=>child.remove())
    // imageListWrapper.innerHTML="";
}

// Bu fonsiyon arama fonksiyonumuzdur
function search(e){

    const value = searchinput.value.trim();
    //@RequestParam - Spring -Rest - APİ
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method :"GET",
        headers:{
            Authorization :"Client-ID cIttFJuHyGcxknHQYYU6Yxzg4q9gaD6QAMTAioLIE5Y"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
       Array.from(data.results).forEach((image)=>{
        // console.log(image.urls.small)
        addImageToUI(image.urls.small)
        })
    })
    .catch((err)=>console.log(err));
    e.preventDefault();
    
}

// Bu fonksiyon ise fotografın getirildiği div lerin oluşturuldupğu fonksiyondur
function addImageToUI(url){
    /*
    <div class="card">
                <img src="" alt="">
        </div>
    */
    const div = document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src",url)
    img.height="400";
    img.width="400";

    div.append(img);
    imageListWrapper.append(div);

}

