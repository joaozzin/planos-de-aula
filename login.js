// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCraDfbKMR4vsKOnj0QeXxhr7eMFaeM4pw",
    authDomain: "plano-de-aula-ba15b.firebaseapp.com",
    projectId: "plano-de-aula-ba15b",
    storageBucket: "plano-de-aula-ba15b.appspot.com",
    messagingSenderId: "84398814939",
    appId: "1:84398814939:web:220e0eda8e474579487efe"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referência para a coleção de usuários no banco de dados
const db = firebase.database();
const usuariosRef = db.ref("usuarios");

let usuarios = [];

// Buscar os usuários no banco de dados e preencher a array 'usuarios'
usuariosRef.once("value", (snapshot) => {
    const data = snapshot.val();
    usuarios = Object.values(data);
    console.log("Dados do banco de dados carregados:", usuarios); // Adicione este console.log para verificar se os dados estão sendo carregados corretamente
});

// Função para verificar as credenciais
function verificarCredenciais() {
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    // Verifica se o usuário e senha correspondem a algum usuário na array
    const usuarioEncontrado = usuarios.find((usuario) => usuario.nome === nome && usuario.senha === senha);

    if (usuarioEncontrado) {
        console.log(usuarioEncontrado.tipo);
        if (usuarioEncontrado.tipo === "adm") {
            // Caso o tipo seja administrador, redireciona para a página índice.html
            window.location.href = "indice.html";
        } else if (usuarioEncontrado.tipo === "estudante") {
            // Caso o tipo seja estudante, redireciona para a página planodeaula.html
            window.location.href = "planodeaula.html";
        }
    } else {
        // Caso as credenciais sejam inválidas, exibe uma mensagem de erro
        alert("Credenciais inválidas. Por favor, tente novamente.");
    }
}