async function fetchAndDisplayRepos() {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '<p class="text-gray-600 dark:text-gray-300">Loading repositories...</p>';

    try {
        const response = await fetch('https://api.github.com/users/Mlabarbara/repos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const repos = await response.json();

        if (repos.length === 0) {
            repoList.innerHTML = '<p class="text-gray-600 dark:text-gray-300">No repositories found.</p>';
            return;
        }

        // Clear loading text
        repoList.innerHTML = '';

        // Create elements for each repo
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'p-4 rounded-lg shadow hover:floating-card bg-white dark:bg-gray-900 transition-all';

            const title = document.createElement('h4');
            title.className = 'text-lg font-semibold text-blue-800 dark:text-blue-500 mb-2';
            title.innerText = repo.name;

            const description = document.createElement('p');
            description.className = 'text-gray-700 dark:text-gray-300 mb-2';
            description.innerText = repo.description ? repo.description : 'No description provided.';

            const link = document.createElement('a');
            link.href = repo.html_url;
            link.className = 'text-blue-500 hover:text-blue-300 dark:text-blue-300';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerText = 'View on GitHub';

            repoCard.appendChild(title);
            repoCard.appendChild(description);
            repoCard.appendChild(link);
            repoList.appendChild(repoCard);
        });
    } catch (error) {
        console.error('Error fetching repos:', error);
        repoList.innerHTML = '<p class="text-red-500 dark:text-red-400">Error loading repositories. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayRepos);