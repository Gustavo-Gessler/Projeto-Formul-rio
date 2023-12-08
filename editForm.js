// Carrega o formulário a ser editado do localStorage
const editForm = JSON.parse(localStorage.getItem('editForm'));

// Preenche os campos do formulário com as informações existentes
document.getElementById('name').value = editForm.name;
document.getElementById('email').value = editForm.email;
document.getElementById('age').value = editForm.age;

// Adiciona uma função para enviar o formulário editado
function saveEditedForm() {
    const editedForm = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
    };

    // Carrega os formulários preenchidos do localStorage
    const filledForms = JSON.parse(localStorage.getItem('filledForms')) || [];

    // Encontra e atualiza o formulário editado na lista
    const index = filledForms.findIndex(form => form.name === editForm.name && form.email === editForm.email && form.age === editForm.age);
    filledForms[index] = editedForm;

    // Salva os formulários preenchidos atualizados no localStorage
    localStorage.setItem('filledForms', JSON.stringify(filledForms));

    // Redireciona de volta para a tela de formulários preenchidos
    window.location.href = 'filledForms.html';
}
