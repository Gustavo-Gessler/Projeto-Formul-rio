// main.ts

interface UserFormData {
    name: string;
    email: string;
    age: number;
}

function getFilledForms(): UserFormData[] {
    const storedForms = localStorage.getItem('filledForms');
    return storedForms ? JSON.parse(storedForms) : [];
}

function saveFilledForms(forms: UserFormData[]) {
    localStorage.setItem('filledForms', JSON.stringify(forms));
}

function submitForm() {
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const age = parseInt((<HTMLInputElement>document.getElementById('age')).value, 10);

    const filledForms = getFilledForms();
    filledForms.push({ name, email, age });
    saveFilledForms(filledForms);

    // Redirecionar para a tela de formulários cadastrados
    window.location.href = 'filledForms.html';
}


if (window.location.href.includes('filledForms.html')) {
    const filledFormsList = document.getElementById('filledFormsList');
    filledFormsList!.innerHTML = '';

    const filledForms: UserFormData[] = getFilledForms();
    filledForms.forEach((form: UserFormData, index: number) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h2>Informações do Usuário:</h2>
            <p><strong>Nome:</strong> ${form.name}</p>
            <p><strong>E-mail:</strong> ${form.email}</p>
            <p><strong>Idade:</strong> ${form.age}</p>
            <button class="deleteButton" data-index="${index}" onclick="deleteForm(${index})">Excluir</button>
            <button class="editButton" data-index="${index}" onclick="editForm(${index})">Editar</button>
            <hr>
        `;
        filledFormsList!.appendChild(listItem);
    });
}

// Adiciona uma função para editar o formulário pelo índice
function editForm(index: number) {
    const filledForms = getFilledForms();
    const formToEdit = filledForms[index];

    // Armazena o formulário a ser editado no localStorage para ser acessado na próxima tela
    localStorage.setItem('editForm', JSON.stringify(formToEdit));

    // Redireciona para a tela de edição
    window.location.href = 'editForm.html';
}

// Adiciona uma função para deletar o formulário pelo índice
function deleteForm(index: number) {
    const filledForms = getFilledForms();
    filledForms.splice(index, 1);
    saveFilledForms(filledForms);
}


// Adiciona um listener de eventos para a lista de formulários preenchidos
document.getElementById('filledFormsList')?.addEventListener('click', handleListClick);

function handleListClick(event: Event) {
    const target = event.target as HTMLElement;

    // Verifica se o clique foi em um botão de exclusão
    if (target.classList.contains('deleteButton')) {
        // Obtém o item da lista pai do botão
        const listItem = target.closest('li') as HTMLLIElement | null;

        // Verifica se o listItem é null antes de prosseguir
        if (listItem) {
            // Obtém o índice do item na lista
            const index = Array.from(listItem.parentNode?.children || []).indexOf(listItem);

            // Remove o item da lista e atualiza o localStorage
            const filledForms = getFilledForms();
            filledForms.splice(index, 1);
            saveFilledForms(filledForms);

            // Remove o item da lista na interface
            listItem.remove();
        }
    }
}

// Função para redirecionar para a tela do formulário inicial
function goToFormScreen() {
    window.location.href = 'index.html';
}


// Função para redirecionar para a tela dos formulários preenchidos
function SeeForms(){
    window.location.href = 'filledForms.html';
}
