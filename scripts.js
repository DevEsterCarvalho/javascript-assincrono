const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

document.getElementById('imageUpload').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        return;
    }
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0]

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})


const inputTags = document.getElementById("input-tags")
const listaTags = document.getElementById("lista-tags")

inputTags.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault()
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            const tagNova = document.createElement("li")
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova);
            inputTags.value = ""
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const removerTag = evento.target.parentElement;
        listaTags.removeChild(removerTag);
    }
})

const tagsDisponiveis = ["Front-end", "Back-end", "Programação", "Figma", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}