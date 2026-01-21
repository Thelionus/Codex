// Blog posts data - Add new posts here
const blogPosts = [
    {
        title: "Welcome to My Blog",
        date: "January 21, 2026",
        summary: "Welcome to my blog where I share thoughts on cognitive engineering, music, technology, and the intersection of art and science.",
        content: `
            <p>Welcome to my blog where I share thoughts on cognitive engineering, music, technology, and the intersection of art and science.</p>
            <p>Throughout my career as a jazz pianist and cognitive engineering researcher, I've explored how the mind processes complex patterns, whether in music or in human-computer interaction. This blog will be a space to share insights, stories, and reflections on these topics.</p>
            <p>Stay tuned for posts about jazz theory, performance experiences, cognitive science, and the creative process.</p>
        `
    },
    {
        title: "The Intersection of Jazz and Cognitive Engineering",
        date: "January 15, 2026",
        summary: "Jazz improvisation and cognitive engineering share more in common than one might think. Both require real-time processing, pattern recognition, and adaptive decision-making under uncertainty.",
        content: `
            <p>Jazz improvisation and cognitive engineering share more in common than one might think. Both require real-time processing, pattern recognition, and adaptive decision-making under uncertainty.</p>
            <p>When I'm performing, my mind is constantly evaluating harmonic possibilities, rhythmic variations, and melodic developments. This is remarkably similar to how we design systems that must adapt to user behavior in real-time.</p>
            <p>The principles of anticipation, feedback loops, and contextual awareness apply equally to both domains. Understanding one has deepened my appreciation and skill in the other.</p>
        `
    }
];

// Function to toggle post content
function togglePost(index) {
    const summaryElement = document.getElementById(`summary-${index}`);
    const contentElement = document.getElementById(`content-${index}`);
    const readMoreBtn = document.getElementById(`readmore-${index}`);

    if (contentElement.style.display === 'none') {
        contentElement.style.display = 'block';
        summaryElement.style.display = 'none';
        readMoreBtn.textContent = 'Show Less';
    } else {
        contentElement.style.display = 'none';
        summaryElement.style.display = 'block';
        readMoreBtn.textContent = 'Read More';
    }
}

// Function to render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');

    if (!blogContainer) {
        console.error('Blog container not found');
        return;
    }

    // Clear existing content
    blogContainer.innerHTML = '';

    // Render each blog post
    blogPosts.forEach((post, index) => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';

        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="blog-meta">${post.date}</div>
            <div id="summary-${index}" class="blog-summary">
                <p>${post.summary}</p>
            </div>
            <div id="content-${index}" class="blog-content" style="display: none;">
                ${post.content}
            </div>
            <a href="#" id="readmore-${index}" class="read-more" onclick="togglePost(${index}); return false;">Read More</a>
        `;

        blogContainer.appendChild(postElement);
    });
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', renderBlogPosts);
