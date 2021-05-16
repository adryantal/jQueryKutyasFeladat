var kutyak = [

    {
        Név: "Pajti",
        Kor: 5,
        Nem: "kan",
        Fajta: "Ír szetter",
        Gazdi_neve: "Kerti Virág",
        Lakhely: "Budapest"

    },
    {
        Név: "Bodri",
        Kor: 4,
        Nem: "kan",
        Fajta: "Pumi",
        Gazdi_neve: "Eszes Elek",
        Lakhely: "Érd"
    },
    {
        Név: "Panka",
        Kor: 1,
        Nem: "nőstény",
        Fajta: "Ír szetter",
        Gazdi_neve: "Fokföldi Ibolya",
        Lakhely: "Székesfehérvár"
    },
    {
        Név: "Goldy",
        Kor: 2,
        Nem: "nőstény",
        Fajta: "Golden retriever",
        Gazdi_neve: "Boldog Balázs",
        Lakhely: "Hatvan"
    }

];



$(function () {
    $("#kuld").click(UjRekordBeszur);
    tablazatbaKiir();   
    $("article").on("click", "th", rendez);
});


function kiemel() {
    $(this).toggleClass("kiemel");
}

function kutyaNeme() {
    var kutyaNeme = $("input[name='nem']:checked").val();    
    if (kutyaNeme === "kan")
        return "kan";
    else if (kutyaNeme === "nőstény")
        return "nőstény";
    else
        return "Nincs információ";


}

function valid() {
      
    var nevInput = $("#nev").val();
    var korInput = $("#kor").val();
    var fajtaInput = $("#fajta").val();
    var gazdi_neveInput = $("#gazdi_neve").val();
    var lakhelyInput = $("#lakhely").val();
    

    var nev_helyes;
    if (nevInput.length > 2)
        nev_helyes = true;
    
    var kor_helyes;
    if (korInput.length > 2)
        kor_helyes = true;
    
    var fajta_helyes;
    if (fajtaInput.length > 2)
        fajta_helyes = true;
    
    var gazdineve_helyes;
    if (gazdi_neveInput.length > 4)
        gazdineve_helyes = true;
    
    var lakhely_helyes;
    if (lakhelyInput.length > 2)
        lakhely_helyes = true;

    var kor_helyes;
    if (korInput > 0)
        kor_helyes = true;

    return nev_helyes && kor_helyes && kor_helyes && fajta_helyes && gazdineve_helyes;
}


function formKiurit() {
    $('input:text').val('');      
   $("input[type='number']").val('');  
   //ha simán $('input').val('') - t alkalmazok, hogy minden kitöltött mező értékét töröljem, akkor utána a radio button értékét nem olvassa be az új rekordadatok megadásakor... 
}

function UjRekordBeszur() {     
    
    var kutyaObjektum = {
        Név: $("#nev").val(),
        Kor: $("#kor").val(),
        Nem: kutyaNeme(),
        Fajta: $("#fajta").val(),
        Gazdi_neve: $("#gazdi_neve").val(),
        Lakhely: $("#lakhely").val()
    };
    console.log("Kutya neme: "+$("input[name='nem']:checked").val());
    if (valid()) {
        kutyak.push(kutyaObjektum);
//    console.log(kutyaObjektum);
        tablazatbaKiir();
        formKiurit();
    } else {
        alert("Hibás adat vagy kitöltetlen adatmező.");
    }    
   
}


function tablazatFejlecKiir(tomb) {

    $("article table").append("<tr></tr>");
    for (var item in tomb[0]) {
        var item_corr = item.replace("_", " ");
        $("article table tr").append("<th id='" + item + "'>" + item_corr + "</th>");
    }
}

function tablazatSorokKiir(tomb) {

    /*Sorok beszúrása a táblázatba*/
    for (var i = 0; i < tomb.length; i++) {
        $("article table").append("<tr></tr>");
        for (var item in tomb[i]) {

            $("article table tr").eq(i + 1).append("<td>" + tomb[i][item] + "</td>");
        }
    }
     
}



function tablazatbaKiir() {   
   
    $("article").empty();
    $("article").append("<table></table>");

    tablazatFejlecKiir(kutyak);
    tablazatSorokKiir(kutyak);
    
    $("article table th").hover(kiemel);
  
}

var novekvo = true; //legyen az alap/kiinduló rendezés növekvő

function rendez() {
    var mezo = $(this).attr("id");
    console.log(mezo);

    if (mezo === "Kor") {
        if (novekvo) {
            kutyak.sort(//növekvő
                    function (a, b) {
                        console.log(a[mezo]);
                        return a[mezo] - b[mezo];
                    }
            );
        } else {
            kutyak.sort(//csökkenő
                    function (a, b) {
                        console.log(a[mezo]);
                        return b[mezo] - a[mezo];
                    });
            console.log("aktuális objektum: " + JSON.stringify(kutyak));
        }
    } else {
        if (novekvo) {
            kutyak.sort(
                    function (a, b) {//csökkenő
//                        console.log(a[mezo]);
                        return Number(a[mezo] > b[mezo]) - 0.5;
                    }
            );
            console.log("aktuális objektum: " + JSON.stringify(kutyak));
        } else {

            kutyak.sort(
                    function (a, b) {
//                        console.log(a[mezo]);                      
                        return Number(a[mezo] < b[mezo]) - 0.5;
                    }
            );
        }
    }
    novekvo = !novekvo;
    tablazatbaKiir();    

}






