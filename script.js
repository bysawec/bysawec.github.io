let kek = false;
let wh = document.querySelector("#eye");
let tyt = document.querySelector(".footer_text2");

tyt.addEventListener("click", function kekcheck() {
    kek = true;
    alert("Красава");
});

//ГЛАЗИК
wh.addEventListener("click", function () {
    if (kek == false) {
        Swal.fire({
            position: "top-end",
            type: "warning",
            title: "не можешь",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        location.href = "https://i.imgur.com/DgUbFhc.png";
    }
});
let logo = document.querySelector(".logo");
logo.addEventListener("click", function () {
    console.log(
        "Найс! Ты навел на лого!, теперь попробуй по тыкать по значкам, НО НЕ НАЖИМАЙ НА ГЛАЗ"
    );
    Swal.fire({
        position: "top-end",
        type: "success",
        title: "check console",
        showConfirmButton: false,
        timer: 1500
    });
});
let aim = document.querySelector("#aim");
aim.addEventListener("click", function () {
    Swal.fire({
        position: "top-end",
        type: "success",
        title: "аим он захотел, лови лучше майнер стилак и кейлоггер",
        showConfirmButton: false,
        timer: 1500
    });
});
const ipAPI = "https://api.ipify.org?format=json";
let pip = document.querySelector(".ipshow");

pip.addEventListener("click", function () {
    Swal.queue([{
        title: "Your public IP",
        confirmButtonText: "кнопочка",
        text: "Мне щас придеться тебя вычислить, нука нажми на кнопочку",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(ipAPI)
                .then(response => response.json())
                .then(data => Swal.insertQueueStep(data.ip))
                .catch(() => {
                    Swal.insertQueueStep({
                        type: "error",
                        title: "Unable to get your public IP"
                    });
                });
        }
    }]);
});

popa = document.querySelector(".popa");
popa.addEventListener("click", function fire1() {
    Swal.fire({
        title: "Молодец!",
        text: "",
        imageUrl: "https://i.imgurcom/acMqJ6K.pngg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Тут должна быть картинка! но в чем то проблема..(посмотри код элемента)",
        animation: true
    });
});
let secret = document.querySelector("#popec");
secret.addEventListener("click", function () {
    Swal.fire(
        "Смотри на отметку",
        "https://vk.com/bysawec?z=photo129452267_456241834%2Fphotos129452267",
        "question"
    );
});
let pod = document.querySelector(".pod");
pod.addEventListener("click", function () {
    alert(kek);
});
let paket = document.querySelector(".background-image");
paket.addEventListener("click", function () {});

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
}
let options = {
    width: 1366,
    height: 768,
    background: 'red',
    font: {
        size: '16px',
        color: '#fff'
    }
};
console.log(JSON.parse(JSON.stringify(options)));