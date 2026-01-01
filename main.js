const generateBtn=document.getElementById("generate-btn");
const paletteContainer=document.querySelector(".palette-container")
// const copyBtn =document.querySelector(".copy-btn")

// 🟢 زرار توليد الألوان
generateBtn.addEventListener("click",generatePalet)

// 🟢 أي كليك يحصل جوا الـ paletteContainer (الحاوية كلها)
paletteContainer.addEventListener("click", function(e){
    // ✅ لو المستخدم ضغط على زر النسخ copy-btn
    if(e.target.classList.contains("copy-btn")){

         // بنجيب الكود اللي قبل الزر (previousElementSibling = العنصر اللي قبله)
        const hexValue=e.target.previousElementSibling.textContent

          // ننسخ الكود للحافظة
        navigator.clipboard.writeText(hexValue)

        // لو النسخ نجح → نعرض علامة صح
        .then(()=>showCopySuccess(e.target))

        // لو فيه خطأ → نطبع الخطأ في الكونسول
        .catch((err)=>console.log(err));
    }
     // ✅ لو المستخدم ضغط على مربع اللون نفسه
    else if (e.target.classList.contains("color")){

        // نروح للعنصر اللي بعد اللون (nextElementSibling) ونجيب الكود منه
        const hexValue=e.target.nextElementSibling.querySelector(".hex-value").textContent;

           // ننسخ الكود للحافظة
         navigator.clipboard.writeText(hexValue)

         // نعرض علامة الصح على زر النسخ اللي جنبه
        .then(()=>showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=>console.log(err));
    }


});

// 🟢 فانكشن بتغير شكل أيقونة النسخ لصح مؤقتًا

function showCopySuccess(element){
     // شيل أيقونة النسخ القديمة
    element.classList.remove("far","fa-copy")
    // حط أيقونة الصح الخضراء
        element.classList.add("fas","fa-check")

        element.style.color="#48bb78"; // أخضر

        // بعد 1.5 ثانية رجعها زي ما كانت
        setTimeout(()=>{

            element.classList.remove("fas","fa-check")
            element.classList.add("far","fa-copy")
            element.style.color="";
        },1500)

}


function generatePalet(){
    const colors= []
    for(let i=0; i<5; i++){
        colors.push(generattRandomColor())
    }

    updatePaletteDisplay(colors)

}

function generattRandomColor(){
    const letters= " 0123456789ABCDEF";
    let color = "#"
    for(let i=0 ; i<6;i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function  updatePaletteDisplay(colors){
    const colorBoxses=document.querySelectorAll(".color-box")

    colorBoxses.forEach((box,index)=>{
        const color=colors[index]
        const colorDiv=box.querySelector(".color")
        const hexValue=box.querySelector(".hex-value")
        colorDiv.style.backgroundColor=color;
        hexValue.textContent=color;
    })

}
generatePalet()
