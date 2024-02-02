function showDetails(title) {
    const modal = document.getElementById('detailsModal');
    const modalTitle = document.getElementById('modalTitle');

    modal.style.display = 'block';
    modalTitle.textContent = title;
}

function closeDetails() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
    
        const query = searchInput.value.toLowerCase();
    
    });
});