document.addEventListener('DOMContentLoaded', () => {
    const providerListContainer = document.getElementById('provider-list');
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalType = document.getElementById('modal-type');
    const closeButton = document.querySelector('.close-button');

    // Cargar los proveedores desde el archivo JSON
    fetch('providers.json')
        .then(response => response.json())
        .then(providers => {
            providers.forEach(provider => {
                const card = createProviderCard(provider);
                providerListContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al cargar los proveedores:', error);
            providerListContainer.innerHTML = '<p>No se pudieron cargar los proveedores. Intenta recargar la página.</p>';
        });

    // Función para crear cada tarjeta de proveedor
    function createProviderCard(provider) {
        const card = document.createElement('div');
        card.className = 'provider-card';
        card.dataset.id = provider.id;

        const statusClass = `status-${provider.status.toLowerCase()}`;
        
        card.innerHTML = `
            <img src="${provider.logo}" alt="Logo de ${provider.name}" class="provider-logo">
            <h3 class="provider-name">${provider.name}</h3>
            <span class="status-label ${statusClass}">${provider.status}</span>
        `;

        // Evento para abrir el modal
        card.addEventListener('click', () => {
            const providerData = { // Creamos un objeto simple para pasar
                name: provider.name,
                type: provider.type
            };
            showModal(providerData);
        });

        return card;
    }

    // Función para mostrar el modal con la información
    function showModal(provider) {
        modalTitle.textContent = provider.name;
        modalType.textContent = `Tipo de Contenido: ${provider.type}`;
        modalContainer.style.display = 'flex';
    }

    // Función para cerrar el modal
    function closeModal() {
        modalContainer.style.display = 'none';
    }

    // Eventos para cerrar el modal
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            closeModal();
        }
    });
});