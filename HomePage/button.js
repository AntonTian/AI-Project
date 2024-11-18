document.addEventListener('DOMContentLoaded', (event) => {
    const articleWindow = document.getElementById('articleWindow');
    const openArticleBtn = document.getElementById('openArticleBtn');
    const closeArticleBtn = document.getElementById('closeArticleBtn');

    openArticleBtn.addEventListener('click', () => {
        articleWindow.style.display = 'flex';
    });

    closeArticleBtn.addEventListener('click', () => {
        articleWindow.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === articleWindow) {
            articleWindow.style.display = 'none';
        }
    });
});