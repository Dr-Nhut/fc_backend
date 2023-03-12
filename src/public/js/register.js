var mes_block = document.querySelector(".content-message");
var close_mes = document.querySelector(".close-message");
var mes_content = document.querySelector(".mes");

if (mes_content.textContent) {
  mes_block.classList.remove("js-hidden");
}

close_mes.onclick = function () {
  mes_block.classList.add("js-hidden");
};
